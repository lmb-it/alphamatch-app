import { jsx, jsxs } from 'react/jsx-runtime';
import { useState, useEffect, useMemo, useImperativeHandle } from 'react';
import { FormProvider } from 'react-hook-form';
import 'yup';
import 'lodash';
import { useFormManager } from './hooks/useFormManager.js';
import { SubmitButton } from './components/SubmitButton.js';
import { FormRenderer } from './components/FormRenderer/index.js';
import 'axios';
import '../../../Contexts/DialogContext.js';
import '../../../Hooks/useKeyboardNavigation.js';
import '../../Molecules/Form/KitsSelect/SelectContext.js';
import Flex from '../../Molecules/UI/Flex/index.js';
import 'primereact/tooltip';
import 'primereact/skeleton';

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { formMethods, handleSubmit } = useFormManager({
    elements,
    onSubmit,
    onInvalidSubmit,
    outputFormat,
    onChangeSingleValue,
    onChange,
    id
  }, isSubmitting, setIsSubmitting);
  const [focusedField, setFocusedField] = useState("");
  const { getValues, control, formState } = formMethods;
  useEffect(() => {
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
  const IRefReturn = useMemo(() => {
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
  useImperativeHandle(ref, () => {
    return IRefReturn;
  }, [formState]);
  return (
    // Pass ONLY the original, unmodified formMethods to the provider. This fixes the error.
    /* @__PURE__ */ jsx(FormProvider, { ...formMethods, children: /* @__PURE__ */ jsxs(
      Flex,
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
          /* @__PURE__ */ jsx(
            FormRenderer,
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
          submitButtonProps != "none" && /* @__PURE__ */ jsx(
            SubmitButton,
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

export { Form as default };
//# sourceMappingURL=Form.js.map
