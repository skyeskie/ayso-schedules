import Team from "../models/team";
import Region from '../models/region';
import Division from '../models/division';

interface TeamsDAO {
    getTeam(id: String): Promise<Team>;

    findTeams(region: Region, division: Division): Promise<Team[]>;
}

export {TeamsDAO as default, TeamsDAO, Team, Region, Division};
