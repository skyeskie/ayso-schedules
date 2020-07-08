import { TestBed } from '@angular/core/testing';

import { InMemorySettingsService, SettingsDAO } from '../../src/dao/mem/settings.mem.service';
import { InMemoryTeamsService, TeamsDAO } from '../../src/dao/mem/teams.mem.service';
import { IBackend, StaticInitializationService } from '../../src/service/backend/static.backend';
import { settingsInterfaceSpec } from '../interfaces/settings.spec.i';

let dao: InMemorySettingsService;
let init: StaticInitializationService;

describe('DAO: SettingsMock', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                InMemorySettingsService,
                { provide: SettingsDAO, useExisting: InMemorySettingsService },
                { provide: TeamsDAO, useClass: InMemoryTeamsService },
                StaticInitializationService,
                { provide: IBackend,  useExisting: StaticInitializationService },
            ],
        });

        dao = TestBed.inject(InMemorySettingsService);
        init = TestBed.inject(StaticInitializationService);
    });

    settingsInterfaceSpec();
});
