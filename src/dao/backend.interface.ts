import { InjectionToken } from '@angular/core';

import Game from '../models/game';
import Team from '../models/team';

import { SettingsDataType } from './settings.interface';

/**
 * Interface for DAOs to load initial data for saving to local storage
 * Needed for
 */
interface IBackend {
    /**
     * Does any necessary setup for backend requests. Update params mean subsequent
     * calls to `getTeams()` and `getGames()` are update requests. Otherwise request
     * is for full data and functions will return entire data
     *
     * @param curVersion - string version for current data version
     * - Exact use depends on backend implementation
     */
    init(curVersion?: string): Promise<any>;

    getDataVersion(): Promise<string>;

    getTeams(): Promise<Team[]>;
    getGames(): Promise<Game[]>;

    /**
     * Used to provide initial settings.
     * @return SettingsDataType - settings with defaults
     * @return null - don't initialize any settings
     * - By default, region is selected and favorite teams is blank
     */
    getSettings(): Promise<SettingsDataType>;

    /**
     * @return Date[] - Full initialization; sets week cache with values
     * @return empty array - Keep existing week cache
     * @return null - Have the `DataControlService` handle the week cache
     */
    getWeekStarts(): Promise<Date[]>;
}

const IBackend = new InjectionToken('IBackend');
export { IBackend as default, IBackend };
