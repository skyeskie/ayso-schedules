class AgeGroup {
    static AGES: AgeGroup[] = [];

    static configure(code: number, cutoff: number) {
        AgeGroup.AGES.push(new AgeGroup(code, cutoff));
    }

    static fromCutoff(cutoff: number) {
        let match = AgeGroup.AGES.filter((ag:AgeGroup) => ag.cutoff === cutoff);
        if(match.length !== 1) {
            throw new RangeError('No age group found with cutoff of ' + cutoff);
        }
        return match[0];
    }

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
