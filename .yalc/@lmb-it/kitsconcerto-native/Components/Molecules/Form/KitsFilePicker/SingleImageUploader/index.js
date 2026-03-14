import { jsxs, jsx } from 'react/jsx-runtime';
import { useMemo } from 'react';
import { useUploader } from '../MainUploader/index.js';
import { Icon } from '../../../../Atoms/Icon/index.js';
import 'axios';
import { useLanguage } from '../../../../../Hooks/locale.js';
import '../../../../../Contexts/DialogContext.js';
import '../../../../../Hooks/useKeyboardNavigation.js';
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
  const { t } = useLanguage();
  const current = useMemo(() => files.length ? files[0] : null, [files]);
  const uri = current && typeof current.file === "object" && "uri" in current.file ? current.file.uri : null;
  if (isClassicUploader) {
    return /* @__PURE__ */ jsxs(Flex, { w: "full", gap: 8, flexDirection: "row", alignItems: "center", children: [
      /* @__PURE__ */ jsx(
        Button,
        {
          label: uri ? t("changeImage") : t("chooseImage"),
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
          onClick: removeFile(0),
          disabled: !current || disabled
        }
      ),
      !!current?.name && /* @__PURE__ */ jsx(Text, { as: "span", fontSize: 13, color: "text-secondary", children: current.name })
    ] });
  }
  if (uri) {
    return /* @__PURE__ */ jsxs(Box, { w: "full", children: [
      /* @__PURE__ */ jsxs(Flex, { position: "relative", w: "full", children: [
        /* @__PURE__ */ jsx(
          Image,
          {
            w: "full",
            aspectRatio: 1.5,
            objectFit: "contain",
            src: uri,
            alt: "Preview",
            borderRadiusLeft: "lg",
            borderRadiusRight: "lg"
          }
        ),
        /* @__PURE__ */ jsx(
          Button,
          {
            icon: "pi pi-times",
            size: "sm",
            severity: "danger",
            style: {
              position: "absolute",
              right: 8,
              top: 8
            },
            onClick: removeFile(0),
            disabled
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        Button,
        {
          label: t("changeImage"),
          severity: "secondary",
          outlined: true,
          w: "full",
          mt: 8,
          onClick: onPick,
          disabled
        }
      )
    ] });
  }
  return /* @__PURE__ */ jsxs(
    Flex,
    {
      w: "full",
      borderWidth: 2,
      borderStyle: "dashed",
      borderColor: "brand.500",
      borderRadiusLeft: "lg",
      borderRadiusRight: "lg",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      py: 32,
      px: 16,
      gap: 8,
      onClick: onPick,
      opacity: disabled ? 0.5 : 1,
      children: [
        /* @__PURE__ */ jsx(Icon, { name: "cloud-upload", size: "lg", color: "brand.500" }),
        /* @__PURE__ */ jsx(Text, { fontSize: 14, color: "text-secondary", textAlign: "center", children: t("tapToUpload") })
      ]
    }
  );
};

export { SingleImageUploader as default };
//# sourceMappingURL=index.js.map
