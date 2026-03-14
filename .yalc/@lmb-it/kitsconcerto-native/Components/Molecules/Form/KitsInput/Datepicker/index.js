import { jsx, jsxs } from 'react/jsx-runtime';
import DateTimePicker from '@react-native-community/datetimepicker';
import KitsContainer from '../../Helpers/FormContainer/index.js';
import { useFormInputController } from '../../Helpers/useFormInputController/useFormInputController.js';
import Addons from '../../Helpers/Addons/index.js';
import 'react';
import 'axios';
import '../../../../../Contexts/DialogContext.js';
import useComponentDefaults from '../../../../../Hooks/useComponentDefaults.js';
import '../../../../../Hooks/useKeyboardNavigation.js';
import '../../KitsSelect/SelectContext.js';
import Flex from '../../../UI/Flex/index.js';
import Text from '../../../UI/Text/index.js';
import 'primereact/tooltip';
import 'primereact/skeleton';
import { useKitsTheme } from '../../../../../Contexts/Theme/KitsThemeProvider.js';

const KitsInputCalendar = ({ ref, ...rawProps }) => {
  const { mergedProps: props, themeStyle } = useComponentDefaults("Datepicker", rawProps, "Input");
  const { resolveToken } = useKitsTheme();
  const {
    id,
    label,
    helperText,
    errors,
    invalid,
    required,
    hideError,
    disabled,
    isFloatedLabel,
    leftAddon,
    rightAddon,
    inputSize,
    value,
    defaultValue,
    onChange,
    localProps = {}
  } = props;
  const { value: internalVal, emitChange } = useFormInputController({
    value,
    defaultValue,
    onChange: (event) => {
      onChange?.(event.target.value);
    }
  });
  const onSelectDate = (_event, date) => {
    if (date) emitChange(date);
  };
  const containerStyle = {
    height: 35,
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    overflow: "hidden",
    borderRadius: 3.5,
    borderWidth: 1,
    borderColor: invalid ? resolveToken("danger") : resolveToken("border"),
    width: "100%",
    ...themeStyle
  };
  const val = internalVal instanceof Date ? internalVal : /* @__PURE__ */ new Date();
  return /* @__PURE__ */ jsx(
    KitsContainer,
    {
      id,
      helperText,
      errors,
      invalid,
      label,
      required,
      hideError,
      isFloatedLabel,
      disabled,
      children: /* @__PURE__ */ jsx(Flex, { ...containerStyle, children: /* @__PURE__ */ jsx(Addons, { leftAddon, rightAddon, invalid: !!invalid, children: /* @__PURE__ */ jsxs(Flex, { alignItems: "center", w: "full", backgroundColor: resolveToken("text-secondary"), children: [
        /* @__PURE__ */ jsx(
          DateTimePicker,
          {
            value: val,
            onChange: onSelectDate,
            mode: "date",
            display: "default",
            disabled,
            ...localProps
          }
        ),
        /* @__PURE__ */ jsx(Flex, { alignItems: "center", w: "full", h: "full", paddingHorizontal: 10, backgroundColor: containerStyle.backgroundColor ?? resolveToken("surface-card"), pointerEvents: "none", position: "absolute", top: 0, children: /* @__PURE__ */ jsx(Text, { children: val.toLocaleDateString() }) })
      ] }) }) })
    }
  );
};

export { KitsInputCalendar as default };
//# sourceMappingURL=index.js.map
