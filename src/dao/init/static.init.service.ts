
import {IInitializationService} from './initialization.interface';
import {SettingsDataType} from '../settings.interface';

import Game from '../../models/game';
import Division from '../../models/division';
import Team from '../../models/team';

class StaticInitializationService implements IInitializationService {
    //Map<StartDate,Date[]>
    weeks:Date[] = [
        new Date(2016, 1, 31),
        new Date(2016, 2, 7),
        new Date(2016, 2, 9),
        new Date(2016, 3, 7),
    ];

    games:Game[] = [
        new Game('111', 'A','B', 1, this.makeTime(0,8), 49, 'map', Division.fromString('U10B')),
        new Game('112','C','D', 1, this.makeTime(0,8), 49, 'map2', Division.fromString('U10B')),
        new Game('121','A','C', 1, this.makeTime(0,10), 49, 'map', Division.fromString('U10B')),
        new Game('122','B','D', 1, this.makeTime(0,10), 49, 'map2', Division.fromString('U10B')),
        new Game('231','A','D', 2, this.makeTime(1,12), 208, 'map', Division.fromString('U10B')),
        new Game('232','C','B', 2, this.makeTime(1,12), 208, 'map2', Division.fromString('U10B')),
    ];

    teams:Team[] = [
        new Team('A', 'coachA', 'telA', Division.fromString('U10B'), 49),
        new Team('B', 'coachB', 'telB', Division.fromString('U10B'), 49),
        new Team('C', 'coachC', 'telC', Division.fromString('U10B'), 49),
        new Team('D', 'coachD', 'telD', Division.fromString('U10B'), 49),
    ];

    settings:SettingsDataType = {
        regionNumber: 49,
        savedTeams: ['A', 'C'],
    };

    makeTime(week:number, hour:number) {
        return new Date(this.weeks[week].valueOf() + hour*60*60);
    }

    getTeams(): Promise<Team[]> {
        return Promise.resolve(this.teams);
    }

    getGames(): Promise<Game[]> {
        return Promise.resolve(this.games);
    };

    getWeekStarts(): Promise<Date[]> {
        return Promise.resolve(this.weeks);
    }

    getSettings(): Promise<SettingsDataType> {
        return Promise.resolve(this.settings);
    };

    //No-op since static. Init contains all games
    getGameUpdates(): Promise<Game[]> {
        return Promise.resolve([]);
    };

    //No-op since static. Init contains all teams
    getTeamUpdates(): Promise<Team[]> {
        return Promise.resolve([]);
    };
}

export { StaticInitializationService, StaticInitializationService as default, IInitializationService };
