import SettingsDAO, {Region, Team} from '../settings.interface';
import {getRegionByNumber} from '../../cfg/regions';
import {REGIONS} from '../../cfg/regions';
import MockTeamsService from './MockTeamsService';
import {Injectable} from 'angular2/core';
import {Inject} from 'angular2/core';
import {TeamsDAO} from '../teams.interface';

@Injectable()
export default class MockSettingsService implements SettingsDAO {
    constructor(
        @Inject(MockTeamsService)
        private dao: TeamsDAO
    ) {}

    public teams = new Set<String>(['A','C']);

    public region = REGIONS[1].number;

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
        this.region = region;
    }

    reset(): void {
        this.region = REGIONS[1].number;
        this.teams = new Set<String>(['A','C']);
    }

}
