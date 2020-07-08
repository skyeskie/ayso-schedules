import { InjectionToken } from '@angular/core';

import Division from '../models/division';
import Region from '../models/region';
import Team from '../models/team';

interface ITeamsDAO {
    /**
     * Gets single team
     * @param id - `Team.code`
     * Errors in Promise.reject and not thrown
     */
    getTeam(id: string): Promise<Team>;

    /**
     * Gets multiple teams by direct lookup
     * @param ids - Array of team codes (`Team.code`)
     * Errors in Promise.reject and not thrown
     */
    getTeams(ids: string[]): Promise<Team[]>;

    /**
     * Gets multiple teams by search
     * @param regionNumber (optional) - `Region.number`
     * @param ageString (optional) - format U# - see `AgeGroup.toString()`
     * @param genderLong (optional) - `Gender.long`
     * If parameters are undefined or `null`, any value for that field works
     * Errors in Promise.reject and not thrown
     */
    findTeams(regionNumber?: number, ageString?: string, genderLong?: string): Promise<Team[]>;

    /**
     * Clears all saved data.
     */
    clear(): Promise<void>;

    add(teams: Team[]): Promise<any>;
}

const TeamsDAO = new InjectionToken<ITeamsDAO>('ITeamsDAO');
export { ITeamsDAO, TeamsDAO, Team, Region, Division };
