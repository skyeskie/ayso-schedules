import {Component, OnInit, Inject} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
import {Router} from 'angular2/router';

import {ButtonRadio} from 'ng2-bootstrap/ng2-bootstrap';

import {AGES, AgeGroup} from '../cfg/ages';
import {GENDERS, Gender} from '../cfg/gender';
import {REGIONS, Region} from '../cfg/regions';

import {checkPresent} from '../app/util';
import {TitleBarComponent} from '../comp/title-bar.component';
import {GenderFormComponent} from '../comp/gender-form.component';
import {SettingsDAO} from '../dao/settings.interface';
import {WeekCacheInterface} from '../dao/week-cache.interface';
import Division from '../models/division';

@Component({
    directives: [CORE_DIRECTIVES, FORM_DIRECTIVES, TitleBarComponent],
    styles: [
        '#regionSelect, #weekSelect {width: 15rem; }',
        '#divisSelect { width: 8rem; display: inline-block; }',
        '#genderSelect { width: 7rem; display: inline-block; }',
        'button[type=submit] { margin-left: 25% }',
    ],
    template: `
    <title-bar></title-bar>
    <article class="container">
    <form id="search" (ngSubmit)="onSubmit()">
        <legend>Filter teams</legend>
        <p></p>

        <fieldset class="form-group row">
            <label for="regionSelect" class="form-control-label  col-sm-3">Region</label>
            <div class="col-xs-9">
                <select id="regionSelect" class="form-control" [(ngModel)]="region">
                    <option>Any Region</option>
                    <option *ngFor="#r of regions" [value]="r.number">Region {{r.number}} {{r.name}}</option>
                </select>
            </div>
        </fieldset>

        <fieldset class="form-group row">
            <label class="form-control-label  col-sm-3">Division</label>
            <div class="col-sm-9">
                <select id="divisSelect" class="form-control" [(ngModel)]="ageGroup">
                    <option>Any</option>
                    <option *ngFor="#age of ages" [value]="age.toString()">{{age.toString()}}</option>
                </select>
                <select id="genderSelect" class="form-control" [(ngModel)]="gender">
                    <option>Any</option>
                    <option *ngFor="#g of genders" [value]="g.long">{{g.long}}</option>
                </select>
            </div>
        </fieldset>

        <fieldset class="form-group row">
            <label for="weekSelect" class="form-control-label col-sm-3">Week</label>
            <div class="col-sm-9">
                <select id="weekSelect" class="form-control" [(ngModel)]="week">
                    <option *ngFor="#w of weeks" [value]="w">{{w}}</option>
                </select>
            </div>
        </fieldset>
        <button type="submit" class="btn btn-primary">Go</button>
    </form>
    </article>
   `,
})
export class DivisionSelectView {
    //Iterated lists
    public regions:Region[];
    public ages:AgeGroup[];
    public weeks:Array<Number> = [];
    public genders:Gender[];

    //Form values
    public ageGroup:AgeGroup;
    public gender:Gender;
    public week:Number;
    public region:Number;

    constructor(
        private _router:Router,
        @Inject(WeekCacheInterface)
        private _weekCache:WeekCacheInterface,
        @Inject(SettingsDAO)
        private _settings:SettingsDAO
    ) {
        this.regions = REGIONS;
        this.ages = AGES;
        this.genders = GENDERS;

        _weekCache.getMaxWeeks().then((max) => {
            this.weeks = new Array<Number>(max);
            for(let i=0; i<max; ++i) {
                this.weeks[i] = i + 1;
            }
        });

        //Default to current week
        _weekCache.getCurrentWeek().then(cur => this.week = cur);

        //Default to current region
        _settings.getRegionNumber().then(n => this.region = n);
    }

    onSubmit(): void {
        console.log('Submitting search form');
        let params:{age?,gender?,region?,week} = {
            week: this.week
        };
        if(checkPresent(this.ageGroup)) {
            params.age  = this.ageGroup;
        }
        if(checkPresent(this.gender)) {
            params.gender = this.gender;
        }
        if(checkPresent(this.region)) {
            params.region = this.region;
        }
        this._router.navigate(['/DivisionSchedule', params]);
    }
}
