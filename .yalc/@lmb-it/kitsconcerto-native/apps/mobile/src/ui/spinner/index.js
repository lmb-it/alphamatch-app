import { jsx } from 'react/jsx-runtime';
import { ActivityIndicator } from 'react-native';
import React from 'react';
import { tva } from '@gluestack-ui/utils/nativewind-utils';
import { cssInterop } from 'nativewind';

cssInterop(ActivityIndicator, {
  className: { target: "style", nativeStyleToProp: { color: true } }
});
const spinnerStyle = tva({});
const Spinner = React.forwardRef(function Spinner2({
  className,
  color,
  focusable = false,
  "aria-label": ariaLabel = "loading",
  ...props
}, ref) {
  return /* @__PURE__ */ jsx(
    ActivityIndicator,
    {
      ref,
      focusable,
      "aria-label": ariaLabel,
      ...props,
      color,
      className: spinnerStyle({ class: className })
    }
  );
});
Spinner.displayName = "Spinner";

export { Spinner };
//# sourceMappingURL=index.js.map
