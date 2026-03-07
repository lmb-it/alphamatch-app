import { jsx } from 'react/jsx-runtime';
import { ActivityIndicator } from 'react-native';

const Loader = ({ color, size = "large", animating = true, style }) => /* @__PURE__ */ jsx(ActivityIndicator, { color, size: size === "small" ? "small" : "large", animating, style });

export { Loader as default };
//# sourceMappingURL=index.js.map
