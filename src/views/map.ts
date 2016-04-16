import {Component, OnInit} from 'angular2/core';
import {NgIf} from 'angular2/common';
import {RouteParams} from 'angular2/router';
import {ANGULAR2_GOOGLE_MAPS_DIRECTIVES} from 'angular2-google-maps/core';
import Region from '../models/region';
import {TitleBarComponent} from '../comp/title-bar.component';

@Component({
    directives: [...ANGULAR2_GOOGLE_MAPS_DIRECTIVES, NgIf, TitleBarComponent],
    styles: ['.sebm-google-map-container { height: 400px; }'],
    template: `
    <title-bar></title-bar>
    <div class="container" *ngIf="region">
        <h4 class="m-a-1 text-xs-center text-primary">Region {{region.number}} - {{region.name}}</h4>
        <a href="{{geoLink}}" type="button" class="btn btn-secondary m-b-1 center-block">
            <i class="ion-navigate"></i>
            Launch in Map App
        </a>
        <sebm-google-map [latitude]="region.lat" [longitude]="region.lon" [zoom]="13">
            <sebm-google-map-marker
                [latitude]="region.lat" [longitude]="region.lon" [title]="markerName">
            </sebm-google-map-marker>
        </sebm-google-map>
    </div>
    `,
})
export class MapView implements OnInit {
    public static GEO_PREFIX: String = 'geo:';
    public static COMMA: String = ',';

    public region: Region;
    public geoLink: String;

    constructor(
        private params:RouteParams
    ) {
        //In OnInit
    }

    ngOnInit() {
        this.region = Region.fromNumber(
            parseInt(this.params.get('region'), 10)
        );

        this.geoLink = MapView.GEO_PREFIX
            + this.region.lat.toFixed(6)
            + MapView.COMMA
            + this.region.lon.toFixed(6);
    }
}
