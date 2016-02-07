import {Component, OnInit} from 'angular2/core';
import {Router} from 'angular2/router';
import REGIONS from '../cfg/regions';
import Region from '../models/region';
import {NgFor} from 'angular2/common';
import {RouterLink} from 'angular2/router';
import {TitleBarComponent} from '../comp/title-bar.component';

@Component({
    directives:[NgFor, RouterLink, TitleBarComponent],
    styles: ['.region h2'],
    template: `
    <title-bar></title-bar>
    <article class="container">
        <div class="text-xs-center">
            <div class="region card card-block" *ngFor="#region of regions">
                <h4 class="card-title">Region {{region.number}} - {{region.name}}</h4>
                <button type="button" class="btn btn-secondary card-link"
                    [routerLink]="['/MapDetail', {region: region.number}]">Directions</button>
                <button type="button" class="btn btn-secondary card-link"
                    [routerLink]="['FieldDetail', {region: region.number}]">Field Map</button>
            </div>
        </div>
    </article>
    `
})

export default class RegionListView {
    public regions;
    constructor() {
        this.regions = REGIONS;
    }
}
