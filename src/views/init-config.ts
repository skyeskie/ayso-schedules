import {Component, OnInit} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';
import {
    NgFor, FORM_DIRECTIVES,
    ControlGroup, FormBuilder, Control, Validators,
} from 'angular2/common';

import {DataControlService} from '../service/data-control.service';
import {Region} from '../models/region';

@Component({
    directives: [NgFor, FORM_DIRECTIVES],
    styles: [
        'div.alert.container { font: 0.7rem; }',
        'div.card-info-outline ul { margin-bottom: 0; }',
    ],
    template: `
    <article class="container">
        <img src="img/HomeText.png" alt="AYSO Kansas" class="img-fluid center-block m-b-2" />
        <form [ngFormModel]="initForm" (ngSubmit)="onSubmit()">
            <div class="card card-block card-info-outline">
                <p>This app covers all divisions <strong>except</strong>:</p>
                <ul>
                    <li>Region 105 - U6</li>
                    <li>Region 208 - U10, U8 and U6</li>
                    <li>Region 253 - U6</li>
                    <li>Region 491 - U8 and U6</li>
                </ul>
            </div>

            <div class="card card-block">
                <h4 class="text-primary">Setup App</h4>
                <p class="text-muted card-title">One-time setup to prepare the app for use</p>
                <fieldset class="form-group">
                    <select id="init-region" class="form-control" [ngFormControl]="initForm.controls.regionSelect">
                        <option class="text-muted" value="">Select your region...</option>
                        <option *ngFor="#region of regions" [value]="region.number">
                            Region {{region.number}} ({{region.name}})
                        </option>
                    </select>
                </fieldset>

                <div class="alert {{statusClass}} container">
                    <h6 class="col-med-4">Loading Game Data</h6>
                    <p class="col-med-8"><strong>{{title}}:</strong> {{message}}</p>
                    <input type="hidden" [ngFormControl]="initForm.controls.backend"/>
                </div>

                <button type="submit" class="btn center-block" [class.btn-success]="initForm?.valid"
                    [disabled]="!initForm?.valid">Finish</button>
            </div>
        </form>
    </article>
    `,
})
class InitialConfigurationView implements OnInit {
    private regions:Region[];
    private statusClass:string;
    private title:string;
    private message:string;
    private initForm:ControlGroup;

    private initFormControls:{backend?:Control,regionSelect?:Control} = {};

    /**
     * Sets the status message in the template
     * @param title - Bold prefix
     * @param msg - Content set in the message
     * @param statusClass - CSS class applied to the outer div
     * Recommended to use one of Bootstrap 4 `alert-*` classes
     */
    setStatus(title:string, msg:string, statusClass:string) {
        this.title = title;
        this.message = msg;
        this.statusClass = statusClass;
    }

    constructor(
        private _router:Router,
        private _routeParams:RouteParams,
        public daos:DataControlService,
        private fb:FormBuilder
    ) {
        this.regions = Region.REGIONS;
    }

    ngOnInit() {
        //Start DAO background initialization
        this.setStatus('Status', 'Setting up data', 'alert-info');
        this.daos.init().then(() => this.finishDataInit(this), (e:any) => this.error(e));

        //Initialize Form
        this.initFormControls.backend = this.fb.control('', Validators.required);
        this.initFormControls.regionSelect = this.fb.control('', Validators.required);
        this.initForm = this.fb.group(this.initFormControls);

        //Wire up region select to DAO
        this.initFormControls.regionSelect.valueChanges.subscribe((v:string) =>
            this.daos.settings.setRegion(parseInt(v,10))
        );
    }

    /**
     * Sets the status message to success
     * @param self - Used because `this` is not in scope
     */
    finishDataInit(self:InitialConfigurationView) {
        self.setStatus('Success', 'Offline viewing enabled', 'alert-success');
        //Mark hidden form object as valid
        this.initFormControls.backend.updateValue(true);
    }

    error(error:Error|{name: string; message: string;}) {
        console.error(error);
        this.setStatus(error.name, error.message, 'alert-danger');
    }

    onSubmit() {
        if(!this.initForm.valid) {
            alert('Invalid form');
        }

        //Check for existing route
        let redirect = this._routeParams.get('url');
        console.log(this._routeParams);
        if(redirect) {
            this._router.navigateByUrl(redirect);
        } else {
            //Otherwise just go to root
            this._router.navigate(['/Home']);
        }
    }
}

export { InitialConfigurationView, InitialConfigurationView as default };
