import {describe, beforeEachProviders} from 'angular2/testing';
import {provide} from 'angular2/core';

import {teamsInterfaceSpec} from '../interfaces/teams.spec.i';
import {InMemoryTeamsService} from '../../src/dao/mem/teams.mem.service';
import {StaticInitializationService, IInitializationService} from '../../src/dao/init/static.init.service';

describe('DAO: TeamsMock', () => {
    beforeEachProviders(() => [
        InMemoryTeamsService,
        StaticInitializationService,
        provide(IInitializationService, {useExisting: StaticInitializationService}),
    ]);

    teamsInterfaceSpec(InMemoryTeamsService, StaticInitializationService);
});
