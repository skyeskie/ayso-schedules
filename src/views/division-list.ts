import {View, OnInit} from 'angular2/core';
import {RouteParams} from "angular2/router";

import {Region, getRegionByNumber} from "../cfg/regions";
import Game from "../models/game";
import Division from "../models/division";
import WeekBarComponent from "../comp/week-bar.component";
import TwoTeamsGamesListComponent from "../comp/games2-list.component";
import {NgIf} from "angular2/common";
import GamesDAO from '../dao/games.interface';

@View({
    directives: [WeekBarComponent, TwoTeamsGamesListComponent, NgIf],
    template: `
    <h2>
        <span *ngIf="!region.hasError()">Region {{region.number}} </span>
        {{division.getDisplayName()}}
    </h2>
    <week-bar [week]="week"></week-bar>
    <two-teams-game-list [games]="games"></two-teams-game-list>
    `
})
export class DivisionListView {
    private region:Region;
    private division:Division;
    private week:Number;
    private games:Game[];

    constructor(
        private _routeParams:RouteParams,
        private _dao:GamesDAO
    ) {
        let regionID = parseInt(_routeParams.get('id'), 10);
        this.region = getRegionByNumber(regionID);
        this.division = Division.fromString(_routeParams.get('divis'));
         _dao.findGames(this.region.number, this.division, this.week).then(function(result:Game[]) {
            this.games = result;
         });
    }
}
