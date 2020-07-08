import { Component, Inject, OnInit } from '@angular/core';

import { GamesDAO, GamesInterface } from '../dao/games.interface';
import { SettingsDAO, SettingsInterface } from '../dao/settings.interface';
import Game from '../models/game';

@Component({
    template: `
    <title-bar></title-bar>
    <article class="container">
        <h4 class="m-a-1 text-primary text-xs-center">My Teams' Schedules</h4>
        <div class="text-xs-center">
            <button type="button" class="btn btn-primary-outline m-x-1 m-b-1 btn-sm"
                *ngFor="let team of savedTeams" [routerLink]="['/team', {id: team}]">
                <span *ngIf="savedTeams.length < 3">Team</span> {{team}}
            </button>
        </div>

        <two-teams-game-list [games]="gamesList" *ngIf="gamesList?.length > 0">
        </two-teams-game-list>

        <div *ngIf="gamesList?.length===0" class="card card-block card-warning-outline m-t-2">
            <h5 class="card-title text-warning">No saved teams</h5>
            <div class="card-text">
            <p>Add some teams as favorites:</p>
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
// TODO: Decorate saved teams
// TODO: Fix up save team instructions
export class FavoritesListView implements OnInit {
    public savedTeams: string[];
    public gamesList: Game[];

    constructor(
        @Inject(SettingsDAO)
        private settings: SettingsInterface,
        @Inject(GamesDAO)
        private dao: GamesInterface,
    ) {
        // in OnInit
    }

    ngOnInit(): void {
        this.settings
            .getSavedTeamIDs()
            .then((teams: string[]) => {
                this.savedTeams = teams;
                return this.dao.findForTeams(teams);
            })
            .then((games: Game[]) => this.gamesList = games);
    }
}
