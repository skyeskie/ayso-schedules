import Team from "./team";

export default class Game {
    public static BYE_TEAM = "{BYE}";

    constructor(
        public id:String,
        public awayTeam:String,
        public homeTeam:String,
        public weekNum:Number,
        public startTime:Date,
        public region:String,
        public field:String
    ) {}

    getOpponent(myTeamId: String): String {
        if(myTeamId === this.awayTeam) {
            return this.homeTeam;
        } else {
            return this.awayTeam;
        }
    }

    isBye(): boolean {
        return (Game.BYE_TEAM === this.awayTeam) || (Game.BYE_TEAM === this.homeTeam);
    }

    getByeOpponent(): String {
        return this.getOpponent(Game.BYE_TEAM);
    }
}
