import {Component, OnInit, Inject} from 'angular2/core';
import {NgIf} from 'angular2/common';
import {Router, RouteParams} from 'angular2/router';

import SingleTeamGameListComponent from '../comp/games1-list.component';
import TitleBarComponent from '../comp/title-bar.component';
import {GamesDAO, Game} from '../dao/games.interface';
import {TeamsDAO, Team} from '../dao/teams.interface';
import SettingsDAO from '../dao/settings.interface';
import {NameSwitchPipe} from '../pipes/name-switch.pipe';

@Component({
    directives: [SingleTeamGameListComponent, TitleBarComponent, NgIf],
    pipes: [NameSwitchPipe],
    styles: ['h4.card-text { display: inline; }'],
    template: `
    <title-bar></title-bar>
    <article class="container">
        <div class="card">
            <div class="card-block clearfix">
                <button class="btn btn-xs btn-primary-outline pull-xs-right"
                     type="button" (click)="toggleTeamSave()">
                     <i class="ion-star"></i>
                     {{getSavedToggleText()}}
                </button>
                <h5 class="text-sm-center card-text text-muted"><small>Team {{teamID}}</small></h5>
            </div>
            <div class="clearfix" *ngIf="!isCoachTBD()">
                <div class="text-sm-center text-md-left container">
                    <h5 class="col-xs-4 text-xs-right font-weight-bold">Coach</h5>
                    <h5 class="col-xs-8 text-xs-left">{{team?.coach | NameSwitch}}</h5>
                </div>
                <div class="col-xs-8 col-xs-offset-4">
                    <a type="button" class="btn btn-sm btn-link" href="tel:{{team.coachTel}}" *ngIf="team?.coachTel">
                        <i class="ion-android-call"></i> {{team.coachTel}}
                    </a>
                </div>
            </div>
            <div class="clearfix" *ngIf="isCoachTBD()">
                <h5 class="col-xs-4 text-xs-right font-weight-bold">Coach</h5>
                <h5 class="col-xs-8 text-xs-left text-muted font-italic">
                    <small>To Be Determined</small>
                </h5>
            </div>
        </div>

        <div class="card">
            <single-team-game-list [games]="games" [team]="teamID"></single-team-game-list>
        </div>

    </article>
  `,
})
class TeamScheduleView implements OnInit {
    public isTeamSaved:boolean = false;
    public teamID:string;
    public games:Game[];
    public team:Team;

    constructor(
        private _router:Router,
        private _routeParams:RouteParams,
        @Inject(TeamsDAO)
        private _teamsDao:TeamsDAO,
        @Inject(GamesDAO)
        private _gamesDao:GamesDAO,
        @Inject(SettingsDAO)
        private _settings:SettingsDAO
    ) {
    }

    ngOnInit() {
        this.teamID = this._routeParams.get('id');
        this._teamsDao.getTeam(this.teamID).then((team:Team) => this.team = team);
        this._gamesDao.findForTeam(this.teamID).then((list:Game[]) => this.games = list);
        this._settings.isTeamSaved(this.teamID).then((v:boolean) => this.isTeamSaved = v);
    }

    initCall() {
        console.log('tel:' + this.team.coachTel);
    }

    toggleTeamSave() {
        if(this.isTeamSaved) {
            this._settings.unSaveTeam(this.teamID);
        } else {
            this._settings.saveTeam(this.teamID);
        }
        this.isTeamSaved = ! this.isTeamSaved;
    }

    getSavedToggleText() {
        return (this.isTeamSaved) ? 'Unsave' : 'Save';
    }

    isCoachTBD() {
        return (this.team instanceof Team) && this.team.coach === 'TBD';
    }
}

export { TeamScheduleView as default, TeamScheduleView };
