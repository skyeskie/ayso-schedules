import { TestBed } from '@angular/core/testing';

import { GamesDAO, InMemoryGamesService } from '../../src/dao/mem/games.mem.service';
import { IBackend, StaticInitializationService } from '../../src/service/backend/static.backend';
import { gamesInterfaceSpec } from '../interfaces/games.spec.i';

let dao: InMemoryGamesService;
let init: StaticInitializationService;

describe('DAO: GamesMock', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                InMemoryGamesService,
                { provide: GamesDAO, useExisting: InMemoryGamesService },
                StaticInitializationService,
                { provide: IBackend, useExisting: StaticInitializationService },
            ],
        });

        dao = TestBed.inject(InMemoryGamesService);
        init = TestBed.inject(StaticInitializationService);
    });

    gamesInterfaceSpec();
});
