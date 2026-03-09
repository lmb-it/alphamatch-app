'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');
var locale = require('../../../../Hooks/locale.cjs');
require('../../../../Contexts/DialogContext.cjs');
var useSeparator = require('../../../../apps/mobile/src/Factory/useSeparator.cjs');
var ResponsiveElement = require('../../../../apps/mobile/src/Factory/ResponsiveElement.cjs');

const Link = ({
  variant,
  isExternal,
  as,
  children,
  to,
  href,
  ...props
}) => {
  const componentType = to ? "Router" : "a";
  const { t } = locale.useLanguage();
  const classes = React.useMemo(() => {
    const classes2 = [];
    if (!variant) {
      classes2.push(`kits-text-${as}`);
    } else {
      classes2.push(`kits-text-${variant}`);
    }
    return classes2.join(" ");
  }, [as, variant]);
  const { cssProps, nativeProps } = useSeparator.default(props);
  const componentProps = to ? { to } : {
    href,
    target: isExternal ? "_blank" : void 0,
    rel: isExternal ? "noopener noreferrer" : void 0
  };
  return /* @__PURE__ */ jsxRuntime.jsx(
    ResponsiveElement.default,
    {
      as: componentType,
      additionalClasses: classes,
      additionalStyles: {
        display: "flex",
        fontFamily: "var(--font-family)"
      },
      cssProps,
      nativeProps: nativeProps ? { ...componentProps, ...nativeProps } : componentProps,
      children
    }
  );
};

exports.default = Link;
//# sourceMappingURL=index.cjs.map
