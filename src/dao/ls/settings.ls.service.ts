import {Inject, Injectable, Optional} from 'angular2/core';
import {SettingsDAO, SettingsDataType} from '../settings.interface';
import {IInitializationService} from '../init/initialization.interface';
import {TeamsDAO, Team} from '../teams.interface';
import {getRegionByNumber, Region} from '../../cfg/regions';
import {Logger, ClassLogger, Level} from '../../service/log.decorator';
import {OpaqueToken} from 'angular2/core';

const SAVED_TEAMS_KEY = 'ayso-teams';
const SAVED_REGION_KEY = 'ayso-region';

interface ILocalStorage {
    clear(): void;
    getItem(key: string): any;
    key(index: number): string;
    removeItem(key: string): void;
    setItem(key: string, data: string): void;
}

let ILocalStorage = new OpaqueToken('ILocalStorage');

@Injectable()
class LocalStorageSettingsService implements SettingsDAO {
    public static KEYS:any = {
        TEAMS: SAVED_TEAMS_KEY,
        REGION: SAVED_REGION_KEY,
    };

    @ClassLogger public log:Logger;
    public teams:string[] = [];
    public region:number = undefined;

    constructor(
        @Inject(ILocalStorage)
        private client:ILocalStorage,
        @Inject(TeamsDAO)
        private dao: TeamsDAO,
        @Optional() @Inject(IInitializationService)
        private initializer?:IInitializationService
    ) {
        this.log.setLevel(Level.TRACE);
        let savedList = this.client.getItem(SAVED_TEAMS_KEY) || '';
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
        let n = Number.parseInt(this.client.getItem(SAVED_REGION_KEY),10);
        return Promise.resolve(isNaN(n) ? undefined : n);
    }

    getRegion(): Promise<Region> {
        return this.getRegionNumber().then((num:number) => {
            return Promise.resolve(getRegionByNumber(num));
        });
    }

    setRegion(region: number): Promise<void> {
        if(!isNaN(region)) {
            this.client.setItem(SAVED_REGION_KEY, region.toString());
        }
        return Promise.resolve();
    }

    init(): Promise<void> {
        if(this.initializer === null) {
            return Promise.resolve();
        }

        return this.initializer.getSettings().then((preset:SettingsDataType) => {
            this.log.debug('Setting from initializer: ', preset);
            this.setRegion(preset.regionNumber);
            this.teams = preset.savedTeams || [];
            this.persistTeams();
        });
    }

    isAppConfigured(): boolean {
        return !isNaN(Number.parseInt(this.client.getItem(SAVED_REGION_KEY), 10));
    }

    reset(): Promise<void> {
        this.region = undefined;
        this.teams = [];
        this.client.removeItem(SAVED_REGION_KEY);
        this.client.removeItem(SAVED_TEAMS_KEY);
        return Promise.resolve();
    }

    private _isTeamSaved(team: string) {
        return this.teams.some((item:string) => item === team);
    }

    private persistTeams() {
        this.client.setItem(SAVED_TEAMS_KEY, this.teams.join(','));
    }
}

export { LocalStorageSettingsService as default, LocalStorageSettingsService, SettingsDAO, ILocalStorage }
