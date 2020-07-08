class AgeGroup {
    static AGES: AgeGroup[] = [];

    constructor(
        public code: number,
        public cutoff: number,
    ) {}

    static configure(code: number, cutoff: number): void {
        AgeGroup.AGES.push(new AgeGroup(code, cutoff));
    }

    static fromCutoff(cutoff: number): AgeGroup {
        const match = AgeGroup.AGES.filter((ag: AgeGroup) => ag.cutoff === cutoff);
        if (match.length !== 1) {
            throw new RangeError('No age group found with cutoff of ' + cutoff);
        }
        return match[0];
    }

    toString(): string {
        return 'U' + this.cutoff;
    }

    equals(o: AgeGroup): boolean {
        return o && o.code === this.code;
    }
}

export { AgeGroup as default, AgeGroup };
