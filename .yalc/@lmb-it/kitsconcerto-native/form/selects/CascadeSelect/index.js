import { jsx } from 'react/jsx-runtime';
import 'react';
import '../../../contexts/DialogContext.js';
import useComponentDefaults from '../../../hooks/useComponentDefaults.js';
import Text from '../../../primitives/Text/index.js';

const KitsCascadeSelect = (rawProps = {}) => {
  const { mergedProps: props, themeStyle, elementStyles } = useComponentDefaults("CascadeSelect", rawProps, "Select");
  return /* @__PURE__ */ jsx(Text, { children: "CascadeSelect is not yet available on native." });
};

export { KitsCascadeSelect as default };
//# sourceMappingURL=index.js.map
