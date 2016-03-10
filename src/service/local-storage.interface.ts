import {OpaqueToken} from 'angular2/core';

interface ILocalStorage {
    clear(): void;
    getItem(key: string): any;
    key(index: number): string;
    removeItem(key: string): void;
    setItem(key: string, data: string): void;
}

let ILocalStorage = new OpaqueToken('ILocalStorage');

const LS_KEYS = {
    DATA_VERSION: 'ayso-data-version',
    TEAMS_CACHE: 'ayso-teams',
    GAMES_CACHE: 'ayso-games',
    WEEKS_CACHE: 'ayso-weeks',

    USER_TEAMS: 'ayso-favorites',
    MAIN_REGION: 'ayso-region',
};

export {ILocalStorage as default, ILocalStorage, LS_KEYS}
