import { jsxs, jsx } from 'react/jsx-runtime';
import { useMemo } from 'react';
import { useUploader } from '../MainUploader/index.js';
import 'axios';
import '../../../../../Contexts/DialogContext.js';
import '../../KitsSelect/SelectContext.js';
import Flex from '../../../UI/Flex/index.js';
import Image from '../../../UI/Image/index.js';
import Text from '../../../UI/Text/index.js';
import Box from '../../../UI/Box/index.js';
import { Button } from '../../../Button/Button.js';
import 'primereact/tooltip';
import 'primereact/skeleton';

const SingleImageUploader = () => {
  const { onPick, files, removeFile, disabled, isClassicUploader } = useUploader();
  const current = useMemo(() => files.length ? files[0] : null, [files]);
  const uri = current && typeof current.file === "object" && "uri" in current.file ? current.file.uri : null;
  if (isClassicUploader) {
    return /* @__PURE__ */ jsxs(Flex, { w: "full", gap: 2, flexDirection: "row", alignItems: "center", children: [
      /* @__PURE__ */ jsx(
        Button,
        {
          label: "Choose image",
          w: "85%",
          onClick: onPick,
          disabled
        }
      ),
      /* @__PURE__ */ jsx(
        Button,
        {
          icon: "pi pi-times",
          size: "md",
          w: 20,
          severity: "danger",
          onClick: removeFile(0),
          disabled: !current || disabled
        }
      ),
      !!current?.name && /* @__PURE__ */ jsx(Text, { as: "span", children: current.name })
    ] });
  }
  return /* @__PURE__ */ jsxs(Box, { w: "full", gap: 2, children: [
    /* @__PURE__ */ jsxs(Flex, { w: "full", gap: 5, flexDirection: "row", children: [
      /* @__PURE__ */ jsx(
        Button,
        {
          label: uri ? "Change image" : "Choose image",
          w: "85%",
          onClick: onPick,
          disabled,
          flex: 75
        }
      ),
      /* @__PURE__ */ jsx(
        Button,
        {
          icon: "pi pi-times",
          size: "md",
          w: 20,
          severity: "danger",
          onClick: removeFile(0),
          disabled,
          flex: 1
        }
      )
    ] }),
    uri ? /* @__PURE__ */ jsx(Flex, { position: "relative", w: "full", children: /* @__PURE__ */ jsx(Image, { w: "full", aspectRatio: 1, objectFit: "contain", src: uri, alt: "Preview" }) }) : /* @__PURE__ */ jsx(Text, { as: "span", children: "Tap to pick an image" })
  ] });
};

export { SingleImageUploader as default };
//# sourceMappingURL=index.js.map
