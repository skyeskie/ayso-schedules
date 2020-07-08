import { async, TestBed } from '@angular/core/testing';

import { LocalStorageSettingsService, LOCAL_STORAGE_SETTINGS_PROVIDER } from '../../src/dao/ls/settings.ls.service';
import { InMemoryTeamsService, ITeamsDAO, TeamsDAO } from '../../src/dao/mem/teams.mem.service';
import { IBackend, StaticInitializationService } from '../../src/service/backend/static.backend';
import { LS_KEYS } from '../../src/service/local-storage.interface';
import { settingsInterfaceSpec } from '../interfaces/settings.spec.i';
import { ILocalStorage, MOCK_LOCAL_STORAGE_PROVIDER } from '../mocks/local-storage.mock';

describe('DAO: LocalStorageSettings', () => {
    let dao: LocalStorageSettingsService;
    let lsMock: ILocalStorage;
    let init: StaticInitializationService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                LocalStorageSettingsService,
                LOCAL_STORAGE_SETTINGS_PROVIDER,
                { provide: TeamsDAO, useClass: InMemoryTeamsService },
                MOCK_LOCAL_STORAGE_PROVIDER,
                StaticInitializationService,
                { provide: IBackend,  useExisting: StaticInitializationService },
            ],
        });

        dao = TestBed.inject(LocalStorageSettingsService);
        lsMock = TestBed.inject<ILocalStorage>(ILocalStorage);
        init = TestBed.inject(StaticInitializationService);
    });

    settingsInterfaceSpec();

    it('Retrieves previously saved data', async(() => {
        lsMock.setItem(LS_KEYS.USER_TEAMS, 'A,B');
        lsMock.setItem(LS_KEYS.MAIN_REGION, '49');

        // Need to re-initialize, since teams read in at construction
        const teamsDAO = TestBed.inject<ITeamsDAO>(TeamsDAO);
        const lsDao = new LocalStorageSettingsService(lsMock, teamsDAO);

        return Promise.all([
            lsDao.getRegionNumber().then((n: number) => expect(n).toBe(49)),
            lsDao.getSavedTeamIDs().then((ids: string[]) => expect(ids.join(',')).toEqual('A,B')),
        ]);
    }));

    it('Handles initialization with null', async(() => {
        spyOn(init, 'getSettings').and.returnValue(Promise.resolve({}));
        return dao.init().then(() => Promise.all([
            dao.getRegionNumber().then((n: number) => expect(n).not.toBeDefined()),
            dao.getSavedTeamIDs().then((ids: string[]) => expect(ids.join(',')).toEqual('')),
        ]));
    }));
});
