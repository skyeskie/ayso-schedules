import TeamsDAO, {Team, Region, Division} from '../teams.interface';

export default class MockTeamsService implements TeamsDAO {
    public team1 = new Team('home', 'coach1,', '123');
    public team2 = new Team('away', 'coach2', '345');
    public teams = [this.team1, this.team2];

    getTeam(id: String): Promise<Team> {
        return new Promise<Team>(resolve =>
            resolve(this.team1)
        );
    }

    findTeams(region: Region, division: Division): Promise<Team[]> {
        return new Promise<Team[]>(resolve =>
            resolve(this.teams)
        );
    }

    reset(): void {}

    update(force: boolean): void {}
}
