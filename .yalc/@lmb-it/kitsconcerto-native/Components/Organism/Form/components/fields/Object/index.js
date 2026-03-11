import { jsx, jsxs } from 'react/jsx-runtime';
import { useMemo } from 'react';
import 'axios';
import '../../../../../../Contexts/DialogContext.js';
import '../../../../../../Hooks/useKeyboardNavigation.js';
import '../../../../../Molecules/Form/KitsSelect/SelectContext.js';
import Label from '../../../../../Molecules/Form/Helpers/Label/label.js';
import Flex from '../../../../../Molecules/UI/Flex/index.js';
import Text from '../../../../../Molecules/UI/Text/index.js';
import 'primereact/tooltip';
import 'primereact/skeleton';
import { FormRenderer } from '../../FormRenderer/index.js';

const ObjectElement = ({
  element,
  control,
  getValues,
  groupField,
  focusedField,
  setFocusedField,
  fieldLogic
}) => {
  const { isShown, label, elements, helperText } = fieldLogic;
  const objectElement = element;
  const { grid } = objectElement;
  const renderer = useMemo(() => {
    if (!elements) {
      return null;
    }
    return /* @__PURE__ */ jsx(
      FormRenderer,
      {
        elements,
        control,
        getValues,
        groupField,
        parentPath: `${element.id.toString()}.`,
        focusedField,
        setFocusedField,
        grid
      }
    );
  }, [elements, focusedField, groupField, grid]);
  if (!isShown) {
    return null;
  }
  return /* @__PURE__ */ jsxs(Flex, { id: element.id.toString(), w: "full", flexDirection: "column", gap: 10, mb: 6, children: [
    label && /* @__PURE__ */ jsx(Label, { as: "h2", label, elementId: element.id }),
    helperText && typeof helperText != "function" && /* @__PURE__ */ jsx(Text, { fontSize: 10, as: "small", children: helperText }),
    renderer
  ] });
};

export { ObjectElement, ObjectElement as default };
//# sourceMappingURL=index.js.map
