'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var KitsThemeProvider_native = require('../Contexts/Theme/KitsThemeProvider.cjs');

function useComponentDefaults(componentName, props) {
  const { theme } = KitsThemeProvider_native.useKitsTheme();
  const config = theme.components[componentName];
  return React.useMemo(() => {
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

exports.default = useComponentDefaults;
//# sourceMappingURL=useComponentDefaults.cjs.map
