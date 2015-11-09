/* global angular */

/**
 * @ngdoc service
 * @name DataControl
 * @description
 * Handles downloading and updating data from the AYSO website.
 * Most data is handled offline
 *
 * @requires $cordovaSQLite, ConfigDAO, SchedulesDAO
 * */
angular.module('aysoApp').service('DataControl', function($http, SchedulesDAO, localStorageService){
    "use strict";

    var remoteURL = "http://aysoks.org/app/json.php5";

    var ls = localStorageService;
    var service = this;

    service.httpError = function(error) { console.error("ERROR: " + error); };

    service.getLastUpdate = function() {
        var version = ls.get('lastData');
        if(typeof version === 'undefined' || version === null) {
            return '';
        }
        return version;
    };

    service.setLastUpdate = function(version) {
        ls.set('lastData', version);
    };

    service.checkResponse = function(response) {
        if(typeof response.data.Error === 'undefined') {
            service.httpError('Response is unrecognized format');
            return false;
        }

        if(response.data.Error !== '') {
            service.httpError(response.data.Error);
            return false;
        }

        return true;
    };

    service.injectData = function(data, replace) {
        if(typeof data.Games !== 'undefined' && data.Games.length > 0) {
            SchedulesDAO.putGames(data.Games, replace);
        }

        if(typeof data.Coaches !== 'undefined' && data.Coaches.length > 0) {
            SchedulesDAO.putCoaches(data.Coaches, replace);
        }
    };

    service.updateData = function() {
        $http.post(remoteURL, { lastUpdate: service.getLastUpdate() }).then(
            function(response) {
                if(service.checkResponse(response)) {
                    service.injectData(response.data);
                    SchedulesDAO.refreshCaches();
                }
            },
            service.httpError
        );
    };

    service.fullDataRefresh = function() {
        $http.post(remoteURL).then(
            function(response) {
                if(service.checkResponse(response)) {
                    service.injectData(response.data, true);
                    SchedulesDAO.refreshCaches();
                    service.setLastUpdate(response.data.Version);
                }
            },
            service.httpError
        );
    };
});

