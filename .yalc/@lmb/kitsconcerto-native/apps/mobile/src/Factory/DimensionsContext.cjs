'use strict';

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');
var reactNative = require('react-native');
var style = require('./helpers/style.cjs');

const StyleCtx = React.createContext(style.createStyleContext());
function DimensionsProvider({ children }) {
  const [ctx, setCtx] = React.useState(style.createStyleContext);
  React.useEffect(() => {
    const handler = ({ window }) => {
      setCtx(style.createStyleContext());
    };
    const subscription = reactNative.Dimensions.addEventListener("change", handler);
    return () => subscription.remove();
  }, []);
  return /* @__PURE__ */ jsxRuntime.jsx(StyleCtx.Provider, { value: ctx, children });
}
function useStyleContext() {
  return React.useContext(StyleCtx);
}

exports.DimensionsProvider = DimensionsProvider;
exports.useStyleContext = useStyleContext;
//# sourceMappingURL=DimensionsContext.cjs.map
