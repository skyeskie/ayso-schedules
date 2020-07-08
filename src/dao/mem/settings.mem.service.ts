import { Inject, Injectable } from '@angular/core';

import { Region, SettingsDAO, SettingsDataType, SettingsInterface } from '../settings.interface';
import { ITeamsDAO, Team, TeamsDAO } from '../teams.interface';

@Injectable({providedIn: 'root'})
class InMemorySettingsService implements SettingsInterface {
    public teams: Set<string> = new Set<string>();

    public region: number = undefined;

    constructor(
        @Inject(TeamsDAO)
        private dao: ITeamsDAO,
    ) {}

    getSavedTeamIDs(): Promise<string[]> {
        const teamArray: string[] = [];
        this.teams.forEach((team: string) => teamArray.push(team));
        return Promise.resolve(teamArray);
    }

    getSavedTeams(): Promise<Team[]> {
        return this.getSavedTeamIDs().then((teamList: string[]) => this.dao.getTeams(teamList));
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
        return Promise.resolve(Region.fromNumber(this.region));
    }

    setRegion(region: number): Promise<void> {
        this.region = region;
        return Promise.resolve();
    }

    init(preset: SettingsDataType): Promise<void> {
        this.region = preset.regionNumber;
        this.teams = new Set<string>();
        if (typeof preset.savedTeams !== 'undefined') {
            preset.savedTeams.forEach((team: string) => this.teams.add(team));
        }

        return Promise.resolve();
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

const IN_MEM_SETTINGS_PROVIDER = { provide: SettingsDAO, useClass: InMemorySettingsService };

export { IN_MEM_SETTINGS_PROVIDER, InMemorySettingsService, SettingsDAO };
