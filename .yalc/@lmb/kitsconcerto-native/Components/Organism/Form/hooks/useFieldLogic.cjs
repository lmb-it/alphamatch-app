'use strict';

var React = require('react');
var reactHookForm = require('react-hook-form');
require('yup');
var dynamicList = require('../utils/dynamicList.cjs');
var _ = require('lodash');

const useFieldLogic = ({
  element: { onDepsChange, ...element },
  control,
  getValues,
  isFocused,
  groupField,
  watchedValues
}) => {
  const formContext = reactHookForm.useFormContext();
  const prevDepsRef = React.useRef("");
  const watchedSig = React.useMemo(() => JSON.stringify(watchedValues), [watchedValues]);
  const allFormValues = React.useMemo(() => getValues(), [getValues, watchedSig]);
  const childElements = React.useMemo(() => {
    if (!("elements" in element)) {
      return [];
    }
    const elements = element.elements;
    if (typeof elements === "function") {
      return elements(watchedValues, allFormValues, {
        control,
        getValues,
        setValue: formContext.setValue
      }, groupField);
    }
    return elements;
  }, [watchedValues]);
  const resolvedProps = React.useMemo(() => {
    const getDynamicProp = (propName) => {
      const propValue = element[propName];
      if (typeof propValue === "function") {
        return propValue(watchedValues, allFormValues, formContext, groupField);
      }
      return propValue;
    };
    return {
      helperText: getDynamicProp("helperText"),
      leftAddon: getDynamicProp("leftAddon"),
      rightAddon: getDynamicProp("rightAddon"),
      keyFilter: getDynamicProp("keyFilter"),
      withMask: getDynamicProp("withMask")
      // ... resolve other dynamic props here
    };
  }, [watchedValues, allFormValues, element, control, getValues]);
  const lastListRef = React.useRef(void 0);
  const lastElementRef = React.useRef(null);
  const lastWatchedRef = React.useRef(null);
  const list = React.useMemo(() => {
    if (!("list" in element)) return void 0;
    const elementChanged = !_.isEqual(lastElementRef.current, element);
    const watchedChanged = !_.isEqual(lastWatchedRef.current, watchedValues);
    if (!elementChanged && !watchedChanged) {
      return lastListRef.current;
    }
    const nextList = dynamicList.dynamicList(
      element,
      watchedValues,
      allFormValues,
      groupField,
      formContext
    );
    lastElementRef.current = element;
    lastWatchedRef.current = watchedValues;
    lastListRef.current = nextList;
    return nextList;
  }, [watchedValues, allFormValues, control, getValues, element]);
  const isShown = React.useMemo(() => {
    const showLogic = element.show || element.logic?.show;
    if (typeof showLogic === "function") {
      return showLogic(watchedValues, allFormValues, {
        control,
        getValues,
        setValue: formContext.setValue
      }, groupField);
    }
    return true;
  }, [watchedValues, allFormValues, control, getValues, element]);
  const isDisabled = React.useMemo(() => {
    const disableLogic = element.isDisabled || element.logic?.disable;
    if (typeof disableLogic === "function") {
      return disableLogic(watchedValues, allFormValues, {
        control,
        getValues,
        setValue: formContext.setValue
      }, groupField);
    }
    return !!disableLogic;
  }, [watchedValues, allFormValues, control, getValues, element]);
  const isRequired = React.useMemo(() => {
    if (!("schema" in element) || !element.schema) return false;
    const schema = element.schema;
    const checkRequired = (schema2, parentValues) => {
      try {
        const type = schema2._type;
        const testValue = (() => {
          switch (type) {
            case "array":
              return [];
            case "object":
              return {};
            case "boolean":
              return void 0;
            case "number":
              return void 0;
            case "date":
              return void 0;
            default:
              return "";
          }
        })();
        schema2.validateSync(
          testValue,
          // simulating the field is empty
          {
            context: parentValues,
            // @ts-ignore
            parent: parentValues,
            abortEarly: false
          }
        );
        return false;
      } catch (err) {
        if (err?.inner?.length) {
          return err.inner.some(
            (e) => e.type === "required" || e.message?.toLowerCase().includes("required")
          );
        }
        return err?.type === "required" || err?.message?.toLowerCase().includes("required");
      }
    };
    const parent = groupField && groupField.index !== void 0 ? getValues?.()?.[groupField.name]?.[groupField.index] : getValues?.();
    return checkRequired(schema, parent);
  }, [element, watchedValues, allFormValues]);
  const label = React.useMemo(() => {
    if (typeof element.label === "function") {
      return element.label(watchedValues, allFormValues, {
        control,
        getValues,
        setValue: formContext.setValue
      }, groupField);
    }
    return element.label;
  }, [watchedValues, allFormValues, control, getValues, element]);
  const placeholder = React.useMemo(() => {
    if ("placeholder" in element && typeof element.placeholder === "function") {
      return element.placeholder(watchedValues, allFormValues, {
        control,
        getValues,
        setValue: formContext.setValue
      }, groupField);
    }
    return "placeholder" in element ? element.placeholder : void 0;
  }, [watchedValues, allFormValues, control, getValues, element]);
  const style = React.useMemo(() => {
    const s = "style" in element ? element.style : void 0;
    if (s && typeof s === "function") {
      return s(watchedValues, allFormValues, {
        control,
        getValues,
        setValue: formContext.setValue
      }, groupField);
    }
    return s;
  }, [watchedValues, allFormValues, control, getValues, element]);
  const layout = React.useMemo(() => {
    const getDynamicProp = (prop) => typeof prop === "function" ? prop(watchedValues, allFormValues, { control, getValues }) : prop;
    return {
      colSpan: getDynamicProp(element.logic?.colSpan ?? element.colSpan) ?? 12,
      rowSpan: getDynamicProp(element.rowSpan),
      columnGap: getDynamicProp(element.columnGap),
      rowGap: getDynamicProp(element.rowGap),
      colOffset: getDynamicProp(element.colOffset),
      area: getDynamicProp(element.area)
    };
  }, [watchedValues, allFormValues, control, getValues, element]);
  const onWatchedValuesChange = React.useCallback(() => {
    if (onDepsChange) {
      onDepsChange(watchedValues, allFormValues, formContext, groupField);
    }
  }, [watchedValues]);
  const { field, fieldState } = reactHookForm.useController({
    name: element.id,
    control,
    shouldUnregister: !isShown
  });
  React.useEffect(() => {
    if (!onDepsChange) return;
    const sig = JSON.stringify(watchedValues);
    if (sig === prevDepsRef.current) return;
    prevDepsRef.current = sig;
    onDepsChange(watchedValues, allFormValues, formContext, groupField);
  }, [onDepsChange, watchedValues, allFormValues, formContext, groupField]);
  return {
    field: {
      ...field,
      onChange: (event) => {
        if ("onChangeValue" in element && element?.onChangeValue) {
          const value = event != null && typeof event === "object" && "target" in event ? event.target.value : event;
          element.onChangeValue(
            value,
            { ...fieldState, isFocused: !!isFocused },
            formContext
          );
        }
        field.onChange(event);
      }
    },
    fieldState,
    watchedValues,
    onWatchedValuesChange,
    elements: childElements,
    isShown,
    isDisabled,
    isRequired,
    hideError: element.hideError,
    label,
    placeholder,
    formContext,
    layout,
    list,
    style,
    ...resolvedProps,
    localProps: "localProps" in element ? element?.localProps : void 0,
    animation: element.animation
  };
};

exports.useFieldLogic = useFieldLogic;
//# sourceMappingURL=useFieldLogic.cjs.map
