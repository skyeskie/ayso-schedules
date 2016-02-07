class AgeGroup {
    constructor(
        public code: Number,
        public cutoff: Number
    ) {}

    toString() {
        return 'U' + this.cutoff;
    }

    equals(o: AgeGroup) {
        return o && o.code === this.code;
    }
}

export { AgeGroup as default, AgeGroup }
