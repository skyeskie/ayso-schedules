import {Component, OnInit, Inject, Optional} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';

import GamesDAO, { Game, Division } from '../games.interface';
import Region from '../../models/region';
import {checkPresent} from '../../app/util';
import {IInitializationService} from '../init/initialization.interface';
import {ClassLogger, Logger, Level} from '../../service/log.decorator';

class InMemoryGamesService implements GamesDAO {
    @ClassLogger public log:Logger;

    public initialized = false;
    private initializePromise: Promise<any> = null;
    private games: Game[] = [];

    constructor(
        @Optional()
        @Inject(IInitializationService)
        private initializer: IInitializationService
    ) {
        this.initializePromise = this.init();
    }

    getGame(id: String): Promise<Game> {
        if(!this.initialized) {
            this.log.debug('Waiting until after init for getGame()');
            return this.initializePromise.then(() => this.getGame(id));
        }

        return new Promise<Game>((resolve,reject) => {
                let match = this.games.filter(game => game.id === id);
                if(match.length === 0) {
                    reject(new RangeError('Game not found for id: ' + id));
                }
                resolve(match[0]);
            });
    }

    findByWeek(week: Number, region?: number): Promise<Game[]> {
        if(!this.initialized) {
            this.log.debug('Waiting until after init for findByWeek()');
            return this.initializePromise.then(() => this.findByWeek(week, region));
        }

        return Promise.resolve(
            this.games.filter((game:Game) => game.weekNum === week)
                .filter((game:Game) => isNaN(region) || region === Number.parseInt(game.region.toString(), 10))
        );
    }

    findGames(regionNum?:Number, ageGroup?:String, gender?:String, week?:Number): Promise<Game[]> {
        if(!this.initialized) {
            this.log.debug('Waiting until after init for findGames()');
            return this.initializePromise.then(() => this.findGames(regionNum, ageGroup, gender, week));
        }

        return Promise.resolve(this.games.filter((game:Game) => {
            if(checkPresent(week) && week !== game.weekNum) {
                return false;
            }

            if(checkPresent(regionNum) && regionNum.toString() !== game.region) {
                return false;
            }

            if(checkPresent(ageGroup) && ageGroup !== game.divis.age.code.toString()) {
                return false;
            }

            return !(checkPresent(gender) && gender !== game.divis.gender.long);
        }));
    }

    findForTeam(teamID: String): Promise<Game[]> {
        if(!this.initialized) {
            this.log.debug('Waiting until after init for findForTeam()');
            return this.initializePromise.then(() => this.findForTeam(teamID));
        }

        return this.findForTeams([teamID]);
    }

    findForTeams(teamIDs: String[]): Promise<Game[]> {
        if(!this.initialized) {
            this.log.debug('Waiting until after init for findForTeams()');
            return this.initializePromise.then(() => this.findForTeams(teamIDs));
        }

        let teams = new Set<String>(teamIDs);
        return new Promise<Game[]>(resolve =>
            resolve(this.games.filter(
                game => teams.has(game.homeTeam) || teams.has(game.awayTeam)
            ))
        );
    }

    init(): Promise<any> {
        if(this.initializePromise!==null) {
            //We've already been here
            return this.initializePromise;
        }
        if(this.initializer===null) {
            this.initialized = true;
            return Promise.resolve(0);
        }
        return this.initializer.getGames().then(res => {
            this.games = res;
            this.initialized = true;
        });
    }

    clear(): Promise<void> {
        this.games = [];
        return Promise.resolve();
    }

    update(updates:Map<String,Game>): Promise<Number> {
        return new Promise<Number>(resolve => {
            let gameSet = new Set<Game>();
            updates.forEach(game => gameSet.add(game));
            this.games.forEach(game => gameSet.add(game));
            this.games = [];
            gameSet.forEach(game => this.games.push(game));
            resolve(this.games.length);
        });
    }
}

export { InMemoryGamesService as default, InMemoryGamesService, GamesDAO }
