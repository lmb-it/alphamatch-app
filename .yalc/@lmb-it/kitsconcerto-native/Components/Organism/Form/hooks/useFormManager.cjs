'use strict';

var React = require('react');
var reactHookForm = require('react-hook-form');
var yup = require('@hookform/resolvers/yup');
var helpers = require('../utils/helpers.cjs');
var schemaBuilder = require('../utils/schemaBuilder.cjs');

const useFormManager = ({
  elements,
  onSubmit,
  onInvalidSubmit,
  id,
  onChange,
  onChangeSingleValue,
  // <-- Add this
  outputFormat = "Json"
}, isSubmitting, setIsSubmitting) => {
  React.useEffect(() => {
    try {
      helpers.checkNameDuplication(elements);
    } catch (error) {
      console.error("Form Configuration Error:", error);
    }
  }, [elements]);
  const defaultValues = React.useMemo(() => helpers.getDefaultValues(elements), [elements]);
  const schema = React.useMemo(() => schemaBuilder.schemaBuilder(elements), [elements]);
  const combinedChildIds = React.useMemo(() => helpers.getCombinedChildIds(elements), [elements]);
  const stripCombinedChildren = React.useCallback((data) => {
    if (combinedChildIds.size === 0) return data;
    const filtered = {};
    for (const [key, value] of Object.entries(data)) {
      if (!combinedChildIds.has(key)) {
        filtered[key] = value;
      }
    }
    return filtered;
  }, [combinedChildIds]);
  const formMethods = reactHookForm.useForm({
    resolver: yup.yupResolver(schema),
    defaultValues,
    shouldUnregister: false,
    mode: "onSubmit",
    reValidateMode: "onChange"
    // ... (defaultValues logic remains the same)
  });
  const onValidSubmit = React.useCallback(
    (rawData) => {
      const data = stripCombinedChildren(rawData);
      if (outputFormat === "FormData") {
        const formData = new FormData();
        for (const [key, value] of Object.entries(data)) {
          if (Array.isArray(value)) {
            if (value.length === 1 && value[0] instanceof File) {
              formData.append(key, value[0]);
            } else {
              value.forEach((item) => {
                if (item instanceof File) {
                  formData.append(`${key}[]`, item);
                } else if (typeof item === "number" || typeof item === "string") {
                  formData.append(`${key}[]`, item.toString());
                } else {
                  formData.append(`${key}[]`, JSON.stringify(item));
                }
              });
            }
          } else {
            if (value instanceof File) {
              formData.append(key, value);
            } else if (typeof value === "number" || typeof value === "string") {
              formData.append(key, value.toString());
            } else {
              formData.append(key, JSON.stringify(value));
            }
          }
        }
        onSubmit && onSubmit(formData, setIsSubmitting, formMethods);
      } else {
        onSubmit && onSubmit(data, setIsSubmitting, formMethods);
      }
    },
    [outputFormat, onSubmit, setIsSubmitting, formMethods, stripCombinedChildren]
  );
  const handleSubmitWrapper = React.useCallback(() => {
    formMethods.handleSubmit(onValidSubmit, (errors) => {
      setIsSubmitting(false);
      onInvalidSubmit?.(errors);
    })();
  }, [formMethods, onValidSubmit, setIsSubmitting, onInvalidSubmit]);
  function getValueByPath(obj, path) {
    return path.split(".").reduce((acc, key) => {
      if (acc === void 0 || acc === null) return void 0;
      return acc[key];
    }, obj);
  }
  React.useEffect(() => {
    const subscription = formMethods.watch((currentValues, { name, type }) => {
      onChange?.(stripCombinedChildren(currentValues));
      if (onChangeSingleValue && name && type === "change") {
        if (!combinedChildIds.has(name)) {
          const value = getValueByPath(currentValues, name);
          onChangeSingleValue(name, value);
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [formMethods.watch, onChange, onChangeSingleValue, stripCombinedChildren, combinedChildIds]);
  return {
    formMethods,
    // The original object for FormProvider
    isSubmitting,
    setIsSubmitting,
    handleSubmit: handleSubmitWrapper
    // The wrapped function for our UI
  };
};

exports.useFormManager = useFormManager;
//# sourceMappingURL=useFormManager.cjs.map
