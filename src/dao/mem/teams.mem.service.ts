import TeamsDAO, {Team, Division} from '../teams.interface';
import {Gender} from '../../cfg/gender';
import {checkPresent} from '../../app/util';

class InMemoryTeamsService implements TeamsDAO {
    public teams: Map<String,Team> = new Map<String,Team>();
    public teamsArray: Team[] = [];

    //Mock-specific
    public prepopulate() {
        this.init([
            new Team('A', 'coachA', 'telA', Division.fromString('U10B'), 49),
            new Team('B', 'coachB', 'telB', Division.fromString('U10B'), 49),
            new Team('C', 'coachC', 'telC', Division.fromString('U10B'), 49),
            new Team('D', 'coachD', 'telD', Division.fromString('U10B'), 49),
        ]);
    }

    constructor() {
        this.prepopulate();
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

    /**
     * @returns {Promise<Number>} length of teams array
     */
    init(teams: Team[]): Promise<any> {
        this.teams.clear();
        this.teamsArray = teams;
        this.teamsArray.forEach(team => this.teams.set(team.code, team));
        return new Promise<Number>(resolve => resolve(this.teamsArray.length));
    }

    clear(): Promise<void> {
        this.teams.clear();
        this.teamsArray = [];
        return new Promise<void>(resolve => resolve());
    }

    update(updates:Map<String,Team>): Promise<any> {
        let toDelete:Set<String> = new Set<String>();
        updates.forEach((v,k) => {
            if(!this.teams.has(k)) {
                if(v === null) {
                    //Collect delete entries so that can use a single pass
                    this.teams.delete(k);
                    toDelete.add(k);
                } else {
                    this.teams.set(k,v);
                    this.teamsArray.push(v);
                }
            }
        });
        if(toDelete.size > 0) {
            this.teamsArray = this.teamsArray.filter((team:Team) => !toDelete.has(team.code));
        }
        return new Promise<void>(resolve => resolve());
    }
}

export { InMemoryTeamsService as default, InMemoryTeamsService, TeamsDAO, Team }
