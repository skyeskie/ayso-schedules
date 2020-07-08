import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import Region from '../models/region';

@Component({
    styles: ['agm-map { height: 400px; }'],
    template: `
    <title-bar></title-bar>
    <div class="container" *ngIf="region">
        <h4 class="m-a-1 text-xs-center text-primary">Region {{region.number}} - {{region.name}}</h4>
        <a href="{{geoLink}}" type="button" class="btn btn-secondary m-b-1 center-block">
            <nmi-icon>navigate</nmi-icon>
            Launch in Map App
        </a>
        <agm-map [latitude]="region.lat" [longitude]="region.lon" [zoom]="13">
            <agm-marker
                [latitude]="region.lat" [longitude]="region.lon" [title]="markerName">
            </agm-marker>
        </agm-map>
    </div>
    `,
})
export class MapView implements OnInit {
    public static GEO_PREFIX: string = 'geo:';
    public static COMMA: string = ',';

    public region: Region;
    public geoLink: string;

    public markerName: string;

    constructor(
        private route: ActivatedRoute,
    ) { }

    ngOnInit(): void {
        this.route.params.subscribe(this.onParams);
    }

    onParams(params): void {
        this.region = Region.fromNumber(parseInt(params.get('region'), 10));

        this.markerName = this.region.name;

        this.geoLink = MapView.GEO_PREFIX
            + this.region.lat.toFixed(6)
            + MapView.COMMA
            + this.region.lon.toFixed(6);
    }
}
