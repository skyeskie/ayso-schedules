enum Gender {
    Girls = 1,
    Boys = 2,
    Coed = 3
}

export enum GenderShort {
    G = 1,
    B = 2,
    C = 3
}

export default Gender;

export function genderToCode(gender: Gender): String {
    return GenderShort[gender];
}
