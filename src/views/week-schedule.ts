import {DatePipe} from 'angular2/common';
import {Component, Inject} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';

import {GamesDAO, Game} from '../dao/games.interface';

import WeekBarComponent from '../comp/week-bar.component';
import TwoTeamsGamesListComponent from '../comp/games2-list.component';
import {TitleBarComponent} from '../comp/title-bar.component';

@Component({
    directives: [WeekBarComponent, TwoTeamsGamesListComponent, TitleBarComponent],
    template: `
    <title-bar></title-bar>
    <article class="container">
        <week-bar [week]="week" (weekChange)="navWeek($event)"></week-bar>
        <two-teams-game-list [games]="games"></two-teams-game-list>
    </article>
    `,
})
class WeekScheduleView {
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

    navWeek(week) {
        this._router.navigate(['/WeekSchedule', {num: week}]);
    }
}

export { WeekScheduleView as default, WeekScheduleView };
