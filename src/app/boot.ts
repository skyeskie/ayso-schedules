import {FORM_PROVIDERS} from 'angular2/common';
import {enableProdMode, provide} from 'angular2/core';
import {HTTP_PROVIDERS} from 'angular2/http';
import {bootstrap, ELEMENT_PROBE_PROVIDERS} from 'angular2/platform/browser';
import {ROUTER_PROVIDERS, Router} from 'angular2/router';
import {ANGULAR2_GOOGLE_MAPS_PROVIDERS} from 'angular2-google-maps/core';

const ENV_PROVIDERS = [];

if ('production' === process.env.ENV) {
    enableProdMode();
} else {
    ENV_PROVIDERS.push(ELEMENT_PROBE_PROVIDERS);
}

//Begin app component imports
import {MockGamesService, GamesDAO} from '../dao/mock/MockGamesService';
import {MockTeamsService, TeamsDAO} from '../dao/mock/MockTeamsService';
import {MockWeekCacheService, WeekCacheInterface} from '../dao/mock/MockWeekCacheService';
import {MockSettingsService, SettingsDAO} from '../dao/mock/MockSettingsService';
import {DataControlService} from '../dao/data-control.service';
import {INTERCEPT_ROUTER_PROVIDER} from '../comp/intercept-root-router';

import AppComponent from './app.component';

document.addEventListener('DOMContentLoaded', function main() {
    bootstrap(AppComponent, [
        //External providers
        ...ENV_PROVIDERS,
        ...ROUTER_PROVIDERS,
        ...ANGULAR2_GOOGLE_MAPS_PROVIDERS,
        ...FORM_PROVIDERS,

        //In-app providers
        provide(GamesDAO, { useClass: MockGamesService }),
        provide(TeamsDAO, { useClass: MockTeamsService }),
        provide(SettingsDAO, {useClass: MockSettingsService}),
        provide(WeekCacheInterface, { useClass: MockWeekCacheService}),
        DataControlService,
        INTERCEPT_ROUTER_PROVIDER
    ])
     .catch(err => {});
});
