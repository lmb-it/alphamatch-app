'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');
var reactHookForm = require('react-hook-form');
require('yup');
require('lodash');
var useFormManager = require('./hooks/useFormManager.cjs');
var SubmitButton = require('./components/SubmitButton.cjs');
var index_native = require('./components/FormRenderer/index.cjs');
require('axios');
require('../../../Contexts/DialogContext.cjs');
require('../../../Hooks/useKeyboardNavigation.cjs');
require('../../Molecules/Form/KitsSelect/SelectContext.cjs');
var index = require('../../Molecules/UI/Flex/index.cjs');
require('primereact/tooltip');
require('primereact/skeleton');

const Form = ({
  elements,
  onSubmit,
  onInvalidSubmit,
  outputFormat = "Json",
  id = "go-markets-form",
  grid,
  onChangeSingleValue,
  onChange,
  submitButtonProps,
  onMount,
  ref,
  children,
  animation
}) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const { formMethods, handleSubmit } = useFormManager.useFormManager({
    elements,
    onSubmit,
    onInvalidSubmit,
    outputFormat,
    onChangeSingleValue,
    onChange,
    id
  }, isSubmitting, setIsSubmitting);
  const [focusedField, setFocusedField] = React.useState("");
  const { getValues, control, formState } = formMethods;
  React.useEffect(() => {
    onMount && onMount(formMethods);
  }, []);
  function createFormAppliers(deps) {
    const { setValue, reset, getValues: getValues2 } = deps;
    const setValues = (patch, opts = { shouldDirty: true }) => {
      const walk = (base, v) => {
        if (v !== null && typeof v === "object" && !Array.isArray(v)) {
          for (const [k, vv] of Object.entries(v)) {
            walk(base ? `${base}.${k}` : k, vv);
          }
        } else {
          setValue(base, v, opts);
        }
      };
      walk("", patch);
    };
    const mergeReset = (patch) => {
      if (!reset || !getValues2) return;
      const cur = getValues2();
      const deepMerge = (a, b) => {
        const out = Array.isArray(a) ? [...a] : { ...a };
        for (const k of Object.keys(b ?? {})) {
          const bv = b[k];
          out[k] = bv && typeof bv === "object" && !Array.isArray(bv) ? deepMerge(out[k] ?? {}, bv) : bv;
        }
        return out;
      };
      reset(deepMerge(cur, patch), {
        keepErrors: true,
        keepDirty: true,
        keepTouched: true,
        keepSubmitCount: true
      });
    };
    return { setValues, mergeReset };
  }
  const IRefReturn = React.useMemo(() => {
    return {
      id,
      setIsSubmitting,
      ...formMethods,
      ...createFormAppliers({
        setValue: formMethods.setValue,
        reset: formMethods.reset,
        getValues: formMethods.getValues
      }),
      onFormSubmit: handleSubmit
    };
  }, [handleSubmit, formMethods, setIsSubmitting, id]);
  React.useImperativeHandle(ref, () => {
    return IRefReturn;
  }, [formState]);
  return (
    // Pass ONLY the original, unmodified formMethods to the provider. This fixes the error.
    /* @__PURE__ */ jsxRuntime.jsx(reactHookForm.FormProvider, { ...formMethods, children: /* @__PURE__ */ jsxRuntime.jsxs(
      index.default,
      {
        id,
        w: "full",
        gap: 10,
        flexDirection: "column",
        position: "relative",
        entering: animation?.entering,
        exiting: animation?.exiting,
        animationDuration: animation?.animationDuration,
        animationDelay: animation?.animationDelay,
        children: [
          /* @__PURE__ */ jsxRuntime.jsx(
            index_native.FormRenderer,
            {
              elements,
              control,
              grid,
              getValues,
              focusedField,
              setFocusedField
            }
          ),
          typeof children === "function" ? children(IRefReturn) : children,
          submitButtonProps != "none" && /* @__PURE__ */ jsxRuntime.jsx(
            SubmitButton.SubmitButton,
            {
              submitButtonProps,
              formMethods,
              isSubmitting,
              handleSubmit
            }
          )
        ]
      }
    ) })
  );
};

exports.default = Form;
//# sourceMappingURL=Form.cjs.map
