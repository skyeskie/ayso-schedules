class Gender {
    static GENDERS: Gender[] = [];

    static configure(short: string, long: string) {
        Gender.GENDERS.push(new Gender(short, long));
    };

    static fromCode(code: string): Gender {
        let res = Gender.GENDERS.filter((g:Gender) => (g.short === code));
        if(res.length !== 1) {
            throw new RangeError('Invalid gender for code "' + code + '"');
        }
        return res[0];
    }

    constructor(
        public short: string,
        public long: string
    ) {}

    equals(o: Gender) {
        return o && o.long === this.long;
    }
}

export { Gender as default, Gender }
