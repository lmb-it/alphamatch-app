import { jsxs, jsx } from 'react/jsx-runtime';
import { useUploader } from '../MainUploader/index.js';
import { Icon } from '../../../../Atoms/Icon/index.js';
import 'react';
import 'axios';
import { useLanguage } from '../../../../../Hooks/locale.js';
import '../../../../../Contexts/DialogContext.js';
import '../../../../../Hooks/useKeyboardNavigation.js';
import '../../KitsSelect/SelectContext.js';
import Flex from '../../../UI/Flex/index.js';
import Image from '../../../UI/Image/index.js';
import Text from '../../../UI/Text/index.js';
import { Button } from '../../../Button/Button.js';
import 'primereact/tooltip';
import 'primereact/skeleton';

const MultipleImageUploader = () => {
  const { onPick, files, removeFile, disabled, limit, isClassicUploader } = useUploader();
  const { t } = useLanguage();
  if (!isClassicUploader) {
    return /* @__PURE__ */ jsxs(Flex, { w: "full", flexDirection: "column", gap: 8, opacity: disabled ? 0.5 : 1, children: [
      /* @__PURE__ */ jsxs(
        Flex,
        {
          w: "full",
          borderW: 2,
          borderStyle: "dashed",
          borderColor: "primary",
          borderRadiusLeft: "lg",
          borderRadiusRight: "lg",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          py: 32,
          px: 16,
          gap: 8,
          onClick: onPick,
          children: [
            /* @__PURE__ */ jsx(Icon, { name: "cloud-upload", size: "lg", color: "primary" }),
            /* @__PURE__ */ jsx(Text, { fontSize: 14, color: "text-secondary", textAlign: "center", children: t("tapToUpload") })
          ]
        }
      ),
      files.length > 0 && /* @__PURE__ */ jsxs(Text, { fontSize: 13, color: "text-secondary", textAlign: "center", children: [
        t("filesSelected", files.length),
        " / ",
        limit
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxs(Flex, { w: "full", flexDirection: "column", gap: 8, children: [
    files.map((f, idx) => {
      const uri = typeof f.file === "object" && "uri" in f.file ? f.file.uri : null;
      return /* @__PURE__ */ jsxs(
        Flex,
        {
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 8,
          children: [
            /* @__PURE__ */ jsxs(Flex, { flexDirection: "row", alignItems: "center", gap: 8, flex: 1, children: [
              uri ? /* @__PURE__ */ jsx(
                Image,
                {
                  src: uri,
                  alt: f.name,
                  w: 48,
                  h: 48,
                  objectFit: "cover",
                  borderRadiusLeft: "md",
                  borderRadiusRight: "md"
                }
              ) : null,
              /* @__PURE__ */ jsx(
                Text,
                {
                  as: "span",
                  fontSize: 13,
                  color: "text-secondary",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  children: f.shortName
                }
              )
            ] }),
            /* @__PURE__ */ jsx(
              Button,
              {
                icon: "pi pi-times",
                size: "sm",
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
        label: t("addImages"),
        severity: "secondary",
        outlined: true,
        w: "full",
        onClick: onPick,
        disabled: disabled || files.length >= limit
      }
    )
  ] });
};

export { MultipleImageUploader as default };
//# sourceMappingURL=index.js.map
