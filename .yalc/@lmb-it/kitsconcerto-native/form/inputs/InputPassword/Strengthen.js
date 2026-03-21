import { jsx, jsxs } from 'react/jsx-runtime';
import { ValidationError } from 'yup';
import Flex from '../../../layout/Flex/index.js';
import Text from '../../../primitives/Text/index.js';

const Auth0PasswordStrength = ({
  value,
  show,
  schema
}) => {
  const condition = (con) => {
    return con ? "green" : "red";
  };
  if (!show) return null;
  return /* @__PURE__ */ jsx(Flex, { flexDirection: "column", p: 10, fontSize: "sm", children: schema.tests.map((test, index) => {
    const msg = test.OPTIONS?.message;
    const name = test.OPTIONS?.name;
    if (name === "required") return null;
    const ctx = {
      path: "password",
      parent: {},
      options: {},
      originalValue: value,
      resolve: (val) => val,
      createError: (params) => new ValidationError(
        params?.message?.toString() ?? "",
        value,
        "password"
      )
    };
    const testFn = test.OPTIONS?.test;
    const testing = testFn?.call(ctx, value);
    return /* @__PURE__ */ jsxs(
      Flex,
      {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        children: [
          /* @__PURE__ */ jsx(Text, { color: condition(!!testing), children: testing ? "\u2713" : "\u2717" }),
          typeof msg === "string" ? /* @__PURE__ */ jsx(Text, { fontSize: 13, children: msg }) : /* @__PURE__ */ jsx(Text, { children: name })
        ]
      },
      index
    );
  }) });
};

export { Auth0PasswordStrength as default };
//# sourceMappingURL=Strengthen.js.map
