import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';

import { WeekCacheDAO, WeekCacheInterface } from '../dao/week-cache.interface';
import { ClassLogger, Logger } from '../service/log.decorator';

const ONE = 1;

@Component({
    selector: 'week-bar',
    styles: ['nav span { font: 2em bold; }'],
    template: `
        <nav class="navbar navbar-sticky-top navbar-light text-xs-center">
            <button type="button" class="btn btn-sm btn-primary-outline nav-item nav-link pull-xs-left"
                    [class.invisible]="isFirstWeek()" (click)="changePrev()">Back
            </button>
            <span class="nav-item">Week #{{week}}</span>
            <button type="button" class="btn btn-sm btn-primary-outline nav-item nav-link pull-xs-right"
                    [class.invisible]="isLastWeek()" (click)="changeNext()">Next
            </button>
        </nav>
    `,
})
export class WeekBarComponent implements OnInit {
    @ClassLogger() public log: Logger;

    max: number;

    /**
     * Fires event after ngOnInit
     * Suitable for actions after the init promises return
     */
    onInit: EventEmitter<WeekBarComponent> = new EventEmitter<WeekBarComponent>();

    @Input() public week: number;

    @Output() weekChange: EventEmitter<number> = new EventEmitter<number>();

    constructor(
        @Inject(WeekCacheDAO)
        private weeks: WeekCacheInterface,
    ) { /* Empty */ }

    ngOnInit(): void {
        this.max = this.weeks.getMaxWeeks();
        if (this.week < 1) { this.week = 1; }
        if (this.week > this.max) { this.week = this.max; }
    }

    isFirstWeek(): boolean {
        return isNaN(this.week) || (this.week === 1);
    }

    isLastWeek(): boolean {
        return isNaN(this.week) || isNaN(this.max) || (this.week === this.max);
    }

    changePrev(): void {
        this.weekChange.emit(this.week - ONE);
    }

    changeNext(): void {
        this.weekChange.emit(this.week + ONE);
    }
}
