import {Component, OnInit, Inject} from 'angular2/core';
import SettingsDAO from '../dao/settings.interface';
import GamesDAO from '../dao/games.interface';
import Game from '../models/game';
import {NgFor, NgIf} from 'angular2/common';
import {RouterLink} from 'angular2/router';
import {TitleBarComponent} from '../comp/title-bar.component';
import TwoTeamsGamesListComponent from '../comp/games2-list.component';

@Component({
    directives: [NgFor, NgIf, RouterLink, TitleBarComponent, TwoTeamsGamesListComponent],
    template: `
    <title-bar></title-bar>
    <article class="container">
        <h4 class="m-a-1 text-primary text-xs-center">My Teams' Schedules</h4>
        <div class="text-xs-center">
            <button type="button" class="btn btn-primary-outline m-x-1 m-b-1 btn-sm"
                *ngFor="#team of savedTeams" [routerLink]="['/TeamSchedule', {id: team}]">
                <span *ngIf="savedTeams.length < 3">Team</span> {{team}}
            </button>
        </div>

        <two-teams-game-list [games]="gamesList" *ngIf="gamesList?.length > 0">
        </two-teams-game-list>

        <div *ngIf="gamesList?.length===0" class="card card-block card-warning-outline m-t-2">
            <h5 class="card-title text-warning">No saved teams</h5>
            <div class="card-text">
            <p>Add some teames as favorites:</p>
                <ol>
                    <li><a [routerLink]="['/TeamSelect']">Find Team</a></li>
                    <li>Open to view team page</li>
                    <li>Click the 'Save' button in the top right</li>
                </ol>
            </div>
        </div>
    </article>
    `,
})
//TODO: Decorate saved teams
//TODO: Fix up save team instructions
export default class FavoritesListView implements OnInit {
    public savedTeams:string[];
    public gamesList:Game[];

    constructor(
        @Inject(SettingsDAO)
        private settings:SettingsDAO,
        @Inject(GamesDAO)
        private dao:GamesDAO
    ) {
        //in OnInit
    }

    ngOnInit() {
        this.settings
            .getSavedTeamIDs()
            .then((teams:string[]) => {
                this.savedTeams = teams;
                return this.dao.findForTeams(teams);
            })
            .then((games:Game[]) => this.gamesList = games);
    }
}
