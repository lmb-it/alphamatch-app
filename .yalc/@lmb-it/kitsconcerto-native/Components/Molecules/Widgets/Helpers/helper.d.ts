import type { RefObject } from 'react';
import { type ChartDataset } from 'chart.js';
export declare const handleDownload: (uniqueId: string, chart: RefObject<any>, isDarkMode?: boolean) => void;
export declare const formatLabel: (target: string) => string;
export declare const labelsWithValue: (data: ChartDataset<any, number[]>[]) => string[];
export declare const sleep: (ms: number) => Promise<unknown>;
//# sourceMappingURL=helper.d.ts.map