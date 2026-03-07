/**
 * Shared hook for Dropdown, MultiSelect, ListBox, CascadeSelect.
 * Computes grouped keys and provides common context values.
 */
export declare const useSelectBase: () => {
    isGrouped: boolean;
    keys: {
        optionLabel: string;
        optionValue: string;
        optionGroupLabel: string;
        optionGroupChildren: string;
    };
    onChange: (e: any, item?: any) => void;
    selectedValue: any;
    list: import("@lmb/kitsconcerto-types").ITreeItem<any>[];
    labelKey: string;
    valueKey: string;
    hideError?: boolean;
    outputValueKey: string;
    childrenKey: string | null;
};
//# sourceMappingURL=useSelectBase.d.ts.map