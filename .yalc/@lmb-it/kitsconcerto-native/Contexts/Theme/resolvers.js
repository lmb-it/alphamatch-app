import 'react-icons/fa';
import 'react-icons/ai';
import 'react-icons/io';
import '../../packages/types/src/Components/Molecules/Form/FilePicker/types/filesTypes.js';
import 'yup';
import { resolveTokenValue } from '../../packages/types/src/Theme/resolvers.js';

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
    const hex = resolveTokenValue(theme, colorMode, ref, "native");
    map[`--kits-${name}`] = hex;
  }
  map["--primary-color"] = resolveTokenValue(theme, colorMode, "primary", "native");
  map["--primary"] = map["--primary-color"];
  map["--primary-reverse"] = colorMode === "dark" ? theme.colors.gray[900] : "#FFFFFF";
  map["--text-color"] = resolveTokenValue(theme, colorMode, "text", "native");
  map["--text-color-secondary"] = resolveTokenValue(theme, colorMode, "text-secondary", "native");
  map["--surface-ground"] = resolveTokenValue(theme, colorMode, "surface-ground", "native");
  map["--surface-card"] = resolveTokenValue(theme, colorMode, "surface-card", "native");
  map["--surface-overlay"] = resolveTokenValue(theme, colorMode, "surface-overlay", "native");
  map["--surface-hover"] = resolveTokenValue(theme, colorMode, "surface-hover", "native");
  map["--surface-border"] = resolveTokenValue(theme, colorMode, "border", "native");
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

export { buildNativeColorMap };
//# sourceMappingURL=resolvers.js.map
