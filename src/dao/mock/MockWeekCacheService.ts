import WeekCacheInterface from '../week-cache.interface';

export default class MockWeekCacheService implements WeekCacheInterface {
    getMaxWeeks(): Number {
        return 5;
    }

    getCurrentWeek(): Number {
        return 2;
    }

    reset(): void {}

    update(force: boolean): void {}
}
