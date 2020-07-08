import { Component, Inject } from '@angular/core';

import { SettingsDAO, SettingsInterface } from '../dao/settings.interface';

@Component({
    template: `
    <title-bar></title-bar>
    <article class="main-buttons container">
        <img class="img-fluid center-block mb-2" src="img/AYSOKansas.svg" alt="AYSO Kansas" />
        <h4 class="text-primary text-center mb-2">
            <b class="pr-2">Schedules</b> <small *ngIf="regionNum" class="text-muted">Region {{regionNum}}</small>
        </h4>
        <button type="button" class="btn btn-secondary btn-block" routerLink="/week">
            <nmi-icon>schedule</nmi-icon> This Week
        </button>
        <button type="button" class="btn btn-secondary btn-block" routerLink="/teams">
            <nmi-icon>search</nmi-icon> Find Team
        </button>
        <button type="button" class="btn btn-secondary btn-block" routerLink="/search">
            <nmi-icon>search</nmi-icon> Advanced Search
        </button>
        <button type="button" class="btn btn-secondary btn-block" [routerLink]="['/region', regionNum, 'map']"
                *ngIf="regionNum"><nmi-icon>commute</nmi-icon> Directions
        </button>
        <button type="button" class="btn btn-secondary btn-block" [routerLink]="['/region', regionNum, 'field']"
                *ngIf="regionNum"><nmi-icon>map</nmi-icon> Field Map
        </button>
    </article>
    `,
})
class SchedulesMenuView {
    public regionNum: number;

    constructor(
        @Inject(SettingsDAO)
        private dao: SettingsInterface,
    ) {
        // In OnInit()
    }

    ngOnInit(): void {
        this.dao.getRegionNumber().then((n: number) => this.regionNum = n);
    }
}

export { SchedulesMenuView as default, SchedulesMenuView };
