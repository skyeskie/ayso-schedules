import {DatePipe} from 'angular2/common';
import {Component, Inject} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';

import {GamesDAO, Game} from '../dao/games.interface';

import WeekBarComponent from '../comp/week-bar.component';
import TwoTeamsGamesListComponent from '../comp/games2-list.component';
import {TitleBarComponent} from '../comp/title-bar.component';
import {OnInit} from 'angular2/core';
import {WeekCacheInterface} from '../dao/week-cache.interface';
import {SettingsDAO} from '../dao/settings.interface';

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
class WeekScheduleView implements OnInit {
    public week:Number;
    public games:Game[];

    constructor(
        private _router:Router,
        private _routeParams:RouteParams,
        @Inject(GamesDAO)
        private _dao:GamesDAO,
        @Inject(SettingsDAO)
        private _settings:SettingsDAO
    ) {
        //No-op
    }

    ngOnInit() {
        let n = parseInt(this._routeParams.get('num'), 10);
        this.week = Number.isNaN(n) ? 1 : n;
        let self = this;
        this._settings.getRegionNumber().then((region:Number) => {
            return this._dao.findByWeek(this.week, region);
        }).then(res => this.games = res);
    }

    navWeek(week) {
        this._router.navigate(['/WeekSchedule', {num: week}]);
    }
}

export { WeekScheduleView as default, WeekScheduleView };
