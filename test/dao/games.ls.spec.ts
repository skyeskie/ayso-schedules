import { describe, beforeEachProviders } from 'angular2/testing';
import {provide} from 'angular2/core';
import {gamesInterfaceSpec} from '../interfaces/games.spec.i';
import {LocalStorageGamesService} from '../../src/dao/ls/games.ls.service';
import {StaticInitializationService, IBackend} from '../../src/dao/init/static.init.service';
import {MOCK_LOCAL_STORAGE_PROVIDER} from '../mocks/local-storage.mock';

describe('DAO: GamesLocalStorage', () => {
    beforeEachProviders(() => [
        LocalStorageGamesService,
        provide(IBackend, { useClass: StaticInitializationService }),
        MOCK_LOCAL_STORAGE_PROVIDER,
    ]);

    gamesInterfaceSpec(LocalStorageGamesService);
});
