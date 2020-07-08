import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { CFG } from '../app/cfg';
import { ITeamsDAO, Region, Team, TeamsDAO } from '../dao/teams.interface';
import { AgeGroup } from '../models/ageGroup';
import { Gender } from '../models/gender';

// All form data is string, so this helps make sure we convert it
type TeamFormData = {age?: string, gender?: string, region?: string};

@Component({
    styles: ['.team-list { columns: 3 }'],
    template: `
    <title-bar></title-bar>
    <article class="container">
    <form id="team" [formGroup]="teamForm">
        <legend class="text-xs-center text-primary">Filter teams</legend>
        <fieldset class="form-group row">
            <label for="regionSelect" class="form-control-label  col-xs-3 text-xs-right">
                Region
            </label>
            <div class="col-xs-9">
                <select id="regionSelect" class="form-control" [formControl]="teamForm.controls.region">
                    <option value="">Any</option>
                    <option *ngFor="let r of regions" [value]="r.number">Region {{r.number}} {{r.name}}</option>
                </select>
            </div>
        </fieldset>

        <fieldset class="form-group row">
            <label for="divisSelect" class="form-control-label col-xs-3 text-xs-right">
                Age <span class="hidden-xs-down">Group</span>
            </label>
            <div class="col-xs-9">
                <select id="divisSelect" class="form-control" [formControl]="teamForm.controls.age">
                    <option value="" selected>Any</option>
                    <option *ngFor="let age of ages" [value]="age.toString()">{{age.toString()}}</option>
                </select>
            </div>
        </fieldset>

        <fieldset class="form-group row">
            <label for="genderSelect" class="form-control-label col-xs-3 text-xs-right">
                Gender
            </label>
            <div class="col-xs-9">
                <select id="genderSelect" class="form-control" [formControl]="teamForm.controls.gender">
                    <option value="" selected>Any</option>
                    <option *ngFor="let g of genders" [value]="g.long">{{g.long}}</option>
                </select>
            </div>
        </fieldset>

        <h5 class="text-xs-center">Select Team</h5>
        <div class="container team-list text-xs-center">
            <button type="button" *ngFor="let team of teams" [class]="getButtonClasses()"
                [routerLink]="['/TeamSchedule',{ id: team.code }]">
                    {{team.code}}<span *ngIf="showCoachName()"> - {{team.coach | NameSwitch}}</span>
            </button>
        </div>
    </form>
    </article>
    `,
})
class TeamSelectView implements OnInit {
    public teamForm: FormGroup;

    // Iterated lists
    public teams: Team[];
    public regions: Region[];
    public ages: AgeGroup[];
    public genders: Gender[];

    constructor(
        private router: Router,
        @Inject(TeamsDAO)
        private dao: ITeamsDAO,
    ) {
        this.regions = CFG.REGIONS;
        this.ages = CFG.AGES;
        this.genders = CFG.GENDERS;
    }

    ngOnInit(): void {
        // Create form controls
        this.teamForm = new FormGroup({
            age: new FormControl(''),
            gender: new FormControl(''),
            region: new FormControl(''),
        });

        this.teamForm.valueChanges.subscribe((data: TeamFormData) => console.log(data));
        this.teamForm.valueChanges.subscribe((data: TeamFormData) =>
            this.updateTeams(
                data.age.valueOf(),
                data.gender.valueOf(),
                Number.parseInt(data.region.valueOf(), 10),
            ),
        );
        this.dao.findTeams().then((teams: Team[]) => this.teams = teams);
    }

    updateTeams(ageString?: string, genderLong?: string, regionNum?: number): void {
        if (ageString === '') {
            ageString = null;
        }
        if (genderLong === '') {
            genderLong = null;
        }
        if (isNaN(regionNum)) {
            regionNum = null;
        }
        this.dao.findTeams(regionNum, ageString, genderLong).then((teams: Team[]) => this.teams = teams);
    }

    showCoachName(): boolean {
        return (this.teams.length < 8);
    }

    getButtonClasses(): string {
        if (this.showCoachName()) {
            return 'btn btn-primary-outline btn-sm m-y-auto m-b-1';
        }
        return 'btn btn-link col-xs-3 col-md-2';
    }
}

export { TeamSelectView as default, TeamSelectView };
