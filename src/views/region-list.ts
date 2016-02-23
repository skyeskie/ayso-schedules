import {Component, OnInit} from 'angular2/core';
import {Router, RouterLink} from 'angular2/router';
import {NgFor} from 'angular2/common';

import {TitleBarComponent} from '../comp/title-bar.component';
import {Region} from '../models/region';

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
    `,
})

export default class RegionListView {
    public regions:Region[];
    constructor() {
        this.regions = Region.REGIONS;
    }
}
