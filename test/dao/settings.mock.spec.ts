import {
    describe,
    beforeEachProviders,
    inject,
    it,
} from 'angular2/testing';
import {provide} from 'angular2/core';

import {settingsInterfaceSpec} from '../interfaces/settings.spec.i';
import MockSettingsService from '../../src/dao/mock/MockSettingsService';
import {TeamsDAO, MockTeamsService} from '../../src/dao/mock/MockTeamsService';

describe('DAO: SettingsMock', () => {
    beforeEachProviders(() => [
        MockSettingsService,
        provide(TeamsDAO, {useClass: MockTeamsService}),
    ]);

    it('is configured after region is set', inject([MockSettingsService], dao => {
        dao.setRegion(49);
        expect(dao.isAppConfigured()).toBeTruthy();
    }));
});
