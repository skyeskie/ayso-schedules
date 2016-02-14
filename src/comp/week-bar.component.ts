import {
    Component, Input, Inject, Injectable,
    EventEmitter, OnInit, Output,
} from 'angular2/core';
import {NgIf} from 'angular2/common';

import WeekCacheInterface from '../dao/week-cache.interface';
import {ClassLogger, Logger, Level} from '../service/log.decorator';

const ONE = 1;

@Component({
    selector: 'week-bar',
    directives: [NgIf],//TODO: Change from NgIf to NgStyle with invisible
    styles: ['nav span { font: 2em bold; }'],
    template: `
     <nav class="navbar navbar-light text-xs-center">
        <button type="button" class="btn btn-primary-outline nav-item nav-link pull-xs-left"
            *ngIf="showPrevious()" (click)="changePrev()">Back</button>
        <span class="nav-item">Week #{{week}}</span>
        <button type="button" class="btn btn-primary-outline nav-item nav-link pull-xs-right"
            *ngIf="showNext()" (click)="changeNext()">Next</button>
    </nav>
    `,
})
@Injectable()
export default class WeekBarComponent implements OnInit {
    @ClassLogger public log:Logger;

    max: Number;

    /**
     * Fires event after ngOnInit
     * Suitable for actions after the init promises return
     * @type {EventEmitter<WeekBarComponent>}
     */
    onInit = new EventEmitter<WeekBarComponent>();

    @Input() public week: Number;

    @Output() weekChange = new EventEmitter<Number>();

    constructor(
        @Inject(WeekCacheInterface)
        private _weeks: WeekCacheInterface
    ) {}

    ngOnInit() {
        //Make sure the cache is initialized
        this._weeks.init().then(() => {
            this.max = this._weeks.getMaxWeeks();
        });
    }

    showPrevious(): boolean {
        return this.week && (this.week !== 1);
    }

    showNext(): boolean {
        return this.week && this.max && (this.week !== this.max);
    }

    changePrev() {
        this.weekChange.emit(this.week.valueOf() - ONE);
    }

    changeNext() {
        this.weekChange.emit(this.week.valueOf() + ONE);
    }
}
