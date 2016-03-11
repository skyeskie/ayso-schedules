import {Component, AfterViewInit, Inject, ViewChild} from 'angular2/core';
import {Router, RouteParams, RouterLink} from 'angular2/router';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, FormBuilder, ControlGroup} from 'angular2/common';
import {ChangeDetector} from 'angular2/src/core/change_detection/interfaces';
import {ButtonRadio} from 'ng2-bootstrap/ng2-bootstrap';

import {TeamsDAO, Team, Region} from '../dao/teams.interface';

import {CFG} from '../app/cfg';
import {AgeGroup} from '../models/ageGroup';
import {Gender} from '../models/gender';

import {TitleBarComponent} from '../comp/title-bar.component';
import {NameSwitchPipe} from '../pipes/name-switch.pipe';

//All form data is string, so this helps make sure we convert it
type TeamFormData = {age?:string, gender?:string, region?:string}

@Component({
    directives: [CORE_DIRECTIVES, FORM_DIRECTIVES, RouterLink, TitleBarComponent],
    pipes: [NameSwitchPipe],
    styles: ['.team-list: { columns: 3 }'],
    template: `
    <title-bar></title-bar>
    <article class="container">
    <form id="team" [ngFormModel]="teamForm">
        <legend class="text-xs-center text-primary">Filter teams</legend>
        <fieldset class="form-group row">
            <label for="regionSelect" class="form-control-label  col-xs-3 text-xs-right">
                Region
            </label>
            <div class="col-xs-9">
                <select id="regionSelect" class="form-control" [ngFormControl]="teamForm.controls.region">
                    <option value="">Any</option>
                    <option *ngFor="#r of regions" [value]="r.number">Region {{r.number}} {{r.name}}</option>
                </select>
            </div>
        </fieldset>

        <fieldset class="form-group row">
            <label for="divisSelect" class="form-control-label col-xs-3 text-xs-right">
                Age <span class="hidden-xs-down">Group</span>
            </label>
            <div class="col-xs-9">
                <select id="divisSelect" class="form-control" [ngFormControl]="teamForm.controls.age">
                    <option value="" selected>Any</option>
                    <option *ngFor="#age of ages" [value]="age.toString()">{{age.toString()}}</option>
                </select>
            </div>
        </fieldset>

        <fieldset class="form-group row">
            <label for="genderSelect" class="form-control-label col-xs-3 text-xs-right">
                Gender
            </label>
            <div class="col-xs-9">
                <select id="genderSelect" class="form-control" [ngFormControl]="teamForm.controls.gender">
                    <option value="" selected>Any</option>
                    <option *ngFor="#g of genders" [value]="g.long">{{g.long}}</option>
                </select>
            </div>
        </fieldset>

        <h5 class="text-xs-center">Select Team</h5>
        <div class="container team-list text-xs-center">
            <button type="button" *ngFor="#team of teams" [class]="getButtonClasses()"
                [routerLink]="['/TeamSchedule',{ id: team.code }]">
                    {{team.code}}<span *ngIf="showCoachName()"> - {{team.coach | NameSwitch}}</span>
            </button>
        </div>
    </form>
    </article>
    `,
})
class TeamSelectView {
    private teamForm:ControlGroup;

    //Iterated lists
    private teams: Team[];
    private regions:Region[];
    private ages:AgeGroup[];
    private genders:Gender[];

    constructor(
        private _router:Router,
        private fb:FormBuilder,
        @Inject(TeamsDAO)
        private dao:TeamsDAO
    ) {
        this.regions = CFG.REGIONS;
        this.ages = CFG.AGES;
        this.genders = CFG.GENDERS;
        //Create form controls
        this.teamForm = fb.group({
            age: '',
            gender: '',
            region: '',
        });

        this.teamForm.valueChanges.subscribe((data:TeamFormData) => console.log(data));
        this.teamForm.valueChanges.subscribe((data:TeamFormData) =>
            this.updateTeams(data.age, data.gender, Number.parseInt(data.region, 10))
        );
        this.dao.findTeams().then((teams:Team[]) => this.teams = teams);
    }

    updateTeams(ageString?:string, genderLong?:string, regionNum?:number) {
        if(ageString === '') {
            ageString = null;
        }
        if(genderLong === '') {
            genderLong = null;
        }
        if(isNaN(regionNum)) {
            regionNum = null;
        }
        this.dao.findTeams(regionNum, ageString, genderLong).then((teams:Team[]) => this.teams = teams);
    }

    showCoachName(): boolean {
        return (this.teams.length < 8);
    }

    getButtonClasses() {
        if(this.showCoachName()) {
            return 'btn btn-primary-outline btn-sm m-y-auto m-b-1';
        }
        return 'btn btn-link col-xs-3 col-md-2';
    }
}

export { TeamSelectView as default, TeamSelectView };
