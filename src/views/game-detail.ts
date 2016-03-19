import {Component, OnInit, Inject} from 'angular2/core';
import {RouterLink, RouteParams} from 'angular2/router';
import Game from '../models/game';
import Team from '../models/team';
import GamesDAO from '../dao/games.interface';
import {TeamsDAO} from '../dao/teams.interface';
import {TitleBarComponent} from '../comp/title-bar.component';
import {NameSwitchPipe} from '../pipes/name-switch.pipe';
import {NgIf} from 'angular2/common';
import {DateMedPipe} from '../pipes/date-med.pipe';

@Component({
    pipes: [DateMedPipe, NameSwitchPipe],
    directives: [TitleBarComponent, RouterLink, NgIf],
    template: `
    <title-bar></title-bar>
    <article class="container" *ngIf="game">
        <h4 class="text-xs-center text-primary">Game Info</h4>
        <h5 class="col-xs-6 text-xs-right">Week #{{game?.weekNum}}</h5>
        <h5 class="col-xs-6" *ngIf="isNoBye()">{{game?.startTime | dateMed}}</h5>
        <h5 class="col-xs-6" *ngIf="game?.isBye()">BYE</h5>
        <div class="card-group m-b-1 clearfix">
            <div class="card card-block col-xs-6">
                <h6 class="card-title text-muted text-xs-center">Home Team</h6>
                <h5 class="card-subtitle text-primary text-xs-center">{{game?.homeTeam}}</h5>
                <div class="m-t-1" *ngIf="homeTeam">
                    <h6 class="font-weight-bold text-muted">Coach</h6>
                    <h6>{{homeTeam.coach | NameSwitch}}</h6>
                    <a type="button" class="btn btn-sm btn-block btn-secondary"
                        href="tel:{{homeTeam.coachTel}}" [class.invisible]="homeTeam.coach==='TBD'">
                        <i class="ion-android-call"></i> Call
                    </a>
                </div>
            </div>
            <div class="card card-block col-xs-6">
                <h6 class="card-title text-muted text-xs-center">Away Team</h6>
                <h5 class="card-subtitle text-primary text-xs-center">{{game?.awayTeam}}</h5>
                <div class="m-t-1" *ngIf="homeTeam">
                    <h6 class="font-weight-bold text-muted">Coach</h6>
                    <h6>{{awayTeam.coach | NameSwitch}}</h6>
                    <a type="button" class="btn btn-sm btn-block btn-secondary"
                        href="tel:{{awayTeam.coachTel}}" [class.invisible]="awayTeam.coach==='TBD'">
                        <i class="ion-android-call"></i> Call
                    </a>
                </div>
            </div>
        </div>
        <div *ngIf="isNoBye()" class="container m-y-1">
            <h5 class="col-xs-6 m-a-0 text-xs-right" style="line-height: 1.5;"><strong>Region</strong> {{game.region}}</h5>
            <div class="col-xs-6">
                <button type="button" class="btn btn-sm btn-secondary" [routerLink]="['/MapDetail', {region: game.region}]">
                    <i class="ion-navigate"></i>
                    Directions
                </button>
            </div>
        </div>
        <div *ngIf="isNoBye()" class="container m-y-1">
            <h5 class="col-xs-6 m-a-0 text-xs-right" style="line-height: 1.5;"><strong>Field</strong> {{game.field}}</h5>
            <div class="col-xs-6">
                <button type="button" class="btn btn-secondary btn-sm" [routerLink]="['/FieldDetail', {region: game.region}]">
                    <i class="ion-map"></i>
                    Field map
                </button>
            </div>
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
    ) {
        //in OnInit
    }

    ngOnInit() {
        let id = this._routeParams.get('id');
        this._games.getGame(id).then((game:Game) => {
            this.game = game;
            this._teams.getTeam(game.homeTeam).then((t:Team) => this.homeTeam = t);
            this._teams.getTeam(game.awayTeam).then((t:Team) => this.awayTeam = t);
        });
    }

    isNoBye() {
        return (this.game instanceof Game) && !this.game.isBye();
    }
}
