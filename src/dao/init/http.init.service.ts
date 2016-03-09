import {Http, Response} from 'angular2/http';
import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Observable';

import {ReplaySubject} from 'rxjs/Rx';
import {Subscriber} from 'rxjs/Subscriber';

import Division from '../../models/division';
import Game from '../../models/game';
import Gender from '../../models/gender';
import Region from '../../models/region';
import Team from '../../models/team';

import {IBackend} from './backend.interface.ts';
import {SettingsDataType} from '../settings.interface';
import {ClassLogger, Logger, Level} from '../../service/log.decorator';
import {AgeGroup} from '../../models/ageGroup';
import {Inject} from 'angular2/core';
import {ILocalStorage} from '../ls/local-storage.interface';
import {RequestOptions} from 'angular2/http';
import {URLSearchParams} from 'angular2/http';
import {Request} from 'angular2/http';
import {RequestMethod} from 'angular2/http';
import {GamesDAO} from '../games.interface';
import {CFG} from '../../app/cfg';

//TODO: Make server types match so can remove
type ServerCoach = {
    ID:string, Divis:string, TeamNo:string,
    Coach:string, Phone:string,
};
type ServerGame = {
    ID:string, Home:string, Away:string,
    Week:string, Jour:string, Heur:string,
    Divis:string, Field:string,
};
type ServerJSON = {
    Version:string,
    Error:string,
    Games:ServerGame[],
    Coaches:ServerCoach[],
};

const DATA_VERSION_KEY = 'ayso-data-version';

@Injectable()
class HttpInitService implements IBackend {
    @ClassLogger() public log: Logger;

    public remoteObservable:Observable<Response>;
    public dataObservable:ReplaySubject<ServerJSON> = new ReplaySubject<ServerJSON>();

    private http:Http;
    private ls:ILocalStorage;

    constructor(
        http:Http,
        @Inject(ILocalStorage) ls:ILocalStorage
    ) {
        this.http = http;
        this.ls = ls;
    }

    init(curVersion: string = null): Promise<void> {
        if(curVersion === null) {
            //Get full data
            this.remoteObservable = this.http.get(CFG.URL);
        } else {
            //Get update
            let params = new URLSearchParams();
            params.set('lastUpdate', curVersion);
            this.remoteObservable = this.http.get(CFG.URL, new RequestOptions({search: params}));
        }

        this.dataObservable = new ReplaySubject<ServerJSON>(1);

        this.remoteObservable.map((response:Response) => {
            if(response.status < 200 || response.status > 299) {
                this.log.error('Response not OK', response);
                throw new Error(response.status + ' ' + response.statusText);
            }
            this.log.debug(response);
            let data = response.json();
            this.ls.setItem(DATA_VERSION_KEY, data.Version);
            return data;
        }).subscribe(this.dataObservable);

        //Pulled by observable, so just return promise immediately
        return Promise.resolve();
    }

    getTeams(): Promise<Team[]> {
        return this.dataObservable
                   .map((data:ServerJSON) => data.Coaches)
                   .map((coaches:ServerCoach[]) => {
                       return coaches.map(ModelTranslation.translateCoach);
                   }).toPromise();
    }

    getGames(): Promise<Game[]> {
        return this.dataObservable
                   .map((data:ServerJSON) => data.Games)
                   .map((games:ServerGame[]) => {
                       return games.map(ModelTranslation.translateGame);
                   }).toPromise();
    };

    getWeekStarts(): Promise<Date[]> {
        return Promise.resolve<Date[]>(null);
    }

    getSettings(): Promise<SettingsDataType> {
        return Promise.resolve({});
    };

    getDataVersion(): Promise<string> {
        return this.dataObservable.map((data:ServerJSON) => data.Version).toPromise();
    }
}

//TODO: Make models on server match so can remove this
class ModelTranslation {
    static translateCoach(coach: ServerCoach): Team {
        try {
            return new Team(
                coach.TeamNo,
                coach.Coach,
                coach.Phone,
                ModelTranslation.divisionFromCode(coach.Divis),
                Region.fromId(Number.parseInt(coach.TeamNo[0], 10)).number
            );
        } catch (err) {
            console.error('Team translation error', coach, err);
        }
    }

    static translateGame(game: ServerGame): Game {
        try {
            let location = game.Field.match(/([0-9]*) ?(Field)? ?(.*)/);
            return new Game(
                game.ID,
                game.Home,
                game.Away,
                parseInt(game.Week, 10),
                new Date(Date.parse(game.Jour + ' ' + game.Heur)),
                parseInt(location[1],10),
                location[3],
                ModelTranslation.divisionFromCode(game.Divis)
            );
        } catch (err) {
            console.error('Game translation error', game, err);
        }
    }

    static divisionFromCode(divis:string) {
        return new Division(
            Gender.fromCode(divis[1]),
            AgeGroup.AGES[parseInt(divis[0],10)-1]
        );
    }
}

export { HttpInitService as default, HttpInitService, IBackend }
