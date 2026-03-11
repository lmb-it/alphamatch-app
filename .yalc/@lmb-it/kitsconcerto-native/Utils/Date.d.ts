import moment from 'moment/moment';
export declare const isToday: (date: moment.Moment) => boolean;
export declare const timeAgo: (timestamp: string) => string;
export declare const timeSince: (days: number) => string;
export declare const getCustomDateTime: (value?: number, unit?: moment.unitOfTime.DurationConstructor, format?: string) => string;
export declare const getDateElements: (date: string) => {
    day: string;
    time: string;
    date: true | {
        dateString: string;
        month: string;
        date: string;
        year: string;
    };
};
//# sourceMappingURL=Date.d.ts.map