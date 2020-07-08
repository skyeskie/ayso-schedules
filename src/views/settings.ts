import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Region } from '../models/region';
import { DataControlService } from '../service/data-control.service';

@Component({
    // pipes:[DateMedPipe],
    template: `
    <title-bar></title-bar>
    <article class="container">
    <form>
        <h3 class="text-xs-center text-primary">Settings</h3>
        <div class="card card-block card-info-outline">
            <label for="select-region" class="card-title text-info">Home Region</label>
            <p>This filters your current week view and other parts of the app.</p>
            <select class="form-control" [formControl]="defaultRegion">
                <option *ngFor="let region of regions" [ngValue]="region.number">
                    Region {{region.number}} ({{region.name}})
                </option>
            </select>
        </div>

        <div class="list-group">
            <button type="button" (click)="toggleTroubleshootMode()" class="list-group-item list-group-item-warning">
                <h6 class="list-group-item-heading">
                    <nmi-icon>support</nmi-icon>
                    Troubleshooting
                </h6>
                <p class="list-group-item-text" *ngIf="!troubleshooting">Fix some app issues</p>
            </button>
            <div class="list-group-item" *ngIf="troubleshooting">
                <h6 class="list-group-item-heading">Update data</h6>
                <p class="list-group-item-text">Force app to re-download all data.</p>
                <button type="button" class="btn btn-sm btn-secondary" (click)="forceRefresh()">
                    Update now
                </button>
                <div class="list-group-item-text"><strong>Last updated:</strong> {{lastUpdate}}</div>
                <p class="list-group-item-text" id="update-result"></p>
            </div>
            <div class="list-group-item" *ngIf="troubleshooting">
                <h6 class="list-group-item-heading">Reset App</h6>
                <div class="list-group-item-text">
                    This does the same as the data update above but also resets any user settings.
                </div>
                <p class="list-group-item-text text-danger"><strong>
                    <nmi-icon>warning</nmi-icon>
                    This will reset the app to the initial state.
                </strong></p>
                <div class="list-group-item-text text-xs-center">
                    <button type="button" id="reset" class="btn btn-secondary" (click)="doReset()">
                        Reset App
                    </button>
                </div>
            </div>
        </div>
    </form>
    </article>
    `,
})
export class SettingsView implements OnInit {
    public defaultRegion: FormControl = new FormControl('');

    public regions: Region[];
    public lastUpdate: string;

    public troubleshooting: boolean = false;

    constructor(
        private dataControl: DataControlService,
    ) {
        // No-op
    }

    ngOnInit(): void {
        this.regions = Region.REGIONS;

        this.dataControl.settings.getRegionNumber().then((r: number) => this.defaultRegion.setValue(r.toString()));

        this.lastUpdate = this.dataControl.getLastUpdate();

        this.defaultRegion.valueChanges.subscribe((val: string) => {
            this.dataControl.settings.setRegion(parseInt(val, 10));
        });
    }

    doReset(): void {
        this.dataControl.reset();
    }

    forceRefresh(): void {
        this.dataControl.update(true).then((updated: string) => {
            this.lastUpdate = updated;
        });
    }

    toggleTroubleshootMode(): void {
        this.troubleshooting = !this.troubleshooting;
    }
}
