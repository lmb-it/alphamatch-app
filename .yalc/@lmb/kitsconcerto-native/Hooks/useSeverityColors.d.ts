import type { Severity } from '@lmb/kitsconcerto-types';
export interface ResolvedSeverityColors {
    solid: string;
    bgTint: string;
    iconFg: string;
    iconBg: string;
    text: string;
    border: string;
}
/**
 * Resolves all severity color slots for a given severity using the current theme.
 * Returns platform-appropriate values (CSS vars on web, hex on native).
 * Handles dark mode by swapping shade levels for subtle tints.
 */
export declare function useSeverityColors(severity: Severity): ResolvedSeverityColors;
/**
 * Returns the full resolved map for all severities.
 * Useful when a component needs to look up colors dynamically
 * (e.g., per-button severity in a buttons array).
 */
export declare function useAllSeverityColors(): Record<Severity, ResolvedSeverityColors>;
//# sourceMappingURL=useSeverityColors.d.ts.map