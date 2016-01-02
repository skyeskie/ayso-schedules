import Team from "../models/team";

interface TeamsDAO {
    getTeam(id: String): Promise<Team>;
}

export default TeamsDAO;
