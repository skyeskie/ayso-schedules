class Region {
    static REGIONS: Region[] = [];

    constructor(
        public id: number,
        // tslint:disable-next-line:variable-name
        public number: number,
        public name: string,
        public mapFile: string,
        public lat: number,
        public lon: number,
    ) {}

    static configure(id: number, n: number, name: string, map: string, lat: number, lon: number): void {
        Region.REGIONS.push(new Region(id, n, name, map, lat, lon));
    }

    /**
     * Gets configured region based on region number
     * @param regionNumber - numeric AYSO code for region
     * @throws  RangeError if can't find configured region
     * @returns matching region data from app/cfg.ts
     */
    static fromNumber(regionNumber: number): Region {
        const match = Region.REGIONS.filter((r: Region) => r.number === regionNumber);
        if (match.length !== 1) {
            throw new RangeError('No region found for region number ' + regionNumber);
        }
        return match[0];
    }

    static fromId(id: number): Region {
        const match = Region.REGIONS.filter((r: Region) => r.id === id);
        if (match.length !== 1) {
            throw new RangeError('No region found for region id' + id);
        }
        return match[0];
    }

    equals(o: Region): boolean {
        return o && this.id === o.id;
    }
}

export { Region as default, Region };
