import { jsxs, jsx } from 'react/jsx-runtime';
import { useState } from 'react';
import Box from '../UI/Box/index.js';
import HStack from '../UI/HStack/index.js';
import Flex from '../UI/Flex/index.js';
import Text from '../UI/Text/index.js';
import '../../../Contexts/DialogContext.js';
import Heading from '../UI/Heading/index.js';
import { Button } from '../Button/Button.js';
import KitsInputText from '../Form/KitsInput/InputText/index.js';
import FormSelect from '../Form/KitsSelect/SelectContext.js';
import KitsInputTextarea from '../Form/KitsInput/InputTextarea/index.js';
import KitsInputNumber from '../Form/KitsInput/InputNumber/index.js';
import 'axios';
import 'primereact/tooltip';
import 'primereact/skeleton';

const DetailList = ({
  title,
  description,
  data,
  items,
  headerActions,
  itemActions
}) => {
  const [editingField, setEditingField] = useState(null);
  const [draftValue, setDraftValue] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
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
        return /* @__PURE__ */ jsx(
          KitsInputNumber,
          {
            value: draftValue,
            onChange: (e) => setDraftValue(e.value),
            style: { width: "100%" },
            ...item.inputProps
          }
        );
      case "textarea":
        return /* @__PURE__ */ jsx(KitsInputTextarea, { ...commonProps, rows: 3, autoResize: true });
      case "select":
        return /* @__PURE__ */ jsx(
          FormSelect,
          {
            shape: "dropdown",
            ...commonProps,
            list: item.list || [],
            labelKey: item.labelKey,
            valueKey: item.valueKey
          }
        );
      case "multiselect":
        return /* @__PURE__ */ jsx(
          FormSelect,
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
        return /* @__PURE__ */ jsx(KitsInputText, { ...commonProps });
    }
  };
  return /* @__PURE__ */ jsxs(Box, { bgColor: "var(--surface-0)", p: "1.5rem", borderRadius: "0.75rem", children: [
    (title || description || headerActions) && /* @__PURE__ */ jsxs(HStack, { justifyContent: "space-between", alignItems: "flex-start", mb: "1.5rem", children: [
      /* @__PURE__ */ jsxs(Box, { children: [
        title && (typeof title === "string" ? /* @__PURE__ */ jsx(
          Heading,
          {
            as: "h2",
            fontSize: "1.5rem",
            fontWeight: "600",
            fontColor: "var(--text-900)",
            mb: description ? "0.5rem" : "0",
            children: title
          }
        ) : title),
        description && (typeof description === "string" ? /* @__PURE__ */ jsx(Text, { as: "p", fontColor: "var(--text-500)", fontSize: "0.875rem", children: description }) : description)
      ] }),
      headerActions && /* @__PURE__ */ jsx(Box, { children: headerActions })
    ] }),
    /* @__PURE__ */ jsx(Box, { as: "ul", p: "0", m: "0", style: { listStyle: "none" }, children: items.map((item, index) => {
      const isEditing = editingField === item.name;
      const isLast = index === items.length - 1;
      return /* @__PURE__ */ jsxs(
        Flex,
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
            /* @__PURE__ */ jsxs(Flex, { w: ["50%", null, "85%"], flexDirection: ["column", "row"], children: [
              /* @__PURE__ */ jsx(
                Text,
                {
                  m: 0,
                  w: ["50%", null, "16.666%"],
                  fontColor: "var(--surface-500)",
                  fontWeight: "500",
                  fontSize: "0.875rem",
                  children: item.label
                }
              ),
              /* @__PURE__ */ jsx(
                Box,
                {
                  w: ["100%", null, "66.666%"],
                  fontColor: "var(--text-900)",
                  lineHeight: item.type === "textarea" ? 1.5 : void 0,
                  children: isEditing ? renderControl(item) : item.body ? item.body(data[item.name], data) : data[item.name]
                }
              )
            ] }),
            /* @__PURE__ */ jsxs(
              Flex,
              {
                w: ["50%", null, "15%"],
                justifyContent: "flex-end",
                alignItems: "center",
                gap: "0.5rem",
                children: [
                  itemActions && !isEditing && itemActions(item, data),
                  item.editable && !isEditing && /* @__PURE__ */ jsx(
                    Button,
                    {
                      label: "Edit",
                      icon: "pencil",
                      severity: "contrast",
                      outlined: true,
                      onClick: () => handleEdit(item)
                    }
                  ),
                  isEditing && /* @__PURE__ */ jsxs(HStack, { gap: "0.25rem", children: [
                    /* @__PURE__ */ jsx(
                      Button,
                      {
                        icon: "pi pi-check",
                        severity: "success",
                        loading: isSaving,
                        onClick: () => handleSave(item),
                        "aria-label": "Save"
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      Button,
                      {
                        icon: "pi pi-times",
                        severity: "secondary",
                        disabled: isSaving,
                        onClick: handleCancel,
                        "aria-label": "Cancel"
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

export { DetailList as default };
//# sourceMappingURL=index.js.map
