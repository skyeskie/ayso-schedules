import {
    describe,
    beforeEachProviders,
    inject,
    it,
} from 'angular2/testing';
import {provide} from 'angular2/core';

import {settingsInterfaceSpec} from '../interfaces/settings.spec.i';
import {TeamsDAO, InMemoryTeamsService} from '../../src/dao/mem/teams.mem.service';
import {InMemorySettingsService} from '../../src/dao/mem/settings.mem.service';
import {StaticInitializationService} from '../../src/dao/init/static.init.service';

describe('DAO: SettingsMock', () => {
    beforeEachProviders(() => [
        provide(TeamsDAO, {useClass: InMemoryTeamsService})
    ]);

    settingsInterfaceSpec(InMemorySettingsService);
});
