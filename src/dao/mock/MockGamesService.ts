import {Component, OnInit} from 'angular2/core';
import {Router} from 'angular2/router';
import {RouteParams} from "angular2/router";
import GamesDAO, { Game, Division } from '../games.interface';
import Region from '../../models/region';


export default class MockGamesService implements GamesDAO {
    public time1a:Date = new Date(2016, 2, 1, 8);
    public time1b:Date = new Date(2016, 2, 1, 10);
    public time2c:Date = new Date(2016, 2, 8, 12);

    public games: Game[] = [
        new Game('111', 'A','B', 1, this.time1a, 'R00', 'map'),
        new Game('112','C','D', 1, this.time1a, 'R00', 'map2'),
        new Game('121','A','C', 1, this.time1b, 'R00', 'map'),
        new Game('122','B','D', 1, this.time1b, 'R02', 'map2'),
        new Game('231','A','D', 2, this.time2c, 'R02', 'map'),
        new Game('232','C','B', 2, this.time2c, 'R02', 'map2')
    ];

    getGame(id: String): Promise<Game> {
        return new Promise<Game>((resolve,reject) => {
                let match = this.games.filter(game => game.id === id);
                if(match.length === 0) {
                    reject(new RangeError('Game not found for id: ' + id));
                }
                resolve(match[0]);
            });
    }

    findByWeek(week: Number): Promise<Game[]> {
        return new Promise<Game[]>(resolve =>
            resolve(this.games.filter((game) => game.weekNum === week))
        );
    }

    findGames(regionID:Number, division:Division, week:Number): Promise<Game[]> {
        return new Promise<Game[]>(resolve =>
            resolve(this.games)
        );
    }

    findForTeam(teamID: String): Promise<Game[]> {
        return this.findForTeams([teamID]);
    }

    findForTeams(teamIDs: String[]): Promise<Game[]> {
        let teams = new Set<String>(teamIDs);
        return new Promise<Game[]>(resolve =>
            resolve(this.games.filter(
                game => teams.has(game.homeTeam) || teams.has(game.awayTeam)
            ))
        );
    }

    reset(): void {

    }

    update(force: boolean): void {

    }
}
