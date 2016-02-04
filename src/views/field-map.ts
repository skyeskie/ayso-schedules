import {View, OnInit} from 'angular2/core';
import {Router} from 'angular2/router';
import {RouteParams} from "angular2/router";
import {REGIONS, getRegionByNumber, Region} from '../cfg/regions';

@View({
    template: `<div id="field"/>`
})

//<div id="field-map" data-role="page" class="page">
//  <canvas id="canvas"></canvas>
//  <div id="svg-dump"></div>
//</div>

export default class FieldMapView implements OnInit {
    private region: Region;

    constructor(
        private _router:Router,
        private _routeParams:RouteParams
    ) {}

    ngOnInit() {
        let id = this._routeParams.get("region");
        this.region = getRegionByNumber(parseInt(id, 10));
        //$field.empty();
       // $field.load(this.region.mapFile);
    }
}
