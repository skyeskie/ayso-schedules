import Team from "./team";

export default class Game {
    constructor(
        public id:String,
        public awayTeam:Team,
        public homeTeam:Team,
        public weekNum:Number,
        public dateTime:String,
        public region:String,
        public field:String
    ) {}
}
