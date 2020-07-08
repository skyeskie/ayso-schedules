import { InjectionToken } from '@angular/core';

import Division from '../models/division';
import Game from '../models/game';
import Gender from '../models/gender';

interface GamesInterface {
    /**
     * Lookup a single game
     * @param id - Game ID
     * @returns Promise<Game[]>
     */
    getGame(id: string): Promise<Game>;

    /**
     * Lookup games for a week
     * Note: default region is used
     * @param week - numeric
     * - Implementations may check for valid week or
     *   resolve to empty array
     * @param region - optionally limit to specific region
     * @returns Promise<Game[]>
     */
    findByWeek(week: number, region?: number): Promise<Game[]>;

    findGames(regionID?: number, ageGroup?: string, gender?: string, week?: number): Promise<Game[]>;

    /**
     * Lookup all games for a single team
     * @param teamID - ID found in TeamsDAO
     * @returns Promise<Game[]>
     */
    findForTeam(teamID: string): Promise<Game[]>;

    /**
     * Lookup all games for a single team
     * @param teamIDs - Array of team IDs
     * @returns Promise<Game[]>
     */
    findForTeams(teamIDs: string[]): Promise<Game[]>;

    /**
     * Clears all saved data.
     * Promise is returned for chaining actions
     */
    clear(): Promise<void>;

    add(games: Game[]): Promise<any>;
}

const GamesDAO = new InjectionToken<GamesInterface>('GamesInterface');
export { GamesDAO, GamesInterface, Game, Division, Gender };
