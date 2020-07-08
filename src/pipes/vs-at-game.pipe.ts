import { Pipe, PipeTransform } from '@angular/core';

import Game from '../models/game';
import { ClassLogger, Logger } from '../service/log.decorator';

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
export class VsAtGameFormatPipe implements PipeTransform {
    @ClassLogger() public log: Logger;

    transform(game: Game, team: string): string {
        if (!(game instanceof Game)) {
            this.log.debug('Invalid game to vs/at pipe');
            return '';
        }

        if (game.isBye()) {
            return 'BYE';
        }

        if (game.awayTeam === team) {
            return 'at ' + game.getOpponent(team);
        }

        if (game.homeTeam === team) {
            return 'vs ' + game.getOpponent(team);
        }

        this.log.error('Could not find team ', team, ' in game ', game);

        return '';
    }
}
