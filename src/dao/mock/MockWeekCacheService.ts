import WeekCacheInterface from '../week-cache.interface';
import {Injectable} from 'angular2/core';

@Injectable()
class MockWeekCacheService implements WeekCacheInterface {
    public max: Number = 7;
    public cur: Number = 2;

    MockWeekCacheService() {}

    getMaxWeeks(): Promise<Number> {
        return new Promise<Number>((resolve) => resolve(this.max));
    }

    getCurrentWeek(): Promise<Number> {
        return new Promise<Number>((resolve) => resolve(this.cur));
    }

    reset(): void {}

    update(force: boolean): void {}
}

export { MockWeekCacheService as default, MockWeekCacheService, WeekCacheInterface }
