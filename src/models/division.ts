import Gender, {findGenderByCode} from '../cfg/gender';
import AgeGroup from "../cfg/ages";

const SPACE:String = " ";

export default class Division {
    constructor(
        public gender: Gender,
        public age: AgeGroup
    ) {}

    getDisplayName() {
        return this.age.toString() + SPACE + this.gender.long;
    }

    /**
     * Configure age and gender from display string
     * @param display - of form U\d\d?[BCG]
     */
    public static fromString(display: String) {
        let code = display.slice(-1, 1);
        let age = display.slice(0,-1);
        return new Division(findGenderByCode(code), AgeGroup[age]);
    }
}
