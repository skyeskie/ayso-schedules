import { Location } from '@angular/common';
import { Component, Inject } from '@angular/core';

import { SettingsDAO, SettingsInterface } from '../dao/settings.interface';

@Component({
    selector: 'title-bar',
    template: `
    <nav class="navbar fixed-top navbar-dark bg-primary d-inline-flex">
        <button type="button" class="nav-item nav-link btn my-0 flex-shrink-0" (click)="goBack()">
            <nmi-icon>arrow_back</nmi-icon>
        </button>
        <button type="button" class="nav-item nav-link btn my-0 flex-shrink-0" routerLink="/">
            <nmi-icon>home</nmi-icon>
        </button>
        <p class="flex-fill">&nbsp;</p>
        <p class="nav-item my-0 mx-1"
           style="padding:0.425rem; font-size: 16px !important;" *ngIf="region">Region {{region}}</p>

    </nav>
    <div class="placeholder invisible" style="height: 3.5rem">&nbsp;</div>
    `,
})
class TitleBarComponent {
    region: number;

    constructor(
        private location: Location,
        @Inject(SettingsDAO)
        private settings: SettingsInterface,
    ) {
        this.settings.getRegionNumber().then((region: number) => {
            this.region = region;
        });
    }

    // TODO: Change this into a directive
    goBack(): void {
        this.location.back();
    }
}

export { TitleBarComponent, TitleBarComponent as default };
