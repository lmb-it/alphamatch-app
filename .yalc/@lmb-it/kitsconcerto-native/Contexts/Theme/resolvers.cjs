'use strict';

require('react-icons/fa');
require('react-icons/ai');
require('react-icons/io');
require('../../packages/types/src/Components/Molecules/Form/FilePicker/types/filesTypes.cjs');
require('yup');
var resolvers = require('../../packages/types/src/Theme/resolvers.cjs');

function buildNativeColorMap(theme, colorMode) {
  const map = {};
  for (const [family, scale] of Object.entries(theme.colors)) {
    for (const [shade, hex] of Object.entries(scale)) {
      map[`--kits-${family}-${shade}`] = hex;
      map[`--${family}-${shade}`] = hex;
    }
  }
  const semantics = theme.semanticTokens[colorMode];
  for (const [name, ref] of Object.entries(semantics)) {
    const hex = resolvers.resolveTokenValue(theme, colorMode, ref, "native");
    map[`--kits-${name}`] = hex;
  }
  map["--primary-color"] = resolvers.resolveTokenValue(theme, colorMode, "primary", "native");
  map["--primary"] = map["--primary-color"];
  map["--primary-reverse"] = colorMode === "dark" ? theme.colors.gray[900] : "#FFFFFF";
  map["--text-color"] = resolvers.resolveTokenValue(theme, colorMode, "text", "native");
  map["--text-color-secondary"] = resolvers.resolveTokenValue(theme, colorMode, "text-secondary", "native");
  map["--surface-ground"] = resolvers.resolveTokenValue(theme, colorMode, "surface-ground", "native");
  map["--surface-card"] = resolvers.resolveTokenValue(theme, colorMode, "surface-card", "native");
  map["--surface-overlay"] = resolvers.resolveTokenValue(theme, colorMode, "surface-overlay", "native");
  map["--surface-hover"] = resolvers.resolveTokenValue(theme, colorMode, "surface-hover", "native");
  map["--surface-border"] = resolvers.resolveTokenValue(theme, colorMode, "border", "native");
  for (const [shade, hex] of Object.entries(theme.colors.gray)) {
    map[`--surface-${shade}`] = hex;
  }
  for (const [shade, hex] of Object.entries(theme.colors.gray)) {
    map[`--text-${shade}`] = hex;
  }
  map["--white"] = "#FFFFFF";
  map["--black"] = "#000000";
  map["--font-family"] = "System";
  return map;
}

exports.buildNativeColorMap = buildNativeColorMap;
//# sourceMappingURL=resolvers.cjs.map
