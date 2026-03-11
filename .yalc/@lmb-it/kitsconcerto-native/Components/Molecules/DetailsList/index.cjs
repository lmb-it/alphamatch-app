'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');
var index = require('../UI/Box/index.cjs');
var index_native = require('../UI/HStack/index.cjs');
var index$1 = require('../UI/Flex/index.cjs');
var index_native$2 = require('../UI/Text/index.cjs');
var locale = require('../../../Hooks/locale.cjs');
require('../../../Contexts/DialogContext.cjs');
require('../../../Hooks/useKeyboardNavigation.cjs');
var index_native$1 = require('../UI/Heading/index.cjs');
var Button_native = require('../Button/Button.cjs');
var index_native$3 = require('../Form/KitsInput/InputText/index.cjs');
var SelectContext = require('../Form/KitsSelect/SelectContext.cjs');
var index_native$4 = require('../Form/KitsInput/InputTextarea/index.cjs');
var index_native$5 = require('../Form/KitsInput/InputNumber/index.cjs');
require('axios');
require('primereact/tooltip');
require('primereact/skeleton');

const DetailList = ({
  title,
  description,
  data,
  items,
  headerActions,
  itemActions
}) => {
  const { t } = locale.useLanguage();
  const [editingField, setEditingField] = React.useState(null);
  const [draftValue, setDraftValue] = React.useState(null);
  const [isSaving, setIsSaving] = React.useState(false);
  const handleEdit = (item) => {
    setEditingField(item.name);
    setDraftValue(data[item.name]);
  };
  const handleCancel = () => {
    setEditingField(null);
    setDraftValue(null);
  };
  const handleSave = async (item) => {
    if (item.onSave) {
      setIsSaving(true);
      try {
        await item.onSave(item.name, draftValue);
        setEditingField(null);
      } finally {
        setIsSaving(false);
      }
    } else {
      setEditingField(null);
    }
  };
  const renderControl = (item) => {
    const commonProps = {
      value: draftValue,
      onChange: (e) => setDraftValue(e.target ? e.target.value : e.value),
      w: "100%",
      ...item.inputProps
    };
    switch (item.type) {
      case "number":
        return /* @__PURE__ */ jsxRuntime.jsx(
          index_native$5.default,
          {
            value: draftValue,
            onChange: (e) => setDraftValue(e.value),
            style: { width: "100%" },
            ...item.inputProps
          }
        );
      case "textarea":
        return /* @__PURE__ */ jsxRuntime.jsx(index_native$4.default, { ...commonProps, rows: 3, autoResize: true });
      case "select":
        return /* @__PURE__ */ jsxRuntime.jsx(
          SelectContext.default,
          {
            shape: "dropdown",
            ...commonProps,
            list: item.list || [],
            labelKey: item.labelKey,
            valueKey: item.valueKey
          }
        );
      case "multiselect":
        return /* @__PURE__ */ jsxRuntime.jsx(
          SelectContext.default,
          {
            shape: "multiselect",
            ...commonProps,
            list: item.list || [],
            labelKey: item.labelKey,
            valueKey: item.valueKey
          }
        );
      case "text":
      default:
        return /* @__PURE__ */ jsxRuntime.jsx(index_native$3.default, { ...commonProps });
    }
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(index.default, { bgColor: "var(--surface-0)", p: "1.5rem", borderRadius: "0.75rem", children: [
    (title || description || headerActions) && /* @__PURE__ */ jsxRuntime.jsxs(index_native.default, { justifyContent: "space-between", alignItems: "flex-start", mb: "1.5rem", children: [
      /* @__PURE__ */ jsxRuntime.jsxs(index.default, { children: [
        title && (typeof title === "string" ? /* @__PURE__ */ jsxRuntime.jsx(
          index_native$1.default,
          {
            as: "h2",
            fontSize: "1.5rem",
            fontWeight: "600",
            fontColor: "var(--text-900)",
            mb: description ? "0.5rem" : "0",
            children: title
          }
        ) : title),
        description && (typeof description === "string" ? /* @__PURE__ */ jsxRuntime.jsx(index_native$2.default, { as: "p", fontColor: "var(--text-500)", fontSize: "0.875rem", children: description }) : description)
      ] }),
      headerActions && /* @__PURE__ */ jsxRuntime.jsx(index.default, { children: headerActions })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(index.default, { as: "ul", p: "0", m: "0", style: { listStyle: "none" }, children: items.map((item, index$2) => {
      const isEditing = editingField === item.name;
      const isLast = index$2 === items.length - 1;
      return /* @__PURE__ */ jsxRuntime.jsxs(
        index$1.default,
        {
          as: "li",
          alignItems: "center",
          py: "1rem",
          px: "0.5rem",
          style: {
            borderTop: "1px solid var(--surface-200)",
            borderBottom: isLast ? "1px solid var(--surface-200)" : "none"
          },
          flexWrap: "wrap",
          children: [
            /* @__PURE__ */ jsxRuntime.jsxs(index$1.default, { w: ["50%", null, "85%"], flexDirection: ["column", "row"], children: [
              /* @__PURE__ */ jsxRuntime.jsx(
                index_native$2.default,
                {
                  m: 0,
                  w: ["50%", null, "16.666%"],
                  fontColor: "var(--surface-500)",
                  fontWeight: "500",
                  fontSize: "0.875rem",
                  children: item.label
                }
              ),
              /* @__PURE__ */ jsxRuntime.jsx(
                index.default,
                {
                  w: ["100%", null, "66.666%"],
                  fontColor: "var(--text-900)",
                  lineHeight: item.type === "textarea" ? 1.5 : void 0,
                  children: isEditing ? renderControl(item) : item.body ? item.body(data[item.name], data) : data[item.name]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntime.jsxs(
              index$1.default,
              {
                w: ["50%", null, "15%"],
                justifyContent: "flex-end",
                alignItems: "center",
                gap: "0.5rem",
                children: [
                  itemActions && !isEditing && itemActions(item, data),
                  item.editable && !isEditing && /* @__PURE__ */ jsxRuntime.jsx(
                    Button_native.Button,
                    {
                      label: t("edit"),
                      icon: "pencil",
                      severity: "contrast",
                      outlined: true,
                      onClick: () => handleEdit(item)
                    }
                  ),
                  isEditing && /* @__PURE__ */ jsxRuntime.jsxs(index_native.default, { gap: "0.25rem", children: [
                    /* @__PURE__ */ jsxRuntime.jsx(
                      Button_native.Button,
                      {
                        icon: "pi pi-check",
                        severity: "success",
                        loading: isSaving,
                        onClick: () => handleSave(item),
                        "aria-label": t("save")
                      }
                    ),
                    /* @__PURE__ */ jsxRuntime.jsx(
                      Button_native.Button,
                      {
                        icon: "pi pi-times",
                        severity: "secondary",
                        disabled: isSaving,
                        onClick: handleCancel,
                        "aria-label": t("cancel")
                      }
                    )
                  ] })
                ]
              }
            )
          ]
        },
        item.name
      );
    }) })
  ] });
};

exports.default = DetailList;
//# sourceMappingURL=index.cjs.map
