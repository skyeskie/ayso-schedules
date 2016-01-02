export default class Gender {
    constructor(
        public short: String,
        public long: String
    ) {}
}

let genders = new Set<Gender>();
genders.add(new Gender("B", "Boys"));
genders.add(new Gender("G", "Girls"));
genders.add(new Gender("C", "Coed"));

export const GENDERS:Set<Gender> = genders;

export function findGenderByCode(code: String): Gender {
    genders.forEach(function(g) {
        if(g.short === code) {
            return g;
        }
    });
    return null;
};
