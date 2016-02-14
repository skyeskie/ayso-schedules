import {NgIf} from 'angular2/common';
import {Component, OnInit} from 'angular2/core';
import {RouteParams} from 'angular2/router';

import {REGIONS, getRegionByNumber, Region} from '../cfg/regions';
import {TitleBarComponent} from '../comp/title-bar.component';

@Component({
    directives: [TitleBarComponent, NgIf],
    template: `
    <title-bar></title-bar>
    <article class="container">
        <div *ngIf="hasMap()">
            <img [src]="region.mapFile" alt="Field Map {{region?.name}}" />
        </div>
        <div *ngIf="!hasMap()">
            <h3>Field Map</h3>
            <div role="alert" class="alert alert-danger m-a-2 text-xs-center">
                <strong>Error</strong> Could not find map for region {{id}}
            </div>
        </div>
    </article>
    `,
})
export default class FieldMapView implements OnInit {
    private region: Region;

    constructor(
        private _routeParams:RouteParams
    ) {}

    ngOnInit() {
        let id:string = this._routeParams.get('region');
        this.region = getRegionByNumber(parseInt(id, 10));
    }

    hasMap() {
        return this.region && this.region.mapFile;
    }
}
