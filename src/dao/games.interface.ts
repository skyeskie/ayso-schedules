import {Injectable} from 'angular2/core';
import Game from "../models/game";
import Division from "../models/division";
import Gender from "../cfg/gender";

interface GamesDAO {
    getGame(id: String): Promise<Game>;

    findByWeek(week: Number): Promise<Game[]>;

    findGames(regionID: String, division: Division): Promise<Game[]>;

    findForTeam(teamID: String): Promise<Game[]>;

    findForTeams(teamIDs: String[]): Promise<Game[]>;
}

export default GamesDAO;
