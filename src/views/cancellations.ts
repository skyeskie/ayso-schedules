import {Component, OnInit} from 'angular2/core';
import {TitleBarComponent} from '../comp/title-bar';

@Component({
    directives: [TitleBarComponent],
    template: `
    <title-bar></title-bar>
    <div id="twitter" data-role="page" class="page">
        <div class="ui-bar ui-bar-d">Cancellations</div>

        <a class="twitter-timeline" href="https://twitter.com/AYSOKS"
          data-widget-id="305786822305386496">Tweets by @AYSOKS</a>
        <div class="messages"></div>
    </div>
    `
})
//TODO: Revisit twitter widget
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
