export default class Team {
    constructor(
        public code:String,
        public coach:String,
        public coachTel:String
    ) {}

    equals(o: Team) {
        return this.code === o.code;
    }
}
