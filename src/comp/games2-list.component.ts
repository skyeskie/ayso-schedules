import {Component, Input, OnInit} from "angular2/core";
import {Router} from "angular2/router";
import Game from '../models/game';
import Team from '../models/team';
import {NgFor, NgIf} from "angular2/common";
import {DatePipe} from 'angular2/common';

@Component({
    selector: 'two-teams-game-list',
    directives: [NgFor, NgIf],
    pipes: [DatePipe],
    template: `
<div id="games-list" data-role="page" class="page">
    <ul data-role="listview" data-theme="c" data-inset="true">
        <li *ngIf="hasByes()" data-role="list-divider">Byes</li>
        <li *ngIf="hasByes()">{{byesList}}</li>

        <li *ngFor="#row of gamesList">
            <div *ngIf="!row.isHeader" (click)="onSelect(game)">
                <h3 class="width40">{{row.game.field}}</h3>
                <h3 class="width60 ta-right">{{row.game.HomeTeam}} vs {{row.game.AwayTeam}}</h3>
            </div>
            <span *ngIf="row.isHeader">
                {{row.headerTime | DatePipe:'long'}}
            </span>
        </li>
        <li *ngIf="hasNoResults()">No results</li>
    </ul>
</div>
    `
})
class Row {
    public headerTime: Date;
    constructor(
        public game: Game,
        public isHeader: boolean
    ) {
        if(isHeader) {
            this.headerTime = game.startTime;
        }
    }
}

export default class TwoTeamsGamesListComponent {
    public byesList: String = "";
    public gamesList: Row[] = [];

    constructor(@Input() games: Game[]) {
        let byes:String[] = [];

        games.sort();
        let lastTime = new Date(0,0,0,0,0,0);
        games.forEach(function(game: Game) {
            if(game.isBye()) {
                byes.push(game.getByeOpponent());
            } else {
                if(lastTime !== game.startTime) {
                    this.gamesList.append(new Row(game, true));
                }
                this.gamesList.append(new Row(game, false));
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
