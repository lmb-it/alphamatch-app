import type { IRadioCheckboxListItem } from "@lmb/kitsconcerto-types";
interface IRadioButtonProps<T> {
    item: IRadioCheckboxListItem<T>;
    selected: boolean;
    disabled?: boolean;
    isInvalid?: boolean;
    onToggle: () => void;
}
declare const RadioButton: <T>({ item, selected, disabled, isInvalid, onToggle, }: IRadioButtonProps<T>) => import("react/jsx-runtime").JSX.Element;
export default RadioButton;
//# sourceMappingURL=radiobutton.native.d.ts.map