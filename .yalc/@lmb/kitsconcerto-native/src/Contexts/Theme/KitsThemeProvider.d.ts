import React from 'react';
import type { IKitsThemeContextValues, KitsThemeOverride } from '@lmb/kitsconcerto-types';
declare const KitsThemeContext: React.Context<IKitsThemeContextValues>;
/** Context for the resolved native color map, consumed by style.ts */
declare const NativeColorMapContext: React.Context<Record<string, string>>;
export interface KitsThemeProviderProps {
    theme?: KitsThemeOverride;
    children: React.ReactNode;
}
export declare function KitsThemeProvider({ theme: themeOverride, children }: KitsThemeProviderProps): import("react/jsx-runtime").JSX.Element;
export declare function useKitsTheme(): IKitsThemeContextValues;
/** Returns the resolved native color map for use in style functions */
export declare function useNativeColorMap(): Record<string, string>;
export { KitsThemeContext, NativeColorMapContext };
//# sourceMappingURL=KitsThemeProvider.native.d.ts.map