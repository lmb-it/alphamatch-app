import { useMemo } from 'react';
import { useKitsTheme } from '../Contexts/Theme/KitsThemeProvider.js';

function useComponentDefaults(componentName, props) {
  const { theme } = useKitsTheme();
  const config = theme.components[componentName];
  return useMemo(() => {
    if (!config) return { mergedProps: props, themeStyle: {} };
    const defaults = config.props || {};
    const merged = { ...defaults };
    for (const key of Object.keys(props)) {
      if (props[key] !== void 0) {
        merged[key] = props[key];
      }
    }
    return {
      mergedProps: merged,
      themeStyle: config.style || {}
    };
  }, [config, props]);
}

export { useComponentDefaults as default };
//# sourceMappingURL=useComponentDefaults.js.map
