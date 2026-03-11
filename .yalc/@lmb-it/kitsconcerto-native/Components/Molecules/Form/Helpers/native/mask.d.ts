type MaskToken = {
    t: "digit";
} | {
    t: "alpha";
} | {
    t: "alphanum";
} | {
    t: "lit";
    v: string;
};
export declare function tokenizeMask(mask: string): {
    tokens: MaskToken[];
    optionalFrom: number;
};
/**
 * Formats raw input into masked output; returns both masked and unmasked.
 * - slotChar is only used for display if you want “_”; here we keep it minimal.
 */
export declare function formatWithMask(raw: string, mask: string): {
    masked: string;
    unmasked: string;
};
export {};
//# sourceMappingURL=mask.d.ts.map