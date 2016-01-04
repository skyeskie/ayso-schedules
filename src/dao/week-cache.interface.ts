interface WeekCache
{
    getMaxWeeks(): Number;

    getCurrentWeek(): Number;

    reset(): void;

    update(force: boolean): void;
}

export {WeekCache as default, WeekCache}
