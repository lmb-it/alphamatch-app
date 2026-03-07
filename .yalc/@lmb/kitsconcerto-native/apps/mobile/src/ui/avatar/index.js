import { jsx } from 'react/jsx-runtime';
import React from 'react';
import { createAvatar } from '@gluestack-ui/core/avatar/creator';
import { Text, Image, View, Platform } from 'react-native';
import { withStyleContext, tva, useStyleContext } from '@gluestack-ui/utils/nativewind-utils';

const SCOPE = "AVATAR";
const UIAvatar = createAvatar({
  Root: withStyleContext(View, SCOPE),
  Badge: View,
  Group: View,
  Image,
  FallbackText: Text
});
const avatarStyle = tva({
  base: "rounded-full justify-center items-center relative bg-primary-600 group-[.avatar-group]/avatar-group:-ml-2.5",
  variants: {
    size: {
      "xs": "w-6 h-6",
      "sm": "w-8 h-8",
      "md": "w-12 h-12",
      "lg": "w-16 h-16",
      "xl": "w-24 h-24",
      "2xl": "w-32 h-32"
    }
  }
});
const avatarFallbackTextStyle = tva({
  base: "text-typography-0 font-semibold overflow-hidden text-transform:uppercase web:cursor-default",
  parentVariants: {
    size: {
      "xs": "text-2xs",
      "sm": "text-xs",
      "md": "text-base",
      "lg": "text-xl",
      "xl": "text-3xl",
      "2xl": "text-5xl"
    }
  }
});
const avatarGroupStyle = tva({
  base: "group/avatar-group flex-row-reverse relative avatar-group"
});
const avatarBadgeStyle = tva({
  base: "w-5 h-5 bg-success-500 rounded-full absolute right-0 bottom-0 border-background-0 border-2",
  parentVariants: {
    size: {
      "xs": "w-2 h-2",
      "sm": "w-2 h-2",
      "md": "w-3 h-3",
      "lg": "w-4 h-4",
      "xl": "w-6 h-6",
      "2xl": "w-8 h-8"
    }
  }
});
const avatarImageStyle = tva({
  base: "h-full w-full rounded-full absolute"
});
React.forwardRef(function Avatar2({ className, size = "md", ...props }, ref) {
  return /* @__PURE__ */ jsx(
    UIAvatar,
    {
      ref,
      ...props,
      className: avatarStyle({ size, class: className }),
      context: { size }
    }
  );
});
React.forwardRef(function AvatarBadge2({ className, size, ...props }, ref) {
  const { size: parentSize } = useStyleContext(SCOPE);
  return /* @__PURE__ */ jsx(
    UIAvatar.Badge,
    {
      ref,
      ...props,
      className: avatarBadgeStyle({
        parentVariants: {
          size: parentSize
        },
        size,
        class: className
      })
    }
  );
});
React.forwardRef(function AvatarFallbackText2({ className, size, ...props }, ref) {
  const { size: parentSize } = useStyleContext(SCOPE);
  return /* @__PURE__ */ jsx(
    UIAvatar.FallbackText,
    {
      ref,
      ...props,
      className: avatarFallbackTextStyle({
        parentVariants: {
          size: parentSize
        },
        size,
        class: className
      })
    }
  );
});
React.forwardRef(function AvatarImage2({ className, ...props }, ref) {
  return /* @__PURE__ */ jsx(
    UIAvatar.Image,
    {
      ref,
      ...props,
      className: avatarImageStyle({
        class: className
      }),
      style: Platform.OS === "web" ? { height: "revert-layer", width: "revert-layer" } : void 0
    }
  );
});
React.forwardRef(function AvatarGroup2({ className, ...props }, ref) {
  return /* @__PURE__ */ jsx(
    UIAvatar.Group,
    {
      ref,
      ...props,
      className: avatarGroupStyle({
        class: className
      })
    }
  );
});
//# sourceMappingURL=index.js.map
