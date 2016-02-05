import TeamsDAO, {Team, Region, Division} from '../teams.interface';


export default class MockTeamsService implements TeamsDAO {
    public teams: Map<String,Team> = new Map<String,Team>();

    private static getMockData() {
        let teams = new Map<String,Team>();
        teams.set('A', new Team('A', 'coachA', 'telA', Division.fromString('U10B')));
        teams.set('B', new Team('B', 'coachB', 'telB', Division.fromString('U10B')));
        teams.set('C', new Team('C', 'coachC', 'telC', Division.fromString('U10B')));
        teams.set('D', new Team('D', 'coachD', 'telD', Division.fromString('U10B')));
        return teams;
    }

    constructor() {
        this.teams = MockTeamsService.getMockData();
    }

    getTeam(id: String): Promise<Team> {
        return new Promise<Team>((resolve, reject) => {
            let team = this.teams.get(id);
            if(typeof team === 'undefined') {
                reject(new RangeError('Could not find team with ID: ' + id));
            }
            resolve(this.teams.get(id));
        });
    }

    getTeams(ids: String[]): Promise<Team[]> {
        return new Promise<Team[]>(resolve =>
            resolve(ids.filter(id => this.teams.has(id)).map(id => this.teams.get(id)))
        );
    }

    //TODO: We'll need to actually set teams with region/division/gender
    findTeams(regionNumber?: Number, division?: Division): Promise<Team[]> {
        return new Promise<Team[]>(resolve => {
            let ret: Team[] = [];
            this.teams.forEach((team) => {
                if((!regionNumber && team.regionNumber === regionNumber) ||
                    (!division && team.division === division)) {
                    ret.push(team);
                }
            });
            return ret;
        });
    }

    reset(): void {
        console.log("Called RESET");
    }

    update(force: boolean): void {
        console.log("Called UPDATE(" + force + ")");
    }
}
