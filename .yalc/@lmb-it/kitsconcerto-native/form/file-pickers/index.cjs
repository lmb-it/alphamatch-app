'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var index_native$1 = require('./MainUploader/index.cjs');
var index_native = require('../helpers/FormContainer/index.cjs');

const FilePicker = (props) => {
  const { id, helperText, disabled, label, errors, hideError, invalid } = props;
  return /* @__PURE__ */ jsxRuntime.jsx(
    index_native.default,
    {
      id,
      className: "file-picker-component",
      disabled,
      label,
      hideError,
      errors,
      invalid,
      helperText,
      isFloatedLabel: false,
      children: /* @__PURE__ */ jsxRuntime.jsx(index_native$1.default, { name: id, ...props })
    }
  );
};

exports.default = FilePicker;
//# sourceMappingURL=index.cjs.map
