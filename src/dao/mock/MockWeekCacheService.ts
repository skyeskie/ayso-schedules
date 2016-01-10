import WeekCacheInterface from '../week-cache.interface';

export default class MockWeekCacheService implements WeekCacheInterface {
    getMaxWeeks(): Promise<Number> {
        return new Promise<Number>((resolve) => resolve(5));
    }

    getCurrentWeek(): Promise<Number> {
        return new Promise<Number>((resolve) => resolve(2));
    }

    reset(): void {}

    update(force: boolean): void {}
}
