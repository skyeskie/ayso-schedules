export default class Region {
    constructor(
        public id: Number,
        public number: Number,
        public name: String,
        public mapFile: String,
        public lat: Number,
        public lon: Number
    ) {}

    equals(o: Region) {
        return o && this.id === o.id;
    }
}
