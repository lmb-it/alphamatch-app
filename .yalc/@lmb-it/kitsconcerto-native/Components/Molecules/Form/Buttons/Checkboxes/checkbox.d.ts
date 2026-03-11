import type { IRadioCheckboxListItem } from "@lmb/kitsconcerto-types";
interface CheckboxButtonProps<T> {
    item: IRadioCheckboxListItem<T>;
    selected: boolean;
    disabled?: boolean;
    isInvalid?: boolean;
    onToggle: () => void;
}
declare const CheckboxButton: <T>({ item, selected, disabled, isInvalid, onToggle, }: CheckboxButtonProps<T>) => import("react/jsx-runtime").JSX.Element;
export default CheckboxButton;
//# sourceMappingURL=checkbox.native.d.ts.map