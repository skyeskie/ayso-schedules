interface WeekCacheInterface
{
    getMaxWeeks(): Number;

    getCurrentWeek(): Number;

    reset(): void;

    update(force: boolean): void;
}

export {WeekCacheInterface as default, WeekCacheInterface}
