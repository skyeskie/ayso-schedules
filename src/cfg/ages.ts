import {AgeGroup} from '../models/ageGroup';

var AGES: AgeGroup[] = [
    new AgeGroup(1, 19),
    new AgeGroup(2, 16),
    new AgeGroup(3, 14),
    new AgeGroup(4, 12),
    new AgeGroup(5, 10),
    new AgeGroup(6, 8),
    new AgeGroup(7, 6),
];

function getAgeGroupByCutoff(cutoff: Number) {
    let match = AGES.filter(ag => ag.cutoff === cutoff);
    if(match.length !== 1) {
        throw new RangeError('No age group found with cutoff of ' + cutoff);
    }
    return match[0];
}

export {AgeGroup, AGES, getAgeGroupByCutoff, AGES as default};
