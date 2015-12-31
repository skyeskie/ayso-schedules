import {Component, OnInit} from 'angular2/core';
import {Router} from 'angular2/router';
import {RouteParams} from "angular2/router";
import REGIONS from '../cfg/regions';

@Component({
    selector: 'regions',
    template: `
<div id="fields" data-role="page" class="page">
    <div class="listing" *ngFor="#region of regions">
        <div class='full ui-bar-c'>
        <h2>Region {{region.number}} - {{region.name}}</h2>
        <button (click)="gotoMap(region)">Directions</button>
        <button (click)="gotoFieldMap(region)">Field Map</button>
    </div>
</div>
`
})

export default class RegionListComponent {
    constructor(
        private _router:Router,
        private _routeParams:RouteParams,
        public regions:Region[]
    )
}
