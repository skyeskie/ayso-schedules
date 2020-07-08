import { Component } from '@angular/core';

import { DataControlService } from '../service/data-control.service';
import { ClassLogger, Logger } from '../service/log.decorator';

@Component({
    selector: 'ayso-app',
    template: `
    <main>
      <router-outlet></router-outlet>
    </main>`,
})
class AppComponent {
    @ClassLogger() public log: Logger;
    constructor(control: DataControlService) {
        this.log.info('Main app constructor');
        control.update();
    }
}

export { AppComponent, AppComponent as default };
