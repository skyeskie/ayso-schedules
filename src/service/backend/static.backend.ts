import {IBackend} from './../../dao/backend.interface';
import {SettingsDataType} from '../../dao/settings.interface';
import Game from '../../models/game';
import {Division} from '../../models/division';
import Team from '../../models/team';
import {CFG} from '../../app/cfg';

CFG.init();

const weeks: Date[] = [
    new Date(2016, 1, 31),
    new Date(2016, 2, 7),
    new Date(2016, 2, 9),
    new Date(2016, 3, 7),
];

const games:Game[] = [
    new Game('111', 'A','B', 1, makeTime(0,8), 49, 'map', Division.fromString('U10B')),
    new Game('112','C','D', 1, makeTime(0,8), 49, 'map2', Division.fromString('U10B')),
    new Game('121','A','C', 1, makeTime(0,10), 49, 'map', Division.fromString('U10B')),
    new Game('122','B','D', 1, makeTime(0,10), 49, 'map2', Division.fromString('U10B')),
    new Game('231','A','D', 2, makeTime(1,12), 208, 'map', Division.fromString('U10B')),
    new Game('232','C','B', 2, makeTime(1,12), 208, 'map2', Division.fromString('U10B')),

    new Game('311', 'E','H', 1, makeTime(0,8), 49, 'map', Division.fromString('U12G')),
    new Game('312','I','J', 1, makeTime(0,8), 49, 'map2', Division.fromString('U12G')),
    new Game('321','E','I', 1, makeTime(0,10), 49, 'map', Division.fromString('U12G')),
    new Game('322','H','J', 1, makeTime(0,10), 49, 'map2', Division.fromString('U12G')),
    new Game('431','E','J', 2, makeTime(1,12), 208, 'map', Division.fromString('U12G')),
    new Game('432','I','H', 2, makeTime(1,12), 208, 'map2', Division.fromString('U12G')),
];

function makeTime(week:number, hour:number) {
    return new Date(weeks[week].valueOf() + hour*60*60);
}

class StaticInitializationService implements IBackend {
    //Map<StartDate,Date[]>
    weeks:Date[] = weeks;

    weeksSaved:string = '1456905600000,1457337600000,1457510400000,1460012400000';

    games:Game[] = games;

    gamesJSON:string = '['
        + '{"id":"111","homeTeam":"A","awayTeam":"B","weekNum":1,"startTime":"2016-03-02T08:00:28.800Z","region":49,"field":"map","divis":"U10B"},'
        + '{"id":"112","homeTeam":"C","awayTeam":"D","weekNum":1,"startTime":"2016-03-02T08:00:28.800Z","region":49,"field":"map2","divis":"U10B"},'
        + '{"id":"121","homeTeam":"A","awayTeam":"C","weekNum":1,"startTime":"2016-03-02T08:00:36.000Z","region":49,"field":"map","divis":"U10B"},'
        + '{"id":"122","homeTeam":"B","awayTeam":"D","weekNum":1,"startTime":"2016-03-02T08:00:36.000Z","region":49,"field":"map2","divis":"U10B"},'
        + '{"id":"231","homeTeam":"A","awayTeam":"D","weekNum":2,"startTime":"2016-03-07T08:00:43.200Z","region":208,"field":"map","divis":"U10B"},'
        + '{"id":"232","homeTeam":"C","awayTeam":"B","weekNum":2,"startTime":"2016-03-07T08:00:43.200Z","region":208,"field":"map2","divis":"U10B"},'
        + '{"id":"311","homeTeam":"E","awayTeam":"H","weekNum":1,"startTime":"2016-03-02T08:00:28.800Z","region":49,"field":"map","divis":"U12G"},'
        + '{"id":"312","homeTeam":"I","awayTeam":"J","weekNum":1,"startTime":"2016-03-02T08:00:28.800Z","region":49,"field":"map2","divis":"U12G"},'
        + '{"id":"321","homeTeam":"E","awayTeam":"I","weekNum":1,"startTime":"2016-03-02T08:00:36.000Z","region":49,"field":"map","divis":"U12G"},'
        + '{"id":"322","homeTeam":"H","awayTeam":"J","weekNum":1,"startTime":"2016-03-02T08:00:36.000Z","region":49,"field":"map2","divis":"U12G"},'
        + '{"id":"431","homeTeam":"E","awayTeam":"J","weekNum":2,"startTime":"2016-03-07T08:00:43.200Z","region":208,"field":"map","divis":"U12G"},'
        + '{"id":"432","homeTeam":"I","awayTeam":"H","weekNum":2,"startTime":"2016-03-07T08:00:43.200Z","region":208,"field":"map2","divis":"U12G"}]';

    teams:Team[] = [
        new Team('A', 'coachA', 'telA', Division.fromString('U10B'), 49),
        new Team('B', 'coachB', 'telB', Division.fromString('U10B'), 49),
        new Team('C', 'coachC', 'telC', Division.fromString('U10B'), 208),
        new Team('D', 'coachD', 'telD', Division.fromString('U10B'), 208),

        new Team('E', 'coachE', 'telE', Division.fromString('U10G'), 49),
        new Team('F', 'coachA', 'telF', Division.fromString('U12G'), 49),
        new Team('G', 'coachG', 'telG', Division.fromString('U12B'), 208),
        new Team('H', 'coachH', 'telH', Division.fromString('U12G'), 49),
        new Team('I', 'coachI', 'telH', Division.fromString('U12G'), 49),
        new Team('J', 'coachJ', 'telH', Division.fromString('U12G'), 49),
    ];

    teamsJSON:String = '['
        + '{"code":"A","coach":"coachA","coachTel":"telA","division":"U10B","regionNumber":49},'
        + '{"code":"B","coach":"coachB","coachTel":"telB","division":"U10B","regionNumber":49},'
        + '{"code":"C","coach":"coachC","coachTel":"telC","division":"U10B","regionNumber":208},'
        + '{"code":"D","coach":"coachD","coachTel":"telD","division":"U10B","regionNumber":208},'
        + '{"code":"E","coach":"coachE","coachTel":"telE","division":"U10G","regionNumber":49},'
        + '{"code":"F","coach":"coachA","coachTel":"telF","division":"U12G","regionNumber":49},'
        + '{"code":"G","coach":"coachG","coachTel":"telG","division":"U12B","regionNumber":208},'
        + '{"code":"H","coach":"coachH","coachTel":"telH","division":"U12G","regionNumber":49},'
        + '{"code":"I","coach":"coachI","coachTel":"telH","division":"U12G","regionNumber":49},'
        + '{"code":"J","coach":"coachJ","coachTel":"telH","division":"U12G","regionNumber":49}]';

    settings:SettingsDataType = {
        regionNumber: 49,
        savedTeams: ['A', 'C'],
    };

    init(updateParams?:any): Promise<any> {
        return Promise.resolve();
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

    getDataVersion(): Promise<string> {
        return Promise.resolve('1');
    }
}

export { StaticInitializationService, StaticInitializationService as default, IBackend };
