import {Component, OnInit, Inject} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
import {Router} from 'angular2/router';

import {ButtonRadio} from 'ng2-bootstrap/ng2-bootstrap';

import {CFG} from '../app/cfg';

import {checkPresent} from '../service/util';
import {TitleBarComponent} from '../comp/title-bar.component';
import {SettingsDAO, Region} from '../dao/settings.interface';
import {WeekCacheInterface} from '../dao/week-cache.interface';
import {Division, AgeGroup, Gender} from '../models/division';

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
        <legend>Search Games</legend>
        <p></p>
        <fieldset class="form-group row">
            <label for="weekSelect" class="form-control-label col-xs-3">Week</label>
            <div class="col-xs-9">
                <select id="weekSelect" class="form-control" [(ngModel)]="week">
                    <option *ngFor="#w of weeks" [value]="w">{{w}}</option>
                </select>
            </div>
        </fieldset>

        <fieldset class="form-group row">
            <label for="regionSelect" class="form-control-label  col-xs-3">Region</label>
            <div class="col-xs-9">
                <select id="regionSelect" class="form-control" [(ngModel)]="region">
                    <option value="" selected>Any Region</option>
                    <option *ngFor="#r of regions" [value]="r.number">Region {{r.number}} {{r.name}}</option>
                </select>
            </div>
        </fieldset>

        <fieldset class="form-group row">
            <label class="form-control-label  col-xs-3">Division</label>
            <select id="divisSelect" class="form-control col-xs-4" [(ngModel)]="ageGroup">
                <option selected value="">Any</option>
                <option *ngFor="#age of ages" [value]="age.toString()">{{age.toString()}}</option>
            </select>
            <select id="genderSelect" class="form-control col-xs-5" [(ngModel)]="gender">
                <option selected value="">Any</option>
                <option *ngFor="#g of genders" [value]="g.long">{{g.long}}</option>
            </select>
        </fieldset>
        <button type="submit" class="btn btn-primary">Go</button>
    </form>
    </article>
   `,
})
export class SearchView {
    //Iterated lists
    public regions:Region[];
    public ages:AgeGroup[];
    public weeks:number[] = [];
    public genders:Gender[];

    //Form values
    public ageGroup:string = '';
    public gender:string = '';
    public week:string = '';
    public region:string = '';

    constructor(
        private _router:Router,
        @Inject(WeekCacheInterface)
        private _weekCache:WeekCacheInterface
    ) {
        this.regions = CFG.REGIONS;
        this.ages = CFG.AGES;
        this.genders = CFG.GENDERS;

        let max = _weekCache.getMaxWeeks();
        this.weeks = new Array<number>(max);
        for(let i=0; i<max; ++i) {
            this.weeks[i] = i + 1;
        }

        //Default to current week
        this.week = _weekCache.getCurrentWeek().toString(10);
    }

    onSubmit(): void {
        console.log('Submitting search form');
        let params:{age?:string,gender?:string,region?:string,week:string} = {
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
