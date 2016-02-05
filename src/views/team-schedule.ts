import {Component, OnInit} from 'angular2/core';
import {Router} from 'angular2/router';
import {RouteParams} from "angular2/router";
import SingleTeamGameListComponent from '../comp/games1-list.component';
import GamesDAO from '../dao/games.interface';
import Game from '../models/game';
import Team from '../models/team';
import TeamsDAO from '../dao/teams.interface';
import {Inject} from 'angular2/core';

@Component({
    directives: [SingleTeamGameListComponent],
    template: `TEST
    <div id="team-detail" data-role="page" class="page">
        <h2>Team {{teamID}}</h2>
        <div style="display: inline-block; float: right;">
            <button class="myteam" data-mini="true" data-inline="true"
                    data-icon="star" data-iconpos="right">
                <span class="fav">Save</span>
            </button>
        </div>
        <p *ngIf="team">
            <span class="coach">{{team.coach}}</span>
            <a class="tel" href="tel:{{team.coachTel}}" data-role="button" data-mini="true"
               data-inline="true" data-icon="arrow-r" data-iconpos="right">Call</a>
        </p>

        <single-team-game-list [games]="games"></single-team-game-list>
    </div>
  `
})
//TODO: Save/unsave
class TeamScheduleView implements OnInit {
    public teamId;
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
        this.teamId = this._routeParams.get('id');
        this._teamsDao.getTeam(this.teamId).then(team => this.team = team);
        this._gamesDao.findForTeam(this.teamId).then(games => this.games = games);
    }
}

export { TeamScheduleView as default, TeamScheduleView };
