import {View, OnInit} from 'angular2/core';
import {Router} from 'angular2/router';
import SettingsDAO from '../dao/settings.interface';
import GamesDAO from '../dao/games.interface';
import Game from '../models/game';

@View({
   template: `
   <div id="favorites" data-role="page" class="page">
        <div class="subheader ui-bar ui-bar-d">
            <h2>My Teams' Schedules</h2>
        </div>
        <div class="myteams">
            <button *ngFor="#team of teams" (click)="selectTeam({{team}}">
                {{team}}
            </button>
        </div>

        <two-teams-game-list *ngIf="gamesList.length > 0" [games]="gamesList" />

        <div *ngIf="gamesList.length===0">
            <h2 style='text-align: center;'>No saved teams</h2>
            <ol>
                <li><a [route]="TeamSelect">Find Team</a></li>
                <li>Open to view team page</li>
                <li>Click the 'Save' button in the top right</li>
            </ol>
            <div class='main-buttons'>
                <a [route]="TeamSelect" data-role='button'>Find Team</a>
            </div>
        </div>
    </div>
   `
})
//TODO: Decorate saved teams
//TODO: Fix up save team instructions
export class FavoritesListViewComponent {
    public savedTeams:String[];
    public gamesList:Game[];

    constructor(
        private _router:Router,
        private _favorites:SettingsDAO,
        private _gameDao:GamesDAO
    )
    {

    }
}
