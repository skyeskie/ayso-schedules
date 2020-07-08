import Division from './division';

export default class Team {
    constructor(
        public code: string,
        public coach: string,
        public coachTel: string,
        public division?: Division,
        public regionNumber?: number,
    ) {}

    equals(o: Team): boolean {
        return this.code === o.code;
    }
}
