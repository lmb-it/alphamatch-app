import { useMemo } from 'react';
import { useKitsTheme } from '../contexts/Theme/KitsThemeProvider.js';

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
  "content",
  "footer"
]);
function useComponentDefaults(componentName, props, baseGroup) {
  const { theme } = useKitsTheme();
  const baseConfig = baseGroup ? theme.components[baseGroup] : void 0;
  const config = theme.components[componentName];
  return useMemo(() => {
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

export { useComponentDefaults as default };
//# sourceMappingURL=useComponentDefaults.js.map
