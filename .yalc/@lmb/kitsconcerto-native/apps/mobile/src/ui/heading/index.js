import { jsx } from 'react/jsx-runtime';
import { memo, forwardRef } from 'react';
import { H4, H6, H5, H3, H2, H1 } from '@expo/html-elements';
import { headingStyle } from './styles.js';
import { cssInterop } from 'nativewind';

cssInterop(H1, { className: "style" });
cssInterop(H2, { className: "style" });
cssInterop(H3, { className: "style" });
cssInterop(H4, { className: "style" });
cssInterop(H5, { className: "style" });
cssInterop(H6, { className: "style" });
const MappedHeading = memo(
  forwardRef(
    function MappedHeading2({
      size,
      className,
      isTruncated,
      bold,
      underline,
      strikeThrough,
      sub,
      italic,
      highlight,
      ...props
    }, ref) {
      switch (size) {
        case "5xl":
        case "4xl":
        case "3xl":
          return /* @__PURE__ */ jsx(
            H1,
            {
              className: headingStyle({
                size,
                isTruncated,
                bold,
                underline,
                strikeThrough,
                sub,
                italic,
                highlight,
                class: className
              }),
              ...props,
              ref
            }
          );
        case "2xl":
          return /* @__PURE__ */ jsx(
            H2,
            {
              className: headingStyle({
                size,
                isTruncated,
                bold,
                underline,
                strikeThrough,
                sub,
                italic,
                highlight,
                class: className
              }),
              ...props,
              ref
            }
          );
        case "xl":
          return /* @__PURE__ */ jsx(
            H3,
            {
              className: headingStyle({
                size,
                isTruncated,
                bold,
                underline,
                strikeThrough,
                sub,
                italic,
                highlight,
                class: className
              }),
              ...props,
              ref
            }
          );
        case "lg":
          return /* @__PURE__ */ jsx(
            H4,
            {
              className: headingStyle({
                size,
                isTruncated,
                bold,
                underline,
                strikeThrough,
                sub,
                italic,
                highlight,
                class: className
              }),
              ...props,
              ref
            }
          );
        case "md":
          return /* @__PURE__ */ jsx(
            H5,
            {
              className: headingStyle({
                size,
                isTruncated,
                bold,
                underline,
                strikeThrough,
                sub,
                italic,
                highlight,
                class: className
              }),
              ...props,
              ref
            }
          );
        case "sm":
        case "xs":
          return /* @__PURE__ */ jsx(
            H6,
            {
              className: headingStyle({
                size,
                isTruncated,
                bold,
                underline,
                strikeThrough,
                sub,
                italic,
                highlight,
                class: className
              }),
              ...props,
              ref
            }
          );
        default:
          return /* @__PURE__ */ jsx(
            H4,
            {
              className: headingStyle({
                size,
                isTruncated,
                bold,
                underline,
                strikeThrough,
                sub,
                italic,
                highlight,
                class: className
              }),
              ...props,
              ref
            }
          );
      }
    }
  )
);
const Heading = memo(
  forwardRef(function Heading2({ className, size = "lg", as: AsComp, ...props }, ref) {
    const {
      isTruncated,
      bold,
      underline,
      strikeThrough,
      sub,
      italic,
      highlight
    } = props;
    if (AsComp) {
      return /* @__PURE__ */ jsx(
        AsComp,
        {
          className: headingStyle({
            size,
            isTruncated,
            bold,
            underline,
            strikeThrough,
            sub,
            italic,
            highlight,
            class: className
          }),
          ...props
        }
      );
    }
    return /* @__PURE__ */ jsx(MappedHeading, { className, size, ref, ...props });
  })
);
Heading.displayName = "Heading";

export { Heading };
//# sourceMappingURL=index.js.map
