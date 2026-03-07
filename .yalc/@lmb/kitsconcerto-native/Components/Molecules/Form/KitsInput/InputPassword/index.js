import { jsxs, jsx } from 'react/jsx-runtime';
import { useState } from 'react';
import KitsContainer from '../../Helpers/FormContainer/index.js';
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
import 'react-native';
import '../../../../../apps/mobile/src/ui/form-control/index.js';
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
import { Input, InputField, InputSlot } from '../../../../../apps/mobile/src/ui/input/index.js';
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
import 'react-icons/fa';
import 'react-icons/ai';
import 'react-icons/io';
import '../../../../../packages/types/src/Components/Molecules/Form/FilePicker/types/filesTypes.js';
import 'yup';
import '../../../../../packages/types/src/Css/map/index.js';
import useSeparator from '../../../../../apps/mobile/src/Factory/useSeparator.js';
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
import Addons from '../../Helpers/Addons/index.js';
import { useFormInputController } from '../../Helpers/useFormInputController/useFormInputController.js';
import Auth0PasswordStrength from './Strengthen.js';
import 'axios';
import '../../../../../Contexts/DialogContext.js';
import '../../KitsSelect/SelectContext.js';
import '../../../UI/Flex/index.js';
import Text from '../../../UI/Text/index.js';
import 'primereact/tooltip';
import 'primereact/skeleton';

const KitsInputPassword = ({ ref, ...props }) => {
  const {
    id,
    label,
    helperText,
    errors,
    invalid,
    required,
    hideError,
    leftAddon,
    rightAddon,
    isFloatedLabel,
    disabled,
    promptLabel,
    weakLabel,
    mediumLabel,
    strongLabel,
    header,
    footer,
    feedback,
    toggleEye,
    showStrengthProgress,
    value,
    defaultValue,
    onChange,
    schema,
    inputSize,
    ...rest
  } = props;
  useSeparator(rest);
  const { value: internal, emitChange } = useFormInputController({
    value,
    defaultValue,
    onChange
  });
  const [secure, setSecure] = useState(true);
  const toggleSecure = () => setSecure(!secure);
  return /* @__PURE__ */ jsxs(
    KitsContainer,
    {
      id,
      helperText,
      isFloatedLabel,
      rightAddon,
      leftAddon,
      hideError,
      required,
      errors,
      invalid,
      label,
      disabled,
      inputSize,
      children: [
        /* @__PURE__ */ jsxs(
          Input,
          {
            ...rest,
            isDisabled: !!disabled,
            isInvalid: !!invalid,
            style: { width: "100%" },
            children: [
              /* @__PURE__ */ jsx(Addons, { leftAddon, rightAddon, children: /* @__PURE__ */ jsx(
                InputField,
                {
                  ref,
                  value: internal ?? "",
                  onChangeText: (txt) => emitChange(txt),
                  secureTextEntry: secure,
                  editable: !disabled,
                  placeholder: promptLabel
                }
              ) }),
              toggleEye && /* @__PURE__ */ jsx(InputSlot, { onPress: toggleSecure, children: /* @__PURE__ */ jsx(Text, { children: secure ? "Show" : "Hide" }) })
            ]
          }
        ),
        showStrengthProgress && schema && /* @__PURE__ */ jsx(
          Auth0PasswordStrength,
          {
            value: internal ?? "",
            show: false,
            schema
          }
        )
      ]
    }
  );
};

export { KitsInputPassword as default };
//# sourceMappingURL=index.js.map
