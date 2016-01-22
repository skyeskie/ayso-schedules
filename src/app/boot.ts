import {provide} from 'angular2/core';
import {bootstrap, ELEMENT_PROBE_PROVIDERS} from 'angular2/platform/browser';
import {ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy} from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';

import AppComponent from './app.component';

document.addEventListener('DOMContentLoaded', function main() {
    bootstrap(AppComponent, [
        ELEMENT_PROBE_PROVIDERS,
        HTTP_PROVIDERS,
        ROUTER_PROVIDERS,
        provide(LocationStrategy, { useClass: HashLocationStrategy })
    ])
     .catch(err => console.error(err));
});
