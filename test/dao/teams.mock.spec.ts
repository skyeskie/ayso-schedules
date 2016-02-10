import {describe} from 'angular2/testing';
import {teamsInterfaceSpec} from '../interfaces/teams.spec.i';
import MockTeamsService from 'mem/teams.mem.service';

describe('DAO: TeamsMock', () => {
    teamsInterfaceSpec(MockTeamsService);
});
