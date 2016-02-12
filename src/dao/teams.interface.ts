import Team from '../models/team';
import Region from '../models/region';
import Division from '../models/division';
import {OpaqueToken} from 'angular2/core';

interface TeamsDAO {
    /**
     * Gets single team
     * @param id - `Team.code`
     * Errors in Promise.reject and not thrown
     */
    getTeam(id: String): Promise<Team>;

    /**
     * Gets multiple teams by direct lookup
     * @param ids - Array of team codes (`Team.code`)
     * Errors in Promise.reject and not thrown
     */
    getTeams(ids: String[]): Promise<Team[]>;

    /**
     * Gets multiple teams by search
     * @param regionNumber (optional) - `Region.number`
     * @param ageString (optional) - format U# - see `AgeGroup.toString()`
     * @param genderLong (optional) - `Gender.long`
     * If parameters are undefined or `null`, any value for that field works
     * Errors in Promise.reject and not thrown
     */
    findTeams(regionNumber?: String, ageString?: String, genderLong?: String): Promise<Team[]>;

    /**
     * Initializes data store with data
     * If data store is Read-Only, this should be a no-op
     *
     *  Optionally, implementation may return init details in promise
     */
    init(): Promise<any>;

    /**
     * Clears all saved data.
     */
    clear(): Promise<void>;

    /**
     * Hook to have DAO update itself from backend
     * @param updates - map of ID to updates
     *  - Will overwrite provided IDs
     *  - If `null` is provided game, delete entry
     *
     *  Optionally, implementation may return update details in promise
     */
    update(updates:Map<String,Team>): Promise<any>;
}

var TeamsDAO = new OpaqueToken('TeamsDAO');
export {TeamsDAO as default, TeamsDAO, Team, Region, Division};
