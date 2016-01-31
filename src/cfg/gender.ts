class Gender {
    constructor(
        public short: String,
        public long: String
    ) {}
}

let GENDERS: Gender[] = [
    new Gender("B", "Boys"),
    new Gender("G", "Girls"),
    new Gender("C", "Coed")
];

function findGenderByCode(code: String): Gender {
    let res = GENDERS.filter(g => (g.short === code));
    if(res.length !== 1) {
        throw new RangeError('Invalid gender for code "' + code + '"');
    }
    return res[0];
}

export { findGenderByCode, Gender as default, Gender, GENDERS }
