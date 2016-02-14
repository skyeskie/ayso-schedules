import {Component, Input, Inject, OnInit, Optional} from 'angular2/core';
import {NgFor, DatePipe} from 'angular2/common';
import {Router, RouterLink} from 'angular2/router';

import Game from '../models/game';
import {GamesDAO} from '../dao/games.interface';
import {VsAtGameFormatPipe} from '../pipes/vs-at-game.pipe';

@Component({
    selector: 'single-team-game-list',
    directives: [NgFor, RouterLink],
    styles: [`.team { height: 100%; text-valign: middle}`],
    pipes: [DatePipe, VsAtGameFormatPipe],
    template: `
    <div class="list-group">
        <div class="list-group-item text-xs-center text-warning" *ngIf="hasNoResults()">No games found</div>

        <button type="button" class="list-group-item container"
         *ngFor="#game of games" [routerLink]="['/GameDetail',{id:game.id}]">
            <div class="col-xs-6">
                <h5>{{game.startTime | date:'MMMdjm'}}</h5>
                <div class="m-l-2">
                    Region {{game.region}}, Field {{game.field}}
                </div>
            </div>
            <h4 class="col-xs-5 team text-xs-center" *ngIf="team">
                {{game | vsAtGame:team }}
            </h4>
        </button>
    </div>
    `,
})
export default class SingleTeamGameListComponent implements OnInit {
    @Optional()
    @Input() games: Game[];

    @Input() team: string;

    constructor(
        @Optional() @Inject(GamesDAO)
        private dao: GamesDAO
    ) {}

    ngOnInit() {
        if(typeof this.games === 'undefined') {
            this.dao.findForTeam(this.team).then((games:Game[]) => this.games);
        }
    }

    hasNoResults() {
        return this.games && this.games.length === 0;
    }
}
