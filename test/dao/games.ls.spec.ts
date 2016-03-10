import { describe, beforeEachProviders, injectAsync, it, xit } from 'angular2/testing';
import {provide} from 'angular2/core';
import {gamesInterfaceSpec} from '../interfaces/games.spec.i';
import {LocalStorageGamesService} from '../../src/dao/ls/games.ls.service';
import {StaticInitializationService, IBackend} from '../../src/service/backend/static.backend';
import {MOCK_LOCAL_STORAGE_PROVIDER, MockLocalStorage} from '../mocks/local-storage.mock';
import {LS_KEYS} from '../../src/service/local-storage.interface';
import Game from '../../src/models/game';

describe('DAO: GamesLocalStorage', () => {
    beforeEachProviders(() => [
        LocalStorageGamesService,
        provide(IBackend, { useClass: StaticInitializationService }),
        MOCK_LOCAL_STORAGE_PROVIDER,
    ]);

    gamesInterfaceSpec(LocalStorageGamesService);

    describe('(ls)', () => {
        beforeEachProviders(() => [
            StaticInitializationService,
            MockLocalStorage,
        ]);

        it('runs init with empty string saved', injectAsync([MockLocalStorage, StaticInitializationService],
            (mock:MockLocalStorage, init) => {
                mock.setItem(LS_KEYS.GAMES_CACHE, '');
                let dao = new LocalStorageGamesService(mock);
                return init.getGames()
                           .then((games:Game[]) => dao.add(games))
                           .then(() => dao.findGames())
                           .then((games:Game[]) => {
                               expect(games).toBeNonEmptyArray();
                               expect(games).toBeArrayOfSize(init.games.length);
                           });
            }
        ));

        it('parses saved teams from JSON', injectAsync([MockLocalStorage, StaticInitializationService],
            (mock:MockLocalStorage, init) => {
                mock.setItem(LS_KEYS.GAMES_CACHE, init.gamesJSON);
                let dao = new LocalStorageGamesService(mock);
                return dao.findGames().then((games:Game[]) => {
                    expect(games).toBeArrayOfSize(init.games.length);
                    //TODO: Make sure matches
                });
            }
        ));

        it('saves teams as JSON', injectAsync([MockLocalStorage, StaticInitializationService],
            (mock:MockLocalStorage, init:StaticInitializationService) => {
                let dao = new LocalStorageGamesService(mock);
                return init.getGames()
                           .then((games:Game[]) => {
                               console.log('Adding games');
                               console.log(games);
                               dao.add(games);
                           })
                           .then(() => dao.findGames())
                           .then((games:Game[]) => {
                               expect(games).toBeArrayOfSize(init.games.length);
                               console.log('saves teams as JSON checks');
                               console.log(mock.localStore);
                               console.log(mock.getItem(LS_KEYS.GAMES_CACHE));
                               expect(mock.getItem(LS_KEYS.GAMES_CACHE)).toEqual(init.gamesJSON);
                           });
            }
        ));
    });
});
