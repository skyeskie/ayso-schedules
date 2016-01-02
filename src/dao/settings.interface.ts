import Team from '../models/team';
import Region from "../models/region";

interface SettingsDAO {
    (): Promise<Team[]>;

    /**
     * @function saveTeam
     * @desc Saves a team as a favorite.
     * If team already saved, does no-op to prevent duplicates
     * @param {String} team - unique ID for team
     */
    saveTeam(team: Team): void;

    /**
     * @function unSaveTeam
     * @desc Removes a team from favorites.
     * Checks all items so will remove all if there are duplicates
     * @param {String} team - unique ID of team to remove
     */
    unSaveTeam(team: Team): void;

    /**
     * @function isTeamSaved
     * @desc Checks if team is saved
     * @param {String} team - unique ID of team
     */
    isTeamSaved(team: Team): Promise<boolean>;

    /**
     * @function clearSavedTeams
     * @desc Removes all teams from saved list
     */
    clearSavedTeams(): void;

    /**
     * @function getRegion
     * @desc Gets the saved region configuration
     * @returns {String} the region ID
     */
    getRegion(): Promise<Region>;

    /**
     * @function setRegion
     * @desc Persists the current region to configuration
     * @param {String} region - the region ID
     */
    setRegion(region: Region): void;
}

export default SettingsDAO;
