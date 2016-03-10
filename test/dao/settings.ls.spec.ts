import {
    describe,
    beforeEachProviders,
    inject,
    injectAsync,
    it,
    xit,
} from 'angular2/testing';
import {provide} from 'angular2/core';
import {settingsInterfaceSpec} from '../interfaces/settings.spec.i';
import {TeamsDAO, InMemoryTeamsService} from '../../src/dao/mem/teams.mem.service';

import {StaticInitializationService, IBackend} from '../../src/service/backend/static.backend';
import {LocalStorageSettingsService} from '../../src/dao/ls/settings.ls.service';
import {MOCK_LOCAL_STORAGE_PROVIDER, ILocalStorage, MockLocalStorage} from '../mocks/local-storage.mock';
import {LS_KEYS} from '../../src/service/local-storage.interface';

describe('DAO: LocalStorageSettings', () => {
    beforeEachProviders(() => [
        provide(IBackend, { useClass: StaticInitializationService }),
        MOCK_LOCAL_STORAGE_PROVIDER,
        provide(TeamsDAO, {useClass: InMemoryTeamsService}),
    ]);

    settingsInterfaceSpec(LocalStorageSettingsService);

    it('Retrieves previously saved data', injectAsync([TeamsDAO], (teams:TeamsDAO) => {
        let ls = new MockLocalStorage();
        ls.setItem(LS_KEYS.USER_TEAMS, 'A,B');
        ls.setItem(LS_KEYS.MAIN_REGION, '49');
        let dao = new LocalStorageSettingsService(ls, teams);
        return Promise.all([
            dao.getRegionNumber().then((n:number) => expect(n).toBe(49)),
            dao.getSavedTeamIDs().then((ids:string[]) => expect(ids.join(',')).toEqual('A,B')),
        ]);
    }));

    //TODO: Since push init not pull, might remove
    xit('Handles initialization with null', injectAsync([ILocalStorage, TeamsDAO], (ls:ILocalStorage, teams:TeamsDAO) => {
        let init = new StaticInitializationService();
        spyOn(init, 'getSettings').and.returnValue(Promise.resolve({}));
        let dao = new LocalStorageSettingsService(ls, teams);
        return dao.init().then(() => Promise.all([
            dao.getRegionNumber().then((n:number) => expect(n).not.toBeDefined()),
            dao.getSavedTeamIDs().then((ids:string[]) => expect(ids.join(',')).toEqual('')),
        ]));
    }));
});
