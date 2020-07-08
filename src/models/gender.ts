class Gender {
    static GENDERS: Gender[] = [];

    constructor(
        public short: string,
        public long: string,
    ) {}

    static configure(short: string, long: string): void {
        Gender.GENDERS.push(new Gender(short, long));
    }
    static fromCode(code: string): Gender {
        const res = Gender.GENDERS.filter((g: Gender) => (g.short === code));
        if (res.length !== 1) {
            throw new RangeError('Invalid gender for code "' + code + '"');
        }
        return res[0];
    }

    equals(o: Gender): boolean {
        return o && o.long === this.long;
    }
}

export { Gender as default, Gender };
