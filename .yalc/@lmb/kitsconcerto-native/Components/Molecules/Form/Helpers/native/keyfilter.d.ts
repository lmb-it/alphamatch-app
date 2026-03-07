export type PrimeKeyFilter = "pint" | "int" | "pnum" | "money" | "num" | "hex" | "email" | "alpha" | "alphanum" | RegExp;
export declare function applyKeyFilter(next: string, keyFilter?: PrimeKeyFilter): string;
/**
 * Safer: if next fails, keep previous.
 */
export declare function applyKeyFilterKeepPrev(prev: string, next: string, keyFilter?: PrimeKeyFilter): string;
//# sourceMappingURL=keyfilter.d.ts.map