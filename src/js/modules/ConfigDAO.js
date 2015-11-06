/* global aysoApp */

/**
 * Configuration Data Access Object
 *
 * Used to contain and update user preferences and settings
 */

aysoApp.service("ConfigDAO", function(localStorageService) {
    "use strict";

    var ls = localStorageService;

    var savedTeams = [];

    function init() {
        var fav = ls.get('teams');
        if (typeof fav !== 'string' || fav.length === 0) {
            ls.set('teams', '');
        } else {
            savedTeams = fav.split(',');
        }

        var r = ls.get('region');
        if(r === null) {
            ls.set('region', '');
        }
    }
    init();

    function storeSavedTeams() {
        ls.set('teams', savedTeams.join(','));
    }

    this.getSavedTeams = function() {
        return savedTeams;
    };

    this.saveTeam = function(team) {
        if(this.isTeamSaved(team)) {
            return this;
        }

        savedTeams.push(team);
        storeSavedTeams();
        return this;
    };

    this.unSaveTeam = function(team) {
        savedTeams = savedTeams.filter(function(item) {
            return item !== team; //Keep if true, so only false for item to remove
        });
        storeSavedTeams();
        return this;
    };

    this.isTeamSaved = function(team) {
        return (-1 !== savedTeams.indexOf(team));
    };

    this.clearSavedTeams = function() {
        savedTeams = [];
        ls.set('teams','');
        return this;
    };

    this.getRegion = function() {
        return ls.get('region');
    };

    this.setRegion = function(region) {
        ls.set('region', region);
        return this;
    };
});
