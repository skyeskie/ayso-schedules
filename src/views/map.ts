import {Component} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {getRegionByNumber} from '../cfg/regions';
import {ANGULAR2_GOOGLE_MAPS_DIRECTIVES} from 'angular2-google-maps/core';

import Region from '../models/region';
import {NgIf} from 'angular2/common';
import {TitleBarComponent} from '../comp/title-bar.component';

@Component({
    directives: [ANGULAR2_GOOGLE_MAPS_DIRECTIVES, NgIf, TitleBarComponent],
    styles: [
        '.sebm-google-map-container { height: 400px; }',
        '.container h2 { font: 2em; }'
    ],
    template: `
    <title-bar></title-bar>
    <h2 class="container m-a-1 text-xs-center">{{markerName}}</h2>
    <sebm-google-map [latitude]="lat" [longitude]="lng" [zoom]="13" *ngIf="isDefined()">
        <sebm-google-map-marker [latitude]="lat" [longitude]="lng" [title]="markerName">
        </sebm-google-map-marker>
    </sebm-google-map>
    `
})
export class MapView {
    public lat:Number;
    public lng:Number;
    public markerName:String;

    constructor(
        params:RouteParams
    ) {
        let region: Region = getRegionByNumber(Number.parseInt(params.get('region'), 10));
        this.lat = region.lat;
        this.lng = region.lon;
        this.markerName = "Region " + region.number;
    }

    public isDefined() {
        return (typeof this.lat !== 'undefined')
            && (typeof this.lng !== 'undefined')
            && (typeof this.markerName !== 'undefined');
    }
}
