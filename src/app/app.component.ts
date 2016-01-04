import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import AYSO_APP_ROUTES from './routes';


@Component({
    selector: 'ayso-app',
    template: '<p>TEST</p>',
    directives: [ROUTER_DIRECTIVES]
})
@RouteConfig(AYSO_APP_ROUTES)
export class AppComponent { }
