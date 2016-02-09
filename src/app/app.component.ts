import {provide, Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import AYSO_APP_ROUTES from './routes';

@Component({
    selector: 'ayso-app',
    directives: [ROUTER_DIRECTIVES],
    template: `
    <main>
      <router-outlet></router-outlet>
    </main>`,
})
@RouteConfig(AYSO_APP_ROUTES)
class AppComponent {}

export { AppComponent, AppComponent as default }
