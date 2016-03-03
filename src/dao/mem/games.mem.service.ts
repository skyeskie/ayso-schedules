import {Component, OnInit, Inject, Optional} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';

import GamesDAO, { Game, Division } from '../games.interface';
import Region from '../../models/region';
import {checkPresent} from '../../app/util';
import {IBackend} from '../init/backend.interface.ts';
import {ClassLogger, Logger, Level} from '../../service/log.decorator';

class InMemoryGamesService implements GamesDAO {
    @ClassLogger public log:Logger;
    private games: Game[] = [];

    getGame(id: string): Promise<Game> {
        return new Promise<Game>((resolve:any, reject:any) => {
                let match = this.games.filter((game:Game) => game.id === id);
                if(match.length === 0) {
                    reject(new RangeError('Game not found for id: ' + id));
                }
                resolve(match[0]);
            });
    }

    findByWeek(week: number, region?: number): Promise<Game[]> {
        return this.findGames(region, null, null, week);
    }

    findGames(regionNum?:number, ageGroup?:string, gender?:string, week?:number): Promise<Game[]> {
        return Promise.resolve(this.games.filter((game:Game) => {
            if(checkPresent(week) && week !== game.weekNum) {
                return false;
            }

            if(checkPresent(regionNum) && regionNum !== game.region) {
                return false;
            }

            if(checkPresent(ageGroup) && ageGroup !== game.divis.age.toString()) {
                return false;
            }

            return !(checkPresent(gender) && gender !== game.divis.gender.long);
        }));
    }

    findForTeam(teamID: string): Promise<Game[]> {
        return this.findForTeams([teamID]);
    }

    findForTeams(teamIDs: string[]): Promise<Game[]> {
        let teams = new Set<string>(teamIDs);
        return Promise.resolve(
            this.games.filter((game:Game) => teams.has(game.homeTeam) || teams.has(game.awayTeam))
        );
    }

    clear(): Promise<void> {
        this.games = [];
        return Promise.resolve();
    }

    add(newGames:Game[]): Promise<any> {
        let gameSet:Set<Game> = new Set<Game>();
        newGames.forEach((game:Game) => gameSet.add(game));
        this.games.forEach((game:Game) => gameSet.add(game));
        this.games = [];
        gameSet.forEach((game:Game) => this.games.push(game));
        return Promise.resolve(this.games.length);
    }
}

export { InMemoryGamesService as default, InMemoryGamesService, GamesDAO }
