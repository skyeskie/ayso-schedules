import {View, OnInit} from 'angular2/core';
import {RouteParams} from "angular2/router";
import WeekBarComponent from '../comp/week-bar.component';
import TwoTeamsGamesListComponent from '../comp/games2-list.component';
import GamesDAO from '../dao/games.interface';
import Game from '../models/game';

@View({
    directives: [WeekBarComponent, TwoTeamsGamesListComponent],
    template: `
    <div id="week" class="page">
        <week-bar [week]="week"/>
        <two-teams-game-list [games]="games"/>
    </div>
    `
})
class WeekScheduleView implements OnInit {
    public week:Number;
    public games:Game[];

    constructor(
        private _routeParams:RouteParams,
        private _dao:GamesDAO
    ) {
        this.week = parseInt(_routeParams.get('num'), 10);
        _dao.findByWeek(this.week).then(games => this.games = games);
    }
    
    ngOnInit() {
    
    }
}

export { WeekScheduleView as default, WeekScheduleView };
