import {Provider, provide} from 'angular2/core';

import {InMemoryTeamsService, TeamsDAO} from './teams.mem.service';
import {InMemoryGamesService, GamesDAO} from './games.mem.service';
import {InMemorySettingsService, SettingsDAO} from './settings.mem.service';
import {InMemoryWeeksService, WeekCacheInterface} from './weeks.mem.service';

const IN_MEMORY_TEAM_DAO_PROVIDER = provide(TeamsDAO, {useClass: InMemoryTeamsService});
const IN_MEMORY_GAME_DAO_PROVIDER = provide(GamesDAO, {useClass: InMemoryGamesService});
const IN_MEMORY_SETTINGS_DAO_PROVIDER = provide(SettingsDAO, {useClass: InMemorySettingsService});
const IN_MEMORY_WEEKS_DAO_PROVIDER = provide(WeekCacheInterface, {useClass: InMemoryWeeksService});

const IN_MEMORY_DAO_PROVIDERS:Provider[] = [
    IN_MEMORY_TEAM_DAO_PROVIDER,
    IN_MEMORY_GAME_DAO_PROVIDER,
    IN_MEMORY_SETTINGS_DAO_PROVIDER,
    IN_MEMORY_WEEKS_DAO_PROVIDER,
];

export * from './games.mem.service';
export * from './settings.mem.service';
export * from './teams.mem.service';
export * from './weeks.mem.service';

export {
    IN_MEMORY_DAO_PROVIDERS,
    IN_MEMORY_DAO_PROVIDERS as default,
    IN_MEMORY_TEAM_DAO_PROVIDER,
    IN_MEMORY_GAME_DAO_PROVIDER,
    IN_MEMORY_SETTINGS_DAO_PROVIDER,
    IN_MEMORY_WEEKS_DAO_PROVIDER,
};
