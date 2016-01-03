export default class Region {
    constructor(
        public id: Number,
        public number: Number,
        public name: String,
        public mapFile: String,
        public lat: Number,
        public lon: Number
    ) {}

    /**
     * @desc Determines if region is valid
     * Currently only checks for special NULL region (id 0).
     * It could check for other portions as well later.
     * @returns {boolean}
     */
    hasError(): boolean {
        return (this.id===0);
    }
}
