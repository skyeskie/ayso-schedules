import { describe } from 'angular2/testing';
import {provide} from 'angular2/core';

import MockGamesService from '../../src/dao/mock/MockGamesService';
import {TeamsDAO, MockTeamsService} from '../../src/dao/mock/MockTeamsService';

import {gamesInterfaceSpec} from '../interfaces/games.spec.i';

describe('DAO: GamesMock', () => {
    gamesInterfaceSpec(MockGamesService);
});
