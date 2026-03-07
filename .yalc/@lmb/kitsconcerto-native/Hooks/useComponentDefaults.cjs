'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var KitsThemeProvider_native = require('../Contexts/Theme/KitsThemeProvider.cjs');

function useComponentDefaults(componentName, props, baseGroup) {
  const { theme } = KitsThemeProvider_native.useKitsTheme();
  const baseConfig = baseGroup ? theme.components[baseGroup] : void 0;
  const config = theme.components[componentName];
  return React.useMemo(() => {
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

exports.default = useComponentDefaults;
//# sourceMappingURL=useComponentDefaults.cjs.map
