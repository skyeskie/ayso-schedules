import {WeekCacheInterface} from '../../src/dao/week-cache.interface';

class MockWeeksService implements WeekCacheInterface {
    constructor(
        public cur=2, public max=7
    ) {
        //No-op
    }

    getMaxWeeks(): number {
        return this.max;
    }

    getCurrentWeek(): number {
        return this.cur;
    }

    clear(): Promise<void> {
        return Promise.resolve();
    }

    isInit(): boolean {
        return true;
    }

    init(): Promise<void> {
        return Promise.resolve();
    }
}

export { MockWeeksService as default, MockWeeksService, WeekCacheInterface }
