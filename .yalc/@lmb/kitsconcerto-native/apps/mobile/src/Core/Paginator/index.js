import { jsxs, jsx } from 'react/jsx-runtime';
import React, { forwardRef, useRef, useImperativeHandle, useMemo, useState } from 'react';
import { View, Text, Pressable, TextInput } from 'react-native';

const DEFAULT_LAYOUT = "FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown";
function resolvePT(ptValue, options) {
  if (!ptValue) return void 0;
  return typeof ptValue === "function" ? ptValue(options) : ptValue;
}
function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}
function formatReport(tpl, vars) {
  return tpl.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? `{${k}}`));
}
function getTemplateObj(template) {
  if (!template) return void 0;
  if (typeof template === "string") return { layout: template };
  return template;
}
function parseLayout(templateObj) {
  return (templateObj?.layout ?? DEFAULT_LAYOUT).split(/\s+/).map((t) => t.trim()).filter(Boolean);
}
function RowsPerPageDropdownToken({
  props,
  templateObj,
  unstyled,
  disabled,
  currentPageOne,
  pageCount,
  totalRecords,
  rows,
  rowsPerPageOptions,
  goTo,
  pt
}) {
  const [open, setOpen] = useState(false);
  const context = { active: false, disabled };
  const ptDrop = resolvePT(pt?.RPPDropdown, { props, context });
  const options = (rowsPerPageOptions ?? []).map((n) => Number(n)).filter((n) => Number.isFinite(n) && n > 0);
  const element = /* @__PURE__ */ jsxs(View, { className: unstyled ? "" : "relative", ...ptDrop, children: [
    /* @__PURE__ */ jsx(
      Pressable,
      {
        accessibilityRole: "button",
        accessibilityLabel: "Rows Per Page",
        disabled,
        onPress: () => setOpen((v) => !v),
        className: unstyled ? "" : "px-2 py-1 rounded border",
        children: /* @__PURE__ */ jsx(Text, { children: rows || options[0] || 0 })
      }
    ),
    open && !disabled && /* @__PURE__ */ jsx(View, { className: unstyled ? "" : "mt-2 border rounded p-2", children: options.map((opt) => /* @__PURE__ */ jsx(
      Pressable,
      {
        accessibilityRole: "button",
        onPress: () => {
          setOpen(false);
          goTo(0, opt);
        },
        className: unstyled ? "" : "py-1 px-2 rounded",
        children: /* @__PURE__ */ jsx(Text, { children: opt })
      },
      opt
    )) })
  ] });
  const custom = templateObj?.RowsPerPageDropdown;
  if (typeof custom === "function") {
    return custom({
      value: rows,
      options,
      onChange: (nextValue) => goTo(0, Number(nextValue)),
      appendTo: props.dropdownAppendTo,
      currentPage: currentPageOne,
      totalPages: pageCount,
      totalRecords,
      element,
      props,
      disabled
    });
  }
  return custom ?? element;
}
function JumpToPageInputToken({
  props,
  templateObj,
  unstyled,
  disabled,
  currentPageOne,
  pageCount,
  rows,
  goTo,
  pt
}) {
  const [value, setValue] = useState(String(currentPageOne));
  React.useEffect(() => {
    setValue(String(currentPageOne));
  }, [currentPageOne]);
  const context = { active: false, disabled };
  const ptInput = resolvePT(pt?.JTPInput, { props, context });
  const element = /* @__PURE__ */ jsx(
    TextInput,
    {
      keyboardType: "number-pad",
      value,
      onChangeText: setValue,
      onSubmitEditing: () => {
        const n = Number(value);
        if (!Number.isFinite(n)) return;
        const p = clamp(n - 1, 0, Math.max(0, pageCount - 1));
        goTo(p * rows, rows);
      },
      editable: !disabled,
      className: unstyled ? "" : "min-w-[48px] px-2 py-1 border rounded",
      ...ptInput
    }
  );
  const custom = templateObj?.JumpToPageInput;
  if (typeof custom === "function") {
    return custom({
      value: currentPageOne,
      onChange: (nextFirst, nextRows) => goTo(nextFirst, nextRows),
      disabled,
      className: "",
      element,
      props
    });
  }
  return custom ?? element;
}
function PageLinksToken({
  props,
  templateObj,
  unstyled,
  isDisabled,
  view,
  currentPageZero,
  currentPageOne,
  pageCount,
  totalRecords,
  rows,
  goTo,
  pt
}) {
  const ptPages = resolvePT(pt?.pages, { props, context: { active: false, disabled: isDisabled } });
  const pages = [];
  for (let p = view.startPage; p <= view.endPage; p++) {
    const active = p === currentPageZero;
    const context = { active, disabled: isDisabled };
    const ptBtn = resolvePT(pt?.pageButton, { props, context });
    const onClick = () => goTo(p * rows, rows);
    pages.push(
      /* @__PURE__ */ jsx(
        Pressable,
        {
          accessibilityRole: "button",
          accessibilityLabel: `Page ${p + 1}`,
          accessibilityState: { selected: active, disabled: isDisabled },
          disabled: isDisabled,
          onPress: onClick,
          className: unstyled ? "" : `px-2 py-1 rounded ${active ? "font-bold" : ""}`,
          ...ptBtn,
          children: /* @__PURE__ */ jsx(Text, { children: p + 1 })
        },
        p
      )
    );
  }
  const defaultEl = /* @__PURE__ */ jsx(View, { className: unstyled ? "" : "flex-row items-center gap-1", ...ptPages, children: pages });
  const custom = templateObj?.PageLinks;
  if (typeof custom === "function") {
    return custom({
      onClick: () => {
      },
      className: "",
      view,
      page: currentPageZero,
      currentPage: currentPageOne,
      totalPages: pageCount,
      totalRecords,
      rows,
      element: defaultEl,
      props
    });
  }
  return custom ?? defaultEl;
}
const Paginator = forwardRef((props, ref) => {
  const {
    totalRecords = 0,
    rows = 0,
    first = 0,
    pageLinkSize = 5,
    rowsPerPageOptions,
    alwaysShow,
    template,
    leftContent,
    rightContent,
    firstPageLinkIcon,
    prevPageLinkIcon,
    nextPageLinkIcon,
    lastPageLinkIcon,
    currentPageReportTemplate = "({currentPage} of {totalPages})",
    onPageChange,
    pt,
    unstyled,
    className,
    ...rootProps
  } = props;
  const rootRef = useRef(null);
  useImperativeHandle(ref, () => ({ getElement: () => rootRef.current }));
  const pageCount = useMemo(() => {
    if (!rows || rows <= 0) return 0;
    return Math.ceil(totalRecords / rows);
  }, [rows, totalRecords]);
  const currentPageZero = useMemo(() => {
    if (!rows || rows <= 0) return 0;
    return clamp(Math.floor(first / rows), 0, Math.max(0, pageCount - 1));
  }, [first, rows, pageCount]);
  const currentPageOne = currentPageZero + 1;
  const templateObj = getTemplateObj(template);
  const layoutTokens = parseLayout(templateObj);
  const goTo = (nextFirst, nextRows) => {
    const safeRows = nextRows > 0 ? nextRows : rows;
    const safePageCount = safeRows > 0 ? Math.ceil(totalRecords / safeRows) : 0;
    const maxFirst = Math.max(0, (safePageCount - 1) * safeRows);
    const safeFirst = clamp(nextFirst, 0, maxFirst);
    const ev = {
      first: safeFirst,
      rows: safeRows,
      page: safeRows > 0 ? Math.floor(safeFirst / safeRows) : 0,
      pageCount: safePageCount
    };
    onPageChange?.(ev);
  };
  const isDisabled = pageCount <= 0 || rows <= 0;
  const isFirst = currentPageZero <= 0;
  const isLast = currentPageZero >= pageCount - 1;
  const view = useMemo(() => {
    const size = Math.max(1, pageLinkSize);
    const half = Math.floor(size / 2);
    let startPage = currentPageZero - half;
    let endPage = currentPageZero + half;
    if (size % 2 === 0) endPage -= 1;
    if (startPage < 0) {
      endPage += -startPage;
      startPage = 0;
    }
    if (endPage > pageCount - 1) {
      const overflow = endPage - (pageCount - 1);
      startPage = Math.max(0, startPage - overflow);
      endPage = pageCount - 1;
    }
    return { startPage, endPage };
  }, [currentPageZero, pageCount, pageLinkSize]);
  if (!alwaysShow && pageCount <= 1) return null;
  const baseRootClass = unstyled ? "" : "flex-row items-center justify-between";
  const baseLeftClass = unstyled ? "" : "flex-row items-center gap-2";
  const baseRightClass = unstyled ? "" : "flex-row items-center gap-2";
  const ptRoot = resolvePT(pt?.root, { props, context: { active: false, disabled: isDisabled } });
  const ptLeft = resolvePT(pt?.left, { props, context: { active: false, disabled: isDisabled } });
  const ptEnd = resolvePT(pt?.end, { props, context: { active: false, disabled: isDisabled } });
  const renderToken = (token) => {
    switch (token) {
      case "FirstPageLink": {
        const disabled = isDisabled || isFirst;
        const context = { active: false, disabled };
        const ptBtn = resolvePT(pt?.firstPageButton, { props, context });
        const onClick = () => goTo(0, rows);
        const element = /* @__PURE__ */ jsx(
          Pressable,
          {
            accessibilityRole: "button",
            accessibilityLabel: "First Page",
            disabled,
            onPress: onClick,
            className: unstyled ? "" : "px-2 py-1 rounded",
            ...ptBtn,
            children: /* @__PURE__ */ jsx(Text, { children: firstPageLinkIcon ?? "\u23EE" })
          }
        );
        const custom = templateObj?.FirstPageLink;
        if (typeof custom === "function") {
          return custom({
            onClick,
            className: "",
            iconClassName: "",
            disabled,
            element,
            page: 0,
            currentPage: currentPageOne,
            totalPages: pageCount,
            totalRecords,
            rows,
            props
          });
        }
        return custom ?? element;
      }
      case "PrevPageLink": {
        const disabled = isDisabled || isFirst;
        const context = { active: false, disabled };
        const ptBtn = resolvePT(pt?.prevPageButton, { props, context });
        const onClick = () => goTo((currentPageZero - 1) * rows, rows);
        const element = /* @__PURE__ */ jsx(
          Pressable,
          {
            accessibilityRole: "button",
            accessibilityLabel: "Previous Page",
            disabled,
            onPress: onClick,
            className: unstyled ? "" : "px-2 py-1 rounded",
            ...ptBtn,
            children: /* @__PURE__ */ jsx(Text, { children: prevPageLinkIcon ?? "\u25C0" })
          }
        );
        const custom = templateObj?.PrevPageLink;
        if (typeof custom === "function") {
          return custom({
            onClick,
            className: "",
            iconClassName: "",
            disabled,
            element,
            page: Math.max(0, currentPageZero - 1),
            currentPage: currentPageOne,
            totalPages: pageCount,
            totalRecords,
            rows,
            props
          });
        }
        return custom ?? element;
      }
      case "NextPageLink": {
        const disabled = isDisabled || isLast;
        const context = { active: false, disabled };
        const ptBtn = resolvePT(pt?.nextPageButton, { props, context });
        const onClick = () => goTo((currentPageZero + 1) * rows, rows);
        const element = /* @__PURE__ */ jsx(
          Pressable,
          {
            accessibilityRole: "button",
            accessibilityLabel: "Next Page",
            disabled,
            onPress: onClick,
            className: unstyled ? "" : "px-2 py-1 rounded",
            ...ptBtn,
            children: /* @__PURE__ */ jsx(Text, { children: nextPageLinkIcon ?? "\u25B6" })
          }
        );
        const custom = templateObj?.NextPageLink;
        if (typeof custom === "function") {
          return custom({
            onClick,
            className: "",
            iconClassName: "",
            disabled,
            element,
            page: Math.min(pageCount - 1, currentPageZero + 1),
            currentPage: currentPageOne,
            totalPages: pageCount,
            totalRecords,
            rows,
            props
          });
        }
        return custom ?? element;
      }
      case "LastPageLink": {
        const disabled = isDisabled || isLast;
        const context = { active: false, disabled };
        const ptBtn = resolvePT(pt?.lastPageButton, { props, context });
        const onClick = () => goTo(Math.max(0, (pageCount - 1) * rows), rows);
        const element = /* @__PURE__ */ jsx(
          Pressable,
          {
            accessibilityRole: "button",
            accessibilityLabel: "Last Page",
            disabled,
            onPress: onClick,
            className: unstyled ? "" : "px-2 py-1 rounded",
            ...ptBtn,
            children: /* @__PURE__ */ jsx(Text, { children: lastPageLinkIcon ?? "\u23ED" })
          }
        );
        const custom = templateObj?.LastPageLink;
        if (typeof custom === "function") {
          return custom({
            onClick,
            className: "",
            iconClassName: "",
            disabled,
            element,
            page: Math.max(0, pageCount - 1),
            currentPage: currentPageOne,
            totalPages: pageCount,
            totalRecords,
            rows,
            props
          });
        }
        return custom ?? element;
      }
      case "PageLinks":
        return /* @__PURE__ */ jsx(
          PageLinksToken,
          {
            props,
            templateObj,
            unstyled,
            isDisabled,
            view,
            currentPageZero,
            currentPageOne,
            pageCount,
            totalRecords,
            rows,
            goTo,
            pt
          }
        );
      case "RowsPerPageDropdown":
        return /* @__PURE__ */ jsx(
          RowsPerPageDropdownToken,
          {
            props,
            templateObj,
            unstyled,
            disabled: isDisabled || !rowsPerPageOptions?.length,
            currentPageOne,
            pageCount,
            totalRecords,
            rows,
            rowsPerPageOptions,
            goTo,
            pt
          }
        );
      case "CurrentPageReport": {
        const firstIndex = totalRecords === 0 ? 0 : currentPageZero * rows + 1;
        const lastIndex = Math.min(totalRecords, (currentPageZero + 1) * rows);
        const text = formatReport(currentPageReportTemplate, {
          currentPage: currentPageOne,
          totalPages: pageCount,
          rows,
          first: firstIndex,
          last: lastIndex,
          totalRecords
        });
        const context = { active: false, disabled: isDisabled };
        const ptCurrent = resolvePT(pt?.current, { props, context });
        const element = /* @__PURE__ */ jsx(
          Text,
          {
            accessibilityLiveRegion: "polite",
            className: unstyled ? "" : "px-2",
            ...ptCurrent,
            children: text
          }
        );
        const custom = templateObj?.CurrentPageReport;
        if (typeof custom === "function") {
          return custom({
            currentPage: currentPageOne,
            totalPages: pageCount,
            first: firstIndex,
            last: lastIndex,
            rows,
            totalRecords,
            className: "",
            element,
            props
          });
        }
        return custom ?? element;
      }
      case "JumpToPageInput":
        return /* @__PURE__ */ jsx(
          JumpToPageInputToken,
          {
            props,
            templateObj,
            unstyled,
            disabled: isDisabled,
            currentPageOne,
            pageCount,
            rows,
            goTo,
            pt
          }
        );
      default:
        return null;
    }
  };
  return /* @__PURE__ */ jsxs(
    View,
    {
      ref: rootRef,
      className: `${baseRootClass} ${className ?? ""}`,
      ...rootProps,
      ...ptRoot,
      children: [
        /* @__PURE__ */ jsxs(View, { className: baseLeftClass, ...ptLeft, children: [
          leftContent,
          layoutTokens.map((t, i) => /* @__PURE__ */ jsx(React.Fragment, { children: renderToken(t) }, `${t}-${i}`))
        ] }),
        /* @__PURE__ */ jsx(View, { className: baseRightClass, ...ptEnd, children: rightContent })
      ]
    }
  );
});
Paginator.displayName = "Paginator";

export { Paginator };
//# sourceMappingURL=index.js.map
