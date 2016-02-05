import {Component, Input, OnInit} from "angular2/core";
import {Router} from "angular2/router";
import Game from '../models/game';
import {NgFor} from 'angular2/common';
import {RouterLink} from 'angular2/router';
import {Optional} from 'angular2/core';
import {GamesDAO} from '../dao/games.interface';
import {Inject} from 'angular2/core';

@Component({
    directives: [NgFor, RouterLink],
    selector: 'single-team-game-list',
    template: `
<div id="games-list" data-role="page" class="page">
    <ul data-role="listview" data-theme="c">
        <li *ngFor="#game of games" [routerLink]="['/GameDetail',{id: game.id}]">
            {{game.id}} / {{game.dateTime}} TODO: Actually implement this
        </li>
    </ul>
</div>
    `
})

export default class SingleTeamGameListComponent implements OnInit {
    @Optional()
    @Input() games: Game[];

    @Input() team: String;

    constructor(
        @Optional() @Inject(GamesDAO)
        private dao: GamesDAO
    ) {}

    ngOnInit() {
        if(typeof this.games === 'undefined') {
            this.dao.findForTeam(this.team).then(games => this.games);
        }
    }
}
