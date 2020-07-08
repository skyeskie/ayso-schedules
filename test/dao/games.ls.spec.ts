import { async, TestBed } from '@angular/core/testing';

import { GamesDAO, LocalStorageGamesService } from '../../src/dao/ls/games.ls.service';
import Game from '../../src/models/game';
import { IBackend, StaticInitializationService } from '../../src/service/backend/static.backend';
import { ILocalStorage, LS_KEYS } from '../../src/service/local-storage.interface';
import { gamesInterfaceSpec } from '../interfaces/games.spec.i';
import { MockLocalStorage, MOCK_LOCAL_STORAGE_PROVIDER } from '../mocks/local-storage.mock';

describe('DAO: GamesLocalStorage', () => {
    let dao: LocalStorageGamesService;
    let lsMock: ILocalStorage;
    let init: StaticInitializationService;

    const daoProviders = [
        MOCK_LOCAL_STORAGE_PROVIDER,
        LocalStorageGamesService,
        { provide: GamesDAO, useExisting: LocalStorageGamesService },
        StaticInitializationService,
        { provide: IBackend, useExisting: StaticInitializationService },
    ];

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: daoProviders,
        });

        init = TestBed.inject(StaticInitializationService);
        lsMock = TestBed.inject<ILocalStorage>(ILocalStorage);
        dao = TestBed.inject(LocalStorageGamesService);
    });

    gamesInterfaceSpec();

    describe('(ls)', () => {
        it('runs init with empty string saved', async(() => {
                lsMock.setItem(LS_KEYS.GAMES_CACHE, '');

                init.getGames()
                    .then((games: Game[]) => dao.add(games))
                    .then(() => dao.findGames())
                    .then((games: Game[]) => {
                        expect(games).toBeNonEmptyArray();
                        expect(games).toBeArrayOfSize(init.games.length);
                    });
            },
        ));

        it('parses saved teams from JSON', async(() => {
                lsMock.setItem(LS_KEYS.GAMES_CACHE, init.gamesJSON);

                init.getGames()
                    .then((games: Game[]) => {
                        console.log('Adding games');
                        console.log(games);
                        dao.add(games);
                    })
                    .then(() => dao.findGames())
                    .then((games: Game[]) => {
                        expect(games).toBeArrayOfSize(init.games.length);
                        // TODO: Make sure matches
                    });
            },
        ));

        // TODO: Store times as UTC? Not stable otherwise
        xit('saves teams as JSON', async(() => {
            init.getGames()
               .then((games: Game[]) => dao.add(games))
               .then(() => dao.findGames())
               .then((games: Game[]) => {
                   expect(games).toBeArrayOfSize(init.games.length);
                   console.log('saves teams as JSON checks');
                   console.log((lsMock as MockLocalStorage).localStore);
                   console.log(init.gamesJSON);
                   expect(lsMock.getItem(LS_KEYS.GAMES_CACHE)).toEqual(init.gamesJSON);
               });
        }));
    });
});
