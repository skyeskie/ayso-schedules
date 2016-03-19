import {Component, Inject} from 'angular2/core';
import {RouterLink} from 'angular2/router';
import {TitleBarComponent} from '../comp/title-bar.component';
import {NgIf} from 'angular2/common';
import {SettingsDAO} from '../dao/settings.interface';

@Component({
    directives: [RouterLink, TitleBarComponent, NgIf],
    template: `
    <title-bar></title-bar>
    <article class="main-buttons container">
        <img class="img-fluid center-block m-b-2" src="img/AYSOKansas.svg" alt="AYSO Kansas" />
        <h4 class="text-primary text-xs-center m-b-2">
            <b>Schedules</b> <small *ngIf="regionNum" class="text-muted">Region {{regionNum}}</small>
        </h4>
        <button type="button" class="btn btn-secondary btn-block" [routerLink]="['CurWeekSchedule']">
            <i class="ion-clock"></i> This Week
        </button>
        <button type="button" class="btn btn-secondary btn-block" [routerLink]="['TeamSelect']">
            <i class="ion-search"></i> Find Team
        </button>
        <button type="button" class="btn btn-secondary btn-block" [routerLink]="['DivisionSelect']">
            <i class="ion-search"></i> Advanced Search
        </button>
        <button type="button" class="btn btn-secondary btn-block" [routerLink]="['MapDetail', {region: regionNum}]"
            *ngIf="regionNum"><i class="ion-navigate"></i> Directions
        </button>
        <button type="button" class="btn btn-secondary btn-block" [routerLink]="['FieldDetail', {region: regionNum}]"
            *ngIf="regionNum"><i class="ion-map"></i> Field Map
        </button>
    </article>
    `,
})
class SchedulesMenuView {
    public regionNum:number;

    constructor(
        @Inject(SettingsDAO)
        private dao:SettingsDAO
    ) {
        //In OnInit()
    }

    ngOnInit() {
        this.dao.getRegionNumber().then((n:number) => this.regionNum = n);
    }
}

export { SchedulesMenuView as default, SchedulesMenuView };
