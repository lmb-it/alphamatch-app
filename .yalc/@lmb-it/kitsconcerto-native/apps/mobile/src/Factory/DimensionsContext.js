import { jsx } from 'react/jsx-runtime';
import { useState, useEffect, createContext, useContext } from 'react';
import { Dimensions } from 'react-native';
import { createStyleContext } from './helpers/style.js';

const StyleCtx = createContext(createStyleContext());
function DimensionsProvider({ children }) {
  const [ctx, setCtx] = useState(createStyleContext);
  useEffect(() => {
    const handler = ({ window }) => {
      setCtx(createStyleContext());
    };
    const subscription = Dimensions.addEventListener("change", handler);
    return () => subscription.remove();
  }, []);
  return /* @__PURE__ */ jsx(StyleCtx.Provider, { value: ctx, children });
}
function useStyleContext() {
  return useContext(StyleCtx);
}

export { DimensionsProvider, useStyleContext };
//# sourceMappingURL=DimensionsContext.js.map
