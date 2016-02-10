import Team from '../models/team';
import Region from '../models/region';
import {OpaqueToken} from 'angular2/core';

interface SettingsDAO {
    /**
     * Gets a list of the IDs the saved teams
     * List will have no duplicates
     */
    getSavedTeamIDs(): Promise<String[]>;

    /**
     * Gets the team objects corresponding to the save team IDs
     * Only the ID should be stored here
     */
    getSavedTeams(): Promise<Team[]>;

    /**
     * @function saveTeam
     * @desc Saves a team as a favorite.
     * If team already saved, does no-op to prevent duplicates
     * @param {String} team - unique ID for team
     */
    saveTeam(team: String): Promise<void>;

    /**
     * Removes a team from favorites.
     * Checks all items so will remove all if there are duplicates
     * @param {String} team - unique ID of team to remove
     */
    unSaveTeam(team: String): Promise<void>;

    /**
     * Checks if team is saved
     * @param {String} team - unique ID of team
     */
    isTeamSaved(team: String): Promise<boolean>;

    /**
     * Removes all teams from saved list
     */
    clearSavedTeams(): Promise<void>;

    /**
     * Gets the saved region number
     * Only use this function if just need the Region.number value
     * @returns the region number
     */
    getRegionNumber(): Promise<Number>;

    /**
     * Gets the saved region object.
     * Use this if using the region itself
     * @returns Region object for the saved region
     */
    getRegion(): Promise<Region>;

    /**
     * @function setRegion
     * @desc Persists the current region to configuration
     * @param {String} region - the region ID
     */
    setRegion(region: Number): Promise<void>;

    /**
     * Perform any backend initialization
     * If not required should be no-op
     * If `isAppConfigured()===true`, should be no-op
     */
    init(): Promise<void>;

    /**
     * Returns if all required settings are present
     * @required `region` - user's home region
     * This must be synchronous, since it's used for the route interceptor
     */
    isAppConfigured(): boolean;

    /**
     * Clear all saved settings
     * After call, `isAppConfigured()` should return false
     */
    reset(): Promise<void>;
}

var SettingsDAO = new OpaqueToken('SettingsDAO');
export {SettingsDAO as default, SettingsDAO, Region, Team};
