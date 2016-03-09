import Gender from '../models/gender';
import {AgeGroup} from '../models/ageGroup';
import {StringJoiner} from 'angular2/src/facade/lang';
import {ClassLogger, Logger} from '../service/log.decorator';

const SPACE = ' ';

class Division {
    @ClassLogger() public log:Logger;

    /**
     * Configure age and gender from display string
     * @param display - of form U\d\d?[BCG]
     */
    public static fromString(display: string) {
        let matches = display.match(/U?([0-9]+)([A-Z])/i);
        if(matches === null) {
            throw new RangeError('Invalid format for division code');
        }
        let code = Gender.fromCode(matches[2]);
        let age = AgeGroup.fromCutoff(Number.parseInt(matches[1], 10));
        return new Division(code, age);
    }

    public constructor(
        public gender: Gender,
        public age: AgeGroup
    ) {}

    public getDisplayName() {
        let sj = new StringJoiner([this.age.toString(), SPACE, this.gender.long]);
        return sj.toString();
    }

    toJSON(): string {
        if(typeof this.age !== 'object' || typeof this.gender !== 'object') {
            this.log.warn('Cannot save division; not well formed', this);
            return '';
        }
        return this.age.toString() + this.gender.short;
    }
}

export { Division as default, Division, AgeGroup, Gender }
