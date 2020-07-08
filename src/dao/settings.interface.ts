import { InjectionToken } from '@angular/core';

import Region from '../models/region';
import Team from '../models/team';

type SettingsDataType = {
    regionNumber?: number,
    savedTeams?: string[],
};

interface SettingsInterface {
    /**
     * Gets a list of the IDs the saved teams
     * List will have no duplicates
     */
    getSavedTeamIDs(): Promise<string[]>;

    /**
     * Gets the team objects corresponding to the save team IDs
     * Only the ID should be stored here
     */
    getSavedTeams(): Promise<Team[]>;

    /**
     * @desc Saves a team as a favorite.
     * If team already saved, does no-op to prevent duplicates
     * @param team - unique ID for team
     */
    saveTeam(team: string): Promise<void>;

    /**
     * Removes a team from favorites.
     * Checks all items so will remove all if there are duplicates
     * @param team - unique ID of team to remove
     */
    unSaveTeam(team: string): Promise<void>;

    /**
     * Checks if team is saved
     * @param team - unique ID of team
     */
    isTeamSaved(team: string): Promise<boolean>;

    /**
     * Removes all teams from saved list
     */
    clearSavedTeams(): Promise<void>;

    /**
     * Gets the saved region number
     * Only use this function if just need the Region.number value
     * @returns the region number
     */
    getRegionNumber(): Promise<number>;

    /**
     * Gets the saved region object.
     * Use this if using the region itself
     * @returns Region object for the saved region
     */
    getRegion(): Promise<Region>;

    /**
     * @desc Persists the current region to configuration
     * @param region - the region ID
     */
    setRegion(region: number): Promise<void>;

    /**
     * Perform any backend initialization
     * If not required should be no-op
     * If `isAppConfigured()===true`, should be no-op
     */
    init(data: SettingsDataType): Promise<void>;

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

const SettingsDAO = new InjectionToken<SettingsInterface>('SettingsInterface');
export { SettingsInterface, SettingsDAO, Region, Team };
export type { SettingsDataType };
