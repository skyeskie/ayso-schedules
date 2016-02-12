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
        private initializer?:IInitializationService
    ) {}

    public teams = new Set<String>();

    public region:Number = undefined;

    getSavedTeamIDs(): Promise<String[]> {
        return new Promise<String[]>(resolve => {
            let teamArray: String[] = [];
            this.teams.forEach((team) => teamArray.push(team));
            resolve(teamArray);
        });
    }

    getSavedTeams(): Promise<Team[]> {
        return new Promise<Team[]>(resolve => {
            this.getSavedTeamIDs().then((teamList) => {
                resolve(this.dao.getTeams(teamList));
            });
        });
    }

    saveTeam(team: String): Promise<void> {
        this.teams.add(team);
        return Promise.resolve();
    }

    unSaveTeam(team: String): Promise<void> {
        this.teams.delete(team);
        return Promise.resolve();
    }

    isTeamSaved(team: String): Promise<boolean> {
        return new Promise<Boolean>(resolve =>
            resolve(this.teams.has(team))
        );
    }

    clearSavedTeams(): Promise<void> {
        this.teams.clear();
        return Promise.resolve();
    }

    getRegionNumber(): Promise<Number> {
        return new Promise<Number>(resolve =>
            resolve(this.region)
        );
    }

    getRegion(): Promise<Region> {
        return new Promise<Region>(resolve =>
            resolve(getRegionByNumber(this.region))
        );
    }

    setRegion(region: Number): Promise<void> {
        this.region = region;
        return Promise.resolve();
    }

    init(): Promise<void> {
        if(this.initializer === null) {
            return Promise.resolve();
        }

        return this.initializer.getSettings().then((preset:SettingsDataType) => {
            this.region = preset.regionNumber;
            this.teams = new Set<String>(preset.savedTeams);
        });
    }

    isAppConfigured(): boolean {
        return typeof this.region !== 'undefined';
    }

    reset(): Promise<void> {
        this.region = undefined;
        this.teams = new Set<String>();
        return Promise.resolve();
    }

}

export { InMemorySettingsService as default, InMemorySettingsService, SettingsDAO }
