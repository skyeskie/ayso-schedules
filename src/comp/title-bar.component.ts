import {Component, Inject} from 'angular2/core';
import {NgIf} from 'angular2/common';
import {RouterLink, Location} from 'angular2/router';
import {SettingsDAO} from '../dao/settings.interface';

@Component({
    selector: 'title-bar',
    directives: [RouterLink, NgIf],
    template: `
    <nav class="navbar navbar-fixed-top navbar-dark bg-primary">
        <div class="nav navbar-nav">
            <button type="button" class="nav-item nav-link btn btn-link" (click)="goBack()">
                <i class="ion-android-arrow-back"></i>
            </button>
            <button type="button" class="nav-item nav-link btn btn-link" [routerLink]="['/Home']">
                <i class="ion-home"></i>
            </button>
            <p class="nav-item pull-xs-right m-y-0 m-x-1" style="padding:0.425rem; font-size: 16px !important;" *ngIf="region">Region {{region}}</p>
        </div>
    </nav>
    <div class="placeholder invisible" style="height: 3.5rem">&nbsp;</div>
    `,
})
class TitleBarComponent {
    private region:number;

    constructor(
        private location:Location,
        @Inject(SettingsDAO)
        private settings:SettingsDAO
    ) {
        this.settings.getRegionNumber().then((region:number) => {
            this.region = region;
        });
    }

    //TODO: Change this into a directive
    goBack() {
        this.location.back();
    }
}

export {TitleBarComponent, TitleBarComponent as default}
