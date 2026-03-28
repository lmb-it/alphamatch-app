import { jsx, jsxs } from 'react/jsx-runtime';
import React, { useMemo, useCallback } from 'react';
import { ActivityIndicator, Text } from 'react-native';
import '../../apps/mobile/src/ui/accordion/index.js';
import '../../apps/mobile/src/ui/actionsheet/index.js';
import '../../apps/mobile/src/ui/alert/index.js';
import '../../apps/mobile/src/ui/alert-dialog/index.js';
import '../../apps/mobile/src/ui/avatar/index.js';
import '../../apps/mobile/src/ui/badge/index.js';
import '../../apps/mobile/src/ui/bottomsheet/index.js';
import '../../apps/mobile/src/ui/box/index.js';
import '../../apps/mobile/src/ui/button/index.js';
import '../../apps/mobile/src/ui/card/index.js';
import '../../apps/mobile/src/ui/center/index.js';
import '../../apps/mobile/src/ui/checkbox/index.js';
import '../../apps/mobile/src/ui/divider/index.js';
import '../../apps/mobile/src/ui/drawer/index.js';
import '../../apps/mobile/src/ui/fab/index.js';
import '../../apps/mobile/src/ui/form-control/index.js';
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
import 'react-icons/fa';
import 'react-icons/ai';
import 'react-icons/io';
import '../../packages/types/src/Components/Molecules/Form/FilePicker/types/filesTypes.js';
import 'yup';
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
import { IconMap } from '../../assets/Icons/index.js';
import { useLanguage } from '../../hooks/locale.js';
import '../../contexts/DialogContext.js';
import useComponentDefaults from '../../hooks/useComponentDefaults.js';
import { useSeverityColors } from '../../hooks/useSeverityColors.js';

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
    return /* @__PURE__ */ jsx(Comp, { size: iconSize, color });
  }
  if (typeof icon !== "string") return null;
  const piMatches = icon.match(/pi-([a-z-]+)/g);
  const iconName = piMatches ? piMatches[piMatches.length - 1].replace("pi-", "") : icon;
  const Component = IconMap[iconName];
  if (Component) return /* @__PURE__ */ jsx(Component, { size: iconSize, color });
  return null;
}
function Button(rawProps) {
  const { mergedProps: props, themeStyle, elementStyles } = useComponentDefaults("Button", rawProps);
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
  const { t } = useLanguage();
  const { cssProps, nativeProps } = useSeparator(rest);
  const sevColors = useSeverityColors(severity ?? "brand");
  const sizeConfig = SIZE_MAP[size] ?? SIZE_MAP.md;
  const isDisabled = disabled || loading;
  const resolvedLabel = typeof children === "string" ? children : loading && isLoadingText ? isLoadingText : label ? t(label) : "";
  const hasLabel = !!resolvedLabel;
  const textColor = outlined ? sevColors.solid : sevColors.solidText;
  const bgColor = outlined ? "transparent" : sevColors.solid;
  const borderColor = sevColors.border || sevColors.solid;
  const computedCss = useMemo(() => ({
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
  const iconElement = loading ? /* @__PURE__ */ jsx(ActivityIndicator, { size: "small", color: textColor }) : resolveIcon(icon, textColor, sizeConfig.iconSize);
  const labelStyle = useMemo(() => ({
    color: textColor,
    fontSize: sizeConfig.fontSize,
    fontWeight: "600",
    lineHeight: sizeConfig.fontSize * 1.2
  }), [textColor, sizeConfig]);
  const handlePress = useCallback((e) => {
    if (isDisabled) return;
    if (onPress) onPress(e);
    if (onClick) onClick(e);
  }, [isDisabled, onPress, onClick]);
  return /* @__PURE__ */ jsxs(
    ResponsiveElement,
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
        !!hasLabel && /* @__PURE__ */ jsx(Text, { style: labelStyle, numberOfLines: 1, children: resolvedLabel }),
        typeof children !== "string" ? children : void 0
      ]
    }
  );
}

export { Button, Button as default };
//# sourceMappingURL=Button.js.map
