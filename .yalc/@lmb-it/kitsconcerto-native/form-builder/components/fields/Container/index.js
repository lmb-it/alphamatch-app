import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { useFormContext } from 'react-hook-form';
import Label from '../../../../form/helpers/Label/label.js';
import Text from '../../../../primitives/Text/index.js';

const Container = ({
  element,
  control,
  groupField,
  getValues,
  parentPath = "",
  fieldLogic
}) => {
  const formContext = useFormContext();
  const {
    field,
    label,
    helperText,
    watchedValues
  } = fieldLogic;
  const containerElement = element;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    label && /* @__PURE__ */ jsx(Label, { as: "h2", label, elementId: element.id }),
    helperText && typeof helperText != "function" && /* @__PURE__ */ jsx(Text, { fontSize: 10, as: "small", children: helperText }),
    typeof containerElement.children !== "function" ? containerElement.children : containerElement.children(field, formContext, groupField, watchedValues)
  ] });
};

export { Container, Container as default };
//# sourceMappingURL=index.js.map
