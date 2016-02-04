import {
    describe,
} from 'angular2/testing';
import {gamesInterfaceSpec} from '../interfaces/games.spec.i';
import MockGamesService from '../../src/dao/mock/MockGamesService';


describe('DAO: GamesMock', () => {
    gamesInterfaceSpec(MockGamesService);
});
