import {Component, Input, OnChanges} from 'angular2/core';
import {NgFor, NgIf, DatePipe} from 'angular2/common';
import {Router, RouterLink} from 'angular2/router';
import Game from '../models/game';
import Team from '../models/team';

@Component({
    selector: 'two-teams-game-list',
    directives: [NgFor, NgIf, RouterLink],
    pipes: [DatePipe],
    template: `
    <ul data-role="listview" class="list-group" *ngIf="byesList">
        <li class="list-group-item">Byes</li>
        <li class="list-group-item">{{byesList}}</li>
    </ul>
    <div class="list-group">
        <div *ngFor="#row of gamesList">
            <button type="button" class="container list-group-item"
             *ngIf="!row.isHeader" [routerLink]="['/GameDetail',{id:row.game.id}]">
                <div class="col-xs-6">Region {{row.game.region}}, Field {{row.game.field}}</div>
                <div class="col-xs-6 text-xs-right">{{row.game.homeTeam}} vs {{row.game.awayTeam}}</div>
            </button>
            <div class="list-group-item-header m-t-1" *ngIf="row.isHeader">
                <h4>{{row.headerTime | date:'MMMdjm'}}</h4>
            </div>
        </div>
        <div class="list-group-item text-xs-center text-warning" *ngIf="hasNoResults()">No results</div>
    </div>
    `,
})
export default class TwoTeamsGamesListComponent implements OnChanges {
    public byesList: String;
    public gamesList: Row[];

    @Input() games: Game[];

    ngOnChanges() {
        this.parseGamesList();
    }

    parseGamesList() {
        let byes:String[] = [];

        this.games.sort();
        let lastTime = new Date(0,0,0,0,0,0);
        this.gamesList = [];
        this.games.forEach((game: Game) => {
            if(game.isBye()) {
                byes.push(game.getTeamWithBye());
            } else {
                if(lastTime !== game.startTime) {
                    //Add a date/time header
                    this.gamesList.push(new Row(game, true));
                    lastTime = game.startTime;
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

    onSelect(game) {
        console.log(game);
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
