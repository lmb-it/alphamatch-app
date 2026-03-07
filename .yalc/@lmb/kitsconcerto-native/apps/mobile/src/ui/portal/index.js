import { jsx } from 'react/jsx-runtime';
import React from 'react';
import { Overlay } from '@gluestack-ui/core/overlay/creator';
import { cssInterop } from 'nativewind';

cssInterop(Overlay, { className: "style" });
const Portal = React.forwardRef(function Portal2({ ...props }, ref) {
  return /* @__PURE__ */ jsx(Overlay, { ...props, ref });
});
Portal.displayName = "Portal";

export { Portal };
//# sourceMappingURL=index.js.map
