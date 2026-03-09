import { jsx, Fragment } from 'react/jsx-runtime';
import React, { useMemo } from 'react';
import '../../../../apps/mobile/src/ui/accordion/index.js';
import '../../../../apps/mobile/src/ui/actionsheet/index.js';
import '../../../../apps/mobile/src/ui/alert/index.js';
import '../../../../apps/mobile/src/ui/alert-dialog/index.js';
import '../../../../apps/mobile/src/ui/avatar/index.js';
import '../../../../apps/mobile/src/ui/badge/index.js';
import '../../../../apps/mobile/src/ui/bottomsheet/index.js';
import '../../../../apps/mobile/src/ui/box/index.js';
import '../../../../apps/mobile/src/ui/button/index.js';
import '../../../../apps/mobile/src/ui/card/index.js';
import '../../../../apps/mobile/src/ui/center/index.js';
import '../../../../apps/mobile/src/ui/checkbox/index.js';
import '../../../../apps/mobile/src/ui/divider/index.js';
import '../../../../apps/mobile/src/ui/drawer/index.js';
import '../../../../apps/mobile/src/ui/fab/index.js';
import 'react-native';
import '../../../../apps/mobile/src/ui/form-control/index.js';
import '../../../../apps/mobile/src/ui/gluestack-ui-provider/config.js';
import '@gluestack-ui/core/overlay/creator';
import '@gluestack-ui/core/toast/creator';
import 'nativewind';
import '../../../../apps/mobile/src/ui/grid/index.js';
import { Heading } from '../../../../apps/mobile/src/ui/heading/index.js';
import '../../../../apps/mobile/src/ui/hstack/index.js';
import '../../../../apps/mobile/src/ui/icon/index.js';
import '../../../../apps/mobile/src/ui/image/index.js';
import '../../../../apps/mobile/src/ui/image-background/index.js';
import '../../../../apps/mobile/src/ui/input/index.js';
import '../../../../apps/mobile/src/ui/link/index.js';
import '../../../../apps/mobile/src/ui/menu/index.js';
import '../../../../apps/mobile/src/ui/modal/index.js';
import '../../../../apps/mobile/src/ui/popover/index.js';
import '../../../../apps/mobile/src/ui/portal/index.js';
import '../../../../apps/mobile/src/ui/pressable/index.js';
import '../../../../apps/mobile/src/ui/progress/index.js';
import '../../../../apps/mobile/src/ui/radio/index.js';
import 'react-native-safe-area-context';
import '../../../../apps/mobile/src/ui/select/index.js';
import '../../../../apps/mobile/src/ui/skeleton/index.js';
import '../../../../apps/mobile/src/ui/slider/index.js';
import '../../../../apps/mobile/src/ui/spinner/index.js';
import '../../../../apps/mobile/src/ui/switch/index.js';
import '../../../../apps/mobile/src/ui/table/index.js';
import { Text } from '../../../../apps/mobile/src/ui/text/index.js';
import '../../../../apps/mobile/src/ui/textarea/index.js';
import '../../../../apps/mobile/src/ui/toast/index.js';
import '../../../../apps/mobile/src/ui/tooltip/index.js';
import '../../../../apps/mobile/src/ui/vstack/index.js';
import ResponsiveElement from '../../../../apps/mobile/src/Factory/ResponsiveElement.js';
import 'react-icons/fa';
import 'react-icons/ai';
import 'react-icons/io';
import '../../../../packages/types/src/Components/Molecules/Form/FilePicker/types/filesTypes.js';
import 'yup';
import '../../../../packages/types/src/Css/map/index.js';
import useSeparator from '../../../../apps/mobile/src/Factory/useSeparator.js';
import '../../../../apps/mobile/src/Factory/DimensionsContext.js';
import 'i18next';
import 'react-i18next';
import '../../../../apps/mobile/src/Core/AutoComplete/index.js';
import '../../../../apps/mobile/src/Core/Dropdown/index.js';
import '../../../../apps/mobile/src/Core/MultiSelect/index.js';
import '../../../../apps/mobile/src/Core/Trees/components/CoreTree.js';
import '../../../../apps/mobile/src/Core/Trees/components/CoreTreeSelect.js';
import '../../../../apps/mobile/src/Core/Trees/components/CoreToolbar.js';
import '../../../../apps/mobile/src/Core/Paginator/index.js';
import 'lucide-react-native';
import '../../../../apps/mobile/src/Core/SelectButton/index.js';
import '../../../../apps/mobile/src/Core/DataTable/DataTable.js';
import '../../../../apps/mobile/src/Core/Tag/index.js';
import '../../../../apps/mobile/src/Core/Badge/index.js';
import '../../../../apps/mobile/src/Core/ProgressBar/index.js';
import '../../../../apps/mobile/src/Core/Checkbox/index.js';
import '../../../../apps/mobile/src/Core/RadioButton/index.js';
import '../../../../Contexts/DialogContext.js';
import useComponentDefaults from '../../../../Hooks/useComponentDefaults.js';

const Card = (rawProps) => {
  const { mergedProps: cardProps, themeStyle } = useComponentDefaults("Card", rawProps);
  const {
    title,
    subTitle,
    header,
    footer,
    className,
    variant = "elevated",
    size = "md",
    ref,
    children: CardChildren,
    localProps,
    ...props
  } = cardProps;
  const { cssProps, nativeProps } = useSeparator({
    variant,
    size,
    ...props
  });
  const children = useMemo(() => {
    const ret = [];
    if (header) {
      ret.push(React.isValidElement(header) ? React.cloneElement(header, { key: "header" }) : /* @__PURE__ */ jsx(React.Fragment, { children: typeof header == "function" ? localProps ? header(localProps) : "" : header }, "header"));
    }
    if (title) {
      ret.push(
        /* @__PURE__ */ jsx(Heading, { size: "md", className: "mb-1", children: typeof title == "function" ? localProps ? title(localProps) : "" : title }, "title")
      );
    }
    if (subTitle) {
      ret.push(/* @__PURE__ */ jsx(Text, { children: typeof subTitle == "function" ? localProps ? subTitle(localProps) : "" : subTitle }, "subTitle"));
    }
    if (CardChildren) {
      ret.push(React.isValidElement(CardChildren) ? React.cloneElement(CardChildren, { key: "CardChildren" }) : /* @__PURE__ */ jsx(React.Fragment, { children: CardChildren }, "CardChildren"));
    }
    if (footer) {
      ret.push(React.isValidElement(footer) ? React.cloneElement(footer, { key: "footer" }) : /* @__PURE__ */ jsx(React.Fragment, { children: typeof footer == "function" ? localProps ? footer(localProps) : "" : footer }, "footer"));
    }
    return /* @__PURE__ */ jsx(Fragment, { children: ret });
  }, [header, title, subTitle, CardChildren]);
  const classes = useMemo(() => {
    const classes2 = [];
    classes2.push("shadow-hard-1");
    if (className) {
      classes2.push(className);
    }
    return classes2.join(" ");
  }, [className]);
  const { entering, exiting, ...restNativeProps } = nativeProps;
  return /* @__PURE__ */ jsx(
    ResponsiveElement,
    {
      ref,
      entering,
      exiting,
      additionalStyles: {
        display: "flex"
      },
      additionalClasses: classes,
      cssProps: { ...themeStyle, ...cssProps },
      nativeProps: restNativeProps,
      as: "Card",
      children
    }
  );
};

export { Card as default };
//# sourceMappingURL=index.js.map
