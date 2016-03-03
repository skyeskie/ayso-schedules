import TeamsDAO, {Team, Division} from '../teams.interface';
import {Gender} from '../../models/gender';
import {checkPresent} from '../../app/util';
import {Inject, Optional} from 'angular2/core';
import {IBackend} from '../init/backend.interface.ts';
import {ClassLogger, Logger, Level} from '../../service/log.decorator';

class InMemoryTeamsService implements TeamsDAO {
    @ClassLogger public log: Logger;

    public initialized:boolean;
    private initializePromise: Promise<any> = null;
    private teams: Map<string,Team> = new Map<string,Team>();

    getTeam(id: string): Promise<Team> {
        //if(!this.initialized) {
        //    this.log.debug('Waiting until after init for getTeam()');
        //    return this.initializePromise.then(() => this.getTeam(id));
        //}

        return new Promise<Team>((resolve:any, reject:any) => {
            let team = this.teams.get(id);
            if(typeof team === 'undefined') {
                reject(new RangeError('Could not find team with ID: ' + id));
            }
            resolve(this.teams.get(id));
        });
    }

    getTeams(ids: string[]): Promise<Team[]> {
        //if(!this.initialized) {
        //    this.log.debug('Waiting until after init for getTeams()');
        //    return this.initializePromise.then(() => this.getTeams(ids));
        //}

        return Promise.resolve(
            ids.filter((id:string) => this.teams.has(id)).map((id:string) => this.teams.get(id))
        );
    }

    findTeams(regionNumber?: number, ageString?: string, genderLong?: string): Promise<Team[]> {
        //if(!this.initialized) {
        //    this.log.debug('Waiting until after init for findTeams()');
        //    return this.initializePromise.then(() => this.findTeams(regionNumber, ageString, genderLong));
        //}

        let results:Team[] = [];
        this.teams.forEach((team:Team) => {
            if(checkPresent(regionNumber) && regionNumber !== team.regionNumber) {
                return;
            }

            if(checkPresent(ageString) && team.division.age.toString() !== ageString) {
                this.log.trace('exit on age mismatch:', ageString,'/', team.division.age);
                return;
            }

            if(checkPresent(genderLong) && team.division.gender.long !== genderLong) {
                this.log.trace('exit on gender mismatch: ', genderLong, '/', team.division.gender.long);
                return;
            }

            //Checks above are for NEGATIVE match and will exit function if met
            results.push(team);
        });

        return Promise.resolve(results);
    }

    clear(): Promise<void> {
        this.teams.clear();
        return Promise.resolve();
    }

    add(updates:Team[]): Promise<number> {
        updates.forEach((team:Team) => {
            if(isNaN(team.regionNumber)) {
                this.teams.delete(team.coach);
            } else {
                this.teams.set(team.code, team);
            }
        });

        return Promise.resolve(this.teams.size);
    }
}

export { InMemoryTeamsService as default, InMemoryTeamsService, TeamsDAO, Team }
