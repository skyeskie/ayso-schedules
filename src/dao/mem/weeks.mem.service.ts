import WeekCacheInterface from '../week-cache.interface';
import {Injectable} from 'angular2/core';

@Injectable()
class InMemoryWeeksService implements WeekCacheInterface {
    public max: Number = 7;
    public cur: Number = 2;

    getMaxWeeks(): Promise<Number> {
        return new Promise<Number>((resolve) => resolve(this.max));
    }

    getCurrentWeek(): Promise<Number> {
        return new Promise<Number>((resolve) => resolve(this.cur));
    }

    clear(): Promise<void> {
        return new Promise<void>(resolve => resolve());
        //No-op
    }

    init(weekStarts:Date[]): Promise<void> {
        return new Promise<void>(resolve => resolve());
    }
}

export { InMemoryWeeksService as default, InMemoryWeeksService, WeekCacheInterface }
