import { jsx, Fragment } from 'react/jsx-runtime';
import 'react';
import { useLanguage } from '../../../../Hooks/locale.js';
import '../../../../Contexts/DialogContext.js';

const Translate = ({ label, children }) => {
  const { t } = useLanguage();
  return /* @__PURE__ */ jsx(Fragment, { children: label ? t(label) : typeof children == "string" ? t(children) : children });
};

export { Translate as default };
//# sourceMappingURL=index.js.map
