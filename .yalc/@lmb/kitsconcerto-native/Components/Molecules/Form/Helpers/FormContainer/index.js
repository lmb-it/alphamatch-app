import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { useMemo } from 'react';
import { View } from 'react-native';
import { uniqueId } from 'lodash';
import ErrorMessage from '../ErrorMessage/errormessage.js';
import Addons from '../Addons/index.js';
import '../../../../../apps/mobile/src/ui/accordion/index.js';
import '../../../../../apps/mobile/src/ui/actionsheet/index.js';
import '../../../../../apps/mobile/src/ui/alert/index.js';
import '../../../../../apps/mobile/src/ui/alert-dialog/index.js';
import '../../../../../apps/mobile/src/ui/avatar/index.js';
import '../../../../../apps/mobile/src/ui/badge/index.js';
import '../../../../../apps/mobile/src/ui/bottomsheet/index.js';
import '../../../../../apps/mobile/src/ui/box/index.js';
import '../../../../../apps/mobile/src/ui/button/index.js';
import '../../../../../apps/mobile/src/ui/card/index.js';
import '../../../../../apps/mobile/src/ui/center/index.js';
import '../../../../../apps/mobile/src/ui/checkbox/index.js';
import '../../../../../apps/mobile/src/ui/divider/index.js';
import '../../../../../apps/mobile/src/ui/drawer/index.js';
import '../../../../../apps/mobile/src/ui/fab/index.js';
import { FormControl, FormControlHelper, FormControlHelperText } from '../../../../../apps/mobile/src/ui/form-control/index.js';
import '../../../../../apps/mobile/src/ui/gluestack-ui-provider/config.js';
import '@gluestack-ui/core/overlay/creator';
import '@gluestack-ui/core/toast/creator';
import 'nativewind';
import '../../../../../apps/mobile/src/ui/grid/index.js';
import '../../../../../apps/mobile/src/ui/heading/index.js';
import '../../../../../apps/mobile/src/ui/hstack/index.js';
import '../../../../../apps/mobile/src/ui/icon/index.js';
import '../../../../../apps/mobile/src/ui/image/index.js';
import '../../../../../apps/mobile/src/ui/image-background/index.js';
import '../../../../../apps/mobile/src/ui/input/index.js';
import '../../../../../apps/mobile/src/ui/link/index.js';
import '../../../../../apps/mobile/src/ui/menu/index.js';
import '../../../../../apps/mobile/src/ui/modal/index.js';
import '../../../../../apps/mobile/src/ui/popover/index.js';
import '../../../../../apps/mobile/src/ui/portal/index.js';
import '../../../../../apps/mobile/src/ui/pressable/index.js';
import '../../../../../apps/mobile/src/ui/progress/index.js';
import '../../../../../apps/mobile/src/ui/radio/index.js';
import 'react-native-safe-area-context';
import '../../../../../apps/mobile/src/ui/select/index.js';
import '../../../../../apps/mobile/src/ui/skeleton/index.js';
import '../../../../../apps/mobile/src/ui/slider/index.js';
import '../../../../../apps/mobile/src/ui/spinner/index.js';
import '../../../../../apps/mobile/src/ui/switch/index.js';
import '../../../../../apps/mobile/src/ui/table/index.js';
import '../../../../../apps/mobile/src/ui/text/index.js';
import '../../../../../apps/mobile/src/ui/textarea/index.js';
import '../../../../../apps/mobile/src/ui/toast/index.js';
import '../../../../../apps/mobile/src/ui/tooltip/index.js';
import '../../../../../apps/mobile/src/ui/vstack/index.js';
import 'react-native-reanimated';
import { style } from '../../../../../apps/mobile/src/Factory/helpers/style.js';
import '../../../../../apps/mobile/src/Factory/DimensionsContext.js';
import 'react-icons/fa';
import 'react-icons/ai';
import 'react-icons/io';
import '../../../../../packages/types/src/Components/Molecules/Form/FilePicker/types/filesTypes.js';
import 'yup';
import '../../../../../packages/types/src/Css/map/index.js';
import 'i18next';
import 'react-i18next';
import '../../../../../apps/mobile/src/Core/AutoComplete/index.js';
import '../../../../../apps/mobile/src/Core/Dropdown/index.js';
import '../../../../../apps/mobile/src/Core/MultiSelect/index.js';
import '../../../../../apps/mobile/src/Core/Trees/components/CoreTree.js';
import '../../../../../apps/mobile/src/Core/Trees/components/CoreTreeSelect.js';
import '../../../../../apps/mobile/src/Core/Trees/components/CoreToolbar.js';
import '../../../../../apps/mobile/src/Core/Paginator/index.js';
import 'lucide-react-native';
import '../../../../../apps/mobile/src/Core/SelectButton/index.js';
import '../../../../../apps/mobile/src/Core/DataTable/DataTable.js';
import '../../../../../apps/mobile/src/Core/Tag/index.js';
import '../../../../../apps/mobile/src/Core/Badge/index.js';
import '../../../../../apps/mobile/src/Core/ProgressBar/index.js';
import '../../../../../apps/mobile/src/Core/Checkbox/index.js';
import '../../../../../apps/mobile/src/Core/RadioButton/index.js';
import 'axios';
import '../../../UI/Flex/index.js';
import '../../../../../Contexts/DialogContext.js';
import useComponentDefaults from '../../../../../Hooks/useComponentDefaults.js';
import 'primereact/tooltip';
import 'primereact/skeleton';
import '../../KitsSelect/SelectContext.js';
import Label from '../Label/label.js';

const KitsContainer = (rawProps) => {
  const { mergedProps: props, themeStyle } = useComponentDefaults("FormContainer", rawProps);
  const {
    id,
    helperText,
    className,
    children,
    rightAddon,
    leftAddon,
    errors,
    invalid,
    required,
    hideError,
    additionalClassName,
    label,
    isFloatedLabel,
    containerStyle,
    disabled
  } = props;
  const elementId = id ? `${id}_element` : uniqueId("element_");
  const placement = useMemo(() => {
    if (label && typeof label === "object" && "placement" in label) {
      return label.placement;
    }
    return "T";
  }, [label]);
  const isHorizontal = placement === "RL";
  const isBottom = placement === "B";
  const labelElement = !isFloatedLabel ? /* @__PURE__ */ jsx(Label, { isFormControl: true, label, elementId, required }) : null;
  const contentElement = /* @__PURE__ */ jsx(Addons, { additionalClassName, leftAddon, rightAddon, invalid, children });
  const themeRnStyle = useMemo(
    () => themeStyle && Object.keys(themeStyle).length ? style(themeStyle) : {},
    [themeStyle]
  );
  const containerRnStyle = useMemo(
    () => containerStyle && Object.keys(containerStyle).length ? style(containerStyle) : {},
    [containerStyle]
  );
  return /* @__PURE__ */ jsxs(
    FormControl,
    {
      isInvalid: invalid,
      size: "md",
      isDisabled: disabled,
      isReadOnly: disabled,
      isRequired: required,
      style: { width: "100%", gap: 4, ...themeRnStyle, ...containerRnStyle },
      children: [
        isHorizontal ? /* @__PURE__ */ jsxs(View, { style: { flexDirection: "row", alignItems: "center", gap: 8, width: "100%" }, children: [
          labelElement,
          /* @__PURE__ */ jsx(View, { style: { flex: 1 }, children: contentElement })
        ] }) : isBottom ? /* @__PURE__ */ jsxs(Fragment, { children: [
          contentElement,
          labelElement
        ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
          labelElement,
          contentElement
        ] }),
        helperText && typeof helperText !== "function" && /* @__PURE__ */ jsx(FormControlHelper, { children: /* @__PURE__ */ jsx(FormControlHelperText, { children: helperText }) }),
        !hideError && /* @__PURE__ */ jsx(ErrorMessage, { invalid, errors })
      ]
    }
  );
};

export { KitsContainer as default };
//# sourceMappingURL=index.js.map
