import {Component, OnInit} from 'angular2/core';
import {RouterLink, RouteParams} from 'angular2/router';
import {DatePipe} from 'angular2/common';

import Game from '../models/game';
import Team from '../models/team';
import GamesDAO from '../dao/games.interface';
import {TeamsDAO} from '../dao/teams.interface';
import {Inject} from 'angular2/core';
import {TitleBarComponent} from '../comp/title-bar.component';
import {NameSwitchPipe} from '../pipes/name-switch.pipe';
import {NgIf} from 'angular2/common';

@Component({
    pipes: [DatePipe, NameSwitchPipe],
    directives: [TitleBarComponent, RouterLink, NgIf],
    template: `
    <title-bar></title-bar>
    <article class="container" *ngIf="game">
        <h2 class="text-xs-center">Game Info</h2>
        <h3 class="col-xs-6">Week #{{game?.weekNum}}</h3>
        <h3 class="col-xs-6 text-xs-right">{{game?.startTime | date:'MMMdhm'}}</h3>
        <div class="card card-block col-xs-6">
            <h4 class="card-title text-muted">Home Team</h4>
            <h4 class="card-text text-primary">{{game?.homeTeam}}</h4>
            <div class="coach" *ngIf="homeTeam">
                <strong>Coach</strong> <span class="name">{{homeTeam.coach | NameSwitch}}</span><br />
                <a class="tel" href="tel:{{homeTeam.coachTel}}"
                   data-role="button" data-mini="true" data-inline="true"
                   data-icon="arrow-r" data-iconpos="right">Call</a>
            </div>
        </div>
        <div class="card card-block col-xs-6">
            <h4 class="card-title text-muted">Away Team</h4>
            <h4 class="card-text text-primary">{{game?.awayTeam}}</h4>
            <div class="coach" *ngIf="awayTeam">
                <strong>Coach</strong> <span class="name">{{awayTeam.coach | NameSwitch}}</span><br />
                <a class="tel" href="tel:{{awayTeam.coachTel}}"
                   data-role="button" data-mini="true" data-inline="true"
                   data-icon="arrow-r" data-iconpos="right">Call</a>
            </div>
        </div>

        <div *ngIf="game && game.region">
            <button type="button" class="btn btn-secondary btn-block btn-lg"
                    [routerLink]="['/MapDetail', {region: game.region}]">
                <div class="col-xs-6"><strong>Region</strong> {{game?.region}}</div>
                <div class="col-xs-6 pull-xs-right">Directions &gt;</div>
            </button>

            <button type="button" class="btn btn-secondary btn-block btn-lg"
                    [routerLink]="['/FieldDetail', {region: game.region}]">
                <div class="col-xs-6"><strong>Field</strong> {{game?.field}}</div>
                <div class="col-xs-6 pull-xs-right">Field map &gt;</div>
            </button>
        </div>
    </article>
    `,
})
export default class GameDetail implements OnInit {
    public game: Game;
    public homeTeam: Team;
    public awayTeam: Team;

    constructor(
        private _routeParams:RouteParams,
        @Inject(GamesDAO)
        private _games:GamesDAO,
        @Inject(TeamsDAO)
        private _teams:TeamsDAO
    ) {}

    ngOnInit() {
        let id = this._routeParams.get('id');
        this._games.getGame(id).then((game:Game) => {
            this.game = game;
            this._teams.getTeam(game.homeTeam).then((t:Team) => this.homeTeam = t);
            this._teams.getTeam(game.awayTeam).then((t:Team) => this.awayTeam = t);
        });
    }
}
