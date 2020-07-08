import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Region } from '../models/region';

@Component({
    template: `
    <title-bar></title-bar>
    <!-- Move outside article for largest area -->
    <h4 class="text-primary text-xs-center m-t-1" *ngIf="region">
        {{region.name}} <small class="text-muted">Region {{region.number}}</small>
    </h4>
    <div *ngIf="hasMap()" class="embed-responsive embed-responsive-1by1">
        <object id="svgFieldView" type="image/svg+xml" [data]="region.mapFile">No SVG Support</object>
    </div>
    <article class="container clearfix" *ngIf="!hasMap()">
        <h3>Field Map</h3>
        <div role="alert" class="alert alert-danger m-a-2 text-xs-center">
            <strong>Error</strong> Could not find map for region {{regionId}}
        </div>
    </article>
    `,
})
export class FieldMapView implements OnInit, AfterViewInit {
    public region: Region;
    public panZoom: SvgPanZoom.Instance;
    public regionId: number;

    constructor(
        private route: ActivatedRoute,
    ) {
        // in OnInit
    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.regionId = parseInt(params.id, 10);
            this.region = Region.fromNumber(this.regionId);
        });
    }

    ngAfterViewInit(): void {
        // Setup SVG
        document.getElementById('svgFieldView').addEventListener('load', () => {
            this.panZoom = svgPanZoom('#svgFieldView', { controlIconsEnabled: true});
        });
    }

    hasMap(): boolean {
        return typeof this.region !== 'undefined' && typeof this.region.mapFile === 'string';
    }
}
