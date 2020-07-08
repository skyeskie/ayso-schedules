import Gender from '../models/gender';
import { ClassLogger, Logger } from '../service/log.decorator';

import { AgeGroup } from './ageGroup';

const SPACE = ' ';

class Division {
    @ClassLogger() public log: Logger;

    public constructor(
        public gender: Gender,
        public age: AgeGroup,
    ) {}

    /**
     * Configure age and gender from display string
     * @param display - of form U\d\d?[BCG]
     */
    public static fromString(display: string): Division {
        const matches = display.match(/U?([0-9]+)([A-Z])/i);
        if (matches === null) {
            throw new RangeError('Invalid format for division code');
        }
        const code = Gender.fromCode(matches[2]);
        const age = AgeGroup.fromCutoff(Number.parseInt(matches[1], 10));
        return new Division(code, age);
    }

    public getDisplayName(): string {
        return [this.age.toString(), SPACE, this.gender.long].join('');
    }

    toJSON(): string {
        if (this.age === null || this.gender === null) {
            this.log.warn('Cannot save division; not well formed', this);
            return '';
        }
        return this.age.toString() + this.gender.short;
    }
}

export { Division as default, Division, AgeGroup, Gender };
