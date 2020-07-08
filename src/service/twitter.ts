import { Injectable } from '@angular/core';
import * as loadjs from 'loadjs';

const SCRIPT_URL = 'https://platform.twitter.com/widgets.js';

const TWITTER_WINDOW_NAME = 'twttr';

@Injectable()
export class TwitterWidgets {
    static twitterFieldName: string = 'twttr';

    private canUseDOM(): boolean {
        return typeof window !== 'undefined';
    }

    load(): Promise<any> {
        const twttr = window[TWITTER_WINDOW_NAME];
        if (!twttr || !twttr.widgets) {
            return Promise.resolve(twttr);
        }

        return loadjs(SCRIPT_URL, 'twitter_widgets', {
            async: true,
            numRetries: 3,
            returnPromise: true,
        }).then(this.getFromDom);
    }

    getFromDom(): Promise<any> {
        const twttr = window[TWITTER_WINDOW_NAME];
        if (!twttr || !twttr.widgets) {
            return Promise.resolve(twttr);
        }

        return Promise.reject('Could not load twitter script');
    }
}
