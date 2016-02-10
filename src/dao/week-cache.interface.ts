import {OpaqueToken} from 'angular2/core';

interface WeekCacheInterface {
    /**
     * Get the number of weeks in a season
     * @returns number of max weeks
     */
    getMaxWeeks(): Promise<Number>;

    /**
     * Returns the current week, as determined by game days
     * Week is determined by which week starts the game is between
     * This should always be in the range `[1,maxWeeks]`
     */
    getCurrentWeek(): Promise<Number>;

    /**
     * Clears underlying data
     */
    clear(): Promise<void>;

    /**
     * Initializes the cache
     * @param weekStarts - start of each week. May be unordered
     * Between each week start counts as a week
     * - After last week start will be maxWeek
     * - Before first week start will return first week
     */
    init(weekStarts:Date[]): Promise<any>;
}

var WeekCacheInterface = new OpaqueToken('WeekCacheInterface');

export {WeekCacheInterface as default, WeekCacheInterface}
