import {OpaqueToken} from 'angular2/core';

interface ILocalStorage {
    clear(): void;
    getItem(key: string): any;
    key(index: number): string;
    removeItem(key: string): void;
    setItem(key: string, data: string): void;
}

let ILocalStorage = new OpaqueToken('ILocalStorage');

export {ILocalStorage as default, ILocalStorage}
