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

    hasTeam(teamId: String) {
        return (this.homeTeam === teamId) || (this.awayTeam === teamId);
    }

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
        return this.hasTeam(Game.BYE_TEAM);
    }

    getTeamWithBye(): String {
        if(!this.isBye()) {
            throw new RangeError('This game is not a bye.');
        }
        return this.getOpponent(Game.BYE_TEAM);
    }
}
