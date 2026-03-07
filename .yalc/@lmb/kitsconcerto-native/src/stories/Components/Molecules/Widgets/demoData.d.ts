import type { IBarChartProps, IDoughnutChartProps, ILineChartProps, IPieChartProps, IPolarAreaChartProps, IRadarChartProps } from "@lmb/kitsconcerto";
export declare const chartData: {
    title: string;
    colorLevels: string;
    data: number[];
    labels: string[];
}[];
export declare const trendWidgetData: {
    widgetType: string;
    data: {
        labels: string[];
        datasets: {
            label: string;
            data: number[];
        }[];
    };
    stats: {
        label: string;
        stats: {
            label: string;
            value: number;
        }[];
    }[];
    settings: {
        timeframe: string;
        datasets: {
            zone: string;
            target: string;
        }[];
    };
};
export declare const barChartData: IBarChartProps;
export declare const lineChartData: ILineChartProps;
export declare const lineChartData2: ILineChartProps;
export declare const pieChartData: IPieChartProps;
export declare const radarChartData: IRadarChartProps;
export declare const polarAreaChartData: IPolarAreaChartProps;
export declare const doughnutChartData: IDoughnutChartProps;
//# sourceMappingURL=demoData.d.ts.map