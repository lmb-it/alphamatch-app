'use strict';

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');
var htmlElements = require('@expo/html-elements');
var styles = require('./styles.cjs');
var nativewind = require('nativewind');

nativewind.cssInterop(htmlElements.H1, { className: "style" });
nativewind.cssInterop(htmlElements.H2, { className: "style" });
nativewind.cssInterop(htmlElements.H3, { className: "style" });
nativewind.cssInterop(htmlElements.H4, { className: "style" });
nativewind.cssInterop(htmlElements.H5, { className: "style" });
nativewind.cssInterop(htmlElements.H6, { className: "style" });
const MappedHeading = React.memo(
  React.forwardRef(
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
          return /* @__PURE__ */ jsxRuntime.jsx(
            htmlElements.H1,
            {
              className: styles.headingStyle({
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
          return /* @__PURE__ */ jsxRuntime.jsx(
            htmlElements.H2,
            {
              className: styles.headingStyle({
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
          return /* @__PURE__ */ jsxRuntime.jsx(
            htmlElements.H3,
            {
              className: styles.headingStyle({
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
          return /* @__PURE__ */ jsxRuntime.jsx(
            htmlElements.H4,
            {
              className: styles.headingStyle({
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
          return /* @__PURE__ */ jsxRuntime.jsx(
            htmlElements.H5,
            {
              className: styles.headingStyle({
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
          return /* @__PURE__ */ jsxRuntime.jsx(
            htmlElements.H6,
            {
              className: styles.headingStyle({
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
          return /* @__PURE__ */ jsxRuntime.jsx(
            htmlElements.H4,
            {
              className: styles.headingStyle({
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
const Heading = React.memo(
  React.forwardRef(function Heading2({ className, size = "lg", as: AsComp, ...props }, ref) {
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
      return /* @__PURE__ */ jsxRuntime.jsx(
        AsComp,
        {
          className: styles.headingStyle({
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
    return /* @__PURE__ */ jsxRuntime.jsx(MappedHeading, { className, size, ref, ...props });
  })
);
Heading.displayName = "Heading";

exports.Heading = Heading;
//# sourceMappingURL=index.cjs.map
