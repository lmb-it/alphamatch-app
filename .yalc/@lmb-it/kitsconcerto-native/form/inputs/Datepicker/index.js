import { jsx, jsxs } from 'react/jsx-runtime';
import DateTimePicker from '@react-native-community/datetimepicker';
import KitsContainer from '../../helpers/FormContainer/index.js';
import { useFormInputController } from '../../helpers/useFormInputController/useFormInputController.js';
import Addons from '../../helpers/Addons/index.js';
import 'react';
import '../../../contexts/DialogContext.js';
import useComponentDefaults from '../../../hooks/useComponentDefaults.js';
import useResolvedStyle from '../../../hooks/useResolvedStyle.js';
import { useKitsTheme } from '../../../contexts/Theme/KitsThemeProvider.js';
import Flex from '../../../layout/Flex/index.js';
import Text from '../../../primitives/Text/index.js';

const KitsInputCalendar = ({ ref, ...rawProps }) => {
  const { mergedProps: props, themeStyle, elementStyles } = useComponentDefaults("Datepicker", rawProps, "Input");
  const resolvedThemeStyle = useResolvedStyle(themeStyle);
  const resolvedRootStyle = useResolvedStyle(elementStyles?.root || {});
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
    ...resolvedThemeStyle,
    ...resolvedRootStyle || {}
  };
  const val = internalVal instanceof Date ? internalVal : null;
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
      elementStyles,
      children: /* @__PURE__ */ jsx(Flex, { ...containerStyle, children: /* @__PURE__ */ jsx(Addons, { leftAddon, rightAddon, invalid: !!invalid, children: /* @__PURE__ */ jsxs(Flex, { alignItems: "center", w: "full", backgroundColor: resolveToken("text-secondary"), children: [
        /* @__PURE__ */ jsx(
          DateTimePicker,
          {
            value: val ?? /* @__PURE__ */ new Date(),
            onChange: onSelectDate,
            mode: "date",
            display: "default",
            disabled,
            ...localProps
          }
        ),
        /* @__PURE__ */ jsx(Flex, { alignItems: "center", w: "full", h: "full", paddingHorizontal: 10, backgroundColor: containerStyle.backgroundColor ?? resolveToken("surface-card"), pointerEvents: "none", position: "absolute", top: 0, children: /* @__PURE__ */ jsx(Text, { children: val ? val.toLocaleDateString() : "" }) })
      ] }) }) })
    }
  );
};

export { KitsInputCalendar as default };
//# sourceMappingURL=index.js.map
