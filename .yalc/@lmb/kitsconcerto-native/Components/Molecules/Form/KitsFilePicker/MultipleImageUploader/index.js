import { jsxs, jsx } from 'react/jsx-runtime';
import { useUploader } from '../MainUploader/index.js';
import 'react';
import 'axios';
import '../../../../../Contexts/DialogContext.js';
import '../../KitsSelect/SelectContext.js';
import Flex from '../../../UI/Flex/index.js';
import Image from '../../../UI/Image/index.js';
import Text from '../../../UI/Text/index.js';
import { Button } from '../../../Button/Button.js';
import 'primereact/tooltip';
import 'primereact/skeleton';

const MultipleImageUploader = () => {
  const { onPick, files, removeFile, disabled, limit, isClassicUploader } = useUploader();
  if (!isClassicUploader) {
    return /* @__PURE__ */ jsxs(Flex, { w: "full", gap: 2, children: [
      /* @__PURE__ */ jsx(Button, { label: "Upload", onClick: onPick, disabled }),
      /* @__PURE__ */ jsx(Button, { label: `${files.length}/${limit} Selected`, outlined: true, disabled: true })
    ] });
  }
  return /* @__PURE__ */ jsxs(Flex, { w: "full", gap: 2, children: [
    files.map((f, idx) => {
      const uri = typeof f.file === "object" && "uri" in f.file ? f.file.uri : null;
      return /* @__PURE__ */ jsxs(
        Flex,
        {
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
          children: [
            /* @__PURE__ */ jsxs(Flex, { flexDirection: "row", alignItems: "center", gap: 2, children: [
              uri ? /* @__PURE__ */ jsx(Image, { src: uri, alt: f.name }) : null,
              /* @__PURE__ */ jsx(Text, { as: "span", textOverflow: "ellipsis", whiteSpace: "nowrap", children: f.shortName })
            ] }),
            /* @__PURE__ */ jsx(
              Button,
              {
                icon: "pi pi-times",
                size: "md",
                w: 20,
                severity: "danger",
                onClick: removeFile(idx),
                disabled
              }
            )
          ]
        },
        `${f.name}-${idx}`
      );
    }),
    /* @__PURE__ */ jsx(
      Button,
      {
        label: "Add images",
        onClick: onPick,
        disabled: disabled || files.length >= limit
      }
    )
  ] });
};

export { MultipleImageUploader as default };
//# sourceMappingURL=index.js.map
