import { jsx } from 'react/jsx-runtime';
import React from 'react';
import { createRadio } from '@gluestack-ui/core/radio/creator';
import { Text, View, Platform, Pressable } from 'react-native';
import { withStyleContext, tva, useStyleContext } from '@gluestack-ui/utils/nativewind-utils';
import { cssInterop } from 'nativewind';
import { UIIcon, PrimitiveIcon } from '@gluestack-ui/core/icon/creator';

const SCOPE = "Radio";
const UIRadio = createRadio({
  Root: Platform.OS === "web" ? withStyleContext(View, SCOPE) : withStyleContext(Pressable, SCOPE),
  Group: View,
  Icon: UIIcon,
  Indicator: View,
  Label: Text
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
const radioStyle = tva({
  base: "group/radio flex-row justify-start items-center web:cursor-pointer data-[disabled=true]:web:cursor-not-allowed",
  variants: {
    size: {
      sm: "gap-1.5",
      md: "gap-2",
      lg: "gap-2"
    }
  }
});
const radioGroupStyle = tva({
  base: "gap-2"
});
const radioIconStyle = tva({
  base: "rounded-full justify-center items-center text-primary-800 fill-primary-800",
  parentVariants: {
    size: {
      sm: "h-[9px] w-[9px]",
      md: "h-3 w-3",
      lg: "h-4 w-4"
    }
  }
});
const radioIndicatorStyle = tva({
  base: "justify-center items-center bg-transparent border-outline-400 border-2 rounded-full data-[focus-visible=true]:web:outline-2 data-[focus-visible=true]:web:outline-primary-700 data-[focus-visible=true]:web:outline data-[checked=true]:border-primary-600 data-[checked=true]:bg-transparent data-[hover=true]:border-outline-500 data-[hover=true]:bg-transparent data-[hover=true]:data-[checked=true]:bg-transparent data-[hover=true]:data-[checked=true]:border-primary-700 data-[hover=true]:data-[invalid=true]:border-error-700 data-[hover=true]:data-[disabled=true]:opacity-40 data-[hover=true]:data-[disabled=true]:border-outline-400 data-[hover=true]:data-[disabled=true]:data-[invalid=true]:border-error-400 data-[active=true]:bg-transparent data-[active=true]:border-primary-800 data-[invalid=true]:border-error-700 data-[disabled=true]:opacity-40 data-[disabled=true]:data-[checked=true]:border-outline-400 data-[disabled=true]:data-[checked=true]:bg-transparent data-[disabled=true]:data-[invalid=true]:border-error-400",
  parentVariants: {
    size: {
      sm: "h-4 w-4",
      md: "h-5 w-5",
      lg: "h-6 w-6"
    }
  }
});
const radioLabelStyle = tva({
  base: "text-typography-600 data-[checked=true]:text-typography-900 data-[hover=true]:text-typography-900 data-[hover=true]:data-[disabled=true]:text-typography-600 data-[hover=true]:data-[disabled=true]:data-[checked=true]:text-typography-900 data-[active=true]:text-typography-900 data-[active=true]:data-[checked=true]:text-typography-900 data-[disabled=true]:opacity-40 web:select-none",
  parentVariants: {
    size: {
      "2xs": "text-2xs",
      "xs": "text-xs",
      "sm": "text-sm",
      "md": "text-base",
      "lg": "text-lg",
      "xl": "text-xl",
      "2xl": "text-2xl",
      "3xl": "text-3xl",
      "4xl": "text-4xl",
      "5xl": "text-5xl",
      "6xl": "text-6xl"
    }
  }
});
const Radio = React.forwardRef(
  function Radio2({ className, size = "md", ...props }, ref) {
    return /* @__PURE__ */ jsx(
      UIRadio,
      {
        className: radioStyle({ class: className, size }),
        ...props,
        ref,
        context: { size }
      }
    );
  }
);
const RadioGroup = React.forwardRef(function RadioGroup2({ className, ...props }, ref) {
  return /* @__PURE__ */ jsx(
    UIRadio.Group,
    {
      className: radioGroupStyle({ class: className }),
      ...props,
      ref
    }
  );
});
const RadioIndicator = React.forwardRef(function RadioIndicator2({ className, ...props }, ref) {
  const { size } = useStyleContext(SCOPE);
  return /* @__PURE__ */ jsx(
    UIRadio.Indicator,
    {
      className: radioIndicatorStyle({
        parentVariants: { size },
        class: className
      }),
      ref,
      ...props
    }
  );
});
const RadioLabel = React.forwardRef(function RadioLabel2({ className, ...props }, ref) {
  const { size } = useStyleContext(SCOPE);
  return /* @__PURE__ */ jsx(
    UIRadio.Label,
    {
      className: radioLabelStyle({
        parentVariants: { size },
        class: className
      }),
      ref,
      ...props
    }
  );
});
const RadioIcon = React.forwardRef(function RadioIcon2({ className, size, ...props }, ref) {
  const { size: parentSize } = useStyleContext(SCOPE);
  if (typeof size === "number") {
    return /* @__PURE__ */ jsx(
      UIRadio.Icon,
      {
        ref,
        ...props,
        className: radioIconStyle({ class: className }),
        size
      }
    );
  } else if ((props.height !== void 0 || props.width !== void 0) && size === void 0) {
    return /* @__PURE__ */ jsx(
      UIRadio.Icon,
      {
        ref,
        ...props,
        className: radioIconStyle({ class: className })
      }
    );
  }
  return /* @__PURE__ */ jsx(
    UIRadio.Icon,
    {
      ...props,
      className: radioIconStyle({
        parentVariants: {
          size: parentSize
        },
        size,
        class: className
      }),
      ref
    }
  );
});
Radio.displayName = "Radio";
RadioGroup.displayName = "RadioGroup";
RadioIndicator.displayName = "RadioIndicator";
RadioLabel.displayName = "RadioLabel";
RadioIcon.displayName = "RadioIcon";

export { Radio, RadioGroup, RadioIcon, RadioIndicator, RadioLabel };
//# sourceMappingURL=index.js.map
