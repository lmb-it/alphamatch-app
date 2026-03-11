import { jsx } from 'react/jsx-runtime';
import { useEffect } from 'react';
import { config } from './config.js';
import { View } from 'react-native';
import { OverlayProvider } from '@gluestack-ui/core/overlay/creator';
import { ToastProvider } from '@gluestack-ui/core/toast/creator';
import { useColorScheme } from 'nativewind';

function GluestackUIProvider({
  mode = "light",
  ...props
}) {
  const { colorScheme, setColorScheme } = useColorScheme();
  useEffect(() => {
    setColorScheme(mode);
  }, [mode]);
  return /* @__PURE__ */ jsx(
    View,
    {
      style: [
        config[colorScheme],
        { flex: 1, height: "100%", width: "100%" },
        props.style
      ],
      children: /* @__PURE__ */ jsx(OverlayProvider, { children: /* @__PURE__ */ jsx(ToastProvider, { children: props.children }) })
    }
  );
}

export { GluestackUIProvider };
//# sourceMappingURL=index.js.map
