export default class Region {
    constructor(
        public id: number,
        public number: number,
        public name: string,
        public mapFile: string,
        public lat: number,
        public lon: number
    ) {}

    equals(o: Region) {
        return o && this.id === o.id;
    }
}
