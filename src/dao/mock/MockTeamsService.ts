import TeamsDAO, {Team, Division} from '../teams.interface';
import {Gender} from '../../cfg/gender';
import {checkPresent} from '../../app/util';

class MockTeamsService implements TeamsDAO {
    public teams: Map<String,Team> = new Map<String,Team>();
    public teamsArray: Team[] = [
        new Team('A', 'coachA', 'telA', Division.fromString('U10B'), 49),
        new Team('B', 'coachB', 'telB', Division.fromString('U10B'), 49),
        new Team('C', 'coachC', 'telC', Division.fromString('U10B'), 49),
        new Team('D', 'coachD', 'telD', Division.fromString('U10B'), 49),
    ];

    constructor() {
        this.teamsArray.forEach(team => this.teams.set(team.code, team));
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

    findTeams(regionNumber?: String, ageString?: String, genderLong?: String): Promise<Team[]> {
        return new Promise<Team[]>(resolve => {
            resolve(this.teamsArray.filter((team:Team) => {
                if(checkPresent(regionNumber) && regionNumber !== team.regionNumber.toString()) {
                    return false;
                }

                if(checkPresent(ageString) && team.division.age.toString() !== ageString) {
                    console.log('exit on age mismatch: '+ageString+'/'+team.division.age);
                    return false;
                }

                if(checkPresent(genderLong) && team.division.gender.long !== genderLong) {
                    console.log('exit on gender mismatch: '+genderLong+'/'+team.division.gender.long);
                    return false;
                }

                return true;
            }));
        });
    }

    reset(): void {
        console.log("Called RESET");
    }

    update(force: boolean): void {
        console.log("Called UPDATE(" + force + ")");
    }
}

export { MockTeamsService as default, MockTeamsService, TeamsDAO, Team }
