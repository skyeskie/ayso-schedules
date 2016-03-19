import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import AYSO_APP_ROUTES from './routes';
import {ClassLogger, Logger} from '../service/log.decorator';
import {DataControlService} from '../service/data-control.service';

@Component({
    selector: 'ayso-app',
    directives: [ROUTER_DIRECTIVES],
    template: `
    <main>
      <router-outlet></router-outlet>
    </main>`,
})
@RouteConfig(AYSO_APP_ROUTES)
class AppComponent {
    @ClassLogger() public log: Logger;
    constructor(control: DataControlService) {
        this.log.info('Main app constructor');
        control.update();
    }
}

export { AppComponent, AppComponent as default }
