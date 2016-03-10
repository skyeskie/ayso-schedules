import {ILocalStorage} from '../../src/service/local-storage.interface';
import {provide} from 'angular2/core';
import {ClassLogger, Logger} from '../../src/service/log.decorator';

class MockLocalStorage implements ILocalStorage {
    @ClassLogger() public log: Logger;

    localStore:any = {};

    key(index: number): string {
        return localStorage[index];
    }

    getItem(key: string): any {
        return this.localStore[key];
    }

    setItem(key: string, value: any): void {
        this.log.info('Setting',key,value);
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
