import { Injectable } from '@angular/core';

import { ILocalStorage, LS_KEYS } from '../../service/local-storage.interface';
import { ClassLogger, Logger } from '../../service/log.decorator';
import { Division, Game, GamesDAO } from '../games.interface';
import { InMemoryGamesService } from '../mem/games.mem.service';

@Injectable()
class LocalStorageGamesService extends InMemoryGamesService {
    @ClassLogger() public log: Logger;

    constructor(
        protected client: ILocalStorage,
    ) {
        super();
        this.loadGames();
    }

    clear(): Promise<void> {
        return super.clear().then(() => {
            this.client.removeItem(LS_KEYS.GAMES_CACHE);
        });
    }

    add(newGames: Game[]): Promise<any> {
        return super.add(newGames).then((len: number) => {
            this.persistGames();
            return len;
        });
    }

    private persistGames(): void {
        this.log.debug('Saving games', this.games);
        const gameArray = [];
        const i = this.games.values();
        for (let game: IteratorResult<Game> = i.next(); !game.done; game = i.next()) {
            this.log.trace('Saving game', game.value);
            gameArray.push(game.value);
        }
        this.client.setItem(LS_KEYS.GAMES_CACHE, JSON.stringify(gameArray));
    }

    private loadGames(): void {
        const savedString = this.client.getItem(LS_KEYS.GAMES_CACHE);
        if (typeof savedString === 'string' && savedString.length > 0) {
            this.games.clear();
            JSON.parse(savedString, (key, value) => {
                if (key === 'startTime') {
                    return new Date(value);
                }
                if (key === 'divis') {
                    return Division.fromString(value);
                }
                if (!isNaN(parseInt(key, 10))) {
                    this.games.set(value.id,
                        new Game(value.id, value.homeTeam, value.awayTeam,
                            value.weekNum, value.startTime,
                            value.region, value.field, value.divis),
                    );
                }
                return value;
            });
        }
    }
}

const LOCAL_STORAGE_GAME_DAO_PROVIDER = { provide: GamesDAO, useClass: LocalStorageGamesService };

export { LOCAL_STORAGE_GAME_DAO_PROVIDER, LocalStorageGamesService, GamesDAO };
