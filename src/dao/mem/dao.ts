export * from './games.mem.service';
export * from './settings.mem.service';
export * from './teams.mem.service';
export * from './weeks.mem.service';

const IN_MEMORY_TEAM_DAO_PROVIDER = '';
const IN_MEMORY_GAME_DAO_PROVIDER = '';
const IN_MEMORY_SETTINGS_DAO_PROVIDER = '';
const IN_MEMORY_WEEKS_DAO_PROVIDER = '';

const IN_MEMORY_DAO_PROVIDERS:string[] = [
    IN_MEMORY_TEAM_DAO_PROVIDER,
    IN_MEMORY_GAME_DAO_PROVIDER,
    IN_MEMORY_SETTINGS_DAO_PROVIDER,
    IN_MEMORY_WEEKS_DAO_PROVIDER,
];

export {
    IN_MEMORY_DAO_PROVIDERS,
    IN_MEMORY_DAO_PROVIDERS as default,
    IN_MEMORY_TEAM_DAO_PROVIDER,
    IN_MEMORY_GAME_DAO_PROVIDER,
    IN_MEMORY_SETTINGS_DAO_PROVIDER,
    IN_MEMORY_WEEKS_DAO_PROVIDER,
};
