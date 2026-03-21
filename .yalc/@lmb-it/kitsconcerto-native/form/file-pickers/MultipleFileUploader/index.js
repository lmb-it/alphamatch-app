import { jsxs, jsx } from 'react/jsx-runtime';
import { useUploader } from '../MainUploader/index.js';
import Text from '../../../primitives/Text/index.js';
import { Icon } from '../../../primitives/Icon/index.js';
import Flex from '../../../layout/Flex/index.js';
import { Button } from '../../../components/Button/Button.js';
import 'react';
import { useLanguage } from '../../../hooks/locale.js';

const MultipleFileUploader = () => {
  const { onPick, files, removeFile, disabled, limit, placeholder, isClassicUploader } = useUploader();
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
    files.map((f, idx) => /* @__PURE__ */ jsxs(
      Flex,
      {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 8,
        children: [
          /* @__PURE__ */ jsx(
            Text,
            {
              as: "span",
              fontSize: 13,
              color: "text-secondary",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              flex: 1,
              children: f.shortName
            }
          ),
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
    )),
    /* @__PURE__ */ jsx(
      Button,
      {
        label: placeholder ?? t("chooseFile"),
        severity: "secondary",
        outlined: true,
        w: "full",
        onClick: onPick,
        disabled: disabled || files.length >= limit
      }
    )
  ] });
};

export { MultipleFileUploader as default };
//# sourceMappingURL=index.js.map
