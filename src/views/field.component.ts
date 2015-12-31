import {Component, OnInit} from 'angular2/core';
import {Router} from 'angular2/router';
import {RouteParams} from "angular2/router";
import {REGIONS, RegionLookup} from '../cfg/regions';

@Component({
    selector: 'field',
    template: `<div id="field"/>`
})

//<div id="field-map" data-role="page" class="page">
//  <canvas id="canvas"></canvas>
//  <div id="svg-dump"></div>
//</div>

export class Field implements OnInit {
    private region: Region;

    constructor(
        private _router:Router,
        private _routeParams:RouteParams
    )

    ngOnInit() {
        let $field = $('#field');
        let id = _routeParams.get("id");
        this.region = RegionLookup.getByNumber(id);


        let h = $(window).height() - $field.offset().top;
        let w = $field.width();
        $field.width(w);
        $field.height(h);
        if(typeof device !== 'undefined') {
            var versionMajor = Number(device.version.substr(0,1));
            if(device.platform === "Android" && versionMajor < 4) {
                this.showCanvas($field, w, h);
            } else {
                this.showSVG($field);
            }
        } else {
            this.showSVG($field);
        }
    }

    private showSVG($field) {
        $field.empty();
        $field.load(this.region.mapFile);
    }

    private showCanvas($field, w, h) {
        $field.html('<canvas/>');
        let ctx = $field.get('canvas').getContext('2d');
        ctx.drawSvg(this.region.mapFile, 0, 0, w, h);
    }
}
