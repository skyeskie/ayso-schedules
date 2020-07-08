import { Component, OnInit } from '@angular/core';

import { TwitterWidgets } from '../service/twitter';

@Component({
    styles: [],
    template: `
    <title-bar></title-bar>
    <article class="container text-xs-center">
        <h5 class="text-primary">News and Cancellations</h5>
        <a class="twitter-timeline" href="https://twitter.com/AYSOKS"
          data-widget-id="305786822305386496">Tweets by @AYSOKS</a>
    </article>
    `,
})
export class CancellationsView implements OnInit {

    constructor(private twitter: TwitterWidgets) {}

    public ngOnInit(): void {
        this.twitter.load().then(twttr => twttr.widgets.load());
    }
}
