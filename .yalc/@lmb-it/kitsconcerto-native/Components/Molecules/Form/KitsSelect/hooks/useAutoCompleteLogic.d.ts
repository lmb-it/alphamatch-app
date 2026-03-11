import type { IListItem } from "@lmb/kitsconcerto-types";
export interface AutoCompleteLogicProps {
    isMultiple?: boolean;
    forceSelection?: boolean;
    completeMethod?: (query: string) => void | Promise<any>;
    ref?: any;
}
/**
 * Shared logic for AutoComplete web & native.
 *
 * Provides: filterValue, handleOnChange, search, makeFallback,
 * inputValue/filteredList state, and selectedValue sync.
 */
export declare const useAutoCompleteLogic: (props: AutoCompleteLogicProps) => {
    inputValue: string | string[] | Record<string, any>;
    setInputValue: import("react").Dispatch<import("react").SetStateAction<string | string[] | Record<string, any>>>;
    filteredList: IListItem[];
    setFilteredList: import("react").Dispatch<import("react").SetStateAction<IListItem[]>>;
    isAll: boolean;
    filterValue: (incomingValue: any) => any;
    handleOnChange: (event: {
        originalEvent?: any;
        value: any;
    }) => void;
    search: (event: {
        originalEvent?: any;
        query: string;
    }) => void;
    makeFallback: (query: string) => IListItem[];
    list: import("@lmb/kitsconcerto-types").ITreeItem<any>[];
    childrenKey: string;
    labelKey: string;
    valueKey: string;
    outputValueKey: string;
    onChange: (e: any, item?: any) => void;
    selectedValue: any;
};
//# sourceMappingURL=useAutoCompleteLogic.d.ts.map