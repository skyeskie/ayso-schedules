import SettingsDAO, {Region, Team} from '../settings.interface';

export default class MockSettingsService implements SettingsDAO {
    public team1 = new Team('home', 'coach1,', '123');
    public team2 = new Team('away', 'coach2', '345');
    public teams = [this.team1, this.team2];

    public region = new Region(1, 100, 'c','d', 10, 20);

    getSavedTeams(): Promise<Team[]> {
        return new Promise<Team[]>(resolve =>
            resolve(this.teams)
        );
    }

    saveTeam(team: Team): void {}

    unSaveTeam(team: Team): void {}

    isTeamSaved(team: Team): Promise<boolean> {
        return new Promise<Boolean>(resolve =>
            resolve(true)
        );
    }

    clearSavedTeams(): void {}

    getRegion(): Promise<Region> {
        return new Promise<Region>(resolve =>
            resolve(this.region)
        );
    }

    setRegion(region: Region): void {}

    reset(): void {}

}
