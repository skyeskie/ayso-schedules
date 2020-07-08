import { Component } from '@angular/core';

import { Region } from '../models/region';

@Component({
    styles: ['.font-weight-bold h6 { font-weight: bold !important; }'],
    template: `
    <title-bar></title-bar>
    <article class="list-group text-xs-center">
        <!--<div class="center-block m-y-1" style="width: 50%">-->
            <!--<img class="img-fluid" src="img/AYSOKansas.svg" alt="AYSO Kansas" />-->
        <!--</div>-->
        <div class="region list-group-item" *ngFor="let region of regions">
            <div class="list-group-item-heading container font-weight-bold">
                <h6 class="col-xs-5 text-xs-right text-muted p-a-0">Region {{region.number}}</h6>
                <h6 class="col-xs-7 text-xs-left text-primary p-l-1 p-y-0">{{region.name}}</h6>
            </div>
            <div class="list-group-item-text">
                <button type="button" class="btn btn-sm btn-secondary card-link"
                        [routerLink]="['/region', region.number, 'map']"><nmi-icon>commute</nmi-icon> Directions</button>
                <button type="button" class="btn btn-sm btn-secondary card-link"
                        [routerLink]="['/region', region.number, 'field']"><nmi-icon>map</nmi-icon> Field Map</button>
            </div>
        </div>
    </article>
    `,
})
export class RegionListView {
    public regions: Region[];
    constructor() {
        this.regions = Region.REGIONS;
    }
}
