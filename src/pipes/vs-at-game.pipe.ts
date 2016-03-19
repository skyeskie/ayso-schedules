import {Pipe, PipeTransform} from 'angular2/core';
import Game from '../models/game';
import {ClassLogger, Logger} from '../service/log.decorator';

/**
 * Pipe for displaying single-team opponent
 *
 * @param (feed) <Game> - game to process
 * @param (arg) <string> - team ID of own team
 *
 * Format of return is one of:
 * - 'vs OtherTeam'
 * - 'at OtherTeam'
 * - 'BYE'
 */
@Pipe({name: 'vsAtGame'})
class VsAtGameFormatPipe implements PipeTransform {
    @ClassLogger() public log:Logger;

    transform(game:Game, args:string[]): string {
        if(!(game instanceof Game)) {
            this.log.debug('Invalid game to vs/at pipe');
            return '';
        }

        if(game.isBye()) {
            return 'BYE';
        }

        if(game.awayTeam === args[0]) {
            return 'at ' + game.getOpponent(args[0]);
        }

        if(game.homeTeam === args[0]) {
            return 'vs ' + game.getOpponent(args[0]);
        }

        this.log.error('Could not find team ', args[0], ' in game ', game);

        return '';
    }
}

export { VsAtGameFormatPipe as default, VsAtGameFormatPipe }
