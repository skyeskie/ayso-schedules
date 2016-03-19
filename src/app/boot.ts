import {FORM_PROVIDERS} from 'angular2/common';
import {enableProdMode, provide} from 'angular2/core';
import {HTTP_PROVIDERS} from 'angular2/http';
import {bootstrap, ELEMENT_PROBE_PROVIDERS} from 'angular2/platform/browser';
import {ROUTER_PROVIDERS, HashLocationStrategy, LocationStrategy} from 'angular2/router';
import {ANGULAR2_GOOGLE_MAPS_PROVIDERS} from 'angular2-google-maps/core';
import {DataControlService} from '../service/data-control.service';
import {INTERCEPT_ROUTER_PROVIDER} from '../service/intercept-root-router';
import AppComponent from './app.component';
import {IBackend} from '../dao/backend.interface';
import {HttpInitService} from '../service/backend/http.backend';
import {LOCAL_STORAGE_DAO_PROVIDERS} from '../dao/ls/dao';

const ENV_PROVIDERS = [];

if ('production' === process.env.ENV) {
    enableProdMode();
} else {
    ENV_PROVIDERS.push(ELEMENT_PROBE_PROVIDERS);
}

//Begin app component imports

let hasInit = false;
function initApp() {
    if(hasInit) {
        return;
    }

    hasInit = true;
    bootstrap(AppComponent, [
        //External providers
        ...ENV_PROVIDERS,
        ...ROUTER_PROVIDERS,
        ...ANGULAR2_GOOGLE_MAPS_PROVIDERS,
        ...FORM_PROVIDERS,
        ...HTTP_PROVIDERS,

        provide(LocationStrategy, { useClass: HashLocationStrategy}),

        //In-app providers
        provide(IBackend, { useClass: HttpInitService}),
        ...LOCAL_STORAGE_DAO_PROVIDERS,
        DataControlService,
        INTERCEPT_ROUTER_PROVIDER,
    ])
    .catch((err:any) => {
        //No-op
    });
}

//Browser
document.addEventListener('DOMContentLoaded', initApp);
//Cordova / mobile
document.addEventListener('deviceready', initApp);
