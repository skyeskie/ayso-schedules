import {ILocalStorage} from '../../src/dao/ls/local-storage.interface';
import {provide} from 'angular2/core';


class MockLocalStorage implements ILocalStorage {
    private localStore:any = {};

    key(index: number): string {
        return localStorage[index];
    }

    getItem(key: string): any {
        return this.localStore[key];
    }

    setItem(key: string, value: any): void {
        this.localStore[key] = value;
    }

    removeItem(key: string): void {
        delete this.localStore[key];
    }

    clear(): void {
        this.localStore = {};
    }
}

let MOCK_LOCAL_STORAGE_PROVIDER = provide(ILocalStorage, {useClass: MockLocalStorage});

export { MockLocalStorage, ILocalStorage, MockLocalStorage as default, MOCK_LOCAL_STORAGE_PROVIDER }
