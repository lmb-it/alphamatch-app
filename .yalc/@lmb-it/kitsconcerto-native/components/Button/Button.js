import { jsx, jsxs } from 'react/jsx-runtime';
import '../../apps/mobile/src/ui/accordion/index.js';
import '../../apps/mobile/src/ui/actionsheet/index.js';
import '../../apps/mobile/src/ui/alert/index.js';
import '../../apps/mobile/src/ui/alert-dialog/index.js';
import '../../apps/mobile/src/ui/avatar/index.js';
import '../../apps/mobile/src/ui/badge/index.js';
import '../../apps/mobile/src/ui/bottomsheet/index.js';
import '../../apps/mobile/src/ui/box/index.js';
import { Button as Button$1, ButtonIcon, ButtonSpinner, ButtonText } from '../../apps/mobile/src/ui/button/index.js';
import '../../apps/mobile/src/ui/card/index.js';
import '../../apps/mobile/src/ui/center/index.js';
import '../../apps/mobile/src/ui/checkbox/index.js';
import '../../apps/mobile/src/ui/divider/index.js';
import '../../apps/mobile/src/ui/drawer/index.js';
import '../../apps/mobile/src/ui/fab/index.js';
import 'react-native';
import '../../apps/mobile/src/ui/form-control/index.js';
import { isValidElement } from 'react';
import '../../apps/mobile/src/ui/gluestack-ui-provider/config.js';
import '@gluestack-ui/core/overlay/creator';
import '@gluestack-ui/core/toast/creator';
import 'nativewind';
import '../../apps/mobile/src/ui/grid/index.js';
import '../../apps/mobile/src/ui/heading/index.js';
import '../../apps/mobile/src/ui/hstack/index.js';
import '../../apps/mobile/src/ui/icon/index.js';
import '../../apps/mobile/src/ui/image/index.js';
import '../../apps/mobile/src/ui/image-background/index.js';
import '../../apps/mobile/src/ui/input/index.js';
import '../../apps/mobile/src/ui/link/index.js';
import '../../apps/mobile/src/ui/menu/index.js';
import '../../apps/mobile/src/ui/modal/index.js';
import '../../apps/mobile/src/ui/popover/index.js';
import '../../apps/mobile/src/ui/portal/index.js';
import '../../apps/mobile/src/ui/pressable/index.js';
import '../../apps/mobile/src/ui/progress/index.js';
import '../../apps/mobile/src/ui/radio/index.js';
import 'react-native-safe-area-context';
import '../../apps/mobile/src/ui/select/index.js';
import '../../apps/mobile/src/ui/skeleton/index.js';
import '../../apps/mobile/src/ui/slider/index.js';
import '../../apps/mobile/src/ui/spinner/index.js';
import '../../apps/mobile/src/ui/switch/index.js';
import '../../apps/mobile/src/ui/table/index.js';
import '../../apps/mobile/src/ui/text/index.js';
import '../../apps/mobile/src/ui/textarea/index.js';
import '../../apps/mobile/src/ui/toast/index.js';
import '../../apps/mobile/src/ui/tooltip/index.js';
import '../../apps/mobile/src/ui/vstack/index.js';
import ResponsiveElement from '../../apps/mobile/src/Factory/ResponsiveElement.js';
import { style } from '../../apps/mobile/src/Factory/helpers/style.js';
import useSeparator from '../../apps/mobile/src/Factory/useSeparator.js';
import '../../apps/mobile/src/Factory/DimensionsContext.js';
import 'i18next';
import 'react-i18next';
import '../../apps/mobile/src/Core/AutoComplete/index.js';
import '../../apps/mobile/src/Core/Dropdown/index.js';
import '../../apps/mobile/src/Core/MultiSelect/index.js';
import '../../apps/mobile/src/Core/Trees/components/CoreTree.js';
import '../../apps/mobile/src/Core/Trees/components/CoreTreeSelect.js';
import '../../apps/mobile/src/Core/Trees/components/CoreToolbar.js';
import '../../apps/mobile/src/Core/Paginator/index.js';
import 'lucide-react-native';
import '../../apps/mobile/src/Core/SelectButton/index.js';
import '../../apps/mobile/src/Core/DataTable/DataTable.js';
import '../../apps/mobile/src/Core/Tag/index.js';
import '../../apps/mobile/src/Core/Badge/index.js';
import '../../apps/mobile/src/Core/ProgressBar/index.js';
import '../../apps/mobile/src/Core/Checkbox/index.js';
import '../../apps/mobile/src/Core/RadioButton/index.js';
import { useButton } from './useButton.js';
import { IconMap } from '../../assets/Icons/index.js';
import { useLanguage } from '../../hooks/locale.js';
import '../../contexts/DialogContext.js';
import useComponentDefaults from '../../hooks/useComponentDefaults.js';
import { useSeverityColors } from '../../hooks/useSeverityColors.js';

const TEXT_STYLE_KEYS = /* @__PURE__ */ new Set([
  "color",
  "fontSize",
  "fontFamily",
  "fontWeight",
  "letterSpacing",
  "lineHeight",
  "textAlign",
  "textTransform",
  "fontStyle",
  "textDecorationLine"
]);
function resolveIcon(icon) {
  if (!icon) return void 0;
  if (isValidElement(icon)) return icon;
  if (typeof icon === "function") return icon;
  if (typeof icon === "string") {
    const piMatches = icon.match(/pi-([a-z-]+)/g);
    const iconName = piMatches ? piMatches[piMatches.length - 1].replace("pi-", "") : icon;
    return IconMap[iconName];
  }
  return void 0;
}
function Button(rawProps) {
  const { mergedProps: props, themeStyle, elementStyles } = useComponentDefaults("Button", rawProps);
  const { children, label, isLoadingText, severity = "brand", size = "md", loading, outlined, icon, iconPos = "left" } = props;
  const { handlers, isDisabled, _nativeProps } = useButton(props);
  const { cssProps, nativeProps } = useSeparator(_nativeProps);
  const { t } = useLanguage();
  const sevColors = useSeverityColors(severity ?? "secondary");
  const gluestackVariant = outlined ? "outline" : "solid";
  const SEVERITY_TO_ACTION = {
    primary: "primary",
    danger: "negative",
    success: "positive",
    secondary: "secondary",
    info: "primary",
    warning: "negative",
    help: "secondary",
    brand: "primary"
  };
  const action = SEVERITY_TO_ACTION[severity] ?? "primary";
  const resolvedIcon = resolveIcon(icon);
  const resolvedLabel = typeof children === "string" ? children : loading && isLoadingText ? isLoadingText : t(label ?? "");
  const iconSizesMap = {
    "2xs": "2xs",
    "xs": "xs",
    "sm": "md",
    "md": "md",
    "lg": "lg",
    "xl": "lg"
  };
  const mergedCssProps = { ...themeStyle, ...elementStyles.root || {}, ...cssProps };
  const computedStyles = style(mergedCssProps);
  const textStyles = Object.fromEntries(
    Object.entries(computedStyles).filter(([k]) => TEXT_STYLE_KEYS.has(k))
  );
  const BORDER_RADIUS_KEYS = /* @__PURE__ */ new Set([
    "borderRadius",
    "borderTopLeftRadius",
    "borderTopRightRadius",
    "borderBottomLeftRadius",
    "borderBottomRightRadius"
  ]);
  const borderRadiusStyles = Object.fromEntries(
    Object.entries(computedStyles).filter(([k]) => BORDER_RADIUS_KEYS.has(k))
  );
  const severityButtonStyle = { ...borderRadiusStyles };
  if (outlined) {
    severityButtonStyle.borderColor = sevColors.solid;
    severityButtonStyle.backgroundColor = "transparent";
    textStyles.color = sevColors.solid;
  } else {
    severityButtonStyle.backgroundColor = sevColors.solid;
    severityButtonStyle.borderColor = sevColors.border || sevColors.solid;
    textStyles.color = sevColors.solidText;
  }
  severityButtonStyle.justifyContent = "center";
  severityButtonStyle.alignItems = "center";
  severityButtonStyle.flexDirection = "row";
  const spinnerColor = outlined ? sevColors.solid : sevColors.solidText;
  return /* @__PURE__ */ jsx(
    ResponsiveElement,
    {
      as: "Box",
      additionalStyles: { alignSelf: "flex-start", overflow: "hidden" },
      cssProps: mergedCssProps,
      nativeProps: {},
      children: /* @__PURE__ */ jsxs(
        Button$1,
        {
          variant: gluestackVariant,
          action,
          size,
          isDisabled: isDisabled || loading,
          onPress: handlers.onClick,
          onPressIn: handlers.onPressIn,
          onPressOut: handlers.onPressOut,
          testID: props.testID,
          ...nativeProps,
          style: Object.keys(severityButtonStyle).length ? severityButtonStyle : void 0,
          children: [
            isValidElement(resolvedIcon) && iconPos === "left" && resolvedIcon,
            resolvedIcon && !isValidElement(resolvedIcon) && iconPos === "left" && /* @__PURE__ */ jsx(ButtonIcon, { as: resolvedIcon, size: iconSizesMap[size] }),
            loading && /* @__PURE__ */ jsx(ButtonSpinner, { color: spinnerColor }),
            (children || label) && /* @__PURE__ */ jsx(ButtonText, { style: Object.keys(textStyles).length ? textStyles : void 0, children: resolvedLabel }),
            isValidElement(resolvedIcon) && iconPos === "right" && resolvedIcon,
            resolvedIcon && !isValidElement(resolvedIcon) && iconPos === "right" && /* @__PURE__ */ jsx(ButtonIcon, { as: resolvedIcon, size: iconSizesMap[size] })
          ]
        }
      )
    }
  );
}

export { Button, Button as default };
//# sourceMappingURL=Button.js.map
