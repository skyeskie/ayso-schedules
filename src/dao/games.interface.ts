import {OpaqueToken} from 'angular2/core';
import Game from '../models/game';
import Division from '../models/division';
import Gender from '../models/gender';

interface GamesDAO {
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
     * @returns Promise<Game[]>
     */
    findByWeek(week: number, region?: number): Promise<Game[]>;

    findGames(regionID?:number, ageGroup?:string, gender?:string, week?:number): Promise<Game[]>;

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

var GamesDAO = new OpaqueToken('GamesDAO');
export { GamesDAO as default, GamesDAO, Game, Division, Gender }
