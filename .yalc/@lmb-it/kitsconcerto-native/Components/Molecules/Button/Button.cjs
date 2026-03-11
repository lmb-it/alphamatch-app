'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
require('../../../apps/mobile/src/ui/accordion/index.cjs');
require('../../../apps/mobile/src/ui/actionsheet/index.cjs');
require('../../../apps/mobile/src/ui/alert/index.cjs');
require('../../../apps/mobile/src/ui/alert-dialog/index.cjs');
require('../../../apps/mobile/src/ui/avatar/index.cjs');
require('../../../apps/mobile/src/ui/badge/index.cjs');
require('../../../apps/mobile/src/ui/bottomsheet/index.cjs');
require('../../../apps/mobile/src/ui/box/index.cjs');
var index = require('../../../apps/mobile/src/ui/button/index.cjs');
require('../../../apps/mobile/src/ui/card/index.cjs');
require('../../../apps/mobile/src/ui/center/index.cjs');
require('../../../apps/mobile/src/ui/checkbox/index.cjs');
require('../../../apps/mobile/src/ui/divider/index.cjs');
require('../../../apps/mobile/src/ui/drawer/index.cjs');
require('../../../apps/mobile/src/ui/fab/index.cjs');
require('react-native');
require('../../../apps/mobile/src/ui/form-control/index.cjs');
var React = require('react');
require('../../../apps/mobile/src/ui/gluestack-ui-provider/config.cjs');
require('@gluestack-ui/core/overlay/creator');
require('@gluestack-ui/core/toast/creator');
require('nativewind');
require('../../../apps/mobile/src/ui/grid/index.cjs');
require('../../../apps/mobile/src/ui/heading/index.cjs');
require('../../../apps/mobile/src/ui/hstack/index.cjs');
require('../../../apps/mobile/src/ui/icon/index.cjs');
require('../../../apps/mobile/src/ui/image/index.cjs');
require('../../../apps/mobile/src/ui/image-background/index.cjs');
require('../../../apps/mobile/src/ui/input/index.cjs');
require('../../../apps/mobile/src/ui/link/index.cjs');
require('../../../apps/mobile/src/ui/menu/index.cjs');
require('../../../apps/mobile/src/ui/modal/index.cjs');
require('../../../apps/mobile/src/ui/popover/index.cjs');
require('../../../apps/mobile/src/ui/portal/index.cjs');
require('../../../apps/mobile/src/ui/pressable/index.cjs');
require('../../../apps/mobile/src/ui/progress/index.cjs');
require('../../../apps/mobile/src/ui/radio/index.cjs');
require('react-native-safe-area-context');
require('../../../apps/mobile/src/ui/select/index.cjs');
require('../../../apps/mobile/src/ui/skeleton/index.cjs');
require('../../../apps/mobile/src/ui/slider/index.cjs');
require('../../../apps/mobile/src/ui/spinner/index.cjs');
require('../../../apps/mobile/src/ui/switch/index.cjs');
require('../../../apps/mobile/src/ui/table/index.cjs');
require('../../../apps/mobile/src/ui/text/index.cjs');
require('../../../apps/mobile/src/ui/textarea/index.cjs');
require('../../../apps/mobile/src/ui/toast/index.cjs');
require('../../../apps/mobile/src/ui/tooltip/index.cjs');
require('../../../apps/mobile/src/ui/vstack/index.cjs');
var ResponsiveElement = require('../../../apps/mobile/src/Factory/ResponsiveElement.cjs');
var style = require('../../../apps/mobile/src/Factory/helpers/style.cjs');
var useSeparator = require('../../../apps/mobile/src/Factory/useSeparator.cjs');
require('../../../apps/mobile/src/Factory/DimensionsContext.cjs');
require('i18next');
require('react-i18next');
require('../../../apps/mobile/src/Core/AutoComplete/index.cjs');
require('../../../apps/mobile/src/Core/Dropdown/index.cjs');
require('../../../apps/mobile/src/Core/MultiSelect/index.cjs');
require('../../../apps/mobile/src/Core/Trees/components/CoreTree.cjs');
require('../../../apps/mobile/src/Core/Trees/components/CoreTreeSelect.cjs');
require('../../../apps/mobile/src/Core/Trees/components/CoreToolbar.cjs');
require('../../../apps/mobile/src/Core/Paginator/index.cjs');
require('lucide-react-native');
require('../../../apps/mobile/src/Core/SelectButton/index.cjs');
require('../../../apps/mobile/src/Core/DataTable/DataTable.cjs');
require('../../../apps/mobile/src/Core/Tag/index.cjs');
require('../../../apps/mobile/src/Core/Badge/index.cjs');
require('../../../apps/mobile/src/Core/ProgressBar/index.cjs');
require('../../../apps/mobile/src/Core/Checkbox/index.cjs');
require('../../../apps/mobile/src/Core/RadioButton/index.cjs');
var useButton = require('./useButton.cjs');
var index_native = require('../../../Assets/Icons/index.cjs');
var locale = require('../../../Hooks/locale.cjs');
require('../../../Contexts/DialogContext.cjs');
var useComponentDefaults = require('../../../Hooks/useComponentDefaults.cjs');
var useSeverityColors = require('../../../Hooks/useSeverityColors.cjs');
require('../../../Hooks/useKeyboardNavigation.cjs');

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
  if (React.isValidElement(icon)) return icon;
  if (typeof icon === "function") return icon;
  if (typeof icon === "string") {
    const piMatches = icon.match(/pi-([a-z-]+)/g);
    const iconName = piMatches ? piMatches[piMatches.length - 1].replace("pi-", "") : icon;
    return index_native.IconMap[iconName];
  }
  return void 0;
}
function Button(rawProps) {
  const { mergedProps: props, themeStyle } = useComponentDefaults.default("Button", rawProps);
  const { children, label, isLoadingText, severity = "primary", size = "md", loading, outlined, icon, iconPos = "left" } = props;
  const { handlers, isDisabled, _nativeProps } = useButton.useButton(props);
  const { cssProps, nativeProps } = useSeparator.default(_nativeProps);
  const { t } = locale.useLanguage();
  const brandColors = useSeverityColors.useSeverityColors(severity ?? "secondary");
  const isBrand = severity === "brand";
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
  const mergedCssProps = { ...themeStyle, ...cssProps };
  const computedStyles = style.style(mergedCssProps);
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
  const brandButtonStyle = {};
  if (isBrand) {
    if (outlined) {
      brandButtonStyle.borderColor = brandColors.solid;
      brandButtonStyle.backgroundColor = "transparent";
      textStyles.color = brandColors.solid;
    } else {
      brandButtonStyle.backgroundColor = brandColors.solid;
      brandButtonStyle.borderColor = brandColors.solid;
      textStyles.color = "#FFFFFF";
    }
  }
  const gluestackStyle = {
    ...borderRadiusStyles,
    ...brandButtonStyle,
    width: "100%",
    height: "100%"
  };
  return /* @__PURE__ */ jsxRuntime.jsx(
    ResponsiveElement.default,
    {
      as: "Box",
      additionalStyles: { alignSelf: "flex-start", overflow: "hidden" },
      cssProps: mergedCssProps,
      nativeProps: {},
      children: /* @__PURE__ */ jsxRuntime.jsxs(
        index.Button,
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
          style: Object.keys(gluestackStyle).length ? gluestackStyle : void 0,
          children: [
            React.isValidElement(resolvedIcon) && iconPos === "left" && resolvedIcon,
            resolvedIcon && !React.isValidElement(resolvedIcon) && iconPos === "left" && /* @__PURE__ */ jsxRuntime.jsx(index.ButtonIcon, { as: resolvedIcon, size: iconSizesMap[size] }),
            loading && /* @__PURE__ */ jsxRuntime.jsx(index.ButtonSpinner, { color: isBrand ? "#FFFFFF" : "gray" }),
            (children || label) && /* @__PURE__ */ jsxRuntime.jsx(index.ButtonText, { style: Object.keys(textStyles).length ? textStyles : void 0, children: resolvedLabel }),
            React.isValidElement(resolvedIcon) && iconPos === "right" && resolvedIcon,
            resolvedIcon && !React.isValidElement(resolvedIcon) && iconPos === "right" && /* @__PURE__ */ jsxRuntime.jsx(index.ButtonIcon, { as: resolvedIcon, size: iconSizesMap[size] })
          ]
        }
      )
    }
  );
}

exports.Button = Button;
exports.default = Button;
//# sourceMappingURL=Button.cjs.map
