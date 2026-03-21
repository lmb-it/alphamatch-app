import { useMemo } from 'react';
import { resolveStyleRecord } from './useResolvedStyle.js';
import { useKitsTheme } from '../contexts/Theme/KitsThemeProvider.js';

function useResolvedElementStyles(elementStyles) {
  const { resolveToken } = useKitsTheme();
  return useMemo(() => {
    if (!elementStyles || Object.keys(elementStyles).length === 0) return {};
    const result = {};
    for (const [slot, styleObj] of Object.entries(elementStyles)) {
      if (styleObj && Object.keys(styleObj).length > 0) {
        result[slot] = resolveStyleRecord(styleObj, resolveToken);
      }
    }
    return result;
  }, [elementStyles, resolveToken]);
}

export { useResolvedElementStyles as default };
//# sourceMappingURL=useResolvedElementStyles.js.map
