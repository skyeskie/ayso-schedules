import {Component, OnInit, Inject} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';
import {NgIf} from 'angular2/common';

import {Region, getRegionByNumber} from '../cfg/regions';
import Game from '../models/game';
import Division from '../models/division';
import GamesDAO from '../dao/games.interface';
import {AgeGroup} from '../models/ageGroup';
import {Gender} from '../cfg/gender';

import WeekBarComponent from '../comp/week-bar.component';
import TwoTeamsGamesListComponent from '../comp/games2-list.component';
import {TitleBarComponent} from '../comp/title-bar.component';

@Component({
    directives: [WeekBarComponent, TwoTeamsGamesListComponent, NgIf, TitleBarComponent],
    template: `
    <title-bar></title-bar>
    <article class="container">
        <h2>Search Results</h2>
        <h3><span *ngIf="params.region">Region {{params.region}} </span> {{params.age}} {{params.gender}}</h3>
        <week-bar [week]="params.week"(weekChange)="navWeek($event)"></week-bar>
        <two-teams-game-list [games]="games"></two-teams-game-list>
    </article>
    `,
})
export class SearchResultsView {
    //Only used for displaying filter
    public params:{week?:Number,region?:Number,gender?:String,age?:String} = {};

    public games:Game[]=[];

    constructor(
        private _router:Router,
        params:RouteParams,
        @Inject(GamesDAO)
        private dao:GamesDAO
    ) {
        let w = parseInt(params.get('week'),10);
        if(!isNaN(w)) {
            this.params.week = w;
        }
        let r = parseInt(params.get('region'),10);
        if(!isNaN(r)) {
            this.params.region = r;
        }
        this.params.gender = params.get('gender');
        this.params.age = params.get('age');

        dao.findGames(this.params.region, this.params.age, this.params.gender, this.params.week)
           .then(result => this.games = result);
    }

    navWeek(week) {
        this.params.week = week;
        this._router.navigate(['/DivisionSchedule', this.params]);
    }
}
