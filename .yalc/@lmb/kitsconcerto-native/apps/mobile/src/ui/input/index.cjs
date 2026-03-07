'use strict';

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');
var creator = require('@gluestack-ui/core/input/creator');
var reactNative = require('react-native');
var nativewindUtils = require('@gluestack-ui/utils/nativewind-utils');
var nativewind = require('nativewind');
var creator$1 = require('@gluestack-ui/core/icon/creator');

const SCOPE = "INPUT";
const AddonContext = React.createContext({
  hasLeft: false,
  hasRight: false
});
const UIInput = creator.createInput({
  Root: nativewindUtils.withStyleContext(reactNative.View, SCOPE),
  Icon: creator$1.UIIcon,
  Slot: reactNative.Pressable,
  Input: reactNative.TextInput
});
nativewind.cssInterop(creator$1.PrimitiveIcon, {
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
const inputStyle = nativewindUtils.tva({
  base: "border-background-300 flex-row overflow-hidden content-center data-[hover=true]:border-outline-400 data-[focus=true]:border-primary-700 data-[focus=true]:hover:border-primary-700 data-[disabled=true]:opacity-40 data-[disabled=true]:hover:border-background-300 items-center",
  variants: {
    size: {
      xl: "h-12",
      lg: "h-11",
      md: "h-10",
      sm: "h-9"
    },
    variant: {
      underlined: "rounded-none border-b data-[invalid=true]:border-b-2 data-[invalid=true]:border-error-700 data-[invalid=true]:hover:border-error-700 data-[invalid=true]:data-[focus=true]:border-error-700 data-[invalid=true]:data-[focus=true]:hover:border-error-700 data-[invalid=true]:data-[disabled=true]:hover:border-error-700",
      outline: "rounded border data-[invalid=true]:border-error-700 data-[invalid=true]:hover:border-error-700 data-[invalid=true]:data-[focus=true]:border-error-700 data-[invalid=true]:data-[focus=true]:hover:border-error-700 data-[invalid=true]:data-[disabled=true]:hover:border-error-700 data-[focus=true]:web:ring-1 data-[focus=true]:web:ring-inset data-[focus=true]:web:ring-indicator-primary data-[invalid=true]:web:ring-1 data-[invalid=true]:web:ring-inset data-[invalid=true]:web:ring-indicator-error data-[invalid=true]:data-[focus=true]:hover:web:ring-1 data-[invalid=true]:data-[focus=true]:hover:web:ring-inset data-[invalid=true]:data-[focus=true]:hover:web:ring-indicator-error data-[invalid=true]:data-[disabled=true]:hover:web:ring-1 data-[invalid=true]:data-[disabled=true]:hover:web:ring-inset data-[invalid=true]:data-[disabled=true]:hover:web:ring-indicator-error",
      rounded: "rounded-full border data-[invalid=true]:border-error-700 data-[invalid=true]:hover:border-error-700 data-[invalid=true]:data-[focus=true]:border-error-700 data-[invalid=true]:data-[focus=true]:hover:border-error-700 data-[invalid=true]:data-[disabled=true]:hover:border-error-700 data-[focus=true]:web:ring-1 data-[focus=true]:web:ring-inset data-[focus=true]:web:ring-indicator-primary data-[invalid=true]:web:ring-1 data-[invalid=true]:web:ring-inset data-[invalid=true]:web:ring-indicator-error data-[invalid=true]:data-[focus=true]:hover:web:ring-1 data-[invalid=true]:data-[focus=true]:hover:web:ring-inset data-[invalid=true]:data-[focus=true]:hover:web:ring-indicator-error data-[invalid=true]:data-[disabled=true]:hover:web:ring-1 data-[invalid=true]:data-[disabled=true]:hover:web:ring-inset data-[invalid=true]:data-[disabled=true]:hover:web:ring-indicator-error"
    }
  }
});
const inputIconStyle = nativewindUtils.tva({
  base: "justify-center items-center text-typography-400 fill-none",
  parentVariants: {
    size: {
      "2xs": "h-3 w-3",
      "xs": "h-3.5 w-3.5",
      "sm": "h-4 w-4",
      "md": "h-[18px] w-[18px]",
      "lg": "h-5 w-5",
      "xl": "h-6 w-6"
    }
  }
});
const inputSlotStyle = nativewindUtils.tva({
  base: "justify-center items-center web:disabled:cursor-not-allowed"
});
const inputFieldStyle = nativewindUtils.tva({
  base: "flex-1 text-typography-900 py-0 px-3 placeholder:text-typography-500 h-full ios:leading-[0px] web:cursor-text web:data-[disabled=true]:cursor-not-allowed",
  parentVariants: {
    variant: {
      underlined: "web:outline-0 web:outline-none px-0",
      outline: "web:outline-0 web:outline-none",
      rounded: "web:outline-0 web:outline-none px-4"
    },
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
const Input = React.forwardRef(
  function Input2({ className, variant = "outline", size = "md", style, ...props }, ref) {
    const { hasLeft, hasRight } = React.useContext(AddonContext);
    const addonStyle = {};
    if (hasLeft) {
      addonStyle.borderTopLeftRadius = 0;
      addonStyle.borderBottomLeftRadius = 0;
      addonStyle.borderLeftWidth = 0;
    }
    if (hasRight) {
      addonStyle.borderTopRightRadius = 0;
      addonStyle.borderBottomRightRadius = 0;
      addonStyle.borderRightWidth = 0;
    }
    return /* @__PURE__ */ jsxRuntime.jsx(
      UIInput,
      {
        ref,
        ...props,
        className: inputStyle({ variant, size, class: className }),
        context: { variant, size },
        style: [style, addonStyle]
      }
    );
  }
);
const InputIcon = React.forwardRef(function InputIcon2({ className, size, ...props }, ref) {
  const { size: parentSize } = nativewindUtils.useStyleContext(SCOPE);
  if (typeof size === "number") {
    return /* @__PURE__ */ jsxRuntime.jsx(
      UIInput.Icon,
      {
        ref,
        ...props,
        className: inputIconStyle({ class: className }),
        size
      }
    );
  } else if ((props.height !== void 0 || props.width !== void 0) && size === void 0) {
    return /* @__PURE__ */ jsxRuntime.jsx(
      UIInput.Icon,
      {
        ref,
        ...props,
        className: inputIconStyle({ class: className })
      }
    );
  }
  return /* @__PURE__ */ jsxRuntime.jsx(
    UIInput.Icon,
    {
      ref,
      ...props,
      className: inputIconStyle({
        parentVariants: {
          size: parentSize
        },
        class: className
      })
    }
  );
});
const InputSlot = React.forwardRef(function InputSlot2({ className, ...props }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    UIInput.Slot,
    {
      ref,
      ...props,
      className: inputSlotStyle({
        class: className
      })
    }
  );
});
const InputField = React.forwardRef(function InputField2({ className, ...props }, ref) {
  const { variant: parentVariant, size: parentSize } = nativewindUtils.useStyleContext(SCOPE);
  return /* @__PURE__ */ jsxRuntime.jsx(
    UIInput.Input,
    {
      ref,
      ...props,
      className: inputFieldStyle({
        parentVariants: {
          variant: parentVariant,
          size: parentSize
        },
        class: className
      })
    }
  );
});
Input.displayName = "Input";
InputIcon.displayName = "InputIcon";
InputSlot.displayName = "InputSlot";
InputField.displayName = "InputField";

exports.AddonContext = AddonContext;
exports.Input = Input;
exports.InputField = InputField;
exports.InputIcon = InputIcon;
exports.InputSlot = InputSlot;
//# sourceMappingURL=index.cjs.map
