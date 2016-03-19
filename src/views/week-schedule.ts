import {Component, Inject, OnInit} from 'angular2/core';
import {NgIf} from 'angular2/common';
import {Router, RouteParams} from 'angular2/router';
import {GamesDAO, Game} from '../dao/games.interface';
import {WeekCacheInterface} from '../dao/week-cache.interface';
import {SettingsDAO} from '../dao/settings.interface';
import WeekBarComponent from '../comp/week-bar.component';
import TwoTeamsGamesListComponent from '../comp/games2-list.component';
import {TitleBarComponent} from '../comp/title-bar.component';

@Component({
    directives: [WeekBarComponent, TwoTeamsGamesListComponent, TitleBarComponent, NgIf],
    template: `
    <title-bar></title-bar>
    <week-bar [week]="week" (weekChange)="navWeek($event)"></week-bar>
    <two-teams-game-list [games]="games" *ngIf="games"></two-teams-game-list>
    `,
})
class WeekScheduleView implements OnInit {
    public week:number;
    public games:Game[];
    public region:number;

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
            this.week = this._week.getCurrentWeek() || 1;
        }

        this._settings.getRegionNumber()
                      .then((num:number) => this.region = num)
                      .then(() => this._games.findByWeek(this.week, this.region))
                      .then((res:Game[]) => this.games = res);
    }

    navWeek(week:number) {
        this._router.navigate(['/WeekSchedule', {num: week}]);
    }
}

export { WeekScheduleView as default, WeekScheduleView };
