import { useMemo } from 'react';
import { style } from '../apps/mobile/src/Factory/helpers/style.js';

function useFocusStyles(themeStyle, isFocused) {
  return useMemo(() => {
    if (!themeStyle) return {};
    const { _focus, _hover, ...base } = themeStyle;
    const baseStyle = style(base);
    if (!isFocused || !_focus) return baseStyle;
    const focusStyle = style(_focus);
    return { ...baseStyle, ...focusStyle };
  }, [themeStyle, isFocused]);
}

export { useFocusStyles };
//# sourceMappingURL=useFocusStyles.js.map
