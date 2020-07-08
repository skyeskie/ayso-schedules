import { IN_MEM_GAME_SERVICE_PROVIDER } from '../../src/dao/mem/games.mem.service';
import { IN_MEM_SETTINGS_PROVIDER } from '../../src/dao/mem/settings.mem.service';
import { IN_MEMORY_TEAMS_SERVICE_PROVIDER } from '../../src/dao/mem/teams.mem.service';
import { IBackend, StaticInitializationService } from '../../src/service/backend/static.backend';

import { MOCK_WEEK_SERVICE_PROVIDER } from './weeks.mock.service';

export const MOCK_DAO_PROVIDERS = [
    { provide: IBackend, useClass: StaticInitializationService },
    IN_MEM_GAME_SERVICE_PROVIDER,
    IN_MEMORY_TEAMS_SERVICE_PROVIDER,
    IN_MEM_SETTINGS_PROVIDER,
    MOCK_WEEK_SERVICE_PROVIDER,
];
