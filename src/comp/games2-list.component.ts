import {Component, Input, OnInit} from "angular2/core";
import {Router} from "angular2/router";
import Game from '../models/game';

@Component({
    selector: 'two-teams-game-list',
    template: `
<div id="games-list" data-role="page" class="page">
    <ul data-role="listview" data-theme="c">
        <li *ngFor="#game of games" (click)="onSelect(game)">
            {{game.code}}
        </li>
    </ul>
</div>
    `
})

export default class TwoTeamsGamesListComponent {
    @Input() games: Game[];
}
