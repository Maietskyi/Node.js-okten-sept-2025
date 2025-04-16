import dayjs, { ManipulateType } from "dayjs";

interface IParseTime {
    value: number;
    unit: ManipulateType;
}

class TimeHelper {
    public parseLifeTime(str: string): IParseTime {
        const [value, unite] = str.split(" ");
        return {
            value: parseInt(value),
            unit: unite as ManipulateType,
        };
    };

    public subFromCurrentTime(value: number, unit: ManipulateType): Date {
        return dayjs().subtract(value, unit).toDate();
    }
}

export const timeHelper = new TimeHelper();