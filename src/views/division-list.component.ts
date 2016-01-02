import {View, OnInit} from 'angular2/core';
import {Router} from 'angular2/router';
import {RouteParams} from "angular2/router";

import {RegionLookup} from "../cfg/regions";
import Region from "../models/region";
import Game from "../models/game";
import Division from "../models/division";
import WeekBarComponent from "../comp/week-bar.component";
import TwoTeamsGamesListComponent from "../comp/games2-list.component";
import {NgIf} from "angular2/common";

@View({
    directives: [WeekBarComponent, TwoTeamsGamesListComponent, NgIf],
    template: `
    <h2>
        <span *ngIf="region.hasError()">Region {{region.number}} </span>
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
        private _router:Router,
        private _routeParams:RouteParams
    ) {
        let regionID = parseInt(_routeParams.get('id'), 10);
        this.region = RegionLookup.getByNumber(regionID);
        this.division = Division.fromString(_routeParams.get('divis'));
    }
}
