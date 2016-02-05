import {Component, OnInit} from 'angular2/core';
import {Router} from 'angular2/router';
import REGIONS from '../cfg/regions';
import Region from '../models/region';

@Component({
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

export default class RegionListView {
    constructor(
        private _router:Router,
        public regions:Region[]
    ) {}

    gotoMap(region: Region) {
        this._router.navigate(['Map', { id: region.id}]);

    }

    gotoFieldMap(region: Region) {
        this._router.navigate(['Field', { id: region.id}]);
    }
}
