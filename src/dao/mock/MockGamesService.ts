import {Component, OnInit} from 'angular2/core';
import {Router} from 'angular2/router';
import {RouteParams} from "angular2/router";
import GamesDAO, { Game, Division } from '../games.interface';
import Region from '../../models/region';
import {checkPresent} from '../../app/util';


export default class MockGamesService implements GamesDAO {
    public time1a:Date = new Date(2016, 2, 1, 8);
    public time1b:Date = new Date(2016, 2, 1, 10);
    public time2c:Date = new Date(2016, 2, 8, 12);

    public games: Game[] = [
        new Game('111', 'A','B', 1, this.time1a, '49', 'map', Division.fromString('U10B')),
        new Game('112','C','D', 1, this.time1a, '49', 'map2', Division.fromString('U10B')),
        new Game('121','A','C', 1, this.time1b, '49', 'map', Division.fromString('U10B')),
        new Game('122','B','D', 1, this.time1b, '49', 'map2', Division.fromString('U10B')),
        new Game('231','A','D', 2, this.time2c, '208', 'map', Division.fromString('U10B')),
        new Game('232','C','B', 2, this.time2c, '208', 'map2', Division.fromString('U10B'))
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

                if(checkPresent(gender) && gender !== game.divis.gender.long) {
                    return false;
                }

                return true;
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

    reset(): void {

    }

    update(force: boolean): void {

    }
}
