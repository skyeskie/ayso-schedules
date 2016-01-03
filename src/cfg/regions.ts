import Region from '../models/region';

let REGIONS: Region[] = [
    //ID  /  Number  /  Name   /   Field Map       /   Latitude / Longitude
    new Region(1, 49, "Stryker", "img/Fields049.svg", 37.737437, -97.213361),
    new Region(2, 105, "Southview", "img/Fields105.svg", 37.611328, -97.367567),
    new Region(4, 208, "West Wichita", "img/Fields105.svg", 37.842481, -97.372607),
    new Region(5, 253, "Valley Center", "img/Fields105.svg", 37.842481, -97.372607),
    new Region(6, 491, "Clearwater", "img/Fields105.svg", 37.503879, -97.490616)
];

let NULL_REGION: Region = new Region(0,0,"","",0,0);

class RegionLookup {
    static getByNumber(regionNumber: Number) {
        for(let i = 0; i < REGIONS.length; ++i) {
            let region = REGIONS[i];
            if(region.number === regionNumber) {
                return region;
            }
        }
        return NULL_REGION;
    }

    static getById(id: Number) {
        for(let i = 0; i < REGIONS.length; ++i) {
            let region = REGIONS[i];
            if(region.id === id) {
                return region;
            }
        }
        return NULL_REGION;
    }
}

export { REGIONS as default, REGIONS, RegionLookup, Region };
