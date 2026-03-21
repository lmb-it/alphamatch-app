import { jsxs, jsx } from 'react/jsx-runtime';
import { useMemo } from 'react';
import { useUploader } from '../MainUploader/index.js';
import Flex from '../../../layout/Flex/index.js';
import { Button } from '../../../components/Button/Button.js';
import { useLanguage } from '../../../hooks/locale.js';

const SingleFileUploader = () => {
  const { onPick, files, removeFile, disabled, placeholder } = useUploader();
  const { t } = useLanguage();
  const currentFileName = useMemo(() => {
    if (files.length > 0) return files[0]?.shortName;
    return null;
  }, [files]);
  return /* @__PURE__ */ jsxs(Flex, { w: "full", gap: 8, flexDirection: "row", alignItems: "center", children: [
    /* @__PURE__ */ jsx(
      Button,
      {
        label: currentFileName ?? placeholder ?? t("chooseFile"),
        severity: "secondary",
        outlined: true,
        w: "85%",
        onClick: onPick,
        disabled
      }
    ),
    /* @__PURE__ */ jsx(
      Button,
      {
        icon: "pi pi-times",
        size: "sm",
        severity: "danger",
        outlined: true,
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
