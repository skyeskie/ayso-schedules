import {Component, OnInit} from 'angular2/core';
import {Router} from 'angular2/router';
import REGIONS from '../cfg/regions';
import Region from '../models/region';
import {NgFor} from 'angular2/common';
import {RouterLink} from 'angular2/router';
import {TitleBarComponent} from '../comp/title-bar';

@Component({
    directives:[NgFor, RouterLink, TitleBarComponent],
    template: `
    <title-bar></title-bar>
    <div id="fields" data-role="page" class="page">
        <div class="listing" *ngFor="#region of regions">
            <div class='full ui-bar-c'>
            <h2>Region {{region.number}} - {{region.name}}</h2>
            <button [routerLink]="['/MapDetail', {region: region.number}]">Directions</button>
            <button [routerLink]="['FieldDetail', {region: region.number}]">Field Map</button>
        </div>
    </div>
`
})

export default class RegionListView {
    public regions;
    constructor() {
        this.regions = REGIONS;
    }
}
