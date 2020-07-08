import { enableProdMode } from '@angular/core';
import { platformBrowser } from '@angular/platform-browser';

import { environment } from '../environments/environment';

import { AppModule } from './app.module';

const ENV_PROVIDERS = [];

if (environment) {
    enableProdMode();
}

platformBrowser().bootstrapModule(AppModule).catch(err => console.error(err));
