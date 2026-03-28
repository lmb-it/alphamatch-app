'use strict';

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');
var FieldWrapper_native = require('../layout/FieldWrapper.cjs');
var useKeyboardNavigation_native = require('../../../hooks/useKeyboardNavigation.cjs');
var index$3 = require('../fields/Select/index.cjs');
var index$f = require('../fields/InputText/index.cjs');
var index$e = require('../fields/InputNumber/index.cjs');
var index$d = require('../fields/Password/index.cjs');
var index$8 = require('../fields/Radios/index.cjs');
var index$4 = require('../fields/Checkboxes/index.cjs');
var index$7 = require('../fields/Textarea/index.cjs');
var index$6 = require('../fields/FileUploader/index.cjs');
var index$5 = require('../fields/Switch/index.cjs');
var index$b = require('../fields/Phone/index.cjs');
var index$1 = require('../fields/Container/index.cjs');
var index$a = require('../fields/DateField/index.cjs');
var index$c = require('../fields/Location/index.cjs');
var index$9 = require('../fields/ColorPicker/index.cjs');
var index_native = require('../fields/Group/index.cjs');
var index$2 = require('../fields/Object/index.cjs');
var index = require('../fields/Combined/index.cjs');
var KitsGrid = require('../../../layout/Grid/native/KitsGrid.cjs');
var KitsGridItem = require('../../../layout/GridItem/native/KitsGridItem.cjs');

const FormRenderer = ({
  elements,
  control,
  getValues,
  groupField,
  grid = {},
  parentPath = "",
  focusedField,
  setFocusedField
}) => {
  const [gridItemProps, setGridItemProps] = React.useState({});
  const TEXT_TYPES = ["Text", "Email", "Number", "Password", "Phone", "Textarea"];
  const textFieldIds = React.useMemo(() => {
    return elements.filter((el) => TEXT_TYPES.includes(el.type)).map((el) => `${parentPath}${el.id}`);
  }, [elements, parentPath]);
  const keyboardNavCtx = useKeyboardNavigation_native.useKeyboardNavProvider();
  React.useEffect(() => {
    keyboardNavCtx.setElementsOrder(textFieldIds);
  }, [textFieldIds]);
  const getElement = React.useCallback((elementType) => {
    switch (elementType) {
      case "Email":
      case "Text":
        return index$f.InputText;
      case "Number":
        return index$e.InputNumber;
      case "Password":
        return index$d.Password;
      case "Location":
        return index$c.Location;
      case "Phone":
        return index$b.Phone;
      case "Date":
        return index$a.DateField;
      case "ColorPicker":
        return index$9.ColorPicker;
      case "Radios":
        return index$8.Radios;
      case "Textarea":
        return index$7.Textarea;
      case "Image":
      case "File":
        return index$6.FileUploader;
      case "Switch":
        return index$5.Switch;
      case "Checkbox":
        return index$4.Checkboxes;
      case "Select":
        return index$3.Select;
      case "TreeSelect":
        return index$3.Select;
      case "Tags":
        return index$3.Select;
      case "ListBox":
        return index$3.Select;
      case "Multiselect":
        return index$3.Select;
      case "Group":
        return index_native.Group;
      case "Object":
        return index$2.ObjectElement;
      case "Container":
        return index$1.Container;
      case "Combined":
        return index.CombinedElement;
    }
  }, []);
  return /* @__PURE__ */ jsxRuntime.jsx(useKeyboardNavigation_native.KeyboardNavContext.Provider, { value: keyboardNavCtx, children: /* @__PURE__ */ jsxRuntime.jsx(
    KitsGrid.default,
    {
      columns: 12,
      rowGap: 10,
      columnGap: 10,
      children: elements.map((element) => {
        const FieldComponent = getElement(element.type);
        const elementId = `${parentPath}${element.id}`;
        const resolvedElement = elementId !== element.id ? { ...element, id: elementId } : element;
        if (!FieldComponent) {
          console.warn(`No component found for element type: "${resolvedElement.type}"`);
          return null;
        }
        const colSpan = parseInt(gridItemProps[elementId] ?? "12", 10);
        return /* @__PURE__ */ jsxRuntime.jsx(KitsGridItem.default, { id: elementId, colSpan, children: /* @__PURE__ */ jsxRuntime.jsx(
          FieldWrapper_native.FieldWrapper,
          {
            element: resolvedElement,
            control,
            grid,
            groupField,
            getValues,
            focusedField,
            setFocusedField,
            onGridChange: (value) => {
              if (value != gridItemProps[elementId]) {
                setGridItemProps((prevState) => ({
                  ...prevState,
                  [elementId]: value
                }));
              }
            },
            children: (props) => /* @__PURE__ */ jsxRuntime.jsx(
              FieldComponent,
              {
                groupField,
                element: resolvedElement,
                control,
                getValues,
                focusedField,
                setFocusedField,
                fieldLogic: props
              }
            )
          },
          elementId
        ) }, elementId);
      })
    }
  ) });
};

exports.FormRenderer = FormRenderer;
//# sourceMappingURL=index.cjs.map
