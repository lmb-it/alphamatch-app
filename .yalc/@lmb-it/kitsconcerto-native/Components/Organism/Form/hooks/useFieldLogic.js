import { useRef, useMemo, useCallback, useEffect } from 'react';
import { useFormContext, useController } from 'react-hook-form';
import 'yup';
import { dynamicList } from '../utils/dynamicList.js';
import _ from 'lodash';

const useFieldLogic = ({
  element: { onDepsChange, ...element },
  control,
  getValues,
  isFocused,
  groupField,
  watchedValues
}) => {
  const formContext = useFormContext();
  const prevDepsRef = useRef("");
  const watchedSig = useMemo(() => JSON.stringify(watchedValues), [watchedValues]);
  const allFormValues = useMemo(() => getValues(), [getValues, watchedSig]);
  const childElements = useMemo(() => {
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
  const resolvedProps = useMemo(() => {
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
  const lastListRef = useRef(void 0);
  const lastElementRef = useRef(null);
  const lastWatchedRef = useRef(null);
  const list = useMemo(() => {
    if (!("list" in element)) return void 0;
    const elementChanged = !_.isEqual(lastElementRef.current, element);
    const watchedChanged = !_.isEqual(lastWatchedRef.current, watchedValues);
    if (!elementChanged && !watchedChanged) {
      return lastListRef.current;
    }
    const nextList = dynamicList(
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
  const isShown = useMemo(() => {
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
  const isDisabled = useMemo(() => {
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
  const isRequired = useMemo(() => {
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
  const label = useMemo(() => {
    if (typeof element.label === "function") {
      return element.label(watchedValues, allFormValues, {
        control,
        getValues,
        setValue: formContext.setValue
      }, groupField);
    }
    return element.label;
  }, [watchedValues, allFormValues, control, getValues, element]);
  const placeholder = useMemo(() => {
    if ("placeholder" in element && typeof element.placeholder === "function") {
      return element.placeholder(watchedValues, allFormValues, {
        control,
        getValues,
        setValue: formContext.setValue
      }, groupField);
    }
    return "placeholder" in element ? element.placeholder : void 0;
  }, [watchedValues, allFormValues, control, getValues, element]);
  const style = useMemo(() => {
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
  const layout = useMemo(() => {
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
  const onWatchedValuesChange = useCallback(() => {
    if (onDepsChange) {
      onDepsChange(watchedValues, allFormValues, formContext, groupField);
    }
  }, [watchedValues]);
  const { field, fieldState } = useController({
    name: element.id,
    control,
    shouldUnregister: !isShown
  });
  useEffect(() => {
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
    attached: element.attached,
    animation: element.animation
  };
};

export { useFieldLogic };
//# sourceMappingURL=useFieldLogic.js.map
