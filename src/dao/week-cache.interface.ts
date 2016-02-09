import {OpaqueToken} from 'angular2/core';

interface WeekCacheInterface {
    getMaxWeeks(): Promise<Number>;

    getCurrentWeek(): Promise<Number>;

    reset(): void;

    update(force: boolean): void;
}

var WeekCacheInterface = new OpaqueToken('WeekCacheInterface');

export {WeekCacheInterface as default, WeekCacheInterface}
