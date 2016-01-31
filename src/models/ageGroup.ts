class AgeGroup {
    constructor(
        public code: Number,
        public cutoff: Number
    ) {}

    toString() {
        return 'U' + this.cutoff;
    }
}

export { AgeGroup as default, AgeGroup }
