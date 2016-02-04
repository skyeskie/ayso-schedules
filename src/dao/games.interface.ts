import {Injectable} from 'angular2/core';
import Game from "../models/game";
import Division from "../models/division";
import Gender from "../cfg/gender";
import {OpaqueToken} from 'angular2/core';

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

    findGames(regionID:Number, division:Division, week:Number): Promise<Game[]>;

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

    //Note: might need to change these to
    //      trivial promise, allowing to be chained
    /**
     * Hook to do a full reset of the DAO
     * Must reset DAO to first load
     */
    reset(): void;

    /**
     * Hook to have DAO update itself from backend
     * @param force - true if always check for updates
     *  - otherwise, may use caching
     */
    update(force: boolean): void;
}

var GamesDAO = new OpaqueToken("GamesDAO");
export { GamesDAO as default, GamesDAO, Game, Division, Gender }
