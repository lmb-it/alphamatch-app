import { jsxs, jsx } from 'react/jsx-runtime';
import Alert$1, { AlertIcon, AlertTitle, AlertDescription } from './alert.js';

const Alert = ({ status, variant, className, withIcon, children, title, description }) => {
  return /* @__PURE__ */ jsxs(Alert$1, { status, className, variant, children: [
    withIcon && /* @__PURE__ */ jsx(AlertIcon, { status }),
    title && /* @__PURE__ */ jsx(AlertTitle, { children: title }),
    description && /* @__PURE__ */ jsx(AlertDescription, { children: description }),
    children
  ] });
};

export { Alert as default };
//# sourceMappingURL=index.js.map
