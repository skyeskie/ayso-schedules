import {Component, OnInit} from 'angular2/core';
import {Router} from 'angular2/router';
import {RouteParams} from "angular2/router";
import SingleTeamGameListComponent from '../comp/games1-list.component';
import GamesDAO from '../dao/games.interface';
import Game from '../models/game';
import Team from '../models/team';
import TeamsDAO from '../dao/teams.interface';

@Component({
    directives: [SingleTeamGameListComponent],
    template: `
    <div id="team-detail" data-role="page" class="page">
        <h2>Team {{team.code}}</h2>
        <div style="display: inline-block; float: right;">
            <button class="myteam" data-mini="true" data-inline="true"
                    data-icon="star" data-iconpos="right">
                <span class="fav">Save</span>
            </button>
        </div>
        <p>
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
    public games:Game[];
    public team:Team;
    constructor(
        private _router:Router,
        private _routeParams:RouteParams,
        private _teamsDao:TeamsDAO,
        private _gamesDao:GamesDAO
    ) {
    }

    ngOnInit() {
        let teamId:String = this._routeParams.get('id');
        this._teamsDao.getTeam(teamId).then(team => this.team = team);
        this._gamesDao.findForTeam(teamId).then(games => this.games = games);
    }
}

export { TeamScheduleView as default, TeamScheduleView };
