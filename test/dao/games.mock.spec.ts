import { describe, beforeEachProviders } from 'angular2/testing';
import {provide} from 'angular2/core';

import {gamesInterfaceSpec} from '../interfaces/games.spec.i';
import {InMemoryGamesService} from '../../src/dao/mem/games.mem.service';
import {StaticInitializationService, IBackend} from '../../src/service/backend/static.backend';

describe('DAO: GamesMock', () => {
    beforeEachProviders(() => [
        InMemoryGamesService,
        provide(IBackend, { useClass: StaticInitializationService }),
    ]);

    gamesInterfaceSpec(InMemoryGamesService);
});
