import {Observable} from 'rxjs/Observable';
import {OpaqueToken} from 'angular2/core';

import Team from '../../models/team';
import Game from '../../models/game';
import {SettingsDataType} from './../settings.interface.ts';

/**
 * Interface for DAOs to load initial data for saving to local storage
 * Needed for
 */
interface IInitializationService {
    getTeams(updateParams?:any): Promise<Team[]>;
    getGames(updateParams?:any): Promise<Game[]>;
    getWeekStarts(updateParams?:any): Promise<Date[]>;
    getSettings(updateParams?:any): Promise<SettingsDataType>;

    //Only games and teams are provided with incremental updates
    //These can probably be rolled into the functions above
    //getGameUpdates(): Promise<Team[]>;
    //getTeamUpdates(): Promise<Game[]>;
}

var IInitializationService = new OpaqueToken('IInitializationService');
export { IInitializationService as default, IInitializationService }
