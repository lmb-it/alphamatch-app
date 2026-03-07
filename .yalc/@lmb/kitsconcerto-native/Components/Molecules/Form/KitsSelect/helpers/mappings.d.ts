import type { IListItem } from "@lmb/kitsconcerto-types";
/**
 * Normalizes any list input into a standard Record format.
 * Handles:
 * 1. Arrays of primitives (strings/numbers) -> { label: 'A', value: 'A' }
 * 2. Arrays of objects -> renames keys to 'label' and 'value'
 * 3. Recursive children -> converts children arrays using the same logic
 */
export declare const mapping: (list: IListItem[], labelKey?: string, valueKey?: string, childrenKey?: string) => Record<string, any>[];
/**
 * Helper to check if keys exist in the first item of the list.
 * Useful for throwing dev-time warnings.
 */
export declare const checkKeys: (list: any[], labelKey: string, valueKey: string) => void;
//# sourceMappingURL=mappings.d.ts.map