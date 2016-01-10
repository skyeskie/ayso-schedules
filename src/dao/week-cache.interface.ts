interface WeekCacheInterface
{
    getMaxWeeks(): Promise<Number>;

    getCurrentWeek(): Promise<Number>;

    reset(): void;

    update(force: boolean): void;
}

export {WeekCacheInterface as default, WeekCacheInterface}
