'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var KitsThemeProvider_native = require('../contexts/Theme/KitsThemeProvider.cjs');

const ELEMENT_SLOT_KEYS = /* @__PURE__ */ new Set([
  "root",
  "container",
  "label",
  "inputGroup",
  "leftAddon",
  "rightAddon",
  "helperText",
  "error",
  "icon",
  "header",
  "title",
  "subTitle",
  "content",
  "footer",
  // Table slots
  "headerRow",
  "headerCell",
  "body",
  "bodyRow",
  "bodyCell",
  "footerCell",
  "paginator",
  "emptyMessage"
]);
function useComponentDefaults(componentName, props, baseGroup) {
  const { theme } = KitsThemeProvider_native.useKitsTheme();
  const baseConfig = baseGroup ? theme.components[baseGroup] : void 0;
  const config = theme.components[componentName];
  return React.useMemo(() => {
    if (!config && !baseConfig) {
      return { mergedProps: props, themeStyle: {}, elementStyles: {} };
    }
    const base = baseConfig || {};
    const comp = config || {};
    const merged = {
      ...base.root?.props || {},
      ...comp.root?.props || {}
    };
    for (const key of Object.keys(props)) {
      if (props[key] !== void 0) {
        merged[key] = props[key];
      }
    }
    const allSlotKeys = /* @__PURE__ */ new Set();
    for (const key of Object.keys(base)) {
      if (ELEMENT_SLOT_KEYS.has(key)) allSlotKeys.add(key);
    }
    for (const key of Object.keys(comp)) {
      if (ELEMENT_SLOT_KEYS.has(key)) allSlotKeys.add(key);
    }
    const elementStyles = {};
    for (const slotKey of allSlotKeys) {
      elementStyles[slotKey] = {
        ...base[slotKey]?.style || {},
        ...comp[slotKey]?.style || {}
      };
    }
    const themeStyle = elementStyles.root || {};
    return {
      mergedProps: merged,
      themeStyle,
      elementStyles
    };
  }, [baseConfig, config, props]);
}

exports.default = useComponentDefaults;
//# sourceMappingURL=useComponentDefaults.cjs.map
