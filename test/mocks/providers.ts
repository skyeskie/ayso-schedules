import {provide} from 'angular2/core';

export * from './router';
import {MockGamesService, GamesDAO} from '../../src/dao/mock/MockGamesService';
import {MockTeamsService, TeamsDAO} from '../../src/dao/mock/MockTeamsService';
import {MockWeekCacheService, WeekCacheInterface} from '../../src/dao/mock/MockWeekCacheService';
import {MockSettingsService, SettingsDAO} from '../../src/dao/mock/MockSettingsService';
import {Component} from 'angular2/core';

let MOCK_DAO_PROVIDERS = [
    provide(GamesDAO, { useClass: MockGamesService }),
    provide(TeamsDAO, { useClass: MockTeamsService }),
    provide(SettingsDAO, {useClass: MockSettingsService}),
    provide(WeekCacheInterface, { useClass: MockWeekCacheService}),
];

export { MOCK_DAO_PROVIDERS, GamesDAO, TeamsDAO, SettingsDAO, WeekCacheInterface };
