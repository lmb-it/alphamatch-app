import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { useRef } from 'react';
import 'axios';
import '../../../Contexts/DialogContext.js';
import '../Form/KitsSelect/SelectContext.js';
import Flex from '../UI/Flex/index.js';
import { Button } from '../Button/Button.js';
import 'primereact/tooltip';
import 'primereact/skeleton';

const CustomPopover = ({
  children,
  label,
  onPopoverClosed,
  onPopoverOpened,
  closeButton = false
}) => {
  const op = useRef(null);
  const toggle = (event) => {
    op.current?.toggle(event);
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    typeof label == "string" && /* @__PURE__ */ jsx(Button, { onClick: toggle, children: label }),
    typeof label != "string" && /* @__PURE__ */ jsx(Flex, { onClick: toggle, children: label })
  ] });
};

export { CustomPopover as default };
//# sourceMappingURL=index.js.map
