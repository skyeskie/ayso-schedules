import {Component, OnInit, Inject, Optional} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';

import GamesDAO, { Game, Division } from '../games.interface';
import Region from '../../models/region';
import {checkPresent} from '../../app/util';
import {IInitializationService} from '../init/initialization.interface';
import {ClassLogger, Logger, Level} from '../../service/log.decorator';
import {ILocalStorage} from './local-storage.interface';

const SAVED_GAMES_KEY = 'ayso-games';

class LocalStorageGamesService implements GamesDAO {
    @ClassLogger public log:Logger;

    public initialized: boolean;
    protected initializePromise: Promise<any> = null;
    protected games: Game[] = [];

    constructor(
        @Inject(ILocalStorage)
        protected client: ILocalStorage,
        @Optional()
        @Inject(IInitializationService)
        protected initializer: IInitializationService
    ) {
        let games = this.loadGames();

        if(games === null) {
            this.initialized = false;
            this.initializePromise = this.init();
        } else {
            this.games = games;
            this.initialized = true;
            this.initializePromise = Promise.resolve();
        }
    }

    getGame(id: string): Promise<Game> {
        if(!this.initialized) {
            this.log.debug('Waiting until after init for getGame()');
            return this.initializePromise.then(() => this.getGame(id));
        }

        return new Promise<Game>((resolve:any, reject:any) => {
            let match = this.games.filter((game:Game) => game.id === id);
            if(match.length === 0) {
                reject(new RangeError('Game not found for id: ' + id));
            }
            resolve(match[0]);
        });
    }

    findByWeek(week: number, region?: number): Promise<Game[]> {
        if(!this.initialized) {
            this.log.debug('Waiting until after init for findByWeek()');
            return this.initializePromise.then(() => this.findByWeek(week, region));
        }

        return Promise.resolve(
            this.games.filter((game:Game) => game.weekNum === week)
                .filter((game:Game) => isNaN(region) //Only filter region if have filter
                    || game.region === null //Byes might have null region
                    || region === Number.parseInt(game.region.toString(), 10)
                )
        );
    }

    findGames(regionNum?:number, ageGroup?:string, gender?:string, week?:number): Promise<Game[]> {
        if(!this.initialized) {
            this.log.debug('Waiting until after init for findGames()');
            return this.initializePromise.then(() => this.findGames(regionNum, ageGroup, gender, week));
        }

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
        if(!this.initialized) {
            this.log.debug('Waiting until after init for findForTeam()');
            return this.initializePromise.then(() => this.findForTeam(teamID));
        }

        return this.findForTeams([teamID]);
    }

    findForTeams(teamIDs: string[]): Promise<Game[]> {
        if(!this.initialized) {
            this.log.debug('Waiting until after init for findForTeams()');
            return this.initializePromise.then(() => this.findForTeams(teamIDs));
        }

        let teams = new Set<string>(teamIDs);
        return Promise.resolve(
            this.games.filter((game:Game) => teams.has(game.homeTeam) || teams.has(game.awayTeam))
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
        return this.initializer.getGames().then((res:Game[]) => {
            this.games = res;
            this.persistGames();
            this.initialized = true;
        });
    }

    clear(): Promise<void> {
        this.games = [];
        return Promise.resolve();
    }

    update(): Promise<number> {
        return this.initializer.getGameUpdates().then((updates:Game[]) => {
            let gameSet:Set<Game> = new Set<Game>();
            updates.forEach((game:Game) => gameSet.add(game));
            this.games.forEach((game:Game) => gameSet.add(game));
            this.games = [];
            gameSet.forEach((game:Game) => this.games.push(game));
            this.persistGames();
            return Promise.resolve(this.games.length);
        });
    }

    private persistGames() {
        this.client.setItem(SAVED_GAMES_KEY, JSON.stringify(this.games));
    }

    private loadGames(): Game[] {
        let savedString = this.client.getItem(SAVED_GAMES_KEY);
        if(typeof savedString === 'string' && savedString.length > 0) {
            return JSON.parse(savedString, (key, value) => {
                if(key === 'startTime') {
                    return Date.parse(value);
                }
                if(key === 'divis') {
                    return Division.fromString(value);
                }
                if(!isNaN(parseInt(key,10))) {
                    return new Game(value.id, value.homeTeam, value.awayTeam,
                        value.weekNum, value.startTime, value.region, value.field, value.divis);
                }
                return value;
            });
        }
        return null;
    }
}

export { LocalStorageGamesService as default, LocalStorageGamesService, GamesDAO }
