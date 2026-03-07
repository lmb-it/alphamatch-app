import type { IList } from "@lmb/kitsconcerto-types";
export declare const listToObject: (list: any[], labelKey: string, valueKey: string) => any[];
export declare const selectHelper: (customProps: any, field: any, value: any, listFetcher: any) => {
    isLoading: boolean;
    filteredOptions: IList[];
    onSearchValue: (dataItem: any) => void;
};
export declare function ClHelper({ isChecked, isInvalid, isDisabled, inputSize, }: {
    isChecked: boolean;
    isInvalid: boolean;
    isDisabled: boolean;
    inputSize: string;
}): string;
//# sourceMappingURL=Functions.d.ts.map