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
import {ClassLogger, Logger, Level} from '../../service/log.decorator';

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
const URL = 'data.json';

@Injectable()
class HttpInitService implements IInitializationService {
    @ClassLogger public log: Logger;

    public remoteObservable:Observable<Response>;
    public dataObservable:ReplaySubject<ServerJSON> = new ReplaySubject<ServerJSON>();

    //TODO: Figure out this Observable/Subject mess
    constructor(private http:Http) {
        this.log.log('HttpInitService constructor');
        this.remoteObservable = this.http.get(URL);
        this.dataObservable = new ReplaySubject<ServerJSON>(1);
        this.log.debug(this);
        this.remoteObservable.map((response:Response) => {
            //TODO: Response.ok doesn't seem to be working
            if(response.status < 200 || response.status > 299) {
                this.log.error('Response not OK', response);
                throw new Error(response.status + ' ' + response.statusText);
            }
            this.log.debug(response);
            return response.json();
        }).subscribe(this.dataObservable);
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
        return this.dataObservable.map((data:ServerJSON) => {
            //Slightly convoluted path,
            //Game -> timestamp (numeric) -> sort and unique -> Date object
            //Need to bypass into timestamps because Date objects don't sort
            let lastDate = 0;
            return data.Games.map(
                (game:ServerGame) => new Date(game.Jour).valueOf()
            ).sort().filter((timestamp:number) => {
                let result = (timestamp !== lastDate);
                lastDate = timestamp;
                return result;
            }).map((timestamp:number) => new Date(timestamp));
       }).toPromise();
    }

    getSettings(): Promise<SettingsDataType> {
        return Promise.resolve({});
    };

    getGameUpdates(): Promise<Game[]> {
        return this.getGames();
    }

    getTeamUpdates(): Promise<Team[]> {
        return this.getTeams();
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
                getRegionById(Number.parseInt(coach.TeamNo[0], 10)).number
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
            findGenderByCode(divis[1]),
            AGES[parseInt(divis[0],10)-1]
        );
    }
}

export { HttpInitService as default, HttpInitService, IInitializationService }
