export interface NumberFormatOptions {
    locale?: string;
    useGrouping?: boolean;
    minFractionDigits?: number;
    maxFractionDigits?: number;
    mode?: "decimal" | "currency";
    currency?: string;
    prefix?: string;
    suffix?: string;
    min?: number;
    max?: number;
}
export declare function clampNumber(n: number, min?: number, max?: number): number;
export declare function parseLooseNumber(text: string): number | null;
export declare function formatNumber(value: number | null | undefined, o: NumberFormatOptions): string;
//# sourceMappingURL=numberFormat.d.ts.map