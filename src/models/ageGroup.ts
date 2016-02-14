class AgeGroup {
    constructor(
        public code: number,
        public cutoff: number
    ) {}

    toString() {
        return 'U' + this.cutoff;
    }

    equals(o: AgeGroup) {
        return o && o.code === this.code;
    }
}

export { AgeGroup as default, AgeGroup }
