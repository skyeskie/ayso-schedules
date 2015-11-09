/* global aysoApp */

/**
 * @ngdoc service
 * @name ConfigDAO
 * @desc Configuration Data Access Object
 *
 * Used to contain and update user preferences and settings
 * @requires localStorageService
 */
aysoApp.service("ConfigDAO", function(localStorageService) {
    "use strict";

    /**
     * @private
     * @borrows localStorageService
     */
    var ls = localStorageService;

    /**
     * List of teams saved as favorites
     * @type {Array.<String>} of team IDs
     */
    var savedTeams = [];

    /**
     * @private
     * @desc Sets up storage values if nonexistent and caches the saved teams
     */
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

    /**
     * @private
     * @desc Writes cached saved teams array to storage
     */
    function storeSavedTeams() {
        ls.set('teams', savedTeams.join(','));
    }

    /**
     * @function getSavedTeams
     * @desc Gets the list of saved teams
     * @returns {Array.<String>}
     *
     */
    this.getSavedTeams = function() {
        return savedTeams;
    };

    /**
     * @function saveTeam
     * @desc Saves a team as a favorite.
     * If team already saved, does no-op to prevent duplicates
     * @param {String} team - unique ID for team
     * @returns {ConfigDAO}
     */
    this.saveTeam = function(team) {
        if(this.isTeamSaved(team)) {
            return this;
        }

        savedTeams.push(team);
        storeSavedTeams();
        return this;
    };

    /**
     * @function unSaveTeam
     * @desc Removes a team from favorites.
     * Checks all items so will remove all if there are duplicates
     * @param {String} team - unique ID of team to remove
     * @returns {ConfigDAO}
     */
    this.unSaveTeam = function(team) {
        savedTeams = savedTeams.filter(function(item) {
            return item !== team; //Keep if true, so only false for item to remove
        });
        storeSavedTeams();
        return this;
    };

    /**
     * @function isTeamSaved
     * @desc Checks if team is saved
     * @param {String} team - unique ID of team
     * @returns {boolean}
     */
    this.isTeamSaved = function(team) {
        return (-1 !== savedTeams.indexOf(team));
    };

    /**
     * @function clearSavedTeams
     * @desc Removes all teams from saved list
     * @returns {ConfigDAO}
     */
    this.clearSavedTeams = function() {
        savedTeams = [];
        ls.set('teams','');
        return this;
    };

    /**
     * @function getRegion
     * @desc Gets the saved region configuration
     * @returns {String} the region ID
     */
    this.getRegion = function() {
        return ls.get('region');
    };

    /**
     * @function setRegion
     * @desc Persists the current region to configuration
     * @param {String} region - the region ID
     * @returns {ConfigDAO}
     */
    this.setRegion = function(region) {
        ls.set('region', region);
        return this;
    };
});
