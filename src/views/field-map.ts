import {NgIf} from 'angular2/common';
import {Component, OnInit} from 'angular2/core';
import {RouteParams} from 'angular2/router';

import {TitleBarComponent} from '../comp/title-bar.component';
import {Region} from '../models/region';
import {AfterViewInit} from 'angular2/core';

@Component({
    directives: [TitleBarComponent, NgIf],
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
            <strong>Error</strong> Could not find map for region {{id}}
        </div>
    </article>
    `,
})
export default class FieldMapView implements OnInit, AfterViewInit {
    private region: Region;
    private panzoom: SvgPanZoom.ISvgPanZoom;

    constructor(
        private _routeParams:RouteParams
    ) {
        //in OnInit
    }

    ngOnInit() {
        let id:string = this._routeParams.get('region');
        this.region = Region.fromNumber(parseInt(id, 10));
    }

    ngAfterViewInit() {
        //Setup SVG
        document.getElementById('svgFieldView').addEventListener('load', () => {
            this.panzoom = svgPanZoom('#svgFieldView', { controlIconsEnabled: true});
        });
    }

    hasMap() {
        return this.region && this.region.mapFile;
    }
}
