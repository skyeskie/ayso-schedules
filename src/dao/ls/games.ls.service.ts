import {Component, OnInit, Inject, Optional} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';

import GamesDAO, { Game, Division } from '../games.interface';
import Region from '../../models/region';
import {checkPresent} from '../../app/util';
import {IBackend} from '../init/backend.interface.ts';
import {ClassLogger, Logger, Level} from '../../service/log.decorator';
import {ILocalStorage} from './local-storage.interface';
import {InMemoryGamesService} from '../mem/games.mem.service';
import {LS_KEYS} from './local-storage.interface';

class LocalStorageGamesService extends InMemoryGamesService {
    @ClassLogger() public log:Logger;

    constructor(
        @Inject(ILocalStorage)
        protected client: ILocalStorage
    ) {
        super();
        this.loadGames();
    }

    clear(): Promise<void> {
        return super.clear().then(() => this.persistGames());
    }

    add(newGames:Game[]): Promise<any> {
        return super.add(newGames).then((len:number) => {
            this.persistGames();
            return len;
        });
    }

    private persistGames() {
        this.log.debug('Saving games', this.games);
        let gameArray = [];
        let i = this.games.values();
        for(let game:IteratorResult<Game> = i.next(); !game.done; game = i.next()) {
            this.log.trace('Saving game', game.value);
            gameArray.push(game.value);
        }
        this.client.setItem(LS_KEYS.GAMES_CACHE, JSON.stringify(gameArray));
    }

    private loadGames(): void {
        let savedString = this.client.getItem(LS_KEYS.GAMES_CACHE);
        if(typeof savedString === 'string' && savedString.length > 0) {
            this.games.clear();
            JSON.parse(savedString, (key, value) => {
                if(key === 'startTime') {
                    return new Date(value);
                }
                if(key === 'divis') {
                    return Division.fromString(value);
                }
                if(!isNaN(parseInt(key,10))) {
                    this.games.set(value.id,
                        new Game(value.id, value.homeTeam, value.awayTeam,
                            value.weekNum, value.startTime,
                            value.region, value.field, value.divis)
                    );
                }
                return value;
            });
        }
    }
}

export { LocalStorageGamesService as default, LocalStorageGamesService, GamesDAO }
