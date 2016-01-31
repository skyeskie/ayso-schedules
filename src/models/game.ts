import Team from "./team";

export default class Game {
    public static BYE_TEAM = "{BYE}";

    constructor(
        public id:String,
        public homeTeam:String,
        public awayTeam:String,
        public weekNum:Number,
        public startTime:Date,
        public region:String,
        public field:String
    ) {}

    getOpponent(myTeamId: String): String {
        if(myTeamId === this.awayTeam) {
            return this.homeTeam;
        }

        if(myTeamId === this.homeTeam){
            return this.awayTeam;
        }

        throw new RangeError('Team ' + myTeamId + ' is not playing in this game');
    }

    isBye(): boolean {
        return (Game.BYE_TEAM === this.awayTeam) || (Game.BYE_TEAM === this.homeTeam);
    }

    getTeamWithBye(): String {
        if(!this.isBye()) {
            throw new RangeError('This game is not a bye.');
        }
        return this.getOpponent(Game.BYE_TEAM);
    }
}
