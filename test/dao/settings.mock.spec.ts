import {
    describe,
    beforeEachProviders,
    inject,
    it,
} from 'angular2/testing';
import {provide} from 'angular2/core';

import {settingsInterfaceSpec} from '../interfaces/settings.spec.i';
import MockSettingsService from 'mem/settings.mem.service';
import {TeamsDAO, InMemoryTeamsService} from 'mem/teams.mem.service';

describe('DAO: SettingsMock', () => {
    beforeEachProviders(() => [
        MockSettingsService,
        provide(TeamsDAO, {useClass: InMemoryTeamsService}),
    ]);

    it('is configured after region is set', inject([MockSettingsService], dao => {
        dao.setRegion(49);
        expect(dao.isAppConfigured()).toBeTruthy();
    }));
});
