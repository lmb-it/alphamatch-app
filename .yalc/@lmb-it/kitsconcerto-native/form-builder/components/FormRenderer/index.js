import { jsx } from 'react/jsx-runtime';
import { useState, useMemo, useEffect, useCallback } from 'react';
import { FieldWrapper } from '../layout/FieldWrapper.js';
import { useKeyboardNavProvider, KeyboardNavContext } from '../../../hooks/useKeyboardNavigation.js';
import { Select } from '../fields/Select/index.js';
import { InputText } from '../fields/InputText/index.js';
import { InputNumber } from '../fields/InputNumber/index.js';
import { Password } from '../fields/Password/index.js';
import { Radios } from '../fields/Radios/index.js';
import { Checkboxes } from '../fields/Checkboxes/index.js';
import { Textarea } from '../fields/Textarea/index.js';
import { FileUploader } from '../fields/FileUploader/index.js';
import { Switch } from '../fields/Switch/index.js';
import { Phone } from '../fields/Phone/index.js';
import { Container } from '../fields/Container/index.js';
import { DateField } from '../fields/DateField/index.js';
import { Location } from '../fields/Location/index.js';
import { ColorPicker } from '../fields/ColorPicker/index.js';
import { Group } from '../fields/Group/index.js';
import { ObjectElement } from '../fields/Object/index.js';
import { CombinedElement } from '../fields/Combined/index.js';
import KitsGrid from '../../../layout/Grid/native/KitsGrid.js';
import KitsGridItem from '../../../layout/GridItem/native/KitsGridItem.js';

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
  const [gridItemProps, setGridItemProps] = useState({});
  const TEXT_TYPES = ["Text", "Email", "Number", "Password", "Phone", "Textarea"];
  const textFieldIds = useMemo(() => {
    return elements.filter((el) => TEXT_TYPES.includes(el.type)).map((el) => `${parentPath}${el.id}`);
  }, [elements, parentPath]);
  const keyboardNavCtx = useKeyboardNavProvider();
  useEffect(() => {
    keyboardNavCtx.setElementsOrder(textFieldIds);
  }, [textFieldIds]);
  const getElement = useCallback((elementType) => {
    switch (elementType) {
      case "Email":
      case "Text":
        return InputText;
      case "Number":
        return InputNumber;
      case "Password":
        return Password;
      case "Location":
        return Location;
      case "Phone":
        return Phone;
      case "Date":
        return DateField;
      case "ColorPicker":
        return ColorPicker;
      case "Radios":
        return Radios;
      case "Textarea":
        return Textarea;
      case "Image":
      case "File":
        return FileUploader;
      case "Switch":
        return Switch;
      case "Checkbox":
        return Checkboxes;
      case "Select":
        return Select;
      case "TreeSelect":
        return Select;
      case "Tags":
        return Select;
      case "ListBox":
        return Select;
      case "Multiselect":
        return Select;
      case "Group":
        return Group;
      case "Object":
        return ObjectElement;
      case "Container":
        return Container;
      case "Combined":
        return CombinedElement;
    }
  }, []);
  return /* @__PURE__ */ jsx(KeyboardNavContext.Provider, { value: keyboardNavCtx, children: /* @__PURE__ */ jsx(
    KitsGrid,
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
        return /* @__PURE__ */ jsx(KitsGridItem, { id: elementId, colSpan, children: /* @__PURE__ */ jsx(
          FieldWrapper,
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
            children: (props) => /* @__PURE__ */ jsx(
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

export { FormRenderer };
//# sourceMappingURL=index.js.map
