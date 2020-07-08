import { Injectable } from '@angular/core';

import { ClassLogger, Logger } from '../../service/log.decorator';
import { checkPresent } from '../../service/util';
import { Game, GamesDAO, GamesInterface } from '../games.interface';

@Injectable({providedIn: 'root'})
class InMemoryGamesService implements GamesInterface {
    @ClassLogger() public log: Logger;
    protected games: Map<string, Game> = new Map<string, Game>();

    getGame(id: string): Promise<Game> {
        return new Promise<Game>((resolve: any, reject: any) => {
                if (!this.games.has(id)) {
                    reject(new RangeError('Game not found for id: ' + id));
                }
                resolve(this.games.get(id));
            });
    }

    findByWeek(week: number, region?: number): Promise<Game[]> {
        return this.findGames(region, null, null, week);
    }

    findGames(regionNum?: number, ageGroup?: string, gender?: string, week?: number): Promise<Game[]> {
        const results: Game[] = [];

        this.games.forEach((game: Game) => {
            if (checkPresent(week) && week !== game.weekNum) {
                return;
            }

            if (checkPresent(regionNum) && regionNum !== game.region) {
                return;
            }

            if (checkPresent(ageGroup) && ageGroup !== game.divis.age.toString()) {
                return;
            }

            if (checkPresent(gender) && gender !== game.divis.gender.long) {
                return;
            }

            results.push(game);
        });

        return Promise.resolve(results);
    }

    findForTeam(teamID: string): Promise<Game[]> {
        return this.findForTeams([teamID]);
    }

    findForTeams(teamIDs: string[]): Promise<Game[]> {
        const teams = new Set<string>();
        teamIDs.forEach((id: string) => teams.add(id));

        const results: Game[] = [];
        this.games.forEach((game: Game) => {
            if (teams.has(game.homeTeam) || teams.has(game.awayTeam)) {
                results.push(game);
            }
        });
        return Promise.resolve(results);
    }

    clear(): Promise<void> {
        this.games.clear();
        return Promise.resolve();
    }

    add(newGames: Game[]): Promise<any> {
        const self = this;

        newGames.forEach((game: Game) => {
            if (game.awayTeam === null && game.homeTeam === null) {
                self.games.delete(game.id);
            } else {
                self.games.set(game.id, game);
            }
        });

        return Promise.resolve(this.games.size);
    }
}

const IN_MEM_GAME_SERVICE_PROVIDER = { provide: GamesDAO, useClass: InMemoryGamesService };

export { IN_MEM_GAME_SERVICE_PROVIDER, InMemoryGamesService, GamesDAO };
