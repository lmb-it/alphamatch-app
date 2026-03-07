import type { EKeyFilter } from "@lmb/kitsconcerto-types";
type KeyFilter = EKeyFilter | RegExp | undefined;
export declare const applyKeyFilter: (prev: string, next: string, filter: KeyFilter) => string;
export {};
//# sourceMappingURL=keyFilter.native.d.ts.map