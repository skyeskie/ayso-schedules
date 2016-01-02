import {Component, OnInit} from 'angular2/core';
import {Router} from 'angular2/router';
import {RouteParams} from "angular2/router";

import Game from '../models/game';
import Team from '../models/team';
import GamesDAO from "../dao/games.interface";

@Component({
    selector: 'game',
    template: `
<div id="game" class="page">
    <h2>Game Info</h2>
    <div class="when">Week <span class="game-week">#{{game.weekNum}}</span><br />
        {{game.dateTime | date:'MMM d, hm'}}
    </div>
    <div class="home team">
        <h3>Home Team</h3>
        <h3 class="team-code">{{game.homeTeam.code}}</h3>
        <div class="coach">
            <strong>Coach</strong><br />
            <span class="name">{{game.homeTeam.coach}}</span><br />
            <a class="tel" href="tel:{{game.homeTeam.coachTel}}"
               data-role="button" data-mini="true" data-inline="true"
               data-icon="arrow-r" data-iconpos="right">Call</a>
        </div>
    </div>
    <div class="away team">
        <h3>Away Team</h3>
        <h3 class="team-code">{{game.awayTeam.code}}</h3>
        <div class="coach">
            <strong>Coach</strong><br />
            <span class="name">{{game.awayTeam.coach}}</span><br />
            <a class="tel" href="tel:{{game.awayTeam.coachTel}}"
               data-role="button" data-mini="true" data-inline="true"
               data-icon="arrow-r" data-iconpos="right">Call</a>
        </div>
    </div>
    <ul data-role="listview" data-inset="true">
        <li class="map-link" (click)="gotoMap()">
            <strong>Region</strong> <span class="game-region">{{game.region}}</span>
            <span class="ui-li-aside">Directions</span>
        </li>

        <li class="field-link" (click)="gotoField()">
            <strong>Field</strong> <span class="game-field">{{game.field}}</span>
            <span class="ui-li-aside">Field map</span>
        </li>
    </ul>
</div>
    `
})

export default class GameComponent implements OnInit {
    public game: Game;

    constructor(
        private _dao:GamesDAO,
        private _router:Router,
        private _routeParams:RouteParams
    ) {}

    ngOnInit() {
        let id = this._routeParams.get('id');
        this._dao.getGame(id).then(game => this.game = game);
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
