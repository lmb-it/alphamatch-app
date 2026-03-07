import { jsxs, jsx } from 'react/jsx-runtime';
import { useMemo } from 'react';
import { useUploader } from '../MainUploader/index.js';
import 'axios';
import '../../../../../Contexts/DialogContext.js';
import '../../KitsSelect/SelectContext.js';
import Flex from '../../../UI/Flex/index.js';
import { Button } from '../../../Button/Button.js';
import 'primereact/tooltip';
import 'primereact/skeleton';

const SingleFileUploader = () => {
  const { onPick, files, removeFile, disabled, placeholder } = useUploader();
  const currentFileName = useMemo(() => {
    if (files.length > 0) return files[0]?.shortName;
    return null;
  }, [files]);
  return /* @__PURE__ */ jsxs(Flex, { w: "full", gap: 2, flexDirection: "row", children: [
    /* @__PURE__ */ jsx(
      Button,
      {
        label: currentFileName ? currentFileName : placeholder ?? "Choose file",
        onClick: onPick,
        w: "85%",
        disabled
      }
    ),
    /* @__PURE__ */ jsx(
      Button,
      {
        severity: "danger",
        icon: "pi pi-times",
        size: "md",
        w: 20,
        onClick: (e) => {
          e?.stopPropagation?.();
          if (files.length) removeFile(0)();
        },
        disabled: !currentFileName || disabled
      }
    )
  ] });
};

export { SingleFileUploader as default };
//# sourceMappingURL=index.js.map
