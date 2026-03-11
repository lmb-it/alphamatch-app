import { type FieldValues } from 'react-hook-form';
import type { UseFieldLogicElementProps } from "@lmb/kitsconcerto-types";
/**
 * Renders a static, non-repeatable group of fields (a nested object).
 * It provides a layout wrapper and recursively renders its children with the correct nested path.
 */
export declare const ObjectElement: <T extends FieldValues>({ element, control, getValues, groupField, focusedField, setFocusedField, fieldLogic, }: UseFieldLogicElementProps<T>) => import("react/jsx-runtime").JSX.Element;
export default ObjectElement;
//# sourceMappingURL=index.d.ts.map