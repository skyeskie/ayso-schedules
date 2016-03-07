import {Gender} from '../models/gender';
import {AgeGroup} from '../models/ageGroup';
import {Region} from '../models/region';

AgeGroup.configure(1, 19);
AgeGroup.configure(2, 16);
AgeGroup.configure(3, 14);
AgeGroup.configure(4, 12);
AgeGroup.configure(5, 10);
AgeGroup.configure(6, 8);
AgeGroup.configure(7, 6);

Gender.configure('B', 'Boys');
Gender.configure('G', 'Girls');
Gender.configure('C', 'Coed');  //TODO: Auto-hide if none present
Gender.configure('T', 'Coed '); //TODO: Figure out where this is coming from

//          ID  /  Number  /  Name   /   Field Map       /   Latitude / Longitude
Region.configure(1, 49, 'Stryker', './img/Fields049.svg', 37.737437, -97.213361);
Region.configure(2, 105, 'Southview', './img/Fields105.svg', 37.611328, -97.367567);
Region.configure(4, 208, 'West Wichita', './img/Fields208.svg', 37.842481, -97.372607);
Region.configure(5, 253, 'Valley Center', './img/Fields253.svg', 37.842481, -97.372607);
Region.configure(6, 491, 'Clearwater', './img/Fields491.svg', 37.503879, -97.490616);

let CFG = {
    AGES: AgeGroup.AGES,
    GENDERS: Gender.GENDERS,
    REGIONS: Region.REGIONS,
    URL: 'http://aysoks.org/app/json.php5',
    UPDATE_CACHE_TIME: 3600, //One hour
    init: () => {
        //No-op to make sure this is initialized
    },
};

export { CFG as default, CFG }
