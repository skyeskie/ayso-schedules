/**
 * @ngdoc service
 * @name DataControl
 * @description
 * Handles downloading and updating data from the AYSO website.
 * Most data is handled offline
 *
 * @requires $http, SchedulesDAO, localStorageService
 * */
angular.module('aysoApp').service('DataControl', function($http, SchedulesDAO, localStorageService){
    "use strict";

    /**
     * @desc remote service endpoint
     * @todo Switch to using an app-level configuration
     */
    var remoteURL = "http://aysoks.org/app/json.php5";

    /**
     * Convenience
     * @private
     * @borrows localStorageService
     */
    var ls = localStorageService;

    /**
     * @private
     * @type {DataControl}
     */
    var service = this;

    /**
     * @function httpError
     * @memberof DataControl
     * @param error
     */
    this.httpError = function(error) { console.error("ERROR: " + error); };

    /**
     * @function getLastUpdate
     * @memberof DataControl
     * @desc Gets the version of the last update.
     *     This is used by the server for only sending updated records.
     * @returns {string} No update is the empty string
     */
    this.getLastUpdate = function() {
        var version = ls.get('lastData');
        if(typeof version === 'undefined' || version === null) {
            return '';
        }
        return version;
    };

    /**
     * @function setLastUpdate
     * @memberof DataControl
     * @desc Sets the current update version.
     * @param {String} version
     */
    this.setLastUpdate = function(version) {
        ls.set('lastData', version);
    };

    /**
     * @function checkResponse
     * @memberof DataControl
     * @desc Checks the HTTP response for errors and proper formatting
     * @param response - HTTP response object
     * @returns {boolean}
     */
    this.checkResponse = function(response) {
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

    /**
     * @function injectData
     * @memberof DataControl
     * @desc Adds data from the remote response to the local data store
     * @param {Object} data - data response from server
     * @param {boolean} replace - whether to empty the table before putting the data
     */
    this.injectData = function(data, replace) {
        if(typeof data.Games !== 'undefined' && data.Games.length > 0) {
            SchedulesDAO.putGames(data.Games, replace);
        }

        if(typeof data.Coaches !== 'undefined' && data.Coaches.length > 0) {
            SchedulesDAO.putCoaches(data.Coaches, replace);
        }
    };

    /**
     * @function updateData
     * @memberof DataControl
     * @desc Gets data updates from the remote service.
     * This attempts to transfer less data than a full update
     */
    this.updateData = function() {
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

    /**
     * @function fullDataRefresh
     * @memberof DataControl
     * @desc Retrieves all data from the remote service.
     * This will wipe local data.
     * @todo Make sure favorites still exist
     */
    this.fullDataRefresh = function() {
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

