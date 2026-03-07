import type { ChartData, ChartDataset, Point } from 'chart.js';
export declare const generateLineData: (data: ChartData<"line">, isDarkMode: boolean) => {
    labels: any[];
    datasets: ChartDataset<"line", {
        [x: string]: number | Point;
    }>[];
};
export declare const generateBarData: (data: ChartData<"bar">, isDarkMode: boolean) => {
    labels: any[];
    datasets: ChartDataset<"bar", {
        [x: string]: number | [number, number];
    }>[];
};
export declare const generatePieData: (data: ChartData<"pie">, isDarkMode: boolean) => {
    labels: unknown[];
    datasets: ChartDataset<"pie", any>[];
};
export declare const generateRadarData: (data: ChartData<"radar">, isDarkMode: boolean) => {
    labels: unknown[];
    datasets: ChartDataset<"radar", any>[];
};
export declare const generatePolarAreaData: (data: ChartData<"polarArea">, isDarkMode: boolean) => {
    labels: unknown[];
    datasets: ChartDataset<"polarArea", any>[];
};
export declare const generateDoughnutData: (data: ChartData<"doughnut">, isDarkMode: boolean) => {
    labels: unknown[];
    datasets: ChartDataset<"doughnut", any>[];
};
//# sourceMappingURL=data.d.ts.map