import { jsx } from 'react/jsx-runtime';
import MainUploader from './MainUploader/index.js';
import KitsContainer from '../helpers/FormContainer/index.js';

const FilePicker = (props) => {
  const { id, helperText, disabled, label, errors, hideError, invalid } = props;
  return /* @__PURE__ */ jsx(
    KitsContainer,
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
      children: /* @__PURE__ */ jsx(MainUploader, { name: id, ...props })
    }
  );
};

export { FilePicker as default };
//# sourceMappingURL=index.js.map
