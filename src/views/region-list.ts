import {Component} from 'angular2/core';
import {RouterLink} from 'angular2/router';
import {NgFor} from 'angular2/common';
import {TitleBarComponent} from '../comp/title-bar.component';
import {Region} from '../models/region';

@Component({
    directives:[NgFor, RouterLink, TitleBarComponent],
    styles: ['.font-weight-bold h6 { font-weight: bold !important; }'],
    template: `
    <title-bar></title-bar>
    <article class="list-group text-xs-center">
        <!--<div class="center-block m-y-1" style="width: 50%">-->
            <!--<img class="img-fluid" src="img/AYSOKansas.svg" alt="AYSO Kansas" />-->
        <!--</div>-->
        <div class="region list-group-item" *ngFor="#region of regions">
            <div class="list-group-item-heading container font-weight-bold">
                <h6 class="col-xs-5 text-xs-right text-muted p-a-0">Region {{region.number}}</h6>
                <h6 class="col-xs-7 text-xs-left text-primary p-l-1 p-y-0">{{region.name}}</h6>
            </div>
            <div class="list-group-item-text">
                <button type="button" class="btn btn-sm btn-secondary card-link"
                    [routerLink]="['/MapDetail', {region: region.number}]"><i class="ion-navigate"></i> Directions</button>
                <button type="button" class="btn btn-sm btn-secondary card-link"
                    [routerLink]="['FieldDetail', {region: region.number}]"><i class="ion-map"></i> Field Map</button>
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
