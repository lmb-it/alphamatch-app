'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');
var reactNative = require('react-native');
require('../../apps/mobile/src/ui/accordion/index.cjs');
require('../../apps/mobile/src/ui/actionsheet/index.cjs');
require('../../apps/mobile/src/ui/alert/index.cjs');
require('../../apps/mobile/src/ui/alert-dialog/index.cjs');
require('../../apps/mobile/src/ui/avatar/index.cjs');
require('../../apps/mobile/src/ui/badge/index.cjs');
require('../../apps/mobile/src/ui/bottomsheet/index.cjs');
require('../../apps/mobile/src/ui/box/index.cjs');
require('../../apps/mobile/src/ui/button/index.cjs');
require('../../apps/mobile/src/ui/card/index.cjs');
require('../../apps/mobile/src/ui/center/index.cjs');
require('../../apps/mobile/src/ui/checkbox/index.cjs');
require('../../apps/mobile/src/ui/divider/index.cjs');
require('../../apps/mobile/src/ui/drawer/index.cjs');
require('../../apps/mobile/src/ui/fab/index.cjs');
require('../../apps/mobile/src/ui/form-control/index.cjs');
require('../../apps/mobile/src/ui/gluestack-ui-provider/config.cjs');
require('@gluestack-ui/core/overlay/creator');
require('@gluestack-ui/core/toast/creator');
require('nativewind');
require('../../apps/mobile/src/ui/grid/index.cjs');
require('../../apps/mobile/src/ui/heading/index.cjs');
require('../../apps/mobile/src/ui/hstack/index.cjs');
require('../../apps/mobile/src/ui/icon/index.cjs');
require('../../apps/mobile/src/ui/image/index.cjs');
require('../../apps/mobile/src/ui/image-background/index.cjs');
require('../../apps/mobile/src/ui/input/index.cjs');
require('../../apps/mobile/src/ui/link/index.cjs');
require('../../apps/mobile/src/ui/menu/index.cjs');
require('../../apps/mobile/src/ui/modal/index.cjs');
require('../../apps/mobile/src/ui/popover/index.cjs');
require('../../apps/mobile/src/ui/portal/index.cjs');
require('../../apps/mobile/src/ui/pressable/index.cjs');
require('../../apps/mobile/src/ui/progress/index.cjs');
require('../../apps/mobile/src/ui/radio/index.cjs');
require('react-native-safe-area-context');
require('../../apps/mobile/src/ui/select/index.cjs');
require('../../apps/mobile/src/ui/skeleton/index.cjs');
require('../../apps/mobile/src/ui/slider/index.cjs');
require('../../apps/mobile/src/ui/spinner/index.cjs');
require('../../apps/mobile/src/ui/switch/index.cjs');
require('../../apps/mobile/src/ui/table/index.cjs');
require('../../apps/mobile/src/ui/text/index.cjs');
require('../../apps/mobile/src/ui/textarea/index.cjs');
require('../../apps/mobile/src/ui/toast/index.cjs');
require('../../apps/mobile/src/ui/tooltip/index.cjs');
require('../../apps/mobile/src/ui/vstack/index.cjs');
var ResponsiveElement = require('../../apps/mobile/src/Factory/ResponsiveElement.cjs');
require('react-icons/fa');
require('react-icons/ai');
require('react-icons/io');
require('../../packages/types/src/Components/Molecules/Form/FilePicker/types/filesTypes.cjs');
require('yup');
var useSeparator = require('../../apps/mobile/src/Factory/useSeparator.cjs');
require('../../apps/mobile/src/Factory/DimensionsContext.cjs');
require('i18next');
require('react-i18next');
require('../../apps/mobile/src/Core/AutoComplete/index.cjs');
require('../../apps/mobile/src/Core/Dropdown/index.cjs');
require('../../apps/mobile/src/Core/MultiSelect/index.cjs');
require('../../apps/mobile/src/Core/Trees/components/CoreTree.cjs');
require('../../apps/mobile/src/Core/Trees/components/CoreTreeSelect.cjs');
require('../../apps/mobile/src/Core/Trees/components/CoreToolbar.cjs');
require('../../apps/mobile/src/Core/Paginator/index.cjs');
require('lucide-react-native');
require('../../apps/mobile/src/Core/SelectButton/index.cjs');
require('../../apps/mobile/src/Core/DataTable/DataTable.cjs');
require('../../apps/mobile/src/Core/Tag/index.cjs');
require('../../apps/mobile/src/Core/Badge/index.cjs');
require('../../apps/mobile/src/Core/ProgressBar/index.cjs');
require('../../apps/mobile/src/Core/Checkbox/index.cjs');
require('../../apps/mobile/src/Core/RadioButton/index.cjs');
var index_native = require('../../assets/Icons/index.cjs');
var locale = require('../../hooks/locale.cjs');
require('../../contexts/DialogContext.cjs');
var useComponentDefaults = require('../../hooks/useComponentDefaults.cjs');
var useSeverityColors = require('../../hooks/useSeverityColors.cjs');

const SIZE_MAP = {
  sm: { height: 32, fontSize: 12, px: 10, py: 6, gap: 6, iconSize: 14 },
  md: { height: 40, fontSize: 14, px: 16, py: 10, gap: 8, iconSize: 16 },
  lg: { height: 48, fontSize: 16, px: 24, py: 12, gap: 10, iconSize: 18 }
};
function resolveIcon(icon, color, iconSize) {
  if (!icon) return null;
  if (React.isValidElement(icon)) {
    return React.cloneElement(icon, { color, size: iconSize });
  }
  if (typeof icon === "function") {
    const Comp = icon;
    return /* @__PURE__ */ jsxRuntime.jsx(Comp, { size: iconSize, color });
  }
  if (typeof icon !== "string") return null;
  const piMatches = icon.match(/pi-([a-z-]+)/g);
  const iconName = piMatches ? piMatches[piMatches.length - 1].replace("pi-", "") : icon;
  const Component = index_native.IconMap[iconName];
  if (Component) return /* @__PURE__ */ jsxRuntime.jsx(Component, { size: iconSize, color });
  return null;
}
function Button(rawProps) {
  const { mergedProps: props, themeStyle, elementStyles } = useComponentDefaults.default("Button", rawProps);
  const {
    children,
    label,
    isLoadingText,
    severity = "brand",
    size = "md",
    loading,
    iconPos = "left",
    icon,
    disabled,
    outlined,
    raised,
    rounded,
    testID,
    style: styleProp,
    onPress,
    onClick,
    ...rest
  } = props;
  const { t } = locale.useLanguage();
  const { cssProps, nativeProps } = useSeparator.default(rest);
  const sevColors = useSeverityColors.useSeverityColors(severity ?? "brand");
  const sizeConfig = SIZE_MAP[size] ?? SIZE_MAP.md;
  const isDisabled = disabled || loading;
  const resolvedLabel = typeof children === "string" ? children : loading && isLoadingText ? isLoadingText : label ? t(label) : "";
  const hasLabel = !!resolvedLabel;
  const textColor = outlined ? sevColors.solid : sevColors.solidText;
  const bgColor = outlined ? "transparent" : sevColors.solid;
  const borderColor = sevColors.border || sevColors.solid;
  const computedCss = React.useMemo(() => ({
    ...themeStyle,
    ...elementStyles.root || {},
    ...cssProps,
    backgroundColor: bgColor,
    borderColor,
    borderWidth: 1,
    height: sizeConfig.height,
    paddingLeft: hasLabel ? sizeConfig.px : sizeConfig.py,
    paddingRight: hasLabel ? sizeConfig.px : sizeConfig.py,
    paddingTop: sizeConfig.py,
    paddingBottom: sizeConfig.py,
    borderRadius: rounded ? 9999 : 6,
    flexDirection: iconPos === "top" || iconPos === "bottom" ? iconPos === "bottom" ? "column-reverse" : "column" : iconPos === "right" ? "row-reverse" : "row",
    alignItems: "center",
    justifyContent: "center",
    gap: sizeConfig.gap,
    opacity: isDisabled ? 50 : 100,
    alignSelf: "flex-start",
    overflow: "hidden",
    ...raised ? {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.16,
      shadowRadius: 6,
      elevation: 4
    } : {},
    ...styleProp
  }), [
    themeStyle,
    elementStyles,
    cssProps,
    bgColor,
    borderColor,
    sizeConfig,
    hasLabel,
    icon,
    iconPos,
    rounded,
    raised,
    isDisabled,
    styleProp
  ]);
  const iconElement = loading ? /* @__PURE__ */ jsxRuntime.jsx(reactNative.ActivityIndicator, { size: "small", color: textColor }) : resolveIcon(icon, textColor, sizeConfig.iconSize);
  const labelStyle = React.useMemo(() => ({
    color: textColor,
    fontSize: sizeConfig.fontSize,
    fontWeight: "600",
    lineHeight: sizeConfig.fontSize * 1.2
  }), [textColor, sizeConfig]);
  const handlePress = React.useCallback((e) => {
    if (isDisabled) return;
    if (onPress) onPress(e);
    if (onClick) onClick(e);
  }, [isDisabled, onPress, onClick]);
  return /* @__PURE__ */ jsxRuntime.jsxs(
    ResponsiveElement.default,
    {
      as: "Pressable",
      cssProps: computedCss,
      nativeProps: {
        ...nativeProps,
        onPress: handlePress,
        disabled: isDisabled,
        testID,
        accessibilityRole: "button",
        accessibilityState: { disabled: isDisabled, busy: loading },
        accessibilityLabel: resolvedLabel || void 0
      },
      children: [
        iconElement,
        !!hasLabel && /* @__PURE__ */ jsxRuntime.jsx(reactNative.Text, { style: labelStyle, numberOfLines: 1, children: resolvedLabel }),
        typeof children !== "string" ? children : void 0
      ]
    }
  );
}

exports.Button = Button;
exports.default = Button;
//# sourceMappingURL=Button.cjs.map
