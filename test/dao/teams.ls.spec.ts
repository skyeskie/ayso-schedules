import {describe, beforeEachProviders} from 'angular2/testing';
import {provide} from 'angular2/core';

import {teamsInterfaceSpec} from '../interfaces/teams.spec.i';
import {StaticInitializationService, IInitializationService} from '../../src/dao/init/static.init.service';
import {LocalStorageTeamsService} from '../../src/dao/ls/teams.ls.service';
import {MOCK_LOCAL_STORAGE_PROVIDER} from '../mocks/local-storage.mock';

describe('DAO: TeamsLocalStorage', () => {
    beforeEachProviders(() => [
        LocalStorageTeamsService,
        provide(IInitializationService, {useClass: StaticInitializationService}),
        MOCK_LOCAL_STORAGE_PROVIDER,
    ]);

    teamsInterfaceSpec(LocalStorageTeamsService, StaticInitializationService);
});
