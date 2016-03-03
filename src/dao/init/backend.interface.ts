import {Observable} from 'rxjs/Observable';
import {OpaqueToken} from 'angular2/core';

import Team from '../../models/team';
import Game from '../../models/game';
import {SettingsDataType} from './../settings.interface.ts';
import {GamesDAO} from '../games.interface';

/**
 * Interface for DAOs to load initial data for saving to local storage
 * Needed for
 */
interface IBackend {
    /**
     * Does any necessary setup for backend requests. Update params mean subsequent
     * calls to `getTeams()` and `getGames()` are update requests. Otherwise request
     * is for full data and functions will return entire data
     *
     * @param curVersion - string version for current data version
     * - Exact use depends on backend implementation
     */
    init(curVersion?:string): Promise<any>;

    getDataVersion(): Promise<string>;

    getTeams(): Promise<Team[]>;
    getGames(): Promise<Game[]>;
    getWeekStarts(): Promise<Date[]>;
    getSettings(): Promise<SettingsDataType>;
}

/**
 * If week starts are not provided by backend method, convenience function to generate
 * them from the full games listing.
 * @param gameDAO - for access to get full games list
 * - We can't use the data from init() because that might be an incremental update and
 * the WeekCache is setup to only do a full inintialization.
 *
 * Generation procedure:
 * - Get game start for each game
 * - Blank out hour, minute, second, millisecond
 * - Convert to timestamp (for sorting)
 * - Sort
 * - Take unique items
 * - convert back to Date objects
 */
function generateWeekStarts(gameDAO: GamesDAO): Promise<Date[]> {
    return gameDAO.findGames().then((games:Game[]) => {
        let lastUpdate = 0;
        return games.map<Date>((game: Game) => game.startTime).map<number>((date:Date) => {
            date.setHours(0);
            date.setMinutes(0);
            date.setSeconds(0);
            date.setMilliseconds(0);
            return date.valueOf();
        }).sort().filter((timestamp:number) => {
            let keep = timestamp !== lastUpdate;
            lastUpdate = timestamp;
            return keep;
        }).map<Date>((timestamp:number) => new Date(timestamp));
    });
}

var IBackend = new OpaqueToken('IBackend');
export { IBackend as default, IBackend, generateWeekStarts }
