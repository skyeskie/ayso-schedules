import {Component, OnInit} from 'angular2/core';
import {NgFor} from 'angular2/common';
import SettingsDAO from '../dao/settings.interface';
import {REGIONS, Region} from '../cfg/regions';
import {TeamsDAO} from '../dao/teams.interface';
import GamesDAO from '../dao/games.interface';
import {Injectable} from 'angular2/core';
import {Inject} from 'angular2/core';
import {WeekCacheInterface} from '../dao/week-cache.interface';
import {TitleBarComponent} from '../comp/title-bar.component';

@Component({
    directives:[NgFor, TitleBarComponent],
    template: `
    <title-bar></title-bar>
    <article class="container">
    <form>
        <h2 class="text-xs-center">Settings</h2>
        <div class="card card-block">
            <label for="select-region" class="card-title">Home Region</label>
            <p>This filters your current week view.</p>
            <select class="form-control">
                <option *ngFor="#region of regions" value="{{region.number}}">
                    Region {{region.number}} ({{region.name}})
                </option>
            </select>
        </div>

        <div class="card card-block">
            <h4 class="card-title">Update data</h4>
            <p>The app normally checks for updates on start.
            Use this if you think you missed an update.</p>
            <div><strong>Last updated:</strong> {{lastUpdate}}</div>
            <button class="btn btn-info-outline">Update now</button>
            <p id="update-result"></p>
        </div>
        <div class="card card-block card-warning-outline">
            <h4 class="card-title">Reset App</h4>
            <h5 class="card-title text-danger">Warning:</h5>
            <p class="card-text">
                This will delete all saved preferences and game info.
                The app will be as if you first installed it.
            </p>
            <div class="text-xs-center">
                <button type="button" id="reset" class="btn btn-danger">Reset App</button>
            </div>
        </div>
    </form>
    </article>
    `
})
@Injectable()
export default class SettingsView {
    public regions:Region[];
    public lastUpdate:String;

    constructor(
        @Inject(SettingsDAO)
        private _settings:SettingsDAO,
        @Inject(GamesDAO)
        private _games:GamesDAO,
        @Inject(WeekCacheInterface)
        private _weekCache:WeekCacheInterface,
        @Inject(TeamsDAO)
        private _teams:TeamsDAO
    ) {
        this.regions = REGIONS;
    }

    doReset(): void {
        this._settings.reset();
        this._games.reset();
        this._weekCache.reset();
        this._teams.reset();
    }

    forceRefresh(): void {
        this._teams.update(true);
        this._games.update(true);
        this._weekCache.update(true);
    }
}
