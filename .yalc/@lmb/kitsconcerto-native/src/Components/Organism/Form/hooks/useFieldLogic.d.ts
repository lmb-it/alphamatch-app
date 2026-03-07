import { type FieldValues } from 'react-hook-form';
import type { UseFieldLogicProps, UseFieldLogicReturn } from '@lmb/kitsconcerto-types';
/**
 * The core logic engine for an individual form field.
 * This hook replaces LogicContext and FormFieldContext. It watches dependencies,
 * calculates all dynamic properties (visibility, disabled state, required status, etc.),
 * and provides the necessary props from react-hook-form.
 *
 * @param {UseFieldLogicProps<T>} props - The element definition and form control.
 * @returns {UseFieldLogicReturn<T>} An object containing all necessary props and states for rendering the field.
 */
export declare const useFieldLogic: <T extends FieldValues>({ element: { onDepsChange, ...element }, control, getValues, isFocused, groupField, watchedValues }: UseFieldLogicProps<T>) => UseFieldLogicReturn<T>;
//# sourceMappingURL=useFieldLogic.d.ts.map