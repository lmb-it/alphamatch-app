import { jsx } from 'react/jsx-runtime';
import React from 'react';
import { createCheckbox } from '@gluestack-ui/core/checkbox/creator';
import { View, Text, Platform, Pressable } from 'react-native';
import { withStyleContext, tva, useStyleContext } from '@gluestack-ui/utils/nativewind-utils';
import { UIIcon, PrimitiveIcon } from '@gluestack-ui/core/icon/creator';
import { cssInterop } from 'nativewind';

const IndicatorWrapper = React.forwardRef(function IndicatorWrapper2({ ...props }, ref) {
  return /* @__PURE__ */ jsx(View, { ...props, ref });
});
const LabelWrapper = React.forwardRef(function LabelWrapper2({ ...props }, ref) {
  return /* @__PURE__ */ jsx(Text, { ...props, ref });
});
const IconWrapper = React.forwardRef(function IconWrapper2({ ...props }, ref) {
  return /* @__PURE__ */ jsx(UIIcon, { ...props, ref });
});
const SCOPE = "CHECKBOX";
const UICheckbox = createCheckbox({
  // @ts-expect-error : internal implementation for r-19/react-native-web
  Root: Platform.OS === "web" ? withStyleContext(View, SCOPE) : withStyleContext(Pressable, SCOPE),
  Group: View,
  Icon: IconWrapper,
  Label: LabelWrapper,
  Indicator: IndicatorWrapper
});
cssInterop(PrimitiveIcon, {
  className: {
    target: "style",
    nativeStyleToProp: {
      height: true,
      width: true,
      fill: true,
      color: "classNameColor",
      stroke: true
    }
  }
});
const checkboxStyle = tva({
  base: "group/checkbox flex-row items-center justify-start web:cursor-pointer data-[disabled=true]:cursor-not-allowed",
  variants: {
    size: {
      lg: "gap-2",
      md: "gap-2",
      sm: "gap-1.5"
    }
  }
});
const checkboxIndicatorStyle = tva({
  base: "justify-center items-center border-outline-400 bg-transparent rounded web:data-[focus-visible=true]:outline-none web:data-[focus-visible=true]:ring-2 web:data-[focus-visible=true]:ring-indicator-primary data-[checked=true]:bg-primary-600 data-[checked=true]:border-primary-600 data-[hover=true]:data-[checked=false]:border-outline-500 data-[hover=true]:bg-transparent data-[hover=true]:data-[invalid=true]:border-error-700 data-[hover=true]:data-[checked=true]:bg-primary-700 data-[hover=true]:data-[checked=true]:border-primary-700 data-[hover=true]:data-[checked=true]:data-[disabled=true]:border-primary-600 data-[hover=true]:data-[checked=true]:data-[disabled=true]:bg-primary-600 data-[hover=true]:data-[checked=true]:data-[disabled=true]:opacity-40 data-[hover=true]:data-[checked=true]:data-[disabled=true]:data-[invalid=true]:border-error-700 data-[hover=true]:data-[disabled=true]:border-outline-400 data-[hover=true]:data-[disabled=true]:data-[invalid=true]:border-error-700 data-[active=true]:data-[checked=true]:bg-primary-800 data-[active=true]:data-[checked=true]:border-primary-800 data-[invalid=true]:border-error-700 data-[disabled=true]:opacity-40",
  parentVariants: {
    size: {
      lg: "w-6 h-6 border-[3px]",
      md: "w-5 h-5 border-2",
      sm: "w-4 h-4 border-2"
    }
  }
});
const checkboxLabelStyle = tva({
  base: "text-typography-600 data-[checked=true]:text-typography-900 data-[hover=true]:text-typography-900 data-[hover=true]:data-[checked=true]:text-typography-900 data-[hover=true]:data-[checked=true]:data-[disabled=true]:text-typography-900 data-[hover=true]:data-[disabled=true]:text-typography-400 data-[active=true]:text-typography-900 data-[active=true]:data-[checked=true]:text-typography-900 data-[disabled=true]:opacity-40 web:select-none",
  parentVariants: {
    size: {
      lg: "text-lg",
      md: "text-base",
      sm: "text-sm"
    }
  }
});
const checkboxIconStyle = tva({
  base: "text-typography-50 fill-none",
  parentVariants: {
    size: {
      sm: "h-3 w-3",
      md: "h-4 w-4",
      lg: "h-5 w-5"
    }
  }
});
UICheckbox.Group;
const Checkbox = React.forwardRef(function Checkbox2({ className, size = "md", ...props }, ref) {
  return /* @__PURE__ */ jsx(
    UICheckbox,
    {
      className: checkboxStyle({
        class: className,
        size
      }),
      ...props,
      context: {
        size
      },
      ref
    }
  );
});
const CheckboxIndicator = React.forwardRef(function CheckboxIndicator2({ className, ...props }, ref) {
  const { size: parentSize } = useStyleContext(SCOPE);
  return /* @__PURE__ */ jsx(
    UICheckbox.Indicator,
    {
      className: checkboxIndicatorStyle({
        parentVariants: {
          size: parentSize
        },
        class: className
      }),
      ...props,
      ref
    }
  );
});
const CheckboxLabel = React.forwardRef(function CheckboxLabel2({ className, ...props }, ref) {
  const { size: parentSize } = useStyleContext(SCOPE);
  return /* @__PURE__ */ jsx(
    UICheckbox.Label,
    {
      className: checkboxLabelStyle({
        parentVariants: {
          size: parentSize
        },
        class: className
      }),
      ...props,
      ref
    }
  );
});
const CheckboxIcon = React.forwardRef(function CheckboxIcon2({ className, size, ...props }, ref) {
  const { size: parentSize } = useStyleContext(SCOPE);
  if (typeof size === "number") {
    return /* @__PURE__ */ jsx(
      UICheckbox.Icon,
      {
        ref,
        ...props,
        className: checkboxIconStyle({ class: className }),
        size
      }
    );
  } else if ((props.height !== void 0 || props.width !== void 0) && size === void 0) {
    return /* @__PURE__ */ jsx(
      UICheckbox.Icon,
      {
        ref,
        ...props,
        className: checkboxIconStyle({ class: className })
      }
    );
  }
  return /* @__PURE__ */ jsx(
    UICheckbox.Icon,
    {
      className: checkboxIconStyle({
        parentVariants: {
          size: parentSize
        },
        size,
        class: className
      }),
      ...props,
      ref
    }
  );
});
Checkbox.displayName = "Checkbox";
CheckboxIndicator.displayName = "CheckboxIndicator";
CheckboxLabel.displayName = "CheckboxLabel";
CheckboxIcon.displayName = "CheckboxIcon";

export { Checkbox, CheckboxIcon, CheckboxIndicator, CheckboxLabel };
//# sourceMappingURL=index.js.map
