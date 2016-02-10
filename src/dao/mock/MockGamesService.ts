import {Component, OnInit} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';

import GamesDAO, { Game, Division } from '../games.interface';
import Region from '../../models/region';
import {checkPresent} from '../../app/util';

class MockGamesService implements GamesDAO {
    private games: Game[] = [];

    public prepopulate() {
        let time1a:Date = new Date(2016, 2, 1, 8);
        let time1b:Date = new Date(2016, 2, 1, 10);
        let time2c:Date = new Date(2016, 2, 8, 12);
        this.init([
            new Game('111', 'A','B', 1, time1a, '49', 'map', Division.fromString('U10B')),
            new Game('112','C','D', 1, time1a, '49', 'map2', Division.fromString('U10B')),
            new Game('121','A','C', 1, time1b, '49', 'map', Division.fromString('U10B')),
            new Game('122','B','D', 1, time1b, '49', 'map2', Division.fromString('U10B')),
            new Game('231','A','D', 2, time2c, '208', 'map', Division.fromString('U10B')),
            new Game('232','C','B', 2, time2c, '208', 'map2', Division.fromString('U10B')),
        ]);
    }

    constructor() {
        this.prepopulate();
    }

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

    findGames(regionNum?:Number, ageGroup?:String, gender?:String, week?:Number): Promise<Game[]> {
        return new Promise<Game[]>(resolve =>
            resolve(this.games.filter((game:Game) => {
                if(checkPresent(week) && week !== game.weekNum) {
                    return false;
                }

                if(checkPresent(regionNum) && regionNum.toString() !== game.region) {
                    return false;
                }

                if(checkPresent(ageGroup) && ageGroup !== game.divis.age.code.toString()) {
                    return false;
                }

                return !(checkPresent(gender) && gender !== game.divis.gender.long
                );
            }))
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

    init(games: Game[]): Promise<any> {
        this.games = games;
        return new Promise<void>(resolve => resolve());
    }

    clear(): Promise<void> {
        this.games = [];
        return new Promise<void>(resolve => resolve());
    }

    update(updates:Map<String,Game>): Promise<void> {
        return new Promise<void>(resolve => {
            let gameSet = new Set<Game>();
            updates.forEach(game => gameSet.add(game));
            this.games.forEach(game => gameSet.add(game));
            this.games = [];
            gameSet.forEach(game => this.games.push(game));
            resolve();
        });
    }
}

export { MockGamesService as default, MockGamesService, GamesDAO }
