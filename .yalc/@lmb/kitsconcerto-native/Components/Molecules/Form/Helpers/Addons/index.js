import { jsxs, jsx } from 'react/jsx-runtime';
import React from 'react';
import 'axios';
import '../../../../../Contexts/DialogContext.js';
import '../../KitsSelect/SelectContext.js';
import Flex from '../../../UI/Flex/index.js';
import Text from '../../../UI/Text/index.js';
import 'primereact/tooltip';
import 'primereact/skeleton';

const Addons = ({ rightAddon, leftAddon, children, additionalClassName }) => {
  const renderAddon = (addon) => {
    if (!addon) return null;
    if (typeof addon === "string") {
      return /* @__PURE__ */ jsx(Text, { fontSize: 14, children: addon });
    }
    if (React.isValidElement(addon)) {
      return addon;
    }
    return null;
  };
  const mergedClassName = additionalClassName ?? "";
  return /* @__PURE__ */ jsxs(
    Flex,
    {
      flexDirection: "row",
      w: "full",
      alignItems: "stretch",
      className: mergedClassName,
      children: [
        leftAddon && /* @__PURE__ */ jsx(
          Flex,
          {
            px: 8,
            py: 6,
            alignItems: "center",
            justifyContent: "center",
            bgColor: "var(--surface-200)",
            borderTopLeftRadius: 6,
            borderBottomLeftRadius: 6,
            children: renderAddon(leftAddon)
          }
        ),
        /* @__PURE__ */ jsx(Flex, { flex: 1, children }),
        rightAddon && /* @__PURE__ */ jsx(
          Flex,
          {
            px: 8,
            py: 6,
            alignItems: "center",
            justifyContent: "center",
            bgColor: "var(--surface-200)",
            borderTopRightRadius: 6,
            borderBottomRightRadius: 6,
            children: renderAddon(rightAddon)
          }
        )
      ]
    }
  );
};

export { Addons as default };
//# sourceMappingURL=index.js.map
