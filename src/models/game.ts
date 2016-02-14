import Team from './team';
import Division from './division';

export default class Game {
    public static BYE_TEAM:string = '-';

    constructor(
        public id:string,
        public homeTeam:string,
        public awayTeam:string,
        public weekNum:number,
        public startTime:Date,
        public region:number,
        public field:string,
        public divis?:Division
    ) {}

    static compare(l: Game, r: Game) {
        return l.startTime.valueOf() - r.startTime.valueOf();
    }

    hasTeam(teamId: string) {
        return (this.homeTeam === teamId) || (this.awayTeam === teamId);
    }

    getOpponent(myTeamId: string): string {
        if(myTeamId === this.awayTeam) {
            return this.homeTeam;
        }

        if(myTeamId === this.homeTeam) {
            return this.awayTeam;
        }

        throw new RangeError('Team ' + myTeamId + ' is not playing in this game');
    }

    isBye(): boolean {
        return this.hasTeam(Game.BYE_TEAM);
    }

    getTeamWithBye(): string {
        if(!this.isBye()) {
            throw new RangeError('This game is not a bye.');
        }
        return this.getOpponent(Game.BYE_TEAM);
    }
}
