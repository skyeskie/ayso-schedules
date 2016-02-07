import Team from '../models/team';
import Region from "../models/region";
import {OpaqueToken} from 'angular2/core';

interface SettingsDAO {
    getSavedTeamIDs(): Promise<String[]>;
    getSavedTeams(): Promise<Team[]>;

    /**
     * @function saveTeam
     * @desc Saves a team as a favorite.
     * If team already saved, does no-op to prevent duplicates
     * @param {String} team - unique ID for team
     */
    saveTeam(team: String): void;

    /**
     * @function unSaveTeam
     * @desc Removes a team from favorites.
     * Checks all items so will remove all if there are duplicates
     * @param {String} team - unique ID of team to remove
     */
    unSaveTeam(team: String): void;

    /**
     * @function isTeamSaved
     * @desc Checks if team is saved
     * @param {String} team - unique ID of team
     */
    isTeamSaved(team: String): Promise<boolean>;

    /**
     * @function clearSavedTeams
     * @desc Removes all teams from saved list
     */
    clearSavedTeams(): void;

    /**
     * @function getRegionNumber
     * @desc Gets the saved region number
     * @returns {String} the region ID
     */
    getRegionNumber(): Promise<Number>;

    /**
     * @function getRegionNumber
     * @desc Gets the saved region number
     * @returns {String} the region ID
     */
    getRegion(): Promise<Region>;

    /**
     * @function setRegion
     * @desc Persists the current region to configuration
     * @param {String} region - the region ID
     */
    setRegion(region: Number): void;

    reset(): void;
}

var SettingsDAO = new OpaqueToken("SettingsDAO");
export {SettingsDAO as default, SettingsDAO, Region, Team};
