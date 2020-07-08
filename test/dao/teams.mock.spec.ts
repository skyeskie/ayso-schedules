import { TestBed } from '@angular/core/testing';

import { InMemoryTeamsService, TeamsDAO } from '../../src/dao/mem/teams.mem.service';
import { IBackend, StaticInitializationService } from '../../src/service/backend/static.backend';
import { teamsInterfaceSpec } from '../interfaces/teams.spec.i';

let dao: InMemoryTeamsService;
let init: StaticInitializationService;

describe('DAO: TeamsMock', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                InMemoryTeamsService,
                { provide: TeamsDAO, useExisting: InMemoryTeamsService },
                StaticInitializationService,
                { provide: IBackend, useExisting: StaticInitializationService },
            ],
        });

        dao = TestBed.inject(InMemoryTeamsService);
        init = TestBed.inject(StaticInitializationService);
    });

    teamsInterfaceSpec();
});
