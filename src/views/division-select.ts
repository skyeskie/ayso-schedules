import {View, OnInit} from 'angular2/core';
import {NgFor} from 'angular2/common';
import {Router} from 'angular2/router';
import {REGIONS, Region} from "../cfg/regions";
import Gender, { GENDERS } from '../cfg/gender';
import AgeGroup from '../cfg/ages';
import Division from '../models/division';

@View({
    directives: [NgFor],
    template: `
<form id="divis" (ngSubmit)="onSubmit" #divisionFilter="ngForm">
    <h2 class="ui-bar ui-bar-d">Select Filter</h2>
    <label for="region">Region</label>
    <div class="btn-group btn-group-justified" role="group">
        <button type="button" *ngFor="#region of regions">
            {{region.name}}
        </button>
    </div>

    <label>Division</label>
    <div class="filters divis-select1" data-role="navbar">
        <button type="button" *ngFor="#age of ages">
            {{age}}
        </button>
    </div>

    <label>Gender</label>
    <div class="filters gender-select" data-role="navbar">
        <button type="button" *ngFor="#gender of GENDERS">
            {{gender.valueOf()}}
        </button>
    </div>

    <label for="slider-week">Week</label><span class="week-desc"></span><br />
    <input type="range" name="slider-week" id="slider-week"
           value="1" min="1" max="3" data-highlight="true" />

    <button id="divis-submit">Go</button>
</form>
   `
})
//TODO: Need to convert to actual form binding.
export class DivisionSelectView {
    //Iterated lists
    public regions:Region[];
    public ages:String[];

    //Form values
    public ageGroup:AgeGroup;
    public gender:Gender;
    public week:Number;

    constructor(
        private _router:Router
    ) {
        this.regions = REGIONS;
        //Extract values from enum.
        this.ages = Object.keys(AgeGroup).filter(v => isNaN(parseInt(v, 10)));
    }

    onSubmit(): void {
        let division = new Division(this.gender, this.ageGroup);
        this._router.navigate(["DivisionSchedule", { divis: division, week: this.week}]);
    }
}
