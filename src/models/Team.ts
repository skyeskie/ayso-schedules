import Division from './division';

export default class Team {
    constructor(
        public code:String,
        public coach:String,
        public coachTel:String,
        public division?:Division,
        public regionNumber?:Number
        //TODO: Add region, division, gender for filtering
    ) {}

    equals(o: Team) {
        return this.code === o.code;
    }
}
