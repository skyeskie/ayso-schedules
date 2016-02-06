import {Component, OnInit} from 'angular2/core';
import {RouteParams} from "angular2/router";
import WeekBarComponent from '../comp/week-bar.component';
import TwoTeamsGamesListComponent from '../comp/games2-list.component';
import GamesDAO from '../dao/games.interface';
import Game from '../models/game';
import {DatePipe} from 'angular2/common';
import {Inject} from 'angular2/core';
import {TitleBarComponent} from '../comp/title-bar';
import {Router} from 'angular2/router';

@Component({
    directives: [WeekBarComponent, TwoTeamsGamesListComponent, TitleBarComponent],
    template: `
    <title-bar></title-bar>
    <week-bar [week]="week" (weekChange)="navWeek($event)"></week-bar>
    <two-teams-game-list [games]="games"></two-teams-game-list>
    `
})
class WeekScheduleView implements OnInit {
    public week:Number;
    public games:Game[];

    constructor(
        private _router:Router,
        private _routeParams:RouteParams,
        @Inject(GamesDAO)
        private _dao:GamesDAO
    ) {
        let n = parseInt(_routeParams.get('num'), 10);
        this.week = Number.isNaN(n) ? 1 : n;
        _dao.findByWeek(this.week).then(games => this.games = games);
    }

    ngOnInit() {

    }

    navWeek(week) {
        this._router.navigate(['/WeekSchedule', {num: week}]);
    }
}

export { WeekScheduleView as default, WeekScheduleView };
