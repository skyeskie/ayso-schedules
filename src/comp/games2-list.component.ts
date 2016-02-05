import {Component, Input, OnInit} from "angular2/core";
import {NgFor, NgIf, DatePipe} from "angular2/common";
import {Router} from "angular2/router";
import Game from '../models/game';
import Team from '../models/team';

@Component({
    selector: 'two-teams-game-list',
    directives: [NgFor, NgIf],
    pipes: [DatePipe],
    template: `
<div id="games-list" data-role="page" class="page" *ngIf="gamesList">
    <ul data-role="listview" data-theme="c" data-inset="true">
        <li *ngIf="byesList" data-role="list-divider">Byes</li>
        <li *ngIf="byesList">{{byesList}}</li>

        <li *ngFor="#row of gamesList">
            <div *ngIf="!row.isHeader" (click)="onSelect(row.game)">
                <h3 class="width40">{{row.game.field}}</h3>
                <h3 class="width60 ta-right">{{row.game.homeTeam}} vs {{row.game.awayTeam}}</h3>
            </div>
            <span *ngIf="row.isHeader">
                {{row.headerTime | date:'medium'}}
            </span>
        </li>
        <li *ngIf="hasNoResults()">No results</li>
    </ul>
</div>
    `
})
export default class TwoTeamsGamesListComponent implements OnInit {
    public byesList: String;
    public gamesList: Row[];

    @Input()
    public games: Game[];

    ngOnInit() {
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
                }
                this.gamesList.push(new Row(game, false));
            }
        });

        byes.sort();
        this.byesList = byes.join(",");
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
    public headerTime: Date = null;
    constructor(
        public game: Game,
        public isHeader: boolean
    ) {
        if(isHeader) {
            this.headerTime = game.startTime;
        }
    }
}
