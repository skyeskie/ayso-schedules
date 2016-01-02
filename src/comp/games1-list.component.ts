import {Component, Input, OnInit} from "angular2/core";
import {Router} from "angular2/router";
import Game from '../models/game';

@Component({
    selector: 'single-team-game-list',
    template: `
<div id="games-list" data-role="page" class="page">
    <div class="subheader ui-bar ui-bar-d">
        <h2></h2>
    </div>
    <ul data-role="listview" data-theme="c">
        <li *ngFor="#game of games" (click)="onSelect(game)">
            {{game.code}}
        </li>
    </ul>
</div>
    `
})

export default class SingleTeamGameListComponent {
    @Input() games: Game[];
}
