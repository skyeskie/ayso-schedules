import { InjectionToken } from '@angular/core';

interface ILocalStorage {
    clear(): void;
    getItem(key: string): string;
    key(index: number): string;
    removeItem(key: string): void;
    setItem(key: string, data: string): void;
}

const ILocalStorage = new InjectionToken('ILocalStorage');

const LS_KEYS = {
    DATA_VERSION: 'ayso-data-version',
    TEAMS_CACHE: 'ayso-teams',
    GAMES_CACHE: 'ayso-games',
    WEEKS_CACHE: 'ayso-weeks',

    USER_TEAMS: 'ayso-favorites',
    MAIN_REGION: 'ayso-region',
};

export { ILocalStorage as default, ILocalStorage, LS_KEYS };
