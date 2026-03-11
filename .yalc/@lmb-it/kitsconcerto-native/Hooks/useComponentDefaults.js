import { useMemo } from 'react';
import { useKitsTheme } from '../Contexts/Theme/KitsThemeProvider.js';

function useComponentDefaults(componentName, props, baseGroup) {
  const { theme } = useKitsTheme();
  const baseConfig = baseGroup ? theme.components[baseGroup] : void 0;
  const config = theme.components[componentName];
  return useMemo(() => {
    if (!config && !baseConfig) return { mergedProps: props, themeStyle: {} };
    const merged = {
      ...baseConfig?.props || {},
      ...config?.props || {}
    };
    for (const key of Object.keys(props)) {
      if (props[key] !== void 0) {
        merged[key] = props[key];
      }
    }
    return {
      mergedProps: merged,
      themeStyle: {
        ...baseConfig?.style || {},
        ...config?.style || {}
      }
    };
  }, [baseConfig, config, props]);
}

export { useComponentDefaults as default };
//# sourceMappingURL=useComponentDefaults.js.map
