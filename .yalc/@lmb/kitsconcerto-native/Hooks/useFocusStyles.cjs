'use strict';

var React = require('react');
var style = require('../apps/mobile/src/Factory/helpers/style.cjs');

function useFocusStyles(themeStyle, isFocused) {
  return React.useMemo(() => {
    if (!themeStyle) return {};
    const { _focus, _hover, ...base } = themeStyle;
    const baseStyle = style.style(base);
    if (!isFocused || !_focus) return baseStyle;
    const focusStyle = style.style(_focus);
    return { ...baseStyle, ...focusStyle };
  }, [themeStyle, isFocused]);
}

exports.useFocusStyles = useFocusStyles;
//# sourceMappingURL=useFocusStyles.cjs.map
