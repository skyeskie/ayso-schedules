class Region {
    static REGIONS: Region[] = [];

    static configure(id:number, n:number, name:string, map:string, lat:number, lon:number) {
        Region.REGIONS.push(new Region(id, n, name, map, lat, lon));
    }

    /**
     * Gets configured region based on region number
     * @param regionNumber
     * @throws  RangeError if can't find configured region
     * @returns {Region}
     */
    static fromNumber(regionNumber: number): Region {
        let match = Region.REGIONS.filter((r:Region) => r.number === regionNumber);
        if(match.length !== 1) {
            throw new RangeError('No region found for region number ' + regionNumber);
        }
        return match[0];
    }

    static fromId(id: number): Region {
        let match = Region.REGIONS.filter((r:Region) => r.id === id);
        if(match.length !== 1) {
            throw new RangeError('No region found for region id' + id);
        }
        return match[0];
    }

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

export { Region as default, Region }
