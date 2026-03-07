import { jsx, jsxs } from 'react/jsx-runtime';
import DateTimePicker from '@react-native-community/datetimepicker';
import KitsContainer from '../../Helpers/FormContainer/index.js';
import { useFormInputController } from '../../Helpers/useFormInputController/useFormInputController.js';
import Addons from '../../Helpers/Addons/index.js';
import 'react';
import 'axios';
import '../../../../../Contexts/DialogContext.js';
import '../../KitsSelect/SelectContext.js';
import Flex from '../../../UI/Flex/index.js';
import Text from '../../../UI/Text/index.js';
import 'primereact/tooltip';
import 'primereact/skeleton';

const KitsInputCalendar = ({ ref, ...props }) => {
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
    borderColor: invalid ? "#e24c4c" : "rgba(213, 212, 212, 1)",
    width: "100%"
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
      children: /* @__PURE__ */ jsx(Flex, { ...containerStyle, children: /* @__PURE__ */ jsx(Addons, { leftAddon, rightAddon, children: /* @__PURE__ */ jsxs(Flex, { alignItems: "center", w: "full", backgroundColor: "#8d8d8d", children: [
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
        /* @__PURE__ */ jsx(Flex, { alignItems: "center", w: "full", h: "full", paddingHorizontal: 10, backgroundColor: "white", pointerEvents: "none", position: "absolute", top: 0, children: /* @__PURE__ */ jsx(Text, { children: val.toLocaleDateString() }) })
      ] }) }) })
    }
  );
};

export { KitsInputCalendar as default };
//# sourceMappingURL=index.js.map
