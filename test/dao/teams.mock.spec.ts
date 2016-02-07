import {
    describe,
} from 'angular2/testing';
import {teamsInterfaceSpec} from '../interfaces/teams.spec.i';
import MockTeamsService from '../../src/dao/mock/MockTeamsService';


describe('DAO: TeamsMock', () => {
    teamsInterfaceSpec(MockTeamsService)
});
