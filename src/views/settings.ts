import {Component, OnInit, Injectable} from 'angular2/core';
import {Control, NgFor, FORM_DIRECTIVES} from 'angular2/common';

import {TitleBarComponent} from '../comp/title-bar.component';
import {DataControlService} from '../dao/data-control.service';
import {Region} from '../models/region';
import {DateMedPipe} from '../pipes/date-med.pipe';

@Component({
    directives:[NgFor, TitleBarComponent, FORM_DIRECTIVES],
    pipes:[DateMedPipe],
    template: `
    <title-bar></title-bar>
    <article class="container">
    <form>
        <h2 class="text-xs-center">Settings</h2>
        <div class="card card-block">
            <label for="select-region" class="card-title">Home Region</label>
            <p>This filters your current week view.</p>
            <select class="form-control" [ngFormControl]="defaultRegion">
                <option *ngFor="#region of regions" value="{{region.number}}">
                    Region {{region.number}} ({{region.name}})
                </option>
            </select>
        </div>

        <div class="card card-block">
            <h4 class="card-title">Update data</h4>
            <p>The app normally checks for updates on start.
            Use this if you think you missed an update.</p>
            <div><strong>Last updated:</strong> {{lastUpdate | dateMed}}</div>
            <button type="button" class="btn btn-info-outline" (click)="forceRefresh()">
                Update now
            </button>
            <p id="update-result"></p>
        </div>
        <div class="card card-block card-warning-outline">
            <h4 class="card-title">Reset App</h4>
            <h5 class="card-title text-danger">Warning:</h5>
            <p class="card-text">
                This will delete all saved preferences and game info.
                The app will be as if you first installed it.
            </p>
            <div class="text-xs-center">
                <button type="button" id="reset" class="btn btn-danger" (click)="doReset()">
                    Reset App
                </button>
            </div>
        </div>
    </form>
    </article>
    `,
})
@Injectable()
export default class SettingsView implements OnInit {
    public defaultRegion:Control = new Control('');

    public regions:Region[];
    public lastUpdate:Date;

    constructor(
        private dataControl: DataControlService
    ) {
        //No-op
    }

    ngOnInit() {
        this.regions = Region.REGIONS;

        this.dataControl.settings.getRegionNumber().then((r:number) => this.defaultRegion.updateValue(r.toString()));

        this.lastUpdate = this.dataControl.getLastUpdate();

        this.defaultRegion.valueChanges.subscribe((val:string) => {
            this.dataControl.settings.setRegion(parseInt(val,10));
        });
    }

    doReset(): void {
        this.dataControl.reset();
    }

    forceRefresh(): void {
        this.dataControl.update(true).then((updated:Date) => {
            this.lastUpdate = updated;
        });
    }
}
