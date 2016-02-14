class Gender {
    constructor(
        public short: string,
        public long: string
    ) {}

    equals(o: Gender) {
        return o && o.long === this.long;
    }
}

let GENDERS: Gender[] = [
    new Gender('B', 'Boys'),
    new Gender('G', 'Girls'),
    new Gender('C', 'Coed'),  //TODO: Auto-hide if none present
    new Gender('T', 'Coed '), //TODO: Figure out where this is coming from
];

function findGenderByCode(code: string): Gender {
    let res = GENDERS.filter((g:Gender) => (g.short === code));
    if(res.length !== 1) {
        throw new RangeError('Invalid gender for code "' + code + '"');
    }
    return res[0];
}

export { findGenderByCode, Gender as default, Gender, GENDERS }
