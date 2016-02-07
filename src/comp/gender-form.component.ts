import {Component, Output, EventEmitter} from 'angular2/core';
import {COMMON_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';

import {ButtonRadio} from 'ng2-bootstrap/ng2-bootstrap';

import {GENDERS, Gender} from '../cfg/gender';
import {Control} from 'angular2/common';
import {ViewChild} from 'angular2/core';
import {AfterViewInit} from 'angular2/core';
import {FormBuilder} from 'angular2/common';

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
    `
})
export class GenderFormComponent implements AfterViewInit {
    public genders: Gender[] = GENDERS;

    @Output()
    public change = new EventEmitter();

    @ViewChild('genderForm') form;

    ngAfterViewInit() {
        console.log(this.form);
        this.form.control.valueChanges.subscribe((v) => this.log(v));
    }

    log(v) {
        console.log(v);
    }
}
