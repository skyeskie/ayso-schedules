import {Component, OnInit} from 'angular2/core';
import {NgFor} from 'angular2/common';
import SettingsDAO from '../dao/settings.interface';
import {REGIONS, Region} from '../cfg/regions';
import {TeamsDAO} from '../dao/teams.interface';
import GamesDAO from '../dao/games.interface';
import {Injectable} from 'angular2/core';
import {Inject} from 'angular2/core';
import {WeekCacheInterface} from '../dao/week-cache.interface';

@Component({
    directives:[NgFor],
    template: `
    <div id="settings" data-role="page" class="page">
        <label for="select-region" class="select" data-inline="true">Home Region</label>
        <p>This filters your current week view.</p>
        <select name="select-region" id="select-region">
            <option *ngFor="#region of regions" value="{{region.number}}">
                Region {{region.number}} ({{region.name}})
            </option>
        </select>

        <hr />

        <h2>Update data</h2>
        <p>The app normally checks for updates on start.
            Use this if you think you missed an update.<br />
            <strong>Last updated:</strong> <span id="lastUpdate">{{lastUpdate}}</span>
            <button id="update" data-inline="true">Update now</button>
        </p>
        <p id="update-result"></p>
        <hr />
        <h2>Reset App</h2>
        <p>
            <span class="big-warn">Warning:</span>
            This will delete all saved preferences and game info.
            The app will be as if you first installed it.<br />
        </p>
        <div style="text-align: center; font-size: 0.8em">
            <button id="reset" data-inline="true">Reset App</button>
        </div>
    </div>
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
