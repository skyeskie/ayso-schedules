import {Injectable, Inject} from 'angular2/core';
import {GamesDAO} from './games.interface';
import {SettingsDAO} from './settings.interface';
import {TeamsDAO} from './teams.interface';
import {WeekCacheInterface} from './week-cache.interface';
import {ClassLogger, Logger, Level} from '../service/log.decorator';

/**
 * This class provides a common interface for updating all the
 * DataAccessObjects used by the App. Several of the methods
 * are included here as NO-OP. This provides a hook for actually
 * performing updates, with an override and different provider
 */
@Injectable()
class DataControlService {
    @ClassLogger public log: Logger;

    constructor(
        @Inject(GamesDAO)           public games:GamesDAO,
        @Inject(SettingsDAO)        public settings:SettingsDAO,
        @Inject(TeamsDAO)           public teams:TeamsDAO,
        @Inject(WeekCacheInterface) public weekCache:WeekCacheInterface
    ) {
    }

    /**
     * Full initialization of DAOs. Expects DAOs to have no local caching
     * @post DAO objects initialized with data and ready to receive queries
     * - At this point, app update should leave local caches intact
     * @returns {Promise<Date>} for  success/completion
     * - Success will return the last updated date
     * - Errors will be fed to the reject callback
     */
    init(): Promise<Date> {
        return Promise.all([
            this.games.init().then(() => {
                this.log.info('Games init');
                return 0;
            }),
            this.teams.init().then(() => {
                this.log.info('Teams init');
                return 0;
            }),
            this.settings.init().then(() => {
                this.log.info('Settings init');
                return 0;
            }),
            this.weekCache.init().then(() => {
                this.log.info('Week Cache init');
                return 0;
            }),
        ]).then(() => {
            return Promise.resolve(new Date());
        });
    }

    /**
     * Returns last successful update time
     * Synchronous, since used to quickly check if update needed
     * @returns {Date}
     *
     * If update() is no-op, this should return now. Otherwise the
     * value should be persisted.
     */
    getLastUpdate(): Date {
        return new Date();
    }

    /**
     * Updates all underlying DAOs
     * @param force
     * @post DAO objects updated to latest version
     * @returns {Promise<Date>} for  success/completion
     * - Success will return the last updated date
     * - Errors will be fed to the reject callback
     *
     * If updates required, should set lastUpdate to now
     */
    update(force: boolean): Promise<Date> {
        return Promise.all([
            this.games.update(),
            this.teams.update(),
            this.weekCache.init(),
        ]).then(() => this.getLastUpdate());
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
}

export {DataControlService as default, DataControlService}
