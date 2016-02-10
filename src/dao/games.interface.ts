import {Injectable} from 'angular2/core';
import Game from '../models/game';
import Division from '../models/division';
import Gender from '../cfg/gender';
import {OpaqueToken} from 'angular2/core';
import {AgeGroup} from '../models/ageGroup';

interface GamesDAO {
    /**
     * Lookup a single game
     * @param id - Game ID
     * @returns Promise<Game[]>
     */
    getGame(id: String): Promise<Game>;

    /**
     * Lookup games for a week
     * Note: default region is used
     * @param week - numeric
     * - Implementations may check for valid week or
     *   resolve to empty array
     * @returns Promise<Game[]>
     */
    findByWeek(week: Number): Promise<Game[]>;

    findGames(regionID:Number, ageGroup:String, gender:String, week:Number): Promise<Game[]>;

    /**
     * Lookup all games for a single team
     * @param teamID - ID found in TeamsDAO
     * @returns Promise<Game[]>
     */
    findForTeam(teamID: String): Promise<Game[]>;

    /**
     * Lookup all games for a single team
     * @param teamIDs - Array of team IDs
     * @returns Promise<Game[]>
     */
    findForTeams(teamIDs: String[]): Promise<Game[]>;

    /**
     * Initializes data store with data
     * If data store is Read-Only, this should be a no-op
     * @param games - Either array or ID->Game map of all games to enter
     *
     *  Optionally, implementation may return init details in promise
     */
    init(games: Game[]): Promise<any>;

    /**
     * Clears all saved data.
     * Promise is returned for chaining actions
     */
    clear(): Promise<void>;

    /**
     * Hook to have DAO update itself from backend
     * @param updates - map of ID to updates
     *  - Will overwrite provided IDs
     *  - If `null` is provided game, delete entry
     * @param force - true if always check for updates
     *  - otherwise, may use caching
     *
     *  Optionally, implementation may return update details in promise
     */
    update(updates:Map<String,Game>, force?:Boolean): Promise<any>;
}

var GamesDAO = new OpaqueToken('GamesDAO');
export { GamesDAO as default, GamesDAO, Game, Division, Gender }
