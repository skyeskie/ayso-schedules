import {ILocalStorage} from '../../src/dao/ls/settings.ls.service';

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

export { MockLocalStorage, ILocalStorage, MockLocalStorage as default }
