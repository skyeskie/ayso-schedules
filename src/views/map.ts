import {Component} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {getRegionByNumber} from '../cfg/regions';
import {ANGULAR2_GOOGLE_MAPS_DIRECTIVES} from 'angular2-google-maps/core';

import Region from '../models/region';
import {NgIf} from 'angular2/common';
import {TitleBarComponent} from '../comp/title-bar.component';

@Component({
    directives: [...ANGULAR2_GOOGLE_MAPS_DIRECTIVES, NgIf, TitleBarComponent],
    styles: [
        '.sebm-google-map-container { height: 400px; }',
        '.container h2 { font: 2em; }',
    ],
    template: `
    <title-bar></title-bar>
    <div class="container" *ngIf="region">
        <h2 class="m-a-1 text-xs-center">Region {{region.number}} - {{region.name}}</h2>
        <sebm-google-map [latitude]="region.lat" [longitude]="region.lon" [zoom]="13">
            <sebm-google-map-marker
                [latitude]="region.lat" [longitude]="region.lon" [title]="markerName">
            </sebm-google-map-marker>
        </sebm-google-map>
    </div>
    `,
})
export class MapView {
    public region: Region;

    constructor(
        params:RouteParams
    ) {
        this.region = getRegionByNumber(Number.parseInt(params.get('region'), 10));
    }
}
