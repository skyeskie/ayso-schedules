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
        <div class="card card-block clearfix">
            <h2 class="text-xs-center card-title">Team {{teamID}}</h2>
            <button type="button" class="btn btn-sm btn-primary-outline card-link pull-xs-right" (click)="toggleTeamSave()">
                {{getSavedToggleText()}}
            </button>
            <button type="button" class="btn btn-sm btn-link card-link pull-xs-right m-x-2"
                (click)="initCall()" *ngIf="team?.coachTel">Call</button>
            <h4 class="card-text m-a-1"><b>Coach</b> {{team?.coach | NameSwitch}}</h4>
        </div>

        <single-team-game-list [games]="games" [team]="teamID"></single-team-game-list>
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
}

export { TeamScheduleView as default, TeamScheduleView };
