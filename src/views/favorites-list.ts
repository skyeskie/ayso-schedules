import {Component, OnInit} from 'angular2/core';
import {Router} from 'angular2/router';
import SettingsDAO from '../dao/settings.interface';
import GamesDAO from '../dao/games.interface';
import Game from '../models/game';
import {NgFor} from 'angular2/common';
import {RouterLink} from 'angular2/router';
import {NgIf} from 'angular2/common';
import {Inject} from 'angular2/core';
import {TitleBarComponent} from '../comp/title-bar';

@Component({
    directives: [NgFor, NgIf, RouterLink, TitleBarComponent],
    template: `
    <title-bar></title-bar>
    <div id="favorites" data-role="page" class="page">
        <div class="subheader ui-bar ui-bar-d">
            <h2>My Teams' Schedules</h2>
        </div>
        <div class="myteams">
            <button *ngFor="#team of savedTeams" [routerLink]="['/TeamSchedule', {id: team}]">
                {{team}}
            </button>
        </div>

        <two-teams-game-list [games]="gamesList">
        </two-teams-game-list>

        <div *ngIf="gamesList.length===0">
            <h2 style='text-align: center;'>No saved teams</h2>
            <ol>
                <li><a [routerLink]="['/TeamSelect']">Find Team</a></li>
                <li>Open to view team page</li>
                <li>Click the 'Save' button in the top right</li>
            </ol>
            <div class='main-buttons'>
                <a [routerLink]="['/TeamSelect']" data-role='button'>Find Team</a>
            </div>
        </div>
    </div>
    `
})
//TODO: Decorate saved teams
//TODO: Fix up save team instructions
export default class FavoritesListView {
    public savedTeams:String[] = [];
    public gamesList:Game[] = [];

    constructor(
        private _router:Router,
        @Inject(SettingsDAO)
        private _favorites:SettingsDAO,
        @Inject(GamesDAO)
        private _gameDao:GamesDAO
    )
    {
        _favorites.getSavedTeamIDs()
                  .then(teams => this.savedTeams = teams)
                  .then(teams => this._gameDao.findForTeams(teams)
                      .then(games => this.gamesList = games)
                  );
    }
}
