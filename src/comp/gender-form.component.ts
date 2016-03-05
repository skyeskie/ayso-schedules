import {Component, Output, EventEmitter} from 'angular2/core';
import {COMMON_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';

import {ButtonRadio} from 'ng2-bootstrap/ng2-bootstrap';

import {Control} from 'angular2/common';
import {ViewChild} from 'angular2/core';
import {AfterViewInit} from 'angular2/core';
import {FormBuilder} from 'angular2/common';
import {ClassLogger, Logger, Level} from '../service/log.decorator';
import {Gender} from '../models/gender';

@Component({
    selector: 'gender-form',
    directives: [ButtonRadio, COMMON_DIRECTIVES, FORM_DIRECTIVES],
    template: `
    <label>Gender</label>
    <form #genderForm="ngForm" class="btn-group" data-toggle="buttons">
        <label *ngFor="#gender of genders" class="btn btn-secondary">
            <input type="radio" name="genders" autocomplete="off"
             ngControl="radio" [(ngModel)]="output" btnRadio="gender">
            {{gender.long}}
        </label>
    </form>
    `,
})
export class GenderFormComponent implements AfterViewInit {
    @ClassLogger public log: Logger;
    public genders: Gender[] = Gender.GENDERS;

    @Output()
    public change:EventEmitter<any> = new EventEmitter();

    @ViewChild('genderForm') form:any;

    ngAfterViewInit() {
        this.log.debug(this.form);
        this.form.control.valueChanges.subscribe((v:any) => this.log.debug(v));
    }
}