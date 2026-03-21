'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var Yup = require('yup');
var index = require('../../../layout/Flex/index.cjs');
var index_native = require('../../../primitives/Text/index.cjs');

const Auth0PasswordStrength = ({
  value,
  show,
  schema
}) => {
  const condition = (con) => {
    return con ? "green" : "red";
  };
  if (!show) return null;
  return /* @__PURE__ */ jsxRuntime.jsx(index.default, { flexDirection: "column", p: 10, fontSize: "sm", children: schema.tests.map((test, index$1) => {
    const msg = test.OPTIONS?.message;
    const name = test.OPTIONS?.name;
    if (name === "required") return null;
    const ctx = {
      path: "password",
      parent: {},
      options: {},
      originalValue: value,
      resolve: (val) => val,
      createError: (params) => new Yup.ValidationError(
        params?.message?.toString() ?? "",
        value,
        "password"
      )
    };
    const testFn = test.OPTIONS?.test;
    const testing = testFn?.call(ctx, value);
    return /* @__PURE__ */ jsxRuntime.jsxs(
      index.default,
      {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        children: [
          /* @__PURE__ */ jsxRuntime.jsx(index_native.default, { color: condition(!!testing), children: testing ? "\u2713" : "\u2717" }),
          typeof msg === "string" ? /* @__PURE__ */ jsxRuntime.jsx(index_native.default, { fontSize: 13, children: msg }) : /* @__PURE__ */ jsxRuntime.jsx(index_native.default, { children: name })
        ]
      },
      index$1
    );
  }) });
};

exports.default = Auth0PasswordStrength;
//# sourceMappingURL=Strengthen.cjs.map
