import type { IPaginationRequest } from "@lmb/kitsconcerto-types";
/**
 * Detects whether a string value looks like a date in common formats
 * and converts it to a Date object. Returns the original value otherwise.
 * Pure function — no side-effects, safe to use on native.
 */
export declare function valueChecker(value: unknown): Date | unknown;
/**
 * Converts raw row objects so that date-looking string values become
 * actual Date instances (for PrimeReact column type=date filters).
 */
export declare function fixData<T extends Record<string, any>>(data: T[]): T[];
/**
 * Converts Date instances inside filter values back to ISO strings
 * before sending them to the server-side service.
 */
export declare function revertFilter(filters: IPaginationRequest["filters"]): Record<string, unknown>;
//# sourceMappingURL=utils.d.ts.map