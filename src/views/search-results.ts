import {Component, OnInit, Inject} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';
import {NgIf} from 'angular2/common';
import Game from '../models/game';
import GamesDAO from '../dao/games.interface';
import WeekBarComponent from '../comp/week-bar.component';
import TwoTeamsGamesListComponent from '../comp/games2-list.component';
import {TitleBarComponent} from '../comp/title-bar.component';

@Component({
    directives: [WeekBarComponent, TwoTeamsGamesListComponent, NgIf, TitleBarComponent],
    template: `
    <title-bar></title-bar>
    <article class="container">
        <h4 class="text-primary">Search Results</h4>
        <h5><span *ngIf="filters.region">Region {{filters.region}} </span> {{filters.age}} {{filters.gender}}</h5>
        <week-bar [week]="filters.week" (weekChange)="navWeek($event)"></week-bar>
        <two-teams-game-list [games]="games"></two-teams-game-list>
    </article>
    `,
})
export class SearchResultsView implements OnInit {
    //Only used for displaying filter
    public filters:{week?:number,region?:number,gender?:string,age?:string} = {};

    public games:Game[]=[];

    constructor(
        private _router:Router,
        private params:RouteParams,
        @Inject(GamesDAO)
        private dao:GamesDAO
    ) {
        //In OnInit
    }

    ngOnInit() {
        let w = parseInt(this.params.get('week'),10);
        if(!isNaN(w)) {
            this.filters.week = w;
        }
        let r = parseInt(this.params.get('region'),10);
        if(!isNaN(r)) {
            this.filters.region = r;
        }
        this.filters.gender = this.params.get('gender');
        this.filters.age = this.params.get('age');

        this.dao.findGames(this.filters.region, this.filters.age, this.filters.gender, this.filters.week)
                .then((result:Game[]) => this.games = result);
    }

    navWeek(week:number) {
        this.filters.week = week;
        this._router.navigate(['/DivisionSchedule', this.filters]);
    }
}
