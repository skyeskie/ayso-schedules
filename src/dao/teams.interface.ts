import Team from "../models/team";
import Region from '../models/region';
import Division from '../models/division';
import {OpaqueToken} from 'angular2/core';

interface TeamsDAO {
    getTeam(id: String): Promise<Team>;

    getTeams(ids: String[]): Promise<Team[]>;

    findTeams(regionNumber?: Number, division?: Division): Promise<Team[]>;

    reset(): void;

    update(force: boolean): void;
}

var TeamsDAO = new OpaqueToken("TeamsDAO");
export {TeamsDAO as default, TeamsDAO, Team, Region, Division};
