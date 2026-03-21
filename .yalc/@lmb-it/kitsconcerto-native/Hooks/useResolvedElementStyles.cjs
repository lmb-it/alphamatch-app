'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var useResolvedStyle = require('./useResolvedStyle.cjs');
var KitsThemeProvider_native = require('../contexts/Theme/KitsThemeProvider.cjs');

function useResolvedElementStyles(elementStyles) {
  const { resolveToken } = KitsThemeProvider_native.useKitsTheme();
  return React.useMemo(() => {
    if (!elementStyles || Object.keys(elementStyles).length === 0) return {};
    const result = {};
    for (const [slot, styleObj] of Object.entries(elementStyles)) {
      if (styleObj && Object.keys(styleObj).length > 0) {
        result[slot] = useResolvedStyle.resolveStyleRecord(styleObj, resolveToken);
      }
    }
    return result;
  }, [elementStyles, resolveToken]);
}

exports.default = useResolvedElementStyles;
//# sourceMappingURL=useResolvedElementStyles.cjs.map
