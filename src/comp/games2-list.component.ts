import {Component, Input, OnChanges} from 'angular2/core';
import {NgFor, NgIf} from 'angular2/common';
import {Router, RouterLink} from 'angular2/router';
import Game from '../models/game';
import Team from '../models/team';
import {checkPresent} from '../service/util';
import {ClassLogger, Logger, Level} from '../service/log.decorator';
import {DateMedPipe} from '../pipes/date-med.pipe';

@Component({
    selector: 'two-teams-game-list',
    directives: [NgFor, NgIf, RouterLink],
    pipes: [DateMedPipe],
    styles: ['.card.card-block { padding: 0.4rem 1rem; }'],
    template: `
    <div class="list-group">
        <div class="list-group-item bg-faded" *ngIf="byesList">
            <h6 class="list-group-item-heading text-xs-center">Byes</h6>
        </div>
        <div class="list-group-item text-xs-center" *ngIf="byesList">{{byesList}}</div>
        <div *ngFor="#row of gamesList">
            <button type="button" class="container list-group-item"
             *ngIf="!row.isHeader" [routerLink]="['/GameDetail',{id:row.game.id}]">
                <div class="col-xs-6">Region {{row.game.region}}, Field {{row.game.field}}</div>
                <div class="col-xs-6 text-xs-right">{{row.game.homeTeam}} vs {{row.game.awayTeam}}</div>
            </button>
            <div class="list-group-item bg-faded" *ngIf="row.isHeader">
                <h6 class="list-group-item-heading text-xs-center">{{row.headerTime | dateMed}}</h6>
            </div>
        </div>
        <div class="list-group-item text-xs-center text-warning" *ngIf="hasNoResults()">No results</div>
    </div>
    `,
})
export default class TwoTeamsGamesListComponent implements OnChanges {
    @ClassLogger() public log: Logger;

    public byesList: string = '';
    public gamesList: Row[] = [];

    @Input() games: Game[];

    ngOnChanges() {
        this.parseGamesList();
    }

    parseGamesList() {
        if(!checkPresent(this.games)) {
            this.log.warn('No games for Games2List');
            return;
        }

        let byes:string[] = [];
        this.games.sort(Game.compare);
        let lastTime = new Date(0,0,0,0,0,0).valueOf();
        this.gamesList = [];
        this.games.forEach((game: Game) => {
            if(game.isBye()) {
                byes.push(game.getTeamWithBye());
            } else {
                if(lastTime !== game.startTime.valueOf()) {
                    //Add a date/time header
                    this.gamesList.push(new Row(game, true));
                    lastTime = game.startTime.valueOf();
                }
                this.gamesList.push(new Row(game, false));
            }
        });

        byes.sort();
        this.byesList = byes.join(',');
    }

    hasNoResults(): boolean {
        return this.byesList.length === 0 && (this.gamesList.length === 0);
    }

    hasByes(): boolean {
        return (this.byesList.length === 0);
    }
}

/**
 * Utility class. Single iterable to handle both a game row
 * and date/time headers
 */
class Row {
    public headerTime: Date = undefined;
    constructor(
        public game: Game,
        public isHeader: boolean
    ) {
        if(isHeader) {
            this.headerTime = game.startTime;
        }
    }
}
