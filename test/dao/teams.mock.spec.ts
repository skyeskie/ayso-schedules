import {describe} from 'angular2/testing';
import {teamsInterfaceSpec} from '../interfaces/teams.spec.i';
import {InMemoryTeamsService} from '../../src/dao/mem/teams.mem.service';
import {StaticInitializationService} from '../../src/dao/init/static.init.service';

describe('DAO: TeamsMock', () => {
    teamsInterfaceSpec(InMemoryTeamsService, StaticInitializationService);
});
