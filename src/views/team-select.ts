import {Component, AfterViewInit, Inject, ViewChild} from 'angular2/core';
import {Router, RouteParams, RouterLink} from 'angular2/router';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
import {ButtonRadio} from 'ng2-bootstrap/ng2-bootstrap';

import {TeamsDAO, Team, Region, Division} from '../dao/teams.interface';

import {REGIONS} from '../cfg/regions';
import {GENDERS,Gender} from '../cfg/gender';
import {AGES,AgeGroup} from '../cfg/ages';
import {TitleBarComponent} from '../comp/title-bar.component';
import {FormBuilder} from 'angular2/common';
import {ControlGroup} from 'angular2/common';
import {ChangeDetector} from 'angular2/src/core/change_detection/interfaces';

@Component({
    directives: [CORE_DIRECTIVES, FORM_DIRECTIVES, RouterLink, TitleBarComponent],
    styles: ['.team-list: { columns: 3 }'],
    template: `
    <title-bar></title-bar>
    <article class="container">
    <form id="team" [ngFormModel]="teamForm">
        <legend>Filter teams</legend>
        <fieldset class="form-group row">
            <label for="regionSelect" class="form-control-label  col-sm-3">Region</label>
            <div class="col-sm-9">
                <select id="regionSelect" class="form-control" [ngFormControl]="teamForm.controls.region">
                    <option *ngFor="#r of regions" [value]="r.number">Region {{r.number}} {{r.name}}</option>
                </select>
            </div>
        </fieldset>

        <fieldset class="form-group row">
            <label for="divisSelect" class="form-control-label  col-sm-3">Age Group</label>
            <div class="col-sm-9">
                <select id="divisSelect" class="form-control" [ngFormControl]="teamForm.controls.age">
                    <option *ngFor="#age of ages" [value]="age.toString()">{{age.toString()}}</option>
                </select>
            </div>
        </fieldset>

        <fieldset class="form-group row">
            <label for="genderSelect" class="form-control-label  col-sm-3">Gender</label>
            <div class="col-sm-9">
                <select id="genderSelect" class="form-control" [ngFormControl]="teamForm.controls.gender">
                    <option *ngFor="#g of genders" [value]="g.long">{{g.long}}</option>
                </select>
            </div>
        </fieldset>

        <h3 class="text-xs-center">Select Team</h3>
        <div class="container team-list text-justify">
            <button type="button" class="btn btn-secondary m-a-1 btn-sm"
                *ngFor="#team of teams" [routerLink]="['/TeamSchedule',{ id: team.code }]">
                {{team.code}}<span *ngIf="teams.length<10"> - {{team.coach}}</span>
            </button>
        </div>
    </form>
    </article>
    `
})
//TODO: Enumerate selectors (as form)
//TODO: Redo results (as links)
class TeamSelectView {
    private teamForm:ControlGroup;

    //Iterated lists
    public teams: Team[];
    public regions:Region[];
    public ages:AgeGroup[];
    public genders:Gender[];

    constructor(
        private _router:Router,
        private fb:FormBuilder,
        @Inject(TeamsDAO)
        private dao:TeamsDAO
    ) {
        this.regions = REGIONS;
        this.ages = AGES;
        this.genders = GENDERS;
        //Create form controls
        this.teamForm = fb.group({
            age: null,
            gender: null,
            region: null,
        });

        this.teamForm.valueChanges.subscribe(data => console.log(data));
        this.teamForm.valueChanges.subscribe(data =>
            this.updateTeams(data.age, data.gender, data.region)
        );
        this.dao.findTeams().then(teams => this.teams = teams);
    }

    updateTeams(ageString?:String, genderLong?:String, regionNum?:String) {
        this.dao.findTeams(regionNum, ageString, genderLong).then(teams => this.teams = teams);
    }
}

export { TeamSelectView as default, TeamSelectView };
