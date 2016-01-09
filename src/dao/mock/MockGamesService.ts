import {Component, OnInit} from 'angular2/core';
import {Router} from 'angular2/router';
import {RouteParams} from "angular2/router";
import GamesDAO, { Game, Division } from '../games.interface';
import Region from '../../models/region';


export default class MockGamesService implements GamesDAO {
    public time:Date = new Date();
    public game1 = new Game('id','away','home', 1, this.time, 'R00', 'map');
    public game2 = new Game('id2','away2','home2',2, this.time, 'R02', 'map2');
    public games: Game[] = [this.game1, this.game1];

    getGame(id: String): Promise<Game> {
        return new Promise<Game>(resolve =>
            resolve(this.game1)
        );
    }

    findByWeek(week: Number): Promise<Game[]> {
        return new Promise<Game[]>(resolve =>
            resolve(this.games)
        );
    }

    findGames(regionID:Number, division:Division, week:Number): Promise<Game[]> {
        return new Promise<Game[]>(resolve =>
            resolve(this.games)
        );
    }

    findForTeam(teamID: String): Promise<Game[]> {
        return new Promise<Game[]>(resolve =>
            resolve(this.games)
        );
    }

    findForTeams(teamIDs: String[]): Promise<Game[]> {
        return new Promise<Game[]>(resolve =>
            resolve(this.games)
        );
    }

    reset(): void {

    }

    update(force: boolean): void {

    }
}
