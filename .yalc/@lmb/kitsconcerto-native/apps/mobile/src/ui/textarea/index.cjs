'use strict';

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');
var creator = require('@gluestack-ui/core/textarea/creator');
var reactNative = require('react-native');
var nativewindUtils = require('@gluestack-ui/utils/nativewind-utils');

const SCOPE = "TEXTAREA";
const UITextarea = creator.createTextarea({
  Root: nativewindUtils.withStyleContext(reactNative.View, SCOPE),
  Input: reactNative.TextInput
});
const textareaStyle = nativewindUtils.tva({
  base: "w-full h-[100px] border border-background-300 rounded data-[hover=true]:border-outline-400 data-[focus=true]:border-primary-700 data-[focus=true]:data-[hover=true]:border-primary-700 data-[disabled=true]:opacity-40 data-[disabled=true]:bg-background-50 data-[disabled=true]:data-[hover=true]:border-background-300",
  variants: {
    variant: {
      default: "data-[focus=true]:border-primary-700 data-[focus=true]:web:ring-1 data-[focus=true]:web:ring-inset data-[focus=true]:web:ring-indicator-primary data-[invalid=true]:border-error-700 data-[invalid=true]:web:ring-1 data-[invalid=true]:web:ring-inset data-[invalid=true]:web:ring-indicator-error data-[invalid=true]:data-[hover=true]:border-error-700 data-[invalid=true]:data-[focus=true]:data-[hover=true]:border-primary-700 data-[invalid=true]:data-[focus=true]:data-[hover=true]:web:ring-1 data-[invalid=true]:data-[focus=true]:data-[hover=true]:web:ring-inset data-[invalid=true]:data-[focus=true]:data-[hover=true]:web:ring-indicator-primary data-[invalid=true]:data-[disabled=true]:data-[hover=true]:border-error-700 data-[invalid=true]:data-[disabled=true]:data-[hover=true]:web:ring-1 data-[invalid=true]:data-[disabled=true]:data-[hover=true]:web:ring-inset data-[invalid=true]:data-[disabled=true]:data-[hover=true]:web:ring-indicator-error "
    },
    size: {
      sm: "",
      md: "",
      lg: "",
      xl: ""
    }
  }
});
const textareaInputStyle = nativewindUtils.tva({
  base: "p-2 web:outline-0 web:outline-none flex-1 color-typography-900 placeholder:text-typography-500 web:cursor-text web:data-[disabled=true]:cursor-not-allowed",
  parentVariants: {
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
      xl: "text-xl"
    }
  }
});
const Textarea = React.forwardRef(function Textarea2({ className, variant = "default", size = "md", ...props }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    UITextarea,
    {
      ref,
      ...props,
      className: textareaStyle({ variant, class: className }),
      context: { size }
    }
  );
});
const TextareaInput = React.forwardRef(function TextareaInput2({ className, ...props }, ref) {
  const { size: parentSize } = nativewindUtils.useStyleContext(SCOPE);
  return /* @__PURE__ */ jsxRuntime.jsx(
    UITextarea.Input,
    {
      ref,
      ...props,
      textAlignVertical: "top",
      className: textareaInputStyle({
        parentVariants: {
          size: parentSize
        },
        class: className
      })
    }
  );
});
Textarea.displayName = "Textarea";
TextareaInput.displayName = "TextareaInput";

exports.Textarea = Textarea;
exports.TextareaInput = TextareaInput;
//# sourceMappingURL=index.cjs.map
