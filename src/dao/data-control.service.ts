import {Injectable, Inject} from 'angular2/core';
import {GamesDAO} from './games.interface';
import {SettingsDAO} from './settings.interface';
import {TeamsDAO} from './teams.interface';
import {WeekCacheInterface} from './week-cache.interface';

/**
 * This class provides a common interface for updating all the
 * DataAccessObjects used by the App. Several of the methods
 * are included here as NO-OP. This provides a hook for actually
 * performing updates, with an override and different provider
 *
 * TODO: Eventually pull URL(s) to hit from sub-DAOs.
 */
@Injectable()
class DataControlService {
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
        return new Promise<Date>(resolve => {
            resolve(this.getLastUpdate());
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
     * Currently no-op. `@Override` this to actually update
     */
    update(force: Boolean): Promise<Date> {
        return new Promise<Date>(resolve => {
            resolve(this.getLastUpdate());
        });
    }

    /**
     * Discards all data
     *
     * Currently no-op except for settings.
     * `@Override` this to actually update
     */
    reset() {
        this.settings.reset();
    }
}

export {DataControlService as default, DataControlService}
