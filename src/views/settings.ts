import {Component, OnInit, Injectable} from 'angular2/core';
import {Control, DatePipe, NgFor, FORM_DIRECTIVES} from 'angular2/common';

import {REGIONS, Region} from '../cfg/regions';
import {TitleBarComponent} from '../comp/title-bar.component';
import {DataControlService} from '../dao/data-control.service';

@Component({
    directives:[NgFor, TitleBarComponent, FORM_DIRECTIVES],
    pipes:[DatePipe],
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
            <div><strong>Last updated:</strong> {{lastUpdate | date:'MMMdjhm'}}</div>
            <button class="btn btn-info-outline">Update now</button>
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
                <button type="button" id="reset" class="btn btn-danger">Reset App</button>
            </div>
        </div>
    </form>
    </article>
    `,
})
@Injectable()
export default class SettingsView {
    public defaultRegion = new Control('');

    public regions:Region[];
    public lastUpdate:Date;

    constructor(
        private dataConrol: DataControlService
    ) {
        this.regions = REGIONS;

        this.dataConrol.settings.getRegionNumber().then(r => this.defaultRegion.updateValue(r.toString()));

        this.lastUpdate = this.dataConrol.getLastUpdate();

        this.defaultRegion.valueChanges.subscribe(val => {
            let regionNum:Number = parseInt(val,10);
            this.dataConrol.settings.setRegion(regionNum);
        });
    }

    doReset(): void {
        this.dataConrol.reset();
    }

    forceRefresh(): void {
        this.dataConrol.update(true).then(updated => {
            this.lastUpdate = updated;
        });
    }
}
