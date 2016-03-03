import {Inject, Injectable, Optional} from 'angular2/core';
import {SettingsDAO, SettingsDataType} from '../settings.interface';
import {IBackend} from '../init/backend.interface.ts';
import {TeamsDAO, Team} from '../teams.interface';
import {Region} from '../../models/region';
import {Logger, ClassLogger, Level} from '../../service/log.decorator';
import {ILocalStorage, LS_KEYS} from './local-storage.interface';

@Injectable()
class LocalStorageSettingsService implements SettingsDAO {
    @ClassLogger public log:Logger;
    public teams:string[] = [];
    public region:number = undefined;

    constructor(
        @Inject(ILocalStorage)
        private client:ILocalStorage,
        @Inject(TeamsDAO)
        private dao: TeamsDAO
    ) {
        this.log.setLevel(Logger.Level.DEBUG);
        let savedList = this.client.getItem(LS_KEYS.USER_TEAMS) || '';
        this.log.info('Retrieved teams from LocalStorage',savedList);
        if(savedList) {
            this.teams = savedList.split(',');
        }
        this.log.info('Parsed teams into array',this.teams);
    }

    getSavedTeamIDs(): Promise<string[]> {
        return Promise.resolve(this.teams);
    }

    getSavedTeams(): Promise<Team[]> {
        return this.dao.getTeams(this.teams);
    }

    saveTeam(team: string): Promise<void> {
        if(!this._isTeamSaved(team)) {
            this.teams.push(team);
        }
        this.persistTeams();
        return Promise.resolve();
    }

    unSaveTeam(team: string): Promise<void> {
        this.teams = this.teams.filter((item:string) => item !== team);
        this.persistTeams();
        return Promise.resolve();
    }

    isTeamSaved(team: string): Promise<boolean> {
        return Promise.resolve(this._isTeamSaved(team));
    }

    clearSavedTeams(): Promise<void> {
        this.teams = [];
        this.persistTeams();
        return Promise.resolve();
    }

    getRegionNumber(): Promise<number> {
        let n = Number.parseInt(this.client.getItem(LS_KEYS.MAIN_REGION),10);
        return Promise.resolve(isNaN(n) ? undefined : n);
    }

    getRegion(): Promise<Region> {
        return this.getRegionNumber().then((num:number) => {
            this.log.info('Looking up region', num, Region.REGIONS);
            return Promise.resolve(Region.fromNumber(num));
        });
    }

    setRegion(region: number): Promise<void> {
        if(!isNaN(region)) {
            this.client.setItem(LS_KEYS.MAIN_REGION, region.toString());
        }
        return Promise.resolve();
    }

    init(preset?:SettingsDataType): Promise<void> {
        this.log.debug('Setting from initializer: ', preset);
        this.setRegion(preset.regionNumber);
        if(typeof preset.savedTeams !== 'undefined') {
            this.teams = preset.savedTeams;
        }
        this.persistTeams();
        return Promise.resolve();
    }

    isAppConfigured(): boolean {
        return !isNaN(Number.parseInt(this.client.getItem(LS_KEYS.MAIN_REGION), 10));
    }

    reset(): Promise<void> {
        this.region = undefined;
        this.teams = [];
        this.client.removeItem(LS_KEYS.MAIN_REGION);
        this.client.removeItem(LS_KEYS.USER_TEAMS);
        return Promise.resolve();
    }

    private _isTeamSaved(team: string) {
        return this.teams.some((item:string) => item === team);
    }

    private persistTeams() {
        this.client.setItem(LS_KEYS.MAIN_REGION, this.teams.join(','));
    }
}

export { LocalStorageSettingsService as default, LocalStorageSettingsService, SettingsDAO }
