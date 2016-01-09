import {Injectable} from 'angular2/core';
import Game from "../models/game";
import Division from "../models/division";
import Gender from "../cfg/gender";

interface GamesDAO {
    getGame(id: String): Promise<Game>;

    findByWeek(week: Number): Promise<Game[]>;

    findGames(regionID:Number, division:Division, week:Number): Promise<Game[]>;

    findForTeam(teamID: String): Promise<Game[]>;

    findForTeams(teamIDs: String[]): Promise<Game[]>;

    reset(): void;

    update(force: boolean): void;
}

export { GamesDAO as default, GamesDAO, Game, Division, Gender }
