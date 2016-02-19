import {Provider, provide} from 'angular2/core';

import {InMemoryTeamsService, TeamsDAO} from '../mem/teams.mem.service';
import {InMemoryGamesService, GamesDAO} from '../mem/games.mem.service';
import {LocalStorageSettingsService, SettingsDAO, ILocalStorage} from './settings.ls.service';
import {LocalStorageWeeksService, WeekCacheInterface} from './weeks.ls.service';

const LOCAL_STORAGE_TEAM_DAO_PROVIDER = provide(TeamsDAO, {useClass: InMemoryTeamsService});
const LOCAL_STORAGE_GAME_DAO_PROVIDER = provide(GamesDAO, {useClass: InMemoryGamesService});
const LOCAL_STORAGE_SETTINGS_DAO_PROVIDER = provide(SettingsDAO, {useClass: LocalStorageSettingsService});
const LOCAL_STORAGE_WEEKS_DAO_PROVIDER = provide(WeekCacheInterface, {useClass: LocalStorageWeeksService});
const LOCAL_STORAGE_WINDOW_PROVIDER = provide(ILocalStorage, { useValue: window.localStorage });

const LOCAL_STORAGE_DAO_PROVIDERS:Provider[] = [
    LOCAL_STORAGE_WINDOW_PROVIDER,

    LOCAL_STORAGE_TEAM_DAO_PROVIDER,
    LOCAL_STORAGE_GAME_DAO_PROVIDER,
    LOCAL_STORAGE_SETTINGS_DAO_PROVIDER,
    LOCAL_STORAGE_WEEKS_DAO_PROVIDER,
];

export * from '../mem/games.mem.service';
export * from './settings.ls.service';
export * from '../mem/teams.mem.service';
export * from '../mem/weeks.mem.service';

export {
    LOCAL_STORAGE_DAO_PROVIDERS,
    LOCAL_STORAGE_DAO_PROVIDERS as default,

    LOCAL_STORAGE_WINDOW_PROVIDER,
    LOCAL_STORAGE_TEAM_DAO_PROVIDER,
    LOCAL_STORAGE_GAME_DAO_PROVIDER,
    LOCAL_STORAGE_SETTINGS_DAO_PROVIDER,
    LOCAL_STORAGE_WEEKS_DAO_PROVIDER,
};
