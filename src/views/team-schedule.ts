import {Component, OnInit} from 'angular2/core';
import {Router} from 'angular2/router';
import {RouteParams} from "angular2/router";
import SingleTeamGameListComponent from '../comp/games1-list.component';
import GamesDAO from '../dao/games.interface';
import Game from '../models/game';
import Team from '../models/team';
import TeamsDAO from '../dao/teams.interface';
import {Inject} from 'angular2/core';
import {TitleBarComponent} from '../comp/title-bar.component';
import {NgIf} from 'angular2/common';

@Component({
    directives: [SingleTeamGameListComponent, TitleBarComponent, NgIf],
    styles: ["h4.card-text { display: inline; }"],
    template: `
    <title-bar></title-bar>
    <div class="card card-block clearfix">
        <h2 class="text-xs-center card-title">Team {{teamID}}</h2>
        <button type="button" class="btn btn-sm btn-primary-outline card-link pull-xs-right">
            Save
        </button>
        <button type="button" class="btn btn-sm btn-link card-link pull-xs-right m-x-2"
            (click)="initCall()" *ngIf="team?.coachTel">Call</button>
        <h4 class="card-text m-a-1"><b>Coach</b> {{team?.coach}}</h4>
    </div>

    <single-team-game-list [games]="games" [team]="teamID"></single-team-game-list>
  `
})
//TODO: Save/unsave
class TeamScheduleView implements OnInit {
    public teamID:String;
    public games:Game[];
    public team:Team;

    constructor(
        private _router:Router,
        private _routeParams:RouteParams,
        @Inject(TeamsDAO)
        private _teamsDao:TeamsDAO,
        @Inject(GamesDAO)
        private _gamesDao:GamesDAO
    ) {
    }

    ngOnInit() {
        this.teamID = this._routeParams.get('id');
        this._teamsDao.getTeam(this.teamID).then(team => this.team = team);
        this._gamesDao.findForTeam(this.teamID).then(games => this.games = games);
    }

    initCall() {
        console.log('tel:' + this.team.coachTel);
    }
}

export { TeamScheduleView as default, TeamScheduleView };
