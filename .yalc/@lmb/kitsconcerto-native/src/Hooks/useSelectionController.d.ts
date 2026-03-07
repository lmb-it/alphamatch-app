import type { IRadioCheckboxListItem } from "@lmb/kitsconcerto-types";
type BooleanParams = {
    mode: "boolean";
    value?: boolean;
    defaultValue?: boolean;
    onChange?: (checked: boolean) => void;
};
type TristateParams = {
    mode: "tristate";
    value?: boolean | null;
    defaultValue?: boolean | null;
    onChange?: (val: boolean | null) => void;
};
type SingleParams<T> = {
    mode: "single";
    value?: T;
    defaultValue?: T;
    onChange?: (val: T) => void;
    allowDeselect?: boolean;
};
type MultiParams<T> = {
    mode: "multiple";
    value?: T[];
    defaultValue?: T[];
    onChange?: (val: T[]) => void;
};
type Params<T> = BooleanParams | TristateParams | SingleParams<T> | MultiParams<T>;
export default function useSelectionController<T = string>(params: Params<T>): {
    mode: "boolean" | "multiple" | "single" | "tristate";
    /**
     * The current state.
     * Type: boolean | null | T | T[]
     */
    value: any;
    /**
     * Call this to toggle or select an item.
     * @param input Optional. The value or item object (required for single/multi).
     */
    onChange: (input?: T | IRadioCheckboxListItem<T>) => void;
    /**
     * Helper to check if a specific value is selected.
     */
    isSelected: (itemValue: T | IRadioCheckboxListItem<T>) => boolean;
    /**
     * Derived boolean state (mostly for simple checkboxes).
     */
    checked: any;
};
export {};
//# sourceMappingURL=useSelectionController.d.ts.map