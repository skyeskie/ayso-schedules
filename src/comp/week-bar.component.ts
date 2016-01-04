import {Component, OnInit} from 'angular2/core';
import {Input} from "angular2/core";
import WeekCalcService from "../dao/week-cache.interface.ts";
import {NgIf} from "angular2/common";

@Component({
    selector: 'week-bar',
    directives: [NgIf],
    template: `
     <div class="week-bar" data-role="header" data-theme="c">
        <a class="back" data-icon="arrow-l" data-iconpos="notext" *ng-if="showPrevious">Back</a>
        <h2>Week #{{week}}</h2>
        <a class="next" data-icon="arrow-r" data-iconpos="notext" *ng-if="showNext">Next</a>
    </div>
    `
})
export default class WeekBarComponent {
    private showPrevious: boolean;
    private showNext: boolean;

    @Input() week: Number;
    constructor(
        private _weeks: WeekCalcService
    ) {
        if(this.week < 1 || this.week > _weeks.getMaxWeeks()) {
            this.week = _weeks.getCurrentWeek();
        }

        this.showPrevious = (this.week === 1);
        this.showNext = (this.week === _weeks.getMaxWeeks());
    }
}
