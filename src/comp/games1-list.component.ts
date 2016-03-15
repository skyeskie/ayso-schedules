import {Component, Input, Inject, OnChanges, Optional} from 'angular2/core';
import {NgFor} from 'angular2/common';
import {Router, RouterLink} from 'angular2/router';

import Game from '../models/game';
import {GamesDAO} from '../dao/games.interface';
import {VsAtGameFormatPipe} from '../pipes/vs-at-game.pipe';
import {DateMedPipe} from '../pipes/date-med.pipe';
import {ClassLogger, Logger} from '../service/log.decorator';

@Component({
    selector: 'single-team-game-list',
    directives: [NgFor, RouterLink],
    styles: [`.team { height: 100%; text-valign: middle}`],
    pipes: [DateMedPipe, VsAtGameFormatPipe],
    template: `
    <div class="list-group list-group-flush" *ngIf="!hasResults()">
        <h6 class="list-group-item list-group-item-warning text-xs-center">
            <i class="ion-alert-circled"></i>
            No games found
        </h6>
    </div>

    <div class="list-group list-group-flush" *ngIf="hasResults()">
        <button type="button" class="list-group-item container text-xs-center"
                *ngFor="#game of games" [routerLink]="['/GameDetail',{id:game.id}]">
            <h6 class="col-xs-6 col-md-3 font-weight-bold">{{game.startTime | dateMed}}</h6>
            <h6 class="col-xs-6 col-md-3 font-weight-bold" *ngIf="team">{{game | vsAtGame:team }}</h6>
            <h6 class="col-xs-6 col-md-3" *ngIf="!team">&nbsp;</h6>
            <div class="col-xs-6 col-md-3">Region {{game.region}}</div>
            <div class="col-xs-6 col-md-3">Field {{game.field}}</div>
        </button>
    </div>
    `,
})
export default class SingleTeamGameListComponent implements OnChanges {
    @ClassLogger(Logger.Level.DEBUG) log:Logger;

    @Optional()
    @Input() games: Game[];

    @Input() team: string;

    constructor(
        @Optional() @Inject(GamesDAO)
        private dao: GamesDAO
    ) {}

    ngOnChanges() {
        if(typeof this.games === 'undefined') {
            this.log.debug('Loading games from DAO');
            this.loadGames();
        } else {
            this.log.debug('Sorting games');
            this.games.sort(Game.compare);
        }
    }

    loadGames() {
        this.dao.findForTeam(this.team).then((games:Game[]) => this.games = games);
    }

    hasResults() {
        return (this.games instanceof Array) && this.games.length > 0;
    }
}
