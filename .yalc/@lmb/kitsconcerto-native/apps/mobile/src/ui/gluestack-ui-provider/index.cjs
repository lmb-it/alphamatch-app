'use strict';

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');
var config = require('./config.cjs');
var reactNative = require('react-native');
var creator = require('@gluestack-ui/core/overlay/creator');
var creator$1 = require('@gluestack-ui/core/toast/creator');
var nativewind = require('nativewind');

function GluestackUIProvider({
  mode = "light",
  ...props
}) {
  const { colorScheme, setColorScheme } = nativewind.useColorScheme();
  React.useEffect(() => {
    setColorScheme(mode);
  }, [mode]);
  return /* @__PURE__ */ jsxRuntime.jsx(
    reactNative.View,
    {
      style: [
        config.config[colorScheme],
        { flex: 1, height: "100%", width: "100%" },
        props.style
      ],
      children: /* @__PURE__ */ jsxRuntime.jsx(creator.OverlayProvider, { children: /* @__PURE__ */ jsxRuntime.jsx(creator$1.ToastProvider, { children: props.children }) })
    }
  );
}

exports.GluestackUIProvider = GluestackUIProvider;
//# sourceMappingURL=index.cjs.map
