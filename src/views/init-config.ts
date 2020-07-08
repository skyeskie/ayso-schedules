import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Region } from '../models/region';
import { DataControlService } from '../service/data-control.service';

@Component({
    styles: [
        'div.alert.container { font-size: 0.7rem; }',
        'div.card-info-outline ul { margin-bottom: 0; }',
    ],
    template: `
    <article class="container">
        <img src="img/AYSOKansas.svg" alt="AYSO Kansas" class="img-fluid center-block m-b-2" />
        <form [formGroup]="initFormGroup" (ngSubmit)="onSubmit()">
            <div class="alert alert-info">
                <p><nmi-icon>info</nmi-icon>
                This app does not cover U8 and U6 in Region 491.</p>
                <p>All other divisions in the regions below have schedules.</p>
            </div>

            <div class="card card-block">
                <h4 class="text-primary">Setup App</h4>
                <p class="text-muted card-title">One-time setup to prepare the app for use</p>
                <fieldset class="form-group">
                    <select id="init-region" class="form-control" [formControl]="initFormControls.regionSelect">
                        <option class="text-muted" value="">Select your region...</option>
                        <option *ngFor="let region of regions" [value]="region.number">
                            Region {{region.number}} ({{region.name}})
                        </option>
                    </select>
                </fieldset>

                <div class="alert {{statusClass}} container">
                    <h6 class="col-med-4">Loading Game Data</h6>
                    <p class="col-med-8"><strong>{{title}}:</strong> {{message}}</p>
                    <input type="hidden" [formControl]="initFormControls.backend"/>
                </div>

                <button type="submit" class="btn center-block" [class.btn-success]="initFormGroup.valid"
                    [disabled]="!initFormGroup.valid">Finish</button>
            </div>
        </form>
    </article>
    `,
})
class InitialConfigurationView implements OnInit {
    public regions: Region[];
    public statusClass: string;
    public title: string;
    public message: string;

    public initFormControls: { backend?: FormControl, regionSelect?: FormControl };

    public initFormGroup: FormGroup;

    /**
     * Sets the status message in the template
     * @param title - Bold prefix
     * @param msg - Content set in the message
     * @param statusClass - CSS class applied to the outer div
     * Recommended to use one of Bootstrap 4 `alert-*` classes
     */
    setStatus(title: string, msg: string, statusClass: string): void {
        this.title = title;
        this.message = msg;
        this.statusClass = statusClass;
    }

    constructor(
        private router: Router,
        public daos: DataControlService,
    ) {
        this.regions = Region.REGIONS;
    }

    ngOnInit(): void {
        // Start DAO background initialization
        this.setStatus('Status', 'Setting up data', 'alert-info');
        this.daos.init().then(() => this.finishDataInit(this), (e: any) => this.error(e));

        this.initFormControls = {
            backend: new FormControl('', Validators.required),
            regionSelect: new FormControl('', Validators.required),
        };

        this.initFormGroup = new FormGroup(this.initFormControls);

        // Initialize Form

        // Wire up region select to DAO
        this.initFormControls.regionSelect.valueChanges.subscribe((v: string) =>
            this.daos.settings.setRegion(parseInt(v, 10)),
        );
    }

    /**
     * Sets the status message to success
     * @param self - Used because `this` is not in scope
     */
    finishDataInit(self: InitialConfigurationView): void {
        self.setStatus('Success', 'Offline viewing enabled', 'alert-success');
        // Mark hidden form object as valid
        this.initFormControls.backend.setValue(true);
    }

    error(error: Error|{name: string; message: string; }): void {
        console.error(error);
        this.setStatus(error.name, error.message, 'alert-danger');
    }

    onSubmit(): void {
        if (!this.initFormGroup.valid) {
            alert('Invalid form');
        }

        this.router.navigate(['/Home']);
    }
}

export { InitialConfigurationView, InitialConfigurationView as default };
