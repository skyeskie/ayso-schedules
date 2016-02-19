import {Inject, Injectable} from 'angular2/core';

import {TeamsDAO} from '../teams.interface';
import SettingsDAO, {Region, Team} from '../settings.interface';
import {getRegionByNumber} from '../../cfg/regions';
import {IInitializationService} from '../init/initialization.interface';
import {Optional} from 'angular2/core';
import {SettingsDataType} from '../settings.interface';

@Injectable()
class InMemorySettingsService implements SettingsDAO {
    constructor(
        @Inject(TeamsDAO)
        private dao: TeamsDAO,
        @Optional() @Inject(IInitializationService)
        private initializer:IInitializationService
    ) {}

    public teams:Set<string> = new Set<string>();

    public region:number = undefined;

    getSavedTeamIDs(): Promise<string[]> {
        let teamArray: string[] = [];
        this.teams.forEach((team:string) => teamArray.push(team));
        return Promise.resolve(teamArray);
    }

    getSavedTeams(): Promise<Team[]> {
        return this.getSavedTeamIDs().then((teamList:string[]) => this.dao.getTeams(teamList));
    }

    saveTeam(team: string): Promise<void> {
        this.teams.add(team);
        return Promise.resolve();
    }

    unSaveTeam(team: string): Promise<void> {
        this.teams.delete(team);
        return Promise.resolve();
    }

    isTeamSaved(team: string): Promise<boolean> {
        return Promise.resolve(this.teams.has(team));
    }

    clearSavedTeams(): Promise<void> {
        this.teams.clear();
        return Promise.resolve();
    }

    getRegionNumber(): Promise<number> {
        return Promise.resolve(this.region);
    }

    getRegion(): Promise<Region> {
        return Promise.resolve(getRegionByNumber(this.region));
    }

    setRegion(region: number): Promise<void> {
        this.region = region;
        return Promise.resolve();
    }

    init(): Promise<void> {
        if(this.initializer === null) {
            return Promise.resolve();
        }

        return this.initializer.getSettings().then((preset:SettingsDataType) => {
            this.region = preset.regionNumber;
            this.teams = new Set<string>(preset.savedTeams);
        });
    }

    isAppConfigured(): boolean {
        return typeof this.region !== 'undefined';
    }

    reset(): Promise<void> {
        this.region = undefined;
        this.teams = new Set<string>();
        return Promise.resolve();
    }
}

export { InMemorySettingsService as default, InMemorySettingsService, SettingsDAO }
