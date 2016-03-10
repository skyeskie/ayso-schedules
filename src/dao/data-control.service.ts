import {Injectable, Inject} from 'angular2/core';

import {GamesDAO, Game} from './games.interface';
import {SettingsDAO, SettingsDataType} from './settings.interface';
import {TeamsDAO, Team} from './teams.interface';
import {WeekCacheInterface} from './week-cache.interface';
import {IBackend} from './init/backend.interface.ts';
import {ILocalStorage, LS_KEYS} from './ls/local-storage.interface';

import {ClassLogger, Logger} from '../service/log.decorator';
import {CFG} from '../app/cfg';

/**
 * This class provides a common interface for updating all the
 * DataAccessObjects used by the App. Several of the methods
 * are included here as NO-OP. This provides a hook for actually
 * performing updates, with an override and different provider
 */
@Injectable()
class DataControlService {
    @ClassLogger() public log: Logger;

    lastFetchTimestamp: number = 0;

    constructor(
        @Inject(GamesDAO)           public games:GamesDAO,
        @Inject(SettingsDAO)        public settings:SettingsDAO,
        @Inject(TeamsDAO)           public teams:TeamsDAO,
        @Inject(WeekCacheInterface) public weekCache:WeekCacheInterface,
        @Inject(IBackend)           public backend:IBackend,
        @Inject(ILocalStorage)      public ls:ILocalStorage
    ) {
        //No-op
    }

    /**
     * Full initialization of DAOs. Expects DAOs to have no local caching
     * @post DAO objects initialized with data and ready to receive queries
     * - At this point, app update should leave local caches intact
     * @returns {Promise<string>} for  success/completion
     * - Success will return the last updated version
     * - Errors will be fed to the reject callback
     */
    init(): Promise<string> {
        return this.update();
    }

    /**
     * Returns last successful update time
     * Synchronous, since used to quickly check if update needed
     * @returns {Date}
     *
     * If update() is no-op, this should return now. Otherwise the
     * value should be persisted.
     */
    getLastUpdate(): string {
        return this.ls.getItem(LS_KEYS.DATA_VERSION);
    }

    /**
     * Updates all underlying DAOs
     * @param force - If true, will always get full data download
     * @post DAO objects updated to latest version
     * - lastUpdate set to data version
     * - caches timestamp of update
     * @returns {Promise<Date>} for  success/completion
     * - Success will return the last updated date
     * - Errors will be fed to the reject callback
     *
     * Backend call only within configurable threshold
     */
    update(force = false): Promise<string> {
        let lastUpdate = null;

        if(!force) {
            let timestamp = (new Date()).valueOf();
            let updateDiff = timestamp - this.lastFetchTimestamp;
            lastUpdate = this.getLastUpdate();

            if(lastUpdate !== null && updateDiff < CFG.UPDATE_CACHE_TIME) {
                return Promise.resolve(lastUpdate);
            }
        }

        let gamesData:Game[] = [];

        return this.backend.init(lastUpdate).then(() => {
            return Promise.all([
                this.backend.getGames().then((games:Game[]) => {
                    gamesData = games;
                    this.games.add(games);
                }),
                this.backend.getTeams().then((teams:Team[]) => {
                    this.teams.add(teams);
                }),
                this.backend.getSettings().then((settings:SettingsDataType) => {
                    if(settings !== null) {
                        this.settings.init(settings);
                    }
                }),
            ]);
        }).then(() => this.backend.getWeekStarts()).then((starts:Date[]) => {
            //Backend doesn't provide, so need to handle ourselves
            if(starts === null) {
                if(gamesData.length === 0 && this.weekCache.isInit()) {
                    //No game updates, so can use existing week cache
                    return Promise.resolve();
                }
                //Regenerate week cache from all games
                return this.generateWeekStarts().then((dates:Date[]) => this.weekCache.init(dates));
            }
            //Empty array indicates no week cache update
            if(starts.length !== 0) {
                return this.weekCache.init(starts);
            }
            //Make sure we're initialized
            if(!this.weekCache.isInit()) {
                this.log.warn('Week cache not initialized. Attempting to fix');
                return this.generateWeekStarts().then((dates:Date[]) => this.weekCache.init(dates));
            }
        }).then(() => this.backend.getDataVersion()).then((version:string) => {
            this.lastFetchTimestamp = (new Date()).valueOf();
            this.setLastUpdate(version);
            return version;
        });
    }

    /**
     * Discards all data
     *
     * Currently no-op except for settings.
     * `@Override` this to actually update
     */
    reset():Promise<void> {
        return Promise.all([
            this.settings.reset(),
            this.games.clear(),
            this.teams.clear(),
            this.weekCache.clear(),
        ]).then(() => Promise.resolve());
    }

    private setLastUpdate(version: string) {
        this.ls.setItem(LS_KEYS.DATA_VERSION, version);
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
    private generateWeekStarts(): Promise<Date[]> {
        let lastUpdate = 0;
        return this.games.findGames().then((games:Game[]) => {
            return games.map<Date>((game: Game) =>  game.startTime).map<number>((date:Date) => {
                if(!(date instanceof Date)) {
                    this.log.warn('Invalid date for generateWeekStarts: ', date);
                    return 0;
                }
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
}

export {DataControlService as default, DataControlService}
