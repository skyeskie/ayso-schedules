import {Http, Response} from 'angular2/http';
import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Observable';

import {ReplaySubject} from 'rxjs/Rx';
import {Subscriber} from 'rxjs/Subscriber';

import Division from '../../models/division';
import Game from '../../models/game';
import Team from '../../models/team';
import {getRegionById} from '../../cfg/regions';
import {findGenderByCode} from '../../cfg/gender';
import {AGES} from '../../cfg/ages';
import {IInitializationService} from './initialization.interface';
import {SettingsDataType} from '../settings.interface';

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

//TODO: Move this to Configuration
const URL = '/data.json';

@Injectable()
class HttpInitService implements IInitializationService {
    public remoteObservable:Observable<Response>;
    public dataObservable = new ReplaySubject<ServerJSON>();

    //TODO: Figure out this Observervable/Subject mess
    constructor(private http:Http) {
        console.log('HttpInitService');
        this.remoteObservable = this.http.get(URL);
        this.remoteObservable.subscribe(v => console.log(v));
        this.dataObservable = new ReplaySubject<ServerJSON>(1);
        console.log(this);
        this.remoteObservable.map((response:Response) => {
            //TODO: Response.ok doesn't seem to be working
            if(response.status < 200 || response.status > 299) {
                console.error('Response not OK');
                console.log(response.ok);
                throw new Error(response.status + ' ' + response.statusText);
            }
            console.log(response);
            let v = response.json();
            console.log(v);
            return v;
        }).subscribe(this.dataObservable);
    }

    getTeams(): Promise<Team[]> {
        console.log('getTeams()');
        return this.dataObservable
                   .map((data:ServerJSON) => data.Coaches)
                   .map((coaches:ServerCoach[]) => {
                       return coaches.map(ModelTranslation.translateCoach);
                   }).toPromise();
    }

    getGames(): Promise<Game[]> {
        console.log('getGames()');
        return this.dataObservable
                   .map((data:ServerJSON) => data.Games)
                   .map((games:ServerGame[]) => {
                       return games.map(ModelTranslation.translateGame);
                   }).toPromise();
    };

    getWeekStarts(): Promise<Date[]> {
        console.log('getWeekStarts()');
        return this.dataObservable.map((data:ServerJSON) => {
            //Slightly convoluted path,
            //Game -> timestamp (numeric) -> sort and unique -> Date object
            //Need to bypass into timestamps because Date objects don't sort
            let lastDate = 0;
            return data.Games.map(
                (game:ServerGame) => new Date(game.Jour).valueOf()
            ).sort().filter(timestamp => {
                let result = (timestamp !== lastDate);
                lastDate = timestamp;
                console.log(timestamp + ' -> ' + result);
                return result;
            }).map(timestamp => new Date(timestamp));
       }).toPromise();
    }

    getSettings(): Promise<SettingsDataType> {
        return Promise.resolve({});
    };
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
                getRegionById(Number.parseInt(coach.TeamNo[0], 10)).number
            );
        } catch (err) {
            console.error('Team translation error');
            console.log(coach);
            console.log(err);
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
                location[1],
                location[3],
                ModelTranslation.divisionFromCode(game.Divis)
            );
        } catch (err) {
            console.error('Game translation error');
            console.log(game);
            console.log(err);
        }
    }

    static divisionFromCode(divis:String) {
        return new Division(
            findGenderByCode(divis[1]),
            AGES[parseInt(divis[0],10)-1]
        );
    }
}

export { HttpInitService as default, HttpInitService, IInitializationService }
