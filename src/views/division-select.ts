import {View, OnInit} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
import {Router} from 'angular2/router';
import {REGIONS, Region} from "../cfg/regions";
import Gender, { GENDERS } from '../cfg/gender';
import {AgeGroup} from '../cfg/ages';
import Division from '../models/division';
import {WeekCacheInterface} from '../dao/week-cache.interface';
import {ButtonRadio} from 'ng2-bootstrap/ng2-bootstrap';

@View({
    directives: [CORE_DIRECTIVES, FORM_DIRECTIVES, ButtonRadio],
    template: `
<form id="divis" (ngSubmit)="onSubmit" #divisionFilter="ngForm">
    <h2 class="ui-bar ui-bar-d">Select Filter</h2>
    <label for="region">Region</label>
    <div class="btn-group btn-group-justified" role="group">
        <label class="btn btn-secondary" *ngFor="#_region of regions" [(ngModel)]="region" *btnRadio="_region">
            Region {{_region.number}} ({{_region.name}})
        </label>
    </div>

    <label>Division</label>
    <div id="age-select1" class="btn-group">
        <label class="btn btn-secondary" *ngFor="#age of ages" [(ngModel)]="ageGroup" *btnRadio="age">
            {{age}}
        </label>
    </div>

    <label>Gender</label>
    <div class="filters gender-select" data-role="navbar">
        <label class="btn btn-secondary" *ngFor="#_gender of GENDERS" [(ngModel)]="gender" *btnRadio="_gender">
            {{gender.long}}
        </label>
    </div>

    <!-- TODO: Convert this into slider or better widget -->
    <div class="form-group">
        <label for="weekSelect">Week</label>
        <select class="form-control" [(ngModel)]="week">
            <option *ngFor="#w of weeks" [value]="w">{{w}}</option>
        </select>
    </div>

    <button type="submit" class="btn btn-primary">Go</button>
</form>
   `
})
export class DivisionSelectView {
    //Iterated lists
    public regions:Region[];
    public ages:String[];
    public weeks:Number[];

    //Form values
    public ageGroup:AgeGroup;
    public gender:Gender;
    public week:Number;
    public region:Region;

    constructor(
        private _router:Router,
        private _weekCache:WeekCacheInterface
    ) {
        this.regions = REGIONS;
        //Extract values from enum.
        this.ages = Object.keys(AgeGroup).filter(v => isNaN(parseInt(v, 10)));
        _weekCache.getMaxWeeks().then((max) => {
            this.weeks = new Array<Number>(max);
            for(let i=0; i<max; ++i) {
                this.weeks[i] = i+1;
            }
        });
    }

    onSubmit(): void {
        let division = new Division(this.gender, this.ageGroup);
        this._router.navigate(["DivisionSchedule", { divis: division, week: this.week}]);
    }
}
