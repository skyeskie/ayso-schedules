import {WeekCacheInterface} from '../../src/dao/week-cache.interface';

class MockWeeksService implements WeekCacheInterface {
    constructor(
        public cur=2, public max=7
    ) {
        //No-op
    }

    getMaxWeeks(): Number {
        return this.max;
    }

    getCurrentWeek(): Number {
        return this.cur;
    }

    clear(): Promise<void> {
        return Promise.resolve();
    }

    init(): Promise<void> {
        return Promise.resolve();
    }
}

export { MockWeeksService as default, MockWeeksService, WeekCacheInterface }
