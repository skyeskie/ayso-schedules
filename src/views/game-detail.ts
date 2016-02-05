import {Component, OnInit} from 'angular2/core';
import {Router} from 'angular2/router';
import {RouteParams} from "angular2/router";
import {DatePipe} from 'angular2/common';

import Game from '../models/game';
import Team from '../models/team';
import GamesDAO from "../dao/games.interface";
import {TeamsDAO} from '../dao/teams.interface';
import {Inject} from 'angular2/core';

@Component({
    pipes: [DatePipe],
    directives: [],
    template: `
<div id="game" class="page" *ngIf="game">
    <h2>Game Info</h2>
    <div class="when">Week <span class="game-week">#{{game?.weekNum}}</span><br />
        {{game?.dateTime | date:'MMM d, hm'}}
    </div>
    <div class="home team">
        <h3>Home Team</h3>
        <h3 class="team-code">{{game?.homeTeam}}</h3>
        <div class="coach" *ngIf="homeTeam">
            <strong>Coach</strong><br />
            <span class="name">{{homeTeam?.coach}}</span><br />
            <a class="tel" href="tel:{{homeTeam.coachTel}}"
               data-role="button" data-mini="true" data-inline="true"
               data-icon="arrow-r" data-iconpos="right">Call</a>
        </div>
    </div>
    <div class="away team">
        <h3>Away Team</h3>
        <h3 class="team-code">{{game?.awayTeam}}</h3>
        <div class="coach" *ngIf="awayTeam">
            <strong>Coach</strong><br />
            <span class="name">{{awayTeam.coach}}</span><br />
            <a class="tel" href="tel:{{awayTeam.coachTel}}"
               data-role="button" data-mini="true" data-inline="true"
               data-icon="arrow-r" data-iconpos="right">Call</a>
        </div>
    </div>
    <ul data-role="listview" data-inset="true">
        <li class="map-link" (click)="gotoMap()">
            <strong>Region</strong> <span class="game-region">{{game?.region}}</span>
            <span class="ui-li-aside">Directions</span>
        </li>

        <li class="field-link" (click)="gotoField()">
            <strong>Field</strong> <span class="game-field">{{game?.field}}</span>
            <span class="ui-li-aside">Field map</span>
        </li>
    </ul>
</div>
    `
})
//TODO: Switch to grab teams from Team DAO
export default class GameDetail implements OnInit {
    public game: Game;
    public homeTeam: Team;
    public awayTeam: Team;

    constructor(
        private _router:Router,
        private _routeParams:RouteParams,
        @Inject(GamesDAO)
        private _games:GamesDAO,
        @Inject(TeamsDAO)
        private _teams:TeamsDAO
    ) {}

    ngOnInit() {
        let id = this._routeParams.get('id');
        this._games.getGame(id).then(game => {
            this.game = game;
            this._teams.getTeam(game.homeTeam).then(t => this.homeTeam = t);
            this._teams.getTeam(game.awayTeam).then(t => this.awayTeam = t);
        });
    }

    gotoMap() {
        this._router.navigate(['/map', { region: this.game.region }]);
    }

    gotoField() {
        this._router.navigate(['/field', {
            region: this.game.region,
            field: this.game.field
        }]);
    }
}
