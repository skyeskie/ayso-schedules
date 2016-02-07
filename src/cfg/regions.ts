import Region from '../models/region';

let REGIONS: Region[] = [
    //ID  /  Number  /  Name   /   Field Map       /   Latitude / Longitude
    new Region(1, 49, "Stryker", "./img/Fields049.svg", 37.737437, -97.213361),
    new Region(2, 105, "Southview", "./img/Fields105.svg", 37.611328, -97.367567),
    new Region(4, 208, "West Wichita", "./img/Fields208.svg", 37.842481, -97.372607),
    new Region(5, 253, "Valley Center", "./img/Fields253.svg", 37.842481, -97.372607),
    new Region(6, 491, "Clearwater", "./img/Fields491.svg", 37.503879, -97.490616)
];

/**
 *
 * @param regionNumber
 * @throws  RangeError if can't find configured region
 * @returns {Region}
 */
function getRegionByNumber(regionNumber: Number) {
    let match = REGIONS.filter(r => r.number === regionNumber);
    if(match.length !== 1) {
        throw new RangeError('No region found for region number ' + regionNumber);
    }
    return match[0];
}

function getRegionById(id: Number) {
    let match = REGIONS.filter(r => r.id === id);
    if(match.length !== 1) {
        throw new RangeError('No region found for region id' + id);
    }
    return match[0];
}

export { REGIONS as default, REGIONS, getRegionByNumber, getRegionById, Region };
