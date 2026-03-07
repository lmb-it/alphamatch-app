import { jsx } from 'react/jsx-runtime';
import 'react';
import 'axios';
import '../../../../../Contexts/DialogContext.js';
import useComponentDefaults from '../../../../../Hooks/useComponentDefaults.js';
import '../SelectContext.js';
import '../../../UI/Flex/index.js';
import Text from '../../../UI/Text/index.js';
import 'primereact/tooltip';
import 'primereact/skeleton';

const KitsCascadeSelect = (rawProps = {}) => {
  const { mergedProps: props, themeStyle } = useComponentDefaults("CascadeSelect", rawProps, "Select");
  return /* @__PURE__ */ jsx(Text, { children: "CascadeSelect is not yet available on native." });
};

export { KitsCascadeSelect as default };
//# sourceMappingURL=index.js.map
