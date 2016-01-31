import Gender, {findGenderByCode} from '../cfg/gender';
import {AgeGroup, getAgeGroupByCutoff} from '../cfg/ages';
import {StringJoiner} from 'angular2/src/facade/lang';

const SPACE:String = " ";

export default class Division {
    constructor(
        public gender: Gender,
        public age: AgeGroup
    ) {}

    getDisplayName() {
        let sj = new StringJoiner([this.age.toString(), SPACE, this.gender.long]);
        return sj.toString();
    }

    /**
     * Configure age and gender from display string
     * @param display - of form U\d\d?[BCG]
     */
    public static fromString(display: String) {
        let matches = display.match(/U?([0-9]+)([A-Z])/i);
        if(matches === null) {
            throw new RangeError('Invalid format for divison code');
        }
        let code = findGenderByCode(matches[2]);
        let age = getAgeGroupByCutoff(Number.parseInt(matches[1], 10));
        return new Division(code, age);
    }
}
