import {
    describe,
    beforeEachProviders,
    inject,
    injectAsync,
    it,
} from 'angular2/testing';
import {provide} from 'angular2/core';
import {settingsInterfaceSpec} from '../interfaces/settings.spec.i';
import {TeamsDAO, InMemoryTeamsService} from '../../src/dao/mem/teams.mem.service';

import {StaticInitializationService, IInitializationService} from '../../src/dao/init/static.init.service';
import {LocalStorageSettingsService} from '../../src/dao/ls/settings.ls.service';
import {MOCK_LOCAL_STORAGE_PROVIDER, ILocalStorage, MockLocalStorage} from '../mocks/local-storage.mock';

describe('DAO: LocalStorageSettings', () => {
    beforeEachProviders(() => [
        provide(IInitializationService, { useClass: StaticInitializationService }),
        MOCK_LOCAL_STORAGE_PROVIDER,
        provide(TeamsDAO, {useClass: InMemoryTeamsService}),
    ]);

    settingsInterfaceSpec(LocalStorageSettingsService, StaticInitializationService);

    it('Retrieves previously saved data', injectAsync([TeamsDAO], (teams:TeamsDAO) => {
        let ls = new MockLocalStorage();
        ls.setItem(LocalStorageSettingsService.KEYS.TEAMS, 'A,B');
        ls.setItem(LocalStorageSettingsService.KEYS.REGION, '49');
        let dao = new LocalStorageSettingsService(ls, teams);
        return Promise.all([
            dao.getRegionNumber().then((n:number) => expect(n).toBe(49)),
            dao.getSavedTeamIDs().then((ids:string[]) => expect(ids.join(',')).toEqual('A,B')),
        ]);
    }));

    it('Handles initialization with null', injectAsync([ILocalStorage, TeamsDAO], (ls:ILocalStorage, teams:TeamsDAO) => {
        let init = new StaticInitializationService();
        spyOn(init, 'getSettings').and.returnValue(Promise.resolve({}));
        let dao = new LocalStorageSettingsService(ls, teams, init);
        return dao.init().then(() => Promise.all([
            dao.getRegionNumber().then((n:number) => expect(n).not.toBeDefined()),
            dao.getSavedTeamIDs().then((ids:string[]) => expect(ids.join(',')).toEqual('')),
        ]));
    }));
});
