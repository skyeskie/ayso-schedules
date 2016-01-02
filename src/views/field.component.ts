import {Component, OnInit} from 'angular2/core';
import {Router} from 'angular2/router';
import {RouteParams} from "angular2/router";
import REGIONS, {RegionLookup} from '../cfg/regions';
import Region from "../models/region";

@Component({
    selector: 'field',
    template: `<div id="field"/>`
})

//<div id="field-map" data-role="page" class="page">
//  <canvas id="canvas"></canvas>
//  <div id="svg-dump"></div>
//</div>

export class FieldComponent implements OnInit {
    private region: Region;

    constructor(
        private _router:Router,
        private _routeParams:RouteParams
    ) {}

    ngOnInit() {
        let $field = $('#field');
        let id = this._routeParams.get("region");
        this.region = RegionLookup.getByNumber(parseInt(id, 10));
        //$field.empty();
       // $field.load(this.region.mapFile);
    }
}
