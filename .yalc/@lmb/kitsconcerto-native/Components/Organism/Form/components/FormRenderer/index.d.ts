import React from 'react';
import type { Control, FieldValues, UseFormGetValues } from 'react-hook-form';
import type { GroupFieldConfigs, IFormElement } from '@lmb/kitsconcerto-types';
import type { IStyleClasses } from "@lmb/kitsconcerto-types";
interface FormRendererProps<T extends FieldValues> extends GroupFieldConfigs<T> {
    elements: IFormElement<T>[];
    control: Control<T>;
    getValues: UseFormGetValues<T>;
    parentPath?: string;
    grid?: IStyleClasses;
    focusedField?: string;
    setFocusedField: React.Dispatch<React.SetStateAction<string>>;
}
export declare const FormRenderer: <T extends FieldValues>({ elements, control, getValues, groupField, grid, parentPath, focusedField, setFocusedField }: FormRendererProps<T>) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=index.native.d.ts.map