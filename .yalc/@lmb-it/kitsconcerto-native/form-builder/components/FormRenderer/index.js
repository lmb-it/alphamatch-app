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
import 'react-hook-form';
import '../../../apps/mobile/src/ui/accordion/index.js';
import '../../../apps/mobile/src/ui/actionsheet/index.js';
import '../../../apps/mobile/src/ui/alert/index.js';
import '../../../apps/mobile/src/ui/alert-dialog/index.js';
import '../../../apps/mobile/src/ui/avatar/index.js';
import '../../../apps/mobile/src/ui/badge/index.js';
import '../../../apps/mobile/src/ui/bottomsheet/index.js';
import '../../../apps/mobile/src/ui/box/index.js';
import '../../../apps/mobile/src/ui/button/index.js';
import '../../../apps/mobile/src/ui/card/index.js';
import '../../../apps/mobile/src/ui/center/index.js';
import '../../../apps/mobile/src/ui/checkbox/index.js';
import '../../../apps/mobile/src/ui/divider/index.js';
import '../../../apps/mobile/src/ui/drawer/index.js';
import '../../../apps/mobile/src/ui/fab/index.js';
import 'react-native';
import '../../../apps/mobile/src/ui/form-control/index.js';
import '../../../apps/mobile/src/ui/gluestack-ui-provider/config.js';
import '@gluestack-ui/core/overlay/creator';
import '@gluestack-ui/core/toast/creator';
import 'nativewind';
import { GridItem } from '../../../apps/mobile/src/ui/grid/index.js';
import '../../../apps/mobile/src/ui/heading/index.js';
import '../../../apps/mobile/src/ui/hstack/index.js';
import '../../../apps/mobile/src/ui/icon/index.js';
import '../../../apps/mobile/src/ui/image/index.js';
import '../../../apps/mobile/src/ui/image-background/index.js';
import '../../../apps/mobile/src/ui/input/index.js';
import '../../../apps/mobile/src/ui/link/index.js';
import '../../../apps/mobile/src/ui/menu/index.js';
import '../../../apps/mobile/src/ui/modal/index.js';
import '../../../apps/mobile/src/ui/popover/index.js';
import '../../../apps/mobile/src/ui/portal/index.js';
import '../../../apps/mobile/src/ui/pressable/index.js';
import '../../../apps/mobile/src/ui/progress/index.js';
import '../../../apps/mobile/src/ui/radio/index.js';
import 'react-native-safe-area-context';
import '../../../apps/mobile/src/ui/select/index.js';
import '../../../apps/mobile/src/ui/skeleton/index.js';
import '../../../apps/mobile/src/ui/slider/index.js';
import '../../../apps/mobile/src/ui/spinner/index.js';
import '../../../apps/mobile/src/ui/switch/index.js';
import '../../../apps/mobile/src/ui/table/index.js';
import '../../../apps/mobile/src/ui/text/index.js';
import '../../../apps/mobile/src/ui/textarea/index.js';
import '../../../apps/mobile/src/ui/toast/index.js';
import '../../../apps/mobile/src/ui/tooltip/index.js';
import '../../../apps/mobile/src/ui/vstack/index.js';
import 'react-native-reanimated';
import 'react-icons/fa';
import 'react-icons/ai';
import 'react-icons/io';
import '../../../packages/types/src/Components/Molecules/Form/FilePicker/types/filesTypes.js';
import 'yup';
import '../../../apps/mobile/src/Factory/DimensionsContext.js';
import 'i18next';
import 'react-i18next';
import '../../../apps/mobile/src/Core/AutoComplete/index.js';
import '../../../apps/mobile/src/Core/Dropdown/index.js';
import '../../../apps/mobile/src/Core/MultiSelect/index.js';
import '../../../apps/mobile/src/Core/Trees/components/CoreTree.js';
import '../../../apps/mobile/src/Core/Trees/components/CoreTreeSelect.js';
import '../../../apps/mobile/src/Core/Trees/components/CoreToolbar.js';
import '../../../apps/mobile/src/Core/Paginator/index.js';
import 'lucide-react-native';
import '../../../apps/mobile/src/Core/SelectButton/index.js';
import '../../../apps/mobile/src/Core/DataTable/DataTable.js';
import '../../../apps/mobile/src/Core/Tag/index.js';
import '../../../apps/mobile/src/Core/Badge/index.js';
import '../../../apps/mobile/src/Core/ProgressBar/index.js';
import '../../../apps/mobile/src/Core/Checkbox/index.js';
import '../../../apps/mobile/src/Core/RadioButton/index.js';
import Grid from '../../../layout/Grid/index.js';

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
    }
  }, []);
  return /* @__PURE__ */ jsx(KeyboardNavContext.Provider, { value: keyboardNavCtx, children: /* @__PURE__ */ jsx(
    Grid,
    {
      columns: 12,
      rowGap: 10,
      colSpan: 12,
      columnGap: 10,
      w: "full",
      m: 0,
      position: "relative",
      ...grid,
      children: elements.map((element) => {
        const FieldComponent = getElement(element.type);
        const elementId = `${parentPath}${element.id}`;
        const resolvedElement = elementId !== element.id ? { ...element, id: elementId } : element;
        if (!FieldComponent) {
          console.warn(`No component found for element type: "${resolvedElement.type}"`);
          return null;
        }
        const className = "col-span-" + (gridItemProps[elementId] ?? "12");
        return /* @__PURE__ */ jsx(GridItem, { _extra: {
          className
        }, children: /* @__PURE__ */ jsx(
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
