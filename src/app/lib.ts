/* tslint:disable:no-require-imports */

// Angular 2
import 'angular2/platform/browser';
import 'angular2/core';
import 'angular2/http';
import 'angular2/router';

// RxJS
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

require('svg-pan-zoom');

if ('production' !== ENV) {
    // Reflect Polyfill
    require('es7-reflect-metadata/dist/browser');
    Error.stackTraceLimit = Infinity;
    require('zone.js/dist/long-stack-trace-zone');
}

if ('production' === ENV) {
    // Reflect with es7-reflect-metadata/reflect-metadata is added
    // by webpack.prod.config ProvidePlugin
    let ngCore = require('angular2/core');
    ngCore.enableProdMode();
}
