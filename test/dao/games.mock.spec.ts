import { describe } from 'angular2/testing';
import {provide} from 'angular2/core';

import MockGamesService from 'mem/games.mem.service';
import {TeamsDAO, InMemoryTeamsService} from 'mem/teams.mem.service';

import {gamesInterfaceSpec} from '../interfaces/games.spec.i';

describe('DAO: GamesMock', () => {
    gamesInterfaceSpec(MockGamesService);
});
