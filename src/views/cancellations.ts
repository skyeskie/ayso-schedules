import {Component, OnInit} from 'angular2/core';
import {TitleBarComponent} from '../comp/title-bar.component';

@Component({
    directives: [TitleBarComponent],
    styles: [],
    template: `
    <title-bar></title-bar>
    <h3 class=" text-xs-center">News and Cancellations</h3>

    <article class="container text-xs-center">
        <a class="twitter-timeline" href="https://twitter.com/AYSOKS"
          data-widget-id="305786822305386496">Tweets by @AYSOKS</a>
    </article>
    `,
})
export class CancellationsView implements OnInit {
    public ngOnInit() {
        this.addScript();
    }

    public render() {
        twttr.widgets.load();
    }

    private addScript() {
        var s = document.createElement('script');
        s.setAttribute('src', '//platform.twitter.com/widgets.js');
        s.onload = this.render;
        document.body.appendChild(s);
    }
}
