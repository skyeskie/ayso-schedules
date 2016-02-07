import {Component, OnInit} from 'angular2/core';
import {TitleBarComponent} from '../comp/title-bar.component';

@Component({
    directives: [TitleBarComponent],
    styles: [],
    template: `
    <title-bar></title-bar>
    <h3 class=" text-xs-center">News and Cancellations</h3>

    <div class="messages text-xs-center">
        <a class="twitter-timeline" href="https://twitter.com/AYSOKS"
          data-widget-id="305786822305386496">Tweets by @AYSOKS</a>
    </div>
    `
})
export class CancellationsView implements OnInit {
    private addScript() {
        var s = document.createElement('script');
        s.setAttribute('src', '//platform.twitter.com/widgets.js');
        s.onload = this.render;
        document.body.appendChild(s);
    }

    ngOnInit() {
        this.addScript();
    }

    public render() {
        twttr.widgets.load();
    }
}
