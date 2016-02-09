import {Inject, Injectable} from 'angular2/core';

import {TeamsDAO} from '../teams.interface';
import SettingsDAO, {Region, Team} from '../settings.interface';
import {getRegionByNumber} from '../../cfg/regions';

@Injectable()
class MockSettingsService implements SettingsDAO {
    constructor(
        @Inject(TeamsDAO)
        private dao: TeamsDAO
    ) {}

    public teams = new Set<String>(['A','C']);

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

    saveTeam(team: String): void {
        this.teams.add(team);
    }

    unSaveTeam(team: String): void {
        this.teams.delete(team);
    }

    isTeamSaved(team: String): Promise<boolean> {
        return new Promise<Boolean>(resolve =>
            resolve(this.teams.has(team))
        );
    }

    clearSavedTeams(): void {
        this.teams.clear();
    }

    getRegionNumber(): Promise<Number> {
        console.log('Called getRegionNumber(). Region is: ' + this.region);
        return new Promise<Number>(resolve =>
            resolve(this.region)
        );
    }

    getRegion(): Promise<Region> {
        return new Promise<Region>(resolve =>
            resolve(getRegionByNumber(this.region))
        );
    }

    setRegion(region: Number): void {
        console.log('Called setRegion(' + region + ')');
        this.region = region;
    }

    isAppConfigured() {
        return typeof this.region !== 'undefined';
    }

    reset(): void {
        this.region = undefined;
        this.teams = new Set<String>(['A','C']);
    }

}

export { MockSettingsService as default, MockSettingsService, SettingsDAO }
