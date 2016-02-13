import TeamsDAO, {Team, Division} from '../teams.interface';
import {Gender} from '../../cfg/gender';
import {checkPresent} from '../../app/util';
import {Inject, Optional} from 'angular2/core';
import {IInitializationService} from '../init/initialization.interface';
import {ClassLogger, Logger, Level} from '../../service/log.decorator';

class InMemoryTeamsService implements TeamsDAO {
    @ClassLogger public log: Logger;

    public teams: Map<String,Team> = new Map<String,Team>();
    public teamsArray: Team[] = [];

    constructor(
        @Optional() @Inject(IInitializationService)
        private initializer
    ) {
        //No-op
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
        return Promise.resolve(ids.filter(id => this.teams.has(id))
                                  .map(id => this.teams.get(id)));
    }

    findTeams(regionNumber?: String, ageString?: String, genderLong?: String): Promise<Team[]> {
        return new Promise<Team[]>(resolve => {
            resolve(this.teamsArray.filter((team:Team) => {
                if(checkPresent(regionNumber) && regionNumber !== team.regionNumber.toString()) {
                    return false;
                }

                if(checkPresent(ageString) && team.division.age.toString() !== ageString) {
                    this.log.trace('exit on age mismatch:', ageString,'/', team.division.age);
                    return false;
                }

                if(checkPresent(genderLong) && team.division.gender.long !== genderLong) {
                    this.log.trace('exit on gender mismatch: ', genderLong, '/', team.division.gender.long);
                    return false;
                }

                return true;
            }));
        });
    }

    /**
     * @returns {Promise<Number>} length of teams array
     */
    init(): Promise<any> {
        this.clear();
        if(this.initializer === null) {
            return Promise.resolve(0);
        }
        return this.initializer.getTeams().then(teams => {
            this.teamsArray = teams;
            this.teamsArray.forEach(team => this.teams.set(team.code, team));
            return Promise.resolve(teams.length);
        });
    }

    clear(): Promise<void> {
        this.teams.clear();
        this.teamsArray = [];
        return Promise.resolve();
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
        return Promise.resolve();
    }
}

export { InMemoryTeamsService as default, InMemoryTeamsService, TeamsDAO, Team }
