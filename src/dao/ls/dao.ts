import {Provider, provide} from 'angular2/core';
import {LocalStorageTeamsService, TeamsDAO} from './teams.ls.service';
import {LocalStorageGamesService, GamesDAO} from './games.ls.service';
import {LocalStorageSettingsService, SettingsDAO} from './settings.ls.service';
import {LocalStorageWeeksService, WeekCacheInterface} from './weeks.ls.service';
import {ILocalStorage} from './../../service/local-storage.interface';

const LOCAL_STORAGE_TEAM_DAO_PROVIDER = provide(TeamsDAO, {useClass: LocalStorageTeamsService});
const LOCAL_STORAGE_GAME_DAO_PROVIDER = provide(GamesDAO, {useClass: LocalStorageGamesService});
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

export * from './games.ls.service';
export * from './settings.ls.service';
export * from './teams.ls.service';
export * from './weeks.ls.service';

export {
    LOCAL_STORAGE_DAO_PROVIDERS,
    LOCAL_STORAGE_DAO_PROVIDERS as default,

    LOCAL_STORAGE_WINDOW_PROVIDER,
    LOCAL_STORAGE_TEAM_DAO_PROVIDER,
    LOCAL_STORAGE_GAME_DAO_PROVIDER,
    LOCAL_STORAGE_SETTINGS_DAO_PROVIDER,
    LOCAL_STORAGE_WEEKS_DAO_PROVIDER,
};
