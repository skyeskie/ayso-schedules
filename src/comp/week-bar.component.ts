import {
    Component, Input, Inject, Injectable,
    EventEmitter, OnInit, Output
} from 'angular2/core';
import WeekCacheInterface from "../dao/week-cache.interface";
import {NgIf} from "angular2/common";
import {MockWeekCacheService} from '../dao/mock/MockWeekCacheService';

@Component({
    selector: 'week-bar',
    directives: [NgIf],
    template: `
     <div class="week-bar" data-role="header" data-theme="c">
        <a class="back" data-icon="arrow-l" data-iconpos="notext" *ngIf="showPrevious()">Back</a>
        <h2>Week #{{week}}</h2>
        <a class="next" data-icon="arrow-r" data-iconpos="notext" *ngIf="showNext()">Next</a>
    </div>
    `
})
@Injectable()
export default class WeekBarComponent implements OnInit {
    max: Number;
    cur: Number;

    /**
     * Fires event after ngOnInit
     * Suitable for actions after the init promises return
     * @type {EventEmitter<WeekBarComponent>}
     */
    onInit = new EventEmitter<WeekBarComponent>();

    @Input() public week: Number;

    @Output() weekChange = new EventEmitter();

    constructor(
        @Inject("WeekCacheInterface")
        private _weeks: WeekCacheInterface
    ) {}

    ngOnInit() {
        Promise.all([
            this._weeks.getMaxWeeks(), this. _weeks.getCurrentWeek()
        ]).then((results) => {
            this.max = results[0];
            this.cur = results[1];
            if(this.week < 1 || this.week > this.max) {
                this.week = this.cur;
            }
            this.onInit.emit(this);
        });
    }

    showPrevious(): boolean {
        return this.week && (this.week !== 1);
    }

    showNext(): boolean {
        return this.week && this.max && (this.week !== this.max);
    }
}
