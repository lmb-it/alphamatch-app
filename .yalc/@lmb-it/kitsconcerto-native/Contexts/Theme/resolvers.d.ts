import type { ColorMode, IKitsTheme } from '@lmb/kitsconcerto-types';
/**
 * Builds a flat color map (CSS var name → hex) from the theme object.
 * This replaces the static CSS_VAR_MAP on native, making colors dynamic.
 */
export declare function buildNativeColorMap(theme: IKitsTheme, colorMode: ColorMode): Record<string, string>;
//# sourceMappingURL=resolvers.native.d.ts.map