import { jsxs, jsx } from 'react/jsx-runtime';
import { isValidElement } from 'react';
import Alert$1, { AlertIcon, AlertTitle, AlertDescription } from './alert.js';
import { useKitsTheme } from '../../contexts/Theme/KitsThemeProvider.js';

const Alert = ({ status = "info", variant = "subtle", className, withIcon, children, title, description }) => {
  const { resolveToken } = useKitsTheme();
  const primary = resolveToken("primary");
  const statusColors = {
    error: resolveToken("red.500"),
    success: resolveToken("green.500"),
    warning: resolveToken("yellow.500"),
    info: resolveToken("blue.500"),
    brand: primary
  };
  const color = statusColors[status];
  const textColor = variant === "solid" ? "#FFFFFF" : color;
  return /* @__PURE__ */ jsxs(Alert$1, { status, className, variant, children: [
    withIcon && /* @__PURE__ */ jsx(AlertIcon, { status }),
    title && /* @__PURE__ */ jsx(AlertTitle, { color: textColor, children: title }),
    description && /* @__PURE__ */ jsx(AlertDescription, { color: textColor, children: description }),
    typeof children == "string" && /* @__PURE__ */ jsx(AlertTitle, { color: textColor, children }),
    isValidElement(children) && children
  ] });
};

export { AlertDescription, AlertIcon, AlertTitle, Alert as default };
//# sourceMappingURL=index.js.map
