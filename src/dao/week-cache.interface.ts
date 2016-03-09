import {OpaqueToken} from 'angular2/core';

/**
 * @interface WeekCacheInterface
 * @desc Provides quick access to current week and maximum weeks
 *
 * - Although this could be obtained through GamesDAO, those may involve
 * expensive scans. This provides instant access to those values
 * - Note that setup and teardown are async
 */
interface WeekCacheInterface {
    /**
     * Get the number of weeks in a season
     * @returns number of max weeks
     */
    getMaxWeeks(): number;

    /**
     * Returns the current week, as determined by game days
     * Week is determined by which week starts the game is between
     * This should always be in the range `[1,maxWeeks]`
     */
    getCurrentWeek(): number;

    /**
     * Clears underlying data
     */
    clear(): Promise<void>;

    isInit(): boolean;

    /**
     * Initializes the cache
     */
    init(starts: Date[]): Promise<any>;
}

var WeekCacheInterface = new OpaqueToken('WeekCacheInterface');

/**
 *
 * @param starts - list of Date objects indicating week start. Doesn't need to be in-order
 * @throws RangeError if starts doesn't have at least one item
 * @param now (optional) - defaults to getting current time
 * @returns {number} current game week
 * - If before season, constrain to first week
 * - If after season, constrain to last week
 */
function calculateCurrentWeek(starts:Date[], now=new Date()): number {
    if(starts.length === 0) {
        throw new RangeError('Need at least 1 date object in starts');
    }

    if(now.valueOf() < starts[0].valueOf()) {
        return 1;
    }

    //Count number of starts before now() to get the current week
    return starts.filter((start:Date) => start.valueOf() <= now.valueOf()).length;
}

export {WeekCacheInterface as default, WeekCacheInterface, calculateCurrentWeek}
