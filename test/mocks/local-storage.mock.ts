import {ILocalStorage} from '../../src/dao/ls/settings.ls.service';

class MockLocalStorage implements ILocalStorage {
    private localStore = {};

    key(index: number): string {
        return localStorage[index];
    }

    getItem(key) {
        return this.localStore[key];
    }

    setItem(key, value) {
        this.localStore[key] = value;
    }

    removeItem(key) {
        delete this.localStore[key];
    }

    clear() {
        this.localStore = {};
    }
}

export { MockLocalStorage, ILocalStorage, MockLocalStorage as default }
