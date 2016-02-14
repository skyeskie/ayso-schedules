import {DatePipe} from 'angular2/common';
import {Component, Inject, OnInit} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';

import {GamesDAO, Game} from '../dao/games.interface';
import {WeekCacheInterface} from '../dao/week-cache.interface';
import {SettingsDAO} from '../dao/settings.interface';

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
class WeekScheduleView implements OnInit {
    public week:number;
    public games:Game[];
    public region:Number;

    constructor(
        private _router:Router,
        private _routeParams:RouteParams,
        @Inject(GamesDAO)
        private _games:GamesDAO,
        @Inject(SettingsDAO)
        private _settings:SettingsDAO,
        @Inject(WeekCacheInterface)
        private _week:WeekCacheInterface
    ) {
        //No-op
    }

    ngOnInit() {
        this.week = parseInt(this._routeParams.get('num'), 10);
        let pCur;
        if(isNaN(this.week)) {
            this.week = 1;
            pCur = this._week.init()
                       .then(() => this._week.getCurrentWeek())
                       .then(cur => this.week = cur.valueOf());
        } else {
            pCur = Promise.resolve();
        }

        let pRegion = this._settings.getRegionNumber().then(num => this.region = num);

        Promise.all([pCur, pRegion])
               .then(() => this._games.findByWeek(this.week, this.region))
               .then(res => this.games = res);
    }

    navWeek(week) {
        this._router.navigate(['/WeekSchedule', {num: week}]);
    }
}

export { WeekScheduleView as default, WeekScheduleView };
