import type { ChangeEventHandler, FocusEventHandler, ReactElement } from "react";
import type { IconType, IStyleClasses } from "@lmb/kitsconcerto-types";
import type { FieldError } from "react-hook-form";
type DivProps = {};
type IHelper = {
    helperText?: string;
};
export interface IRTLDetection {
    ignoreDirection?: boolean;
}
export type IElementLabel = string | {
    placement?: "RL" | "B" | "T";
    text?: string;
    element?: ReactElement;
} | ReactElement;
export interface IFormSingleElement extends IRTLDetection {
    id?: string;
    ref?: any;
    name?: string;
    onChange?: (e: React.ChangeEvent<any>, item?: any) => void;
    onFocus?: FocusEventHandler<any>;
    onBlur?: ChangeEventHandler<any>;
    isFloatedLabel?: boolean;
    defaultValue?: any;
    invalid?: boolean;
    disabled?: boolean;
    required?: boolean;
    hideError?: boolean;
    value?: any;
    inputSize?: "sm" | "md" | "lg";
    errors?: string | string[] | Record<string, FieldError> | FieldError;
    isChecked?: boolean;
    label?: IElementLabel;
    helperText?: IHelper["helperText"];
    rightAddon?: string | IconType | ReactElement;
    leftAddon?: string | IconType | ReactElement;
}
export interface IKitsContainer extends IFormSingleElement, Omit<DivProps, "onFocus" | "onBlur" | "onChange" | "defaultValue" | "value" | "ref" | "label" | "id">, IStyleClasses {
    containerStyle?: IStyleClasses;
    additionalClassName?: string;
}
export {};
//# sourceMappingURL=types.d.ts.map