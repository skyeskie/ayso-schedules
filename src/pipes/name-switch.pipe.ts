import {Pipe} from 'angular2/core';
import {PipeTransform} from 'angular2/core';
import Game from '../models/game';
import {ClassLogger, Logger} from '../service/log.decorator';

/**
 * @method transform
 * @param name (fed into pipe) - name to switch of format "A...A, B...B"
 *
 * @returns For proper format ("A, B"), returns "A B"
 * If improper type, will clip to empty string and log warning
 * If doesn't have exactly one comma followed by a space, returns input unchanged
 */
@Pipe({name: 'NameSwitch'})
class NameSwitchPipe implements PipeTransform {
    @ClassLogger() public log:Logger;

    transform(name:string): any {
        if(typeof name !== 'string') {
            this.log.warn('Unexpected parameter for pipe', name);
            return '';
        }

        return name.replace(/^([^,]*), ([^,]*)$/, '$2 $1');
    }
}

export { NameSwitchPipe as default, NameSwitchPipe }
