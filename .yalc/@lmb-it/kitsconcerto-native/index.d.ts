import * as React$1 from 'react';
import React__default, { ComponentType, ReactNode, ReactElement, Ref, CSSProperties, RefObject, MouseEventHandler, ElementType, JSX, ChangeEvent, FC, PropsWithChildren, FunctionComponent, Dispatch, SetStateAction, RefCallback } from 'react';
import * as react_jsx_runtime from 'react/jsx-runtime';
import * as react_native from 'react-native';
import { ViewStyle, ColorValue as ColorValue$1, ViewProps, TextProps as TextProps$1, ImageProps, Text as Text$1, ScrollViewProps, GestureResponderEvent, NativeSyntheticEvent, TextInputKeyPressEventData, TargetedEvent, NativeScrollEvent, StyleProp, TextInput } from 'react-native';
import { FieldValues, UseFormReturn, ControllerFieldState, UseFieldArrayReturn, ControllerRenderProps, Control, UseFormGetValues, SubmitErrorHandler, DeepPartial as DeepPartial$1, FieldError } from 'react-hook-form';
import * as Yup from 'yup';
import { AnyObject } from 'yup';
import { DatePickerOptions } from '@react-native-community/datetimepicker';
import { FaFilePdf, FaFileAudio, FaFileCsv, FaFileImage } from 'react-icons/fa';
import { AiFillFileUnknown } from 'react-icons/ai';
import { IoLogoJavascript } from 'react-icons/io';
import * as _gluestack_ui_utils_nativewind_utils from '@gluestack-ui/utils/nativewind-utils';
import { VariantProps } from '@gluestack-ui/utils/nativewind-utils';
import * as tailwind_merge from '/Volumes/Data/IT/AlphaMatch/KitsConcerto/node_modules/tailwind-merge/dist/index.d.ts';
import moment from 'moment/moment';
import { AxiosResponse } from 'axios';

declare const IconMap: Record<string, ComponentType<any>>;

export type EnteringAnimation =
    | 'fadeIn'
    | 'fadeInUp'
    | 'fadeInDown'
    | 'fadeInLeft'
    | 'fadeInRight'
    | 'slideInUp'
    | 'slideInDown'
    | 'slideInLeft'
    | 'slideInRight'
    | 'zoomIn'
    | 'zoomInUp'
    | 'zoomInDown'
    | 'zoomInLeft'
    | 'zoomInRight'
    | 'scaleIn'
    | 'bounceIn'
    | 'flip'
    | 'flipUp'
    | 'flipLeft'
    | 'flipRight';

export type ExitingAnimation =
    | 'fadeOut'
    | 'fadeOutUp'
    | 'fadeOutDown'
    | 'fadeOutLeft'
    | 'fadeOutRight'
    | 'slideOutUp'
    | 'slideOutDown'
    | 'slideOutLeft'
    | 'slideOutRight'
    | 'zoomOut'
    | 'bounceOut';

export interface IKitsAnimation {
    entering?: EnteringAnimation;
    exiting?: ExitingAnimation;
    animationDuration?: number;
    animationDelay?: number;
}

/**
 * Optional platform-specific overrides (Web injects router `To`, Native doesn't)
 */
export interface ILinkOverrides {
    To?: any; // Web: import { To } from "react-router-dom"
}

/**
 * Permission types (used in both menu & page)
 */
export interface Permissions<T = string> {
    permissionsRequired?: T | T[];
    permissionsOptional?: T[];
    loginNotRequired?: boolean;
}

/**
 * Section/page definition
 */
export interface IPageISection<
    T = string,
    L extends ILinkOverrides = ILinkOverrides
> extends Permissions<T> {
    id?: string;
    icon?: ReactNode;
    title: string;
    path?: L["To"];
    collapsable?:boolean;
    defaultOpen?:boolean;
    badge?:string;
    element?: ReactNode | null;
}

/**
 * Recursive menu definition
 */
export interface IMenuItem<
    T = string,
    L extends ILinkOverrides = ILinkOverrides
> extends IPageISection<T, L> {
    hide?: boolean;
    content?: ReactElement;
    links?: IMenuItem<T, L>[];
}

// --- Basic Building Blocks ---



export type ILabelElement = string | ReactElement;
export type IFormGrid = IStyleClasses;


/** Basic interface for address details from a location component. */


// --- Component-Specific Prop Extensions ---
// These are direct props passed to the underlying UI components.

export type ITextInputProps = IKitsInputText | IKitsInputMask;
export type IPasswordProps = Omit<IKitsInputPassword, 'value' | 'onChange'>; // Example
export type IDateProps = IKitsInputCalendar;
export type INumberProps = IKitsInputNumber;

// types/user.types.ts



// --- Logic and Dynamic Properties ---

// --- Type definitions for repeatable buttons, giving them full context ---
export interface IButtonParams {
    /** The current number of items in the group. */
    total: number;
    /** A function to add a new item to the end of the group. */
    append: () => void;
    /** A function to remove a specific item from the group. */
    remove: () => void;
    /** The index of the current item (only available for the minusButton within a row). */
    index?: number;
}

export type IPlusButton = (total: number, append: IButtonParams['append']) => ReactNode;
export type IMinusButton = (total: number, append: IButtonParams['remove'], index?: number) => ReactNode;


export interface IRepeatableSettings {
    plusButton?: IPlusButton;
    minusButton?: IMinusButton;
    maxRepeats?: number;
    minRepeats?: number;
}

export interface IGroupSettings {
    repeatable?: IRepeatableSettings;
    grid?: IFormGrid; // The grid layout for the nested fields
    removeButtonRow?: IMinusButton;
    ref?: Ref<UseFieldArrayReturn<any>>;
}

/**
 * Defines a function that can be used for dynamic properties.
 * It receives watched values, all form values, and the form context.
 */
export type LogicFunction<T extends FieldValues, R = any> = (
    watchedValues: any[],
    allFormValues: T,
    formContext: UseFormReturn<T>,
    groupField: GroupFieldConfigs<T>['groupField'],
) => R;

export type IChildrenParams<F extends FieldValues, T extends FieldValues> = [
    field: F,
    formContext: UseFormReturn<T>,
    group?: GroupFieldConfigs<T>['groupField'],
    watchedValues?: any
]
export type IChildren<F extends FieldValues, T extends FieldValues> =
    | ((...args: IChildrenParams<F, T>) => ReactElement)
    | ReactElement;

export type Shapes = "dropdown" | "multiselect" | "autocomplete" | "listBox" | "treeSelect" | "cascade";
/** A value that can either be static or dynamically calculated by a LogicFunction. */
export type DynamicValue<T extends FieldValues, R> = R | LogicFunction<T, R>;


export type IElementStyle = {
    container?: IStyleClasses;
    label?: IStyleClasses;
    input?: IStyleClasses;
    helperText?: IStyleClasses;
    errorMessage?: IStyleClasses;
}

/** Core properties shared by all form elements. */
export interface IElementBase<T extends FieldValues> {
    /** The unique identifier for the field. */
    id: keyof T | string;
    /** The label displayed for the field. */
    label?: DynamicValue<T, ILabelElement>;
    /** A list of field IDs to watch for changes. */
    deps?: (string | '*.current')[];

    onDepsChange?: LogicFunction<T, void>
    /** Advanced logic for dynamic properties, an alternative to individual function props. */
    logic?: {
        deps?: (string | '*.current')[];
        show?: LogicFunction<T, boolean>;
        disable?: LogicFunction<T, boolean>;
        colSpan?: LogicFunction<T, IStyleClasses["colSpan"]>;
    };
    /** A function to determine if the element should be rendered. */
    show?: LogicFunction<T, boolean>;
    /** A function or boolean to disable the element. */
    isDisabled?: DynamicValue<T, boolean>;
    /** Yup schema for validation. */
    schema?: Yup.Schema | Yup.AnySchema;
    /** The initial value of the field. */
    initialValue?: any;
    /** Grid layout properties. */
    hideError?: boolean;
    displayOnly?: boolean;
    /** When true, the molecule component renders without its KitsContainer wrapper (no label, no error). */
    attached?: boolean;
    placeholder?: DynamicValue<T, string>;
    colSpan?: DynamicValue<T, KitsResponsiveValue<string | number>>;
    rowSpan?: DynamicValue<T, KitsResponsiveValue<string | number>>;
    colOffset?: DynamicValue<T, KitsResponsiveValue<string | number>>;
    columnGap?: DynamicValue<T, KitsResponsiveValue<string | number>>;
    rowGap?: DynamicValue<T, KitsResponsiveValue<string | number>>;
    area?: DynamicValue<T, KitsResponsiveValue<string>>;
    leftAddon?: DynamicValue<T, ReactElement | IconType | string>;
    rightAddon?: DynamicValue<T, ReactElement | IconType | string>;
    /** Helper text displayed below the field. */
    helperText?: DynamicValue<T, string | ReactElement>;
    onChangeValue?: (
        value: any,
        fieldState: ControllerFieldState & { isFocused: boolean },
        formContext: UseFormReturn<T>,
    ) => void;
    style?: DynamicValue<T, IElementStyle>
    /** Animation props for enter/exit transitions on the field wrapper. */
    animation?: IKitsAnimation;
}

// --- Specific Element Types ---

export interface ITextFieldProps<T extends FieldValues = any> extends IElementBase<T> {
    keyFilter?: EKeyFilter | RegExp;
}

export interface ITextInput<T extends FieldValues = any> extends ITextFieldProps<T> {
    type: 'Text';
    keyFilter?: EKeyFilter | RegExp;
    withMask?: boolean;
    localProps?: ITextInputProps;
}


export interface IColorPicker<T extends FieldValues = any> extends ITextFieldProps<T> {
    type: "ColorPicker";
    colorFormat?: 'hex' | 'rgb' | 'hsb';
    inline?: boolean;
}

export interface IPassword<T extends FieldValues = any> extends ITextFieldProps<T> {
    type: 'Password';
    toggleEye?: boolean;
    showStrengthProgress?: boolean;
    localProps?: IPasswordProps;
}

export interface ITextarea<T extends FieldValues = any> extends ITextFieldProps<T> {
    type: 'Textarea';
    rows?: number;
    cols?: number;
    autoResize?: boolean;
}

export interface INumberInput<T extends FieldValues = any> extends Omit<ITextFieldProps<T>, 'initialValue'> {
    type: 'Number';
    keyFilter?: EKeyFilter | RegExp;
    initialValue?: number;
    localProps?: any;
}


export interface IEmail<T extends FieldValues = any> extends ITextFieldProps<T> {
    type: "Email";
    localProps?: IRTLDetection;
}

export interface ISelectBase<T extends FieldValues = any> extends IElementBase<T> {
    list: DynamicValue<T, any[] | Promise<any[]>>;
    placeholder?: DynamicValue<T, string>;
    labelKey?: string;
    valueKey?: string;
    outputValueKey?: string;
    childrenKey?: string;
    withFilter?: boolean;
    filterBy?: string;
    emptyFilterMessage?: ReactNode;
    virtualScroll?: boolean;
}

// --- Specific Select Shape Definitions ---

export interface IFormSelect<T extends FieldValues = any> extends ISelectBase<T> {
    type: 'Select'; // Corresponds to 'dropdown' shape
    withArrow?: boolean;
}

export interface IMultiselect<T extends FieldValues = any> extends ISelectBase<T> {
    type: 'Multiselect';
    withArrow?: boolean;
    valueMode?: 'chip' | 'comma';
    selectionLimit?: number
}

export interface ITags<T extends FieldValues = any> extends ISelectBase<T> {
    type: 'Tags'; // Corresponds to 'autocomplete' shape
    isMultiple?: boolean;
    forceSelection?: boolean;
    completeMethod?: (query: string) => Promise<any[]>;
    selectionLimit?: number;
}

export interface IListBoxElement<T extends FieldValues = any> extends ISelectBase<T> {
    type: 'ListBox';
    isMultiple?: boolean;
    selectionLimit?: number;
}

export interface ITreeSelectElement<T extends FieldValues = any> extends ISelectBase<T> {
    type: 'TreeSelect';
    isMultiple?: boolean;
    isStructured?: boolean;
    valueMode?: 'chip' | 'comma';
    selectionLimit?: number;
    onlyParentsWithChildren?: boolean;
}

export interface ICheckbox<T extends FieldValues = any> extends IElementBase<T> {
    type: 'Checkbox';
    mode?: "labeled" | "images" | "custom";
    list: DynamicValue<T, IRadioCheckboxListItem[]>;
    vertical?: boolean;
}

export interface IRadioGroup<T extends FieldValues = any> extends IElementBase<T> {
    type: 'Radios';
    mode?: "labeled" | "images" | "custom";
    list: DynamicValue<T, IRadioCheckboxListItem[]>;
    vertical?: boolean;
}

export interface IDate<T extends FieldValues = any> extends ITextFieldProps<T> {
    type: 'Date';
    localProps?: IKitsInputCalendar['localProps'];
}

export interface ISwitch<T extends FieldValues = any> extends IElementBase<T> {
    type: 'Switch';
}

export interface IFile<T extends FieldValues = any> extends IElementBase<T> {
    type: IFileUploaderTypes;
    multiple?: boolean;
    limit?: number;
    maxFileSize?: number; // in KB
    minFileSize?: number; // in KB
    acceptedTypes?: (IImagesExtTypeKeys | IFilesExtTypeKeys)[];
    classicUploader?: boolean;
    /** Custom render template for the uploader UI */
    template?: FileUploaderTemplate;
}

export interface ILocation<T extends FieldValues = any> extends ITextFieldProps<T> {
    type: 'Location';
    forceSelection?: boolean;
    countryISO?: string;
    apiKey: string;
    provider?: 'google' | 'experian';
    onAddressClick?: (address: IAddressFormat) => void;
}

export interface IPhone<T extends FieldValues = any> extends IElementBase<T> {
    type: "Phone";
    isWithCountryCode?: boolean;
    inputSize?: "sm" | "md" | "lg";
    /** Default country ISO code for initial flag display (e.g., "US") */
    defaultCountry?: string;
    /**
     * Controls the shape of the onChange output.
     * - "string": emits E.164 string (e.g., "+15551234567")
     * - "object": emits IPhoneObjectValue with countryCode, nationalNumber, formatted values
     * @default "string"
     */
    outputFormat?: 'string' | 'object';
    /** @deprecated No longer needed — country selection removed */
    labelKey?: string;
    /** @deprecated No longer needed — country selection removed */
    valueKey?: string;
    /** @deprecated Masking is now handled automatically */
    withMask?: boolean;
    customCountriesCodesList?: { name: string; code: string | number; iso?: string; flag?: string }[];
    excludedCountries?: string[];
    includedCountries?: string[];
}

export interface IButton extends IButtonProps<any> {
    label: string;
    ref?: Ref<IButton> | undefined
}

export interface IObjectGroup<T extends FieldValues = any> extends IElementBase<T> {
    type: 'Object';
    elements: DynamicValue<T, IFormElement<T>[]>;
    grid?: IFormGrid;
}

export interface IGroup<T extends FieldValues = any> extends IElementBase<T> {
    type: 'Group';
    elements: DynamicValue<T, IFormElement<T>[]>;
    groupsSettings?: IGroupSettings;
    // Add repeatable settings if needed
}


export interface IContainer<T extends FieldValues = any> extends IElementBase<T> {
    type: 'Container';
    /**
     * A render prop that receives the form's context and group-specific values.
     * This allows for creating complex, custom layouts and dynamic fields.
     */
    children: IChildren<ControllerRenderProps<T, any>, T>;
}

/**
 * A Combined element groups multiple child inputs under one logical field.
 * It renders a single container with one label and one validation schema,
 * while internally rendering multiple input elements.
 *
 * The `output` prop defines how the final value is derived from child values:
 * - A template string referencing child IDs (e.g., "firstName middleName lastName")
 *   will concatenate the child values with spaces.
 * - A single child ID (e.g., "stateRef") will map the output to that child's value directly.
 */
export interface ICombined<T extends FieldValues = any> extends IElementBase<T> {
    type: 'Combined';
    /** Child form elements rendered inside the Combined container. */
    elements: IFormElement<T>[];
    /**
     * Defines how the final value is produced from child field values.
     * - Multi-token string (e.g., "fname mname lname"): concatenates child values with spaces.
     * - Single token string (e.g., "stateRef"): maps output to that child's value directly.
     */
    output: string;
    /** Grid layout for the child elements. */
    grid?: IFormGrid;
}

// --- Union Type ---

export interface IFileUploaderElement<T extends FieldValues = any> extends IElementBase<T> {
    type: 'File' | 'Image';
    onChange?: (files: File[], base64Data: {
        filename: string;
        value: string;
    }[]) => void,
    onError?: (err: any) => void;
    classicUploader?: boolean;
    multiple?: boolean;
    limit?: number;
    minFileSize?: number;
    maxFileSize?: number;
    initialUri?: string | string[];
    placeholder?: string;
    acceptedTypes?: (IImagesExtTypeKeys | IFilesExtTypeKeys)[];
    /** Custom render template for the uploader UI */
    template?: FileUploaderTemplate;
}


export type IFormSelectElements<T extends FieldValues = FieldValues> =
    | IFormSelect<T>
    | IMultiselect<T>
    | ITags<T>
    | IListBoxElement<T>
    | ITreeSelectElement<T>

export type IFormListsElements<T extends FieldValues = FieldValues> =
    ICheckbox<T>
    | IRadioGroup<T>
    | IFormSelectElements<T>

/** The single, unified type representing any possible form element a developer can define. */
export type IFormElement<T extends FieldValues = FieldValues> =
    | IObjectGroup<T>
    | IGroup<T>
    | ICombined<T>
    | ITextInput<T>
    | INumberInput<T>
    | ITextarea<T>
    | IFileUploaderElement<T>
    | IEmail<T>
    | IDate<T>
    | IPassword<T>
    | IPhone<T>
    | ILocation<T>
    | ISwitch<T>
    | IFormListsElements<T>
    | IContainer<T>
    | IFile<T>
    | IColorPicker<T>;

// types/internal.types.ts



export type GroupFieldConfigs<T extends FieldValues> = {
    groupField?:{
        index:number;
        name:string;
        values:any
    };
}

export type OnSubmitHandler<T extends FieldValues | FormData> = ((
    data: T,
    setIsSubmitting: (isSubmitting:boolean)=>void,
    formContext?: UseFormReturn<T>
) => void);

export type CustomSubmitButtonProps =
    | "none"
    | ReactElement
    | ((
    onSubmit: () => void,
    isSubmitting: boolean,
    formContext?: UseFormReturn<any>,
) => ReactNode)
    | Omit<IButtonProps<any>, "onClick">;

export interface UseFormManagerEvents<T extends FieldValues> {
    onInvalidSubmit?: SubmitErrorHandler<T>;
    onChange?: (data: { [s: string]: any }) => void;
    onChangeSingleValue?: (key: string, value: any) => void;
}

export interface IFormContextPropsFormData<T extends FieldValues> {
    outputFormat?: "FormData";
    onSubmit?: OnSubmitHandler<FormData | any>;
}

export interface IFormContextPropsJSON<T extends FieldValues> {
    outputFormat?: "Json";
    onSubmit?: OnSubmitHandler<T>;
}

export type SetManyOpts = {
    shouldValidate?: boolean;
    shouldDirty?: boolean;
    shouldTouch?: boolean;
};

export type IUseFormReturn<T extends FieldValues = FieldValues> = UseFormReturn<T> & {
    id:string;
    setValues(
        patch: DeepPartial$1<T>,
        opts?: SetManyOpts,
    ): void
    mergeReset(patch: DeepPartial$1<T>): void;
    onFormSubmit:()=>void
    setIsSubmitting: (isSubmitting:boolean)=>void
};
// This is your detailed prop type, which we will now use as the single source of truth.
export type IFormComponent<T extends FieldValues> = UseFormManagerEvents<T> & ( //here is the main component props' type
    | IFormContextPropsFormData<T>
    | IFormContextPropsJSON<T>
    ) & {
    elements: IFormElement<T>[];
    submitButtonProps?: CustomSubmitButtonProps;
    isFloatedLabel?: boolean;
    grid?: IStyleClasses;
    id?: string;
    ref?: Ref<IUseFormReturn<T>>;
    onMount?: (formContext:UseFormReturn<T>)=>void;
    children?:
        | ((props: IUseFormReturn<any>) => ReactElement)
        | React__default.ReactElement;
    /** Animation for the form wrapper element. */
    animation?: IKitsAnimation;
};

export interface UseFieldLogicElementProps<T extends FieldValues> extends GroupFieldConfigs<T>{
    element: IFormElement<T>;
    control: Control<T>;
    getValues: UseFormGetValues<T>;
    focusedField?: string;
    setFocusedField?: React__default.Dispatch<React__default.SetStateAction<string>>;
    fieldLogic: UseFieldLogicReturn<T>;
}

export interface FieldWrapperProps<T extends FieldValues> extends GroupFieldConfigs<T>{
    /**
     * The full configuration object for a single form element.
     */
    element: IFormElement<T>;

    /**
     * The `control` object from react-hook-form, to be passed down to the `useFieldLogic` hook.
     */
    control: Control<T>;

    /**
     * The `getValues` function from react-hook-form, to be passed down to the `useFieldLogic` hook.
     */
    getValues: UseFormGetValues<T>;

    /**
     * The actual "dumb" field component (e.g., `<InputText />`, `<Select />`) that this
     * wrapper will render inside itself.
     */
    children: (props:UseFieldLogicReturn<T>)=>ReactElement;

    focusedField?: string;
    setFocusedField: React__default.Dispatch<React__default.SetStateAction<string>>;

    grid?:IStyleClasses;

    onGridChange?:(value:string)=>void
}

/**
 * Defines the props required by the central `useFieldLogic` hook.
 * This is the contract for providing a field's configuration to the logic engine.
 */
export interface UseFieldLogicProps<T extends FieldValues> extends GroupFieldConfigs<T>{
    /**
     * The full configuration object for a single form element, as defined by the developer.
     * This includes its type, id, label, schema, and any dynamic properties.
     */
    element: IFormElement<T>;

    /**
     * The main `control` object from react-hook-form's `useForm` return.
     * It's essential for registering the field and watching its state.
     */
    control: Control<T>;

    /**
     * The `getValues` function from react-hook-form's `useForm` return.
     * This allows the logic hook to access the current state of the entire form
     * for resolving dependencies, which is critical for fixing the validation race condition.
     */
    getValues: UseFormGetValues<T>;

    isFocused?:boolean;
    watchedValues:[]

}

export interface UseFieldLogicReturn<T extends FieldValues> {
    formContext: UseFormReturn<T>;
    onWatchedValuesChange?:()=>void;
    watchedValues?:any[];
    /**
     * The props to be spread directly onto the input component (value, onChange, onBlur, ref).
     */
    field: ControllerRenderProps<T, any>;
    /**
     * The state of the field (error, invalid, isTouched, isDirty).
     */
    fieldState: ControllerFieldState;
    /**
     * The dynamically resolved list of options for select, checkbox, or radio components.
     */
    // list?: any[];


    elements?:IFormElement<T>[];
    /**
     * Whether the field should be visible in the DOM.
     */
    displayOnly?: boolean;
    isShown: boolean;
    list?:IListItem[] | IRadioCheckboxListItem[];
    /**
     * Whether the field should be disabled.
     */
    isDisabled: boolean;
    /**
     * Whether the field is dynamically required based on its schema and form values.
     */
    isRequired: boolean;
    hideError?: boolean;
    /**
     * The dynamically calculated label for the field.
     */
    label?: ILabelElement;
    /**
     * The dynamically calculated placeholder text.
     */
    placeholder?: string;
    /**
     * Dynamically calculated grid layout properties.
     */
    layout: {
        colSpan: KitsResponsiveValue<string | number>;
        rowSpan?: KitsResponsiveValue<string | number>;
        rowGap?: KitsResponsiveValue<string | number>;
        columnGap?: KitsResponsiveValue<string | number>;
        colOffset?: KitsResponsiveValue<Numbering0_12>;
        area?: KitsResponsiveValue<string>;
    };
    style?:IElementStyle
    helperText?: string | ReactElement;
    leftAddon?: IFormAddon;
    rightAddon?: IFormAddon;
    withMask?: boolean;
    keyFilter?: ITextFieldProps<T>['keyFilter'];
    localProps?: any;
    /** When true, the molecule component renders without its KitsContainer wrapper. */
    attached?: boolean;
    /** Animation config from the element definition. */
    animation?: IKitsAnimation;
}


// --- Component Props ---


/** Base props for a "dumb" field component (e.g., InputText.tsx). */
export interface BaseFieldProps {
    // Props from useController
    field: ControllerRenderProps<any, any>;
    fieldState: ControllerFieldState;
    // Resolved dynamic props
    label?: ILabelElement;
    placeholder?: string;
    isDisabled: boolean;
    isRequired: boolean;
}

// Example of specific field component props
export interface InputTextFieldProps extends BaseFieldProps {
    // Add any specific props that the InputText component needs
    leftAddon?: React__default.ReactNode;
    rightAddon?: React__default.ReactNode;
}

export interface SelectFieldProps extends BaseFieldProps {
    list?: any[];
    // ... other select props
}

// ─── Inlined core types (originally from @lmb-it/kitsconcertomobile) ────

export type SortOrder$1 = 1 | 0 | -1 | null | undefined;

export interface DataTableFilterMetaData$1 {
    value?: any;
    matchMode?: string;
}

export interface DataTableOperatorFilterMetaData$1 {
    operator?: string;
    constraints: DataTableFilterMetaData$1[];
}

export type DataTableFilterMeta$1 = {
    [key: string]: DataTableFilterMetaData$1 | DataTableOperatorFilterMetaData$1;
};

export interface DataTableSortMeta$1 {
    field: string;
    order: SortOrder$1;
}

export interface PaginatorPageChangeEvent$1 {
    first: number;
    rows: number;
    page: number;
    pageCount: number;
}

// ─── DataView Types ─────────────────────────────────────────────────

export type IDVFilters =
    | IDVMultiselectFilter
    | IDVRangeFilter
    | IDVDropdownFilter
    | IDVButtonsFilter
    | IDVCheckboxFilter
    | IDVTriStateFilter
    | IDVDateFilter
    | IDVNumberFilter
    | IDVTextFilter
    | IDVPhoneFilter;

export interface IDVMessages {
    emptyMessage?: string;
    clearFilter?: string;
    clearCache?: string;
    resetColumnsWidths?: string;
    globalFilterPlaceholder?: string;
    exportAsPdf?: string;
    exportAsCSV?: string;
    filter?: { key?: string; value?: string }[];
}

export interface IDataViewProps {
    id: string;
    dataViewTitle?: string;
    dataViewSize?: "small" | "normal" | "large";
    skeleton?: boolean;
    stateful?: boolean;
    globalSearch?: boolean;
    headless?: boolean;
    hideModeButtons?: boolean;
    pagination?: boolean;
    defaultMode?: "list" | "grid";
    scrollHeight?: string;
    service?: (
        paginationRequest: IDVPaginationRequest,
    ) => Promise<ServerResponse<IDVPaginationResponse<any[]>>>;
    keyColumn?: string;
    data?: IDVPaginationResponse<any[]>["list"];
    text?: IDVMessages;
    moreButtons?: (context: IDataViewRefValues) => ReactNode[];
    listItem: (item: any, index: number) => ReactNode;
    gridItem: (item: any, index: number) => ReactNode;
    filtersFormElements?: IFormElement[];
    ref?: Ref<IDataViewRefValues>
}

export interface IDataViewRefValues {
    refresh: () => void;
    request: IDVPaginationRequest;
}

export interface IDVPaginationState {
    totalRecords: number;
    start: number;
    pageSize: number;
    onChangePage: (e: PaginatorPageChangeEvent$1) => void;
}

export interface IDataViewContextValues {
    isLoading: boolean;
    reloadClickHandler?: any;
    serverSideRequest: IDVPaginationRequest;
    skeleton?: boolean;
    paginationParams?: IDVPaginationState;
    fileName: string;

    refValues: IDataViewRefValues;
    dataList: any[];
}

export interface IDVMultiselectFilter {
    type: "multiSelect";
    list?: {
        label: string;
        value: any;
    }[];
}

export interface IDVDropdownFilter {
    type: "dropdown";
    list?: {
        label: string;
        value: any;
    }[];
}

export interface IDVButtonsFilter {
    type: "buttons";
    list?: {
        label: string;
        value: any;
    }[];
    isMultiple?: boolean;
}

export interface IDVDateFilter {
    type: "date";
    isRanged?: {
        min?: Date;
        max?: Date;
    };
}

export interface IDVNumberFilter {
    type: "number";
    min?: number;
    max?: number;
}

export interface IDVPhoneFilter {
    type: "phone";
}

export interface IDVCheckboxFilter {
    type: "checkbox";

    list: {
        label: string;
        value: string | number | boolean;
    }[];
}

export interface IDVTriStateFilter {
    type: "tristate";
}

export interface IDVRangeFilter {
    type: "range";
    min?: number;
    max?: number;
}

export interface IDVTextFilter {
    type: "text";
}

export interface IDVPaginationRequest {
    filters: DataTableFilterMeta$1;
    search: string;
    start: number;
    length: number;
    sortBy: DataTableSortMeta$1[];
}

export interface IDVPaginationResponse<ListData> {
    list: ListData;
    requestedPageSize: number;
    actualPageSize: number;
    pageIndex: number;
    pageCount: number;
    total: number;
}

/**
 * Platform-agnostic Table types.
 *
 * These types have ZERO platform-specific imports (no primereact, no @lmb-it/kitsconcertomobile).
 * They are re-exported by both index.web.ts and index.native.ts so every consumer
 * gets the same definitions regardless of build target.
 */

// ─── Filter Interfaces ──────────────────────────────────────────────

export interface IMultiselectFilter {
    type: "multiSelect";
    filter?: boolean;
    list?: {
        label: string;
        value: any;
    }[];
}

export interface IDropdownFilter {
    type: "dropdown";
    filter?: boolean;
    list?: {
        label: string;
        value: any;
    }[];
}

/**
 * `list` uses an inline type that is structurally compatible with
 * PrimeReact's `SelectItemOptionsType` so web consumers can pass
 * the same objects without a cast, while native consumers do not
 * need to depend on primereact.
 */
export interface IButtonsFilter {
    type: "buttons";
    list?: {
        label: string;
        value: any;
    }[];
    isMultiple?: boolean;
}

export interface IDateFilter {
    type: "date";
    isRanged?: {
        min?: Date;
        max?: Date;
    };
}

export interface INumberFilter {
    type: "number";
    min?: number;
    max?: number;
}

export interface IPhoneFilter {
    type: "phone";
}

export interface ICheckboxFilter {
    type: "checkbox";
    list: {
        label: string;
        value: string | number | boolean;
    }[];
}

export interface ITriStateFilter {
    type: "tristate";
}

export interface IRangeFilter {
    type: "range";
    min?: number;
    max?: number;
}

export interface ITextFilter {
    type: "text";
}

// ─── Filter / Editor union types ────────────────────────────────────

export type IFilters =
    | IMultiselectFilter
    | IRangeFilter
    | IDropdownFilter
    | IButtonsFilter
    | ICheckboxFilter
    | ITriStateFilter
    | IDateFilter
    | INumberFilter
    | ITextFilter
    | IPhoneFilter;

export type IEditors =
    | IMultiselectFilter
    | IRangeFilter
    | IDropdownFilter
    | IButtonsFilter
    | ICheckboxFilter
    | ITriStateFilter
    | IDateFilter
    | INumberFilter
    | ITextFilter
    | IPhoneFilter;

// ─── Messages ───────────────────────────────────────────────────────

export interface IMessages {
    emptyMessage?: string;
    clearFilter?: string;
    clearCache?: string;
    resetColumnsWidths?: string;
    globalFilterPlaceholder?: string;
    exportAsPdf?: string;
    exportAsCSV?: string;
    filter?: { key?: string; value?: string }[];
}

// ─── Pagination (response shape — platform-agnostic) ────────────────

export interface IPaginationResponse<ListData> {
    list: ListData;
    requestedPageSize: number;
    actualPageSize: number;
    pageIndex: number;
    pageCount: number;
    total: number;
}

/**
 * Table types — React Native platform.
 *
 * Re-exports all shared (platform-agnostic) types from ./types.ts and adds
 * native-specific interfaces.
 *
 * NOTE: The Table component itself is web-only at this stage (the native
 * implementation is a stub). These types are kept in sync so a future
 * native implementation can start from a solid foundation.
 */


// ─── Inlined core types (originally from @lmb-it/kitsconcertomobile) ────

export type SortOrder = 1 | 0 | -1 | null | undefined;

export interface DataTableFilterMetaData {
    value?: any;
    matchMode?: string;
}

export interface DataTableOperatorFilterMetaData {
    operator?: string;
    constraints: DataTableFilterMetaData[];
}

export type DataTableFilterMeta = {
    [key: string]: DataTableFilterMetaData | DataTableOperatorFilterMetaData;
};

export interface DataTableSortMeta {
    field: string;
    order: SortOrder;
}

export interface DataTableSelectionSingleChangeEvent<T> {
    originalEvent: any;
    value: T extends any[] ? T[number] : any;
    type: "radio" | "row" | "single";
}

export interface PaginatorPageChangeEvent {
    first: number;
    rows: number;
    page: number;
    pageCount: number;
}

export type BadgeSeverity$1 = null | "success" | "warning" | "secondary" | "info" | "danger" | "contrast";
export type TagSeverity = null | "success" | "warning" | "secondary" | "info" | "danger" | "contrast";

export interface ColumnBodyOptions {
    rowIndex: number;
    field?: string;
    frozenRow?: boolean;
    frozenCol?: boolean;
    expanded?: boolean;
    selected?: boolean;
}

// ─── Body Template ──────────────────────────────────────────────────

export type IBodyTemplate =
    | {
    type: "avatar";
    size?: "normal" | "large" | "xlarge";
    customStyle?: CSSProperties | ((value: any) => CSSProperties);
}
    | {
    type: "badge";
    severity?:
        | ((value: any) => BadgeSeverity$1)
        | BadgeSeverity$1;
    customStyle?: CSSProperties | ((value: any) => CSSProperties);
}
    | {
    type: "tag";
    severity?: ((value: any) => TagSeverity) | TagSeverity;
    rounded?: boolean;
    customStyle?: CSSProperties | ((value: any) => CSSProperties);
}
    | {
    type: "progress";
    color?:
        | string
        | ((value: any) => string);
    customStyle?: CSSProperties | ((value: any) => CSSProperties);
};

// ─── Column (discriminated union) ───────────────────────────────────

export interface IColumnBase {
    field?: string;
    header?: ReactNode;
    sortable?: boolean;
    sortField?: string;
    filter?: IFilters;
    filterField?: string;
    dataType?: string;
    hidden?: boolean;
    align?: "left" | "center" | "right";
    frozen?: boolean;
    expander?: boolean;
    selectionMode?: "single" | "multiple";
    className?: string;
    name?: string;
    label?: string;
    labelTooltip?: string;
    bodyTemplate?: IBodyTemplate;
    editor?: IEditors;
    globalStyle?: CSSProperties;
    headerStyle?: CSSProperties;
    filterStyle?: CSSProperties;
    bodyStyle?: CSSProperties;
    isSortable?: boolean;
    onCellEditComplete?(event: any): void;
    onCellEditCancel?(event: any): void;
    onCellEditInit?(event: any): void;
    onBeforeCellEditShow?(event: any): void;
    onBeforeCellEditHide?(event: any): void;
    cellEditValidator?(event: any): boolean;
    cellEditValidateOnClose?: boolean;
    cellEditValidatorEvent?: string;
}

export type IKeyedColumn<T extends Record<string, any>, K extends keyof T & string> = IColumnBase & {
    name: K;
    body?: (value: T[K], row: T, options: ColumnBodyOptions) => ReactNode;
};

export type IUnkeyedColumn = IColumnBase & {
    name?: undefined;
    body?: never;
};

export type IColumn<T extends Record<string, any> = any> =
    | { [K in keyof T & string]: IKeyedColumn<T, K> }[keyof T & string]
    | IUnkeyedColumn;

// ─── Main Props ─────────────────────────────────────────────────────

export interface IDataTableProps<T extends Record<string, any> = any> {
    ref?: Ref<IDatatableRefValues<T>>;
    id: string;
    columns: IColumn<T>[];
    scrollHeight?: string | 'auto';
    tableTitle?: string;
    onSelectChange?: (event: DataTableSelectionSingleChangeEvent<T[]>) => void;
    tableSize?: "small" | "normal" | "large";
    debounceFilterWaitTime?: number;
    skeleton?: boolean;
    stateful?: boolean;
    columnsPicker?: boolean;
    globalSearch?: boolean;
    headless?: boolean;
    rowLockable?: boolean;
    service?: (
        paginationRequest: IPaginationRequest,
    ) => Promise<ServerResponse<IPaginationResponse<T[]>>>;
    serviceRevalidateDeps?: any;
    keyColumn?: string;
    data?: T[];
    text?: IMessages;
    multiSorting?: boolean;
    exportPDFButton?: boolean;
    exportCSVButton?: boolean;
    moreButtons?: (context: IDatatableRefValues<T>) => ReactNode[];
}

// ─── Ref ────────────────────────────────────────────────────────────

export interface IDatatableRefValues<T extends Record<string, any> = any> {
    refresh: (withLoading?: boolean) => void;
    visibleColumns: Pick<IColumnBase, "label" | "name">[];
    request: IPaginationRequest;
}

// ─── Pagination Request ─────────────────────────────────────────────

export interface IPaginationRequest {
    filters: DataTableFilterMeta;
    search: string;
    start: number;
    length: number;
    sortBy: DataTableSortMeta[];
}

// ─── Pagination State ───────────────────────────────────────────────

export interface PaginationState {
    totalRecords: number;
    start: number;
    pageSize: number;
    onChangePage: (e: PaginatorPageChangeEvent) => void;
}

// ─── Context ────────────────────────────────────────────────────────

export interface IDataTableContextValues<T extends Record<string, any> = any> {
    columns: IColumn<T>[];
    keyColumn: string;
    isLoading: boolean;
    globalSearch: boolean;
    lockedRows: T[];
    toggleLock: (data: T, frozen: boolean | undefined, index: number) => void;
    visibleColumns: Pick<IColumnBase, "label" | "name">[];
    rowLockable?: boolean;
    rowExpansionTemplate?: (data: any, options: any) => ReactNode;
    onGlobalFilterChange: (value: string) => void;
    globalFilterValue: string;
    reloadClickHandler: (withLoading?: boolean) => void;
    serverSideRequest: IPaginationRequest;
    text: Required<IMessages>;
    skeleton?: boolean;
    resizableColumns?: boolean;
    stateful?: boolean;
    pagination?: PaginationState;

    onClearFilter(): void;

    onClearCache(): void;

    refValues: IDatatableRefValues<T>;
    fileName: string;
    buttons?: {
        exportAsPdf?: boolean;
        exportAsCSV?: boolean;
        moreButtons?: (context: IDatatableRefValues<T>) => ReactNode[];
    };
    tableRef: RefObject<any | null>;
    dataList: T[];
}

declare const sizingProperties = {
    w: "width",
    width: "width",
    h: "height",
    height: "height",
    minW: "minWidth",
    minWidth: "minWidth",
    maxW: "maxWidth",
    maxWidth: "maxWidth",
    minH: "minHeight",
    minHeight: "minHeight",
    maxH: "maxHeight",
    maxHeight: "maxHeight",
}
declare const listingProperties = {
    listStyleType: null,
    listStyle: null,
};
declare const borderProperties = {
    // Border
    borderWidth: "borderWidth",
    borderColor: "borderColor",
    borderStyle: "borderStyle",
    borderRadius: "borderRadius",
    borderTopLeftRadius: "borderTopLeftRadius",
    borderTopRightRadius: "borderTopRightRadius",
    borderBottomLeftRadius: "borderBottomLeftRadius",
    borderBottomRightRadius: "borderBottomRightRadius",
    borderTopWidth: "borderTopWidth",
    borderBottomWidth: "borderBottomWidth",
    borderLeftWidth: "borderLeftWidth",
    borderRightWidth: "borderRightWidth",
    borderTopColor: "borderTopColor",
    borderBottomColor: "borderBottomColor",
    borderLeftColor: "borderLeftColor",
    borderRightColor: "borderRightColor",
}
declare const pxProperties = {
    // Padding & Margin
    p: "padding",
    pt: "paddingTop",
    pr: "paddingRight",
    pb: "paddingBottom",
    pl: "paddingLeft",
    px: "paddingHorizontal", // custom logic required
    py: "paddingVertical", // custom logic required

    m: "margin",
    mt: "marginTop",
    mr: "marginRight",
    mb: "marginBottom",
    ml: "marginLeft",
    padding: "padding",
    paddingTop: "paddingTop",
    paddingRight: "paddingRight",
    paddingBottom: "paddingBottom",
    paddingLeft: "paddingLeft",
    paddingVertical: "paddingVertical",
    paddingHorizontal: "paddingHorizontal",
    margin: "margin",
    marginTop: "marginTop",
    marginRight: "marginRight",
    marginBottom: "marginBottom",
    marginLeft: "marginLeft",
    marginInline: "marginInline",
    mx: null, // custom logic required
    my: null, // custom logic required
    ...sizingProperties,
    ...borderProperties,
    ...listingProperties,
    // Position
    top: "top",
    right: "right",
    bottom: "bottom",
    left: "left",
    position: "position",
    zIndex: "zIndex",

    // Flexbox
    display: "display", // RN only accepts "flex" or "none"
    flexBasis: "flexBasis",
    flex: "flex",
    flexGrow: "flexGrow",
    flexShrink: "flexShrink",
    flexDirection: "flexDirection",
    direction: "flexDirection",
    flexWrap: "flexWrap",
    alignItems: "alignItems",
    alignSelf: "alignSelf",
    alignContent: "alignContent",
    justifyContent: "justifyContent",
    colSpan: null,
    rowGap: null,
    columnGap: null,
    gap: 'gap', // handled manually if needed via margin tricks

    // Text
    fontSize: "fontSize",
    fontWeight: "fontWeight",
    fontFamily: "fontFamily",
    fontStyle: "fontStyle",
    fontColor: "color",
    color: "color",
    lineHeight: "lineHeight",
    letterSpacing: "letterSpacing",
    textAlign: "textAlign",
    textTransform: "textTransform",
    textDecoration: "textDecorationLine",
    whiteSpace: null,
    textOverflow: null, // RN handles this with `numberOfLines`, `ellipsizeMode`


    // Background
    bgColor: "backgroundColor",
    backgroundColor: "backgroundColor",

    // Shadow
    shadow: "shadowColor", // needs custom mapping for Android/iOS
    boxShadow: null, // not supported directly in RN
    shadowColor: 'shadowColor',
    shadowOffset: 'shadowOffset',
    shadowRadius: 'shadowRadius',
    shadowOpacity: 'shadowOpacity',
    elevation: 'elevation',

    // Opacity / Effects
    opacity: "opacity",
    objectFit: "resizeMode", // for Image only
    overflow: "overflow", // "visible" | "hidden" (RN doesn't support scroll here)

    // Transforms
    rotate: null, // custom logic via `transform`
    translateX: null,
    translateY: null,
    translate: null,
    transformOrigin: null,

    // Transition / Animation (not supported natively in RN)
    transition: null,
    transitionDuration: null,
    transitionFunction: null,
    transitionDelay: null,
    animation: null,
    animationDuration: null,
    animationDelay: null,
    animationFunction: null,
    animationFill: null,
    animationIteration: null,

    // Interactivity
    pointerEvents: "pointerEvents",
    userSelect: null, // RN does not support `userSelect`
    cursor: null,
    appearance: null,
    outline: null,
};

declare const propertiesWithoutCssEquivalent = {
    px: null,
    py: null,
    mx: null,
    my: null,
    appearance: null,
    rotate: null,
    columns: null,
    rows: null,
    borderRadiusTop: null,
    borderRadiusBottom: null,
    borderRadiusRight: null,
    borderRadiusLeft: null,
    _hover: null,
    // Border shorthands — no direct RN equivalent, parsed in style.ts
    border: null,
    borderTop: null,
    borderBottom: null,
    borderLeft: null,
    borderRight: null,
    borderX: null,
    borderY: null,
    translateX: null,
    translateY: null,
    animationIteration: null,
    colOffset: null, // CSS does not have an equivalent for this
};

declare const nonPxProperties = {}

declare const allProperties: Record<string, any> = {
    ...pxProperties,
    ...nonPxProperties,
    ...propertiesWithoutCssEquivalent,
};

export type SizingNumbering =
    '1rem'
    | '2rem'
    | '3rem'
    | '4rem'
    | '5rem'
    | '6rem'
    | '7rem'
    | '8rem'
    | '9rem'
    | '10rem'
    | '11rem'
    | '12rem'
    | '13rem'
    | '14rem'
    | '15rem'
    | '16rem'
    | '17rem'
    | '18rem'
    | '19rem'
    | '20rem'
    | '21rem'
    | '22rem'
    | '23rem'
    | '24rem'
    | '25rem'
    | '26rem'
    | '27rem'
    | '28rem'
    | '29rem'
    | '30rem'
    | '31rem'
    | '32rem'
    | '33rem'
    | '34rem'
    | '35rem'
    | '36rem'
    | '37rem'
    | '38rem'
    | '39rem'
    | '40rem'
    | '41rem'
    | '42rem'
    | '43rem'
    | '44rem'
    | '45rem'
    | '46rem'
    | '47rem'
    | '48rem'
    | '49rem'
    | '50rem'
    | '51rem'
    | '52rem'
    | '53rem'
    | '54rem'
    | '55rem'
    | '56rem'
    | '57rem'
    | '58rem'
    | '59rem'
    | '60rem'
    | '61rem'
    | '62rem'
    | '63rem'
    | '64rem'
    | '65rem'
    | '66rem'
    | '67rem'
    | '68rem'
    | '69rem'
    | '70rem'
    | '71rem'
    | '72rem'
    | '73rem'
    | '74rem'
    | '75rem'
    | '76rem'
    | '77rem'
    | '78rem'
    | '79rem'
    | '80rem'
    | '81rem'
    | '82rem'
    | '83rem'
    | '84rem'
    | '85rem'
    | '86rem'
    | '87rem'
    | '88rem'
    | '89rem'
    | '90rem'
    | '91rem'
    | '92rem'
    | '93rem'
    | '94rem'
    | '95rem'
    | '96rem'
    | '97rem'
    | '98rem'
    | '99rem'
    | '100rem'
    | '101rem'
    | '102rem'
    | '103rem'
    | '104rem'
    | '105rem'
    | '106rem'
    | '107rem'
    | '108rem'
    | '109rem'
    | '110rem'
    | '111rem'
    | '112rem'
    | '113rem'
    | '114rem'
    | '115rem'
    | '116rem'
    | '117rem'
    | '118rem'
    | '119rem'
    | '120rem'
    | '121rem'
    | '122rem'
    | '123rem'
    | '124rem'
    | '125rem'
    | '126rem'
    | '127rem'
    | '128rem'
    | '129rem'
    | '130rem'
    | '131rem'
    | '132rem'
    | '133rem'
    | '134rem'
    | '135rem'
    | '136rem'
    | '137rem'
    | '138rem'
    | '139rem'
    | '140rem'
    | '141rem'
    | '142rem'
    | '143rem'
    | '144rem'
    | '145rem'
    | '146rem'
    | '147rem'
    | '148rem'
    | '149rem'
    | '150rem'
    | '151rem'
    | '152rem'
    | '153rem'
    | '154rem'
    | '155rem'
    | '156rem'
    | '157rem'
    | '158rem'
    | '159rem'
    | '160rem'
    | '161rem'
    | '162rem'
    | '163rem'
    | '164rem'
    | '165rem'
    | '166rem'
    | '167rem'
    | '168rem'
    | '169rem'
    | '170rem'
    | '171rem'
    | '172rem'
    | '173rem'
    | '174rem'
    | '175rem'
    | '176rem'
    | '177rem'
    | '178rem'
    | '179rem'
    | '180rem'
    | '181rem'
    | '182rem'
    | '183rem'
    | '184rem'
    | '185rem'
    | '186rem'
    | '187rem'
    | '188rem'
    | '189rem'
    | '190rem'
    | '191rem'
    | '192rem'
    | '193rem'
    | '194rem'
    | '195rem'
    | '196rem'
    | '197rem'
    | '198rem'
    | '199rem'


export type Numbering0_32 =
    | 0
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15
    | 16
    | 17
    | 18
    | 19
    | 20
    | 21
    | 22
    | 23
    | 24
    | 25
    | 26
    | 27
    | 28
    | 29
    | 30
    | 31
    | 32;
export type FlexValues = 'none' | 'auto' | 'initial' | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15
    | 16
    | 17
    | 18
    | 19
    | 20
export type Numbering0_12 = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
export type TimingNumbering = 100 | 150 | 200 | 300 | 400 | 500 | 1000
export type SizingValue = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
export type HighSizingValue = '4xl' | '5xl' | '6xl' | '7xl' | '8xl'
export type FlexAlignmentsValues = 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly'
export type AlignmentsValues = 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline'
export type AnimationsValues =
    'fadein'
    | 'fadeout'
    | 'slidedown'
    | 'slideup'
    | 'scalein'
    | 'fadeinleft'
    | 'fadeoutleft'
    | 'fadeinright'
    | 'fadeoutright'
    | 'fadeinup'
    | 'fadeoutup'
    | 'fadeindown'
    | 'fadeoutdown'
    | 'animate-width'
    | 'flip'
    | 'flipleft'
    | 'flipright'
    | 'flipup'
    | 'zoomin'
    | 'zoomindown'
    | 'zoominleft'
    | 'zoomninright'
    | 'zoominup';
export type SidesValues = 'top' | 'bottom' | 'right' | 'left';
export type MeasurementValues = 'full' | 'screen' | 'min' | 'max' | 'auto';


export type Various<T> = T;
export type KitsBreakpoint =
    | 'base'
    | 'xs'
    | 'sm'
    | 'md'
    | 'lg'
    | 'xl'
    | 'xxl'
    | 'xxxl';

export type KitsPlatform = 'ios' | 'android';
export type KitsOrientation = 'portrait' | 'landscape';
export type KitsDevice = 'phone' | 'tablet';

export type KitsResponsiveObject<T> = {
    [K in KitsBreakpoint]?: Various<T>;
};

export type KitsConditionalObject<T> = {
    ios?: KitsResponsiveValue<T>;
    android?: KitsResponsiveValue<T>;
    web?: KitsResponsiveValue<T>;


    portrait?: KitsResponsiveValue<T>;
    landscape?: KitsResponsiveValue<T>;

    phone?: KitsResponsiveValue<T>;
    tablet?: KitsResponsiveValue<T>;
};

export type KitsResponsiveValue<T> =
    | Various<T>
    | KitsResponsiveObject<T>
    | KitsConditionalObject<T>
    | [
    Various<T>?, // base
    Various<T>?, // xs
    Various<T>?, // sm
    Various<T>?, // md
    Various<T>?, // lg
    Various<T>?, // xl
    Various<T>?, // xxl
    Various<T>?  // xxxl
] | T;


export type ColorValue =
    | 'primary-color'
    | 'primary-color-text'
    | 'surface-ground'
    | 'surface-section'
    | 'surface-card'
    | 'surface-overlay'
    | 'surface-border'
    | 'surface-hover'
    | 'surface-0'
    | 'surface-50'
    | 'surface-100'
    | 'surface-200'
    | 'surface-300'
    | 'surface-400'
    | 'surface-500'
    | 'surface-600'
    | 'surface-700'
    | 'surface-800'
    | 'surface-900'
    | 'blue-50'
    | 'blue-100'
    | 'blue-200'
    | 'blue-300'
    | 'blue-400'
    | 'blue-500'
    | 'blue-600'
    | 'blue-700'
    | 'blue-800'
    | 'blue-900'
    | 'green-50'
    | 'green-100'
    | 'green-200'
    | 'green-300'
    | 'green-400'
    | 'green-500'
    | 'green-600'
    | 'green-700'
    | 'green-800'
    | 'green-900'
    | 'yellow-50'
    | 'yellow-100'
    | 'yellow-200'
    | 'yellow-300'
    | 'yellow-400'
    | 'yellow-500'
    | 'yellow-600'
    | 'yellow-700'
    | 'yellow-800'
    | 'yellow-900'
    | 'cyan-50'
    | 'cyan-100'
    | 'cyan-200'
    | 'cyan-300'
    | 'cyan-400'
    | 'cyan-500'
    | 'cyan-600'
    | 'cyan-700'
    | 'cyan-800'
    | 'cyan-900'
    | 'pink-50'
    | 'pink-100'
    | 'pink-200'
    | 'pink-300'
    | 'pink-400'
    | 'pink-500'
    | 'pink-600'
    | 'pink-700'
    | 'pink-800'
    | 'pink-900'
    | 'indigo-50'
    | 'indigo-100'
    | 'indigo-200'
    | 'indigo-300'
    | 'indigo-400'
    | 'indigo-500'
    | 'indigo-600'
    | 'indigo-700'
    | 'indigo-800'
    | 'indigo-900'
    | 'teal-50'
    | 'teal-100'
    | 'teal-200'
    | 'teal-300'
    | 'teal-400'
    | 'teal-500'
    | 'teal-600'
    | 'teal-700'
    | 'teal-800'
    | 'teal-900'
    | 'orange-50'
    | 'orange-100'
    | 'orange-200'
    | 'orange-300'
    | 'orange-400'
    | 'orange-500'
    | 'orange-600'
    | 'orange-700'
    | 'orange-800'
    | 'orange-900'
    | 'bluegray-50'
    | 'bluegray-100'
    | 'bluegray-200'
    | 'bluegray-300'
    | 'bluegray-400'
    | 'bluegray-500'
    | 'bluegray-600'
    | 'bluegray-700'
    | 'bluegray-800'
    | 'bluegray-900'
    | 'purple-50'
    | 'purple-100'
    | 'purple-200'
    | 'purple-300'
    | 'purple-400'
    | 'purple-500'
    | 'purple-600'
    | 'purple-700'
    | 'purple-800'
    | 'purple-900'
    | 'red-50'
    | 'red-100'
    | 'red-200'
    | 'red-300'
    | 'red-400'
    | 'red-500'
    | 'red-600'
    | 'red-700'
    | 'red-800'
    | 'red-900'
    | 'primary-50'
    | 'primary-100'
    | 'primary-200'
    | 'primary-300'
    | 'primary-400'
    | 'primary-500'
    | 'primary-600'
    | 'primary-700'
    | 'primary-800'
    | 'primary-900'
    | 'gray-50'
    | 'gray-100'
    | 'gray-200'
    | 'gray-300'
    | 'gray-400'
    | 'gray-500'
    | 'gray-600'
    | 'gray-700'
    | 'gray-800'
    | 'gray-900'
    | 'white-alpha-10'
    | 'white-alpha-20'
    | 'white-alpha-30'
    | 'white-alpha-40'
    | 'white-alpha-50'
    | 'white-alpha-60'
    | 'white-alpha-70'
    | 'white-alpha-80'
    | 'white-alpha-90'
    | 'black-alpha-10'
    | 'black-alpha-20'
    | 'black-alpha-30'
    | 'black-alpha-40'
    | 'black-alpha-50'
    | 'black-alpha-60'
    | 'black-alpha-70'
    | 'black-alpha-80'
    | 'black-alpha-90'

// type IntRange<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>

export interface ISpacing {
    // Padding
    p?: KitsResponsiveValue<ViewStyle['padding'] | `${number}${string}`>;
    padding?: KitsResponsiveValue<ViewStyle['padding'] | `${number}${string}`>;
    pt?: KitsResponsiveValue<ViewStyle['paddingTop'] | `${number}${string}`>;
    paddingTop?: KitsResponsiveValue<ViewStyle['paddingTop'] | `${number}${string}`>;
    pr?: KitsResponsiveValue<ViewStyle['paddingRight'] | `${number}${string}`>;
    paddingRight?: KitsResponsiveValue<ViewStyle['paddingRight'] | `${number}${string}`>;
    pb?: KitsResponsiveValue<ViewStyle['paddingBottom'] | `${number}${string}`>;
    paddingBottom?: KitsResponsiveValue<ViewStyle['paddingBottom'] | `${number}${string}`>;
    pl?: KitsResponsiveValue<ViewStyle['paddingLeft'] | `${number}${string}`>;
    paddingLeft?: KitsResponsiveValue<ViewStyle['paddingLeft'] | `${number}${string}`>;
    px?: KitsResponsiveValue<ViewStyle['padding'] | `${number}${string}`>;
    paddingX?: KitsResponsiveValue<ViewStyle['padding'] | `${number}${string}`>;
    py?: KitsResponsiveValue<ViewStyle['padding'] | `${number}${string}`>;
    paddingY?: KitsResponsiveValue<ViewStyle['padding'] | `${number}${string}`>;
    paddingHorizontal?: KitsResponsiveValue<ViewStyle['padding'] | `${number}${string}`>;
    paddingVertical?: KitsResponsiveValue<ViewStyle['padding'] | `${number}${string}`>;

    // Margin
    m?: KitsResponsiveValue<ViewStyle['margin'] | `${number}${string}`>;
    margin?: KitsResponsiveValue<ViewStyle['margin'] | `${number}${string}`>;
    mt?: KitsResponsiveValue<ViewStyle['marginTop'] | `${number}${string}`>;
    marginTop?: KitsResponsiveValue<ViewStyle['marginTop'] | `${number}${string}`>;
    mr?: KitsResponsiveValue<ViewStyle['marginRight'] | `${number}${string}`>;
    marginRight?: KitsResponsiveValue<ViewStyle['marginRight'] | `${number}${string}`>;
    mb?: KitsResponsiveValue<ViewStyle['marginBottom'] | `${number}${string}`>;
    marginBottom?: KitsResponsiveValue<ViewStyle['marginBottom'] | `${number}${string}`>;
    ml?: KitsResponsiveValue<ViewStyle['marginLeft'] | `${number}${string}`>;
    marginLeft?: KitsResponsiveValue<ViewStyle['marginLeft'] | `${number}${string}`>;
    mx?: KitsResponsiveValue<ViewStyle['margin'] | `${number}${string}`>;
    marginX?: KitsResponsiveValue<ViewStyle['margin'] | `${number}${string}`>;
    my?: KitsResponsiveValue<ViewStyle['margin'] | `${number}${string}`>;
    marginY?: KitsResponsiveValue<ViewStyle['margin'] | `${number}${string}`>;
    // Optional web-compat: you can include this for shared types
    marginInline?: KitsResponsiveValue<number | `${number}${string}`>;
}

export interface ISizing {
    // Width
    w?: KitsResponsiveValue<ViewStyle['width'] | 'full' | 'screen' | string | `${number}${string}`>;
    width?: KitsResponsiveValue<ViewStyle['width'] | 'full' | 'screen' | string | `${number}${string}`>;

    minW?: KitsResponsiveValue<ViewStyle['minWidth'] | 'full' | 'screen' | string | `${number}${string}`>;
    minWidth?: KitsResponsiveValue<ViewStyle['minWidth'] | 'full' | 'screen' | string | `${number}${string}`>;

    maxW?: KitsResponsiveValue<ViewStyle['maxWidth'] | 'full' | 'screen' | string | `${number}${string}`>;
    maxWidth?: KitsResponsiveValue<ViewStyle['maxWidth'] | 'full' | 'screen' | string | `${number}${string}`>;

    // Height
    h?: KitsResponsiveValue<ViewStyle['height'] | 'full' | 'screen' | string | `${number}${string}`>;
    height?: KitsResponsiveValue<ViewStyle['height'] | 'full' | 'screen' | string | `${number}${string}`>;

    minH?: KitsResponsiveValue<ViewStyle['minHeight'] | 'full' | 'screen' | string | `${number}${string}`>;
    minHeight?: KitsResponsiveValue<ViewStyle['minHeight'] | 'full' | 'screen' | string | `${number}${string}`>;

    maxH?: KitsResponsiveValue<ViewStyle['maxHeight'] | 'full' | 'screen' | string | `${number}${string}`>;
    maxHeight?: KitsResponsiveValue<ViewStyle['maxHeight'] | 'full' | 'screen' | string | `${number}${string}`>;

}

export interface IListing {
    listStyleType?: null;
    listStyle?: null;
}

export interface IEffects {
    boxShadow?: KitsResponsiveValue<ViewStyle['shadowColor'] | ViewStyle['shadowOffset'] | ViewStyle['shadowOpacity'] | ViewStyle['shadowRadius']>;
    shadow?: KitsResponsiveValue<ViewStyle['shadowColor'] | ViewStyle['shadowOffset'] | ViewStyle['shadowOpacity'] | ViewStyle['shadowRadius']>;
    opacity?: KitsResponsiveValue<ViewStyle['opacity']>;

    shadowColor?: KitsResponsiveValue<ViewStyle['shadowColor']>;
    shadowOffset?: KitsResponsiveValue<ViewStyle['shadowOffset']>;
    shadowRadius?: KitsResponsiveValue<ViewStyle['shadowRadius']>;
    shadowOpacity?: KitsResponsiveValue<ViewStyle['shadowOpacity']>;

    elevation?: KitsResponsiveValue<ViewStyle['elevation']>;

    objectFit?:any;
    objectPosition?:any;

}

export interface IInteractivity {
    appearance?: null; // Not supported
    cursor?: any;     // Not supported in native (only in web)
    outline?: null;    // Not supported
    pointerEvents?: ViewStyle['pointerEvents']; // ✅
    userSelect?: any; // Not supported
}

export interface ITransforms {
    translateX?: KitsResponsiveValue<number>;
    translateY?: KitsResponsiveValue<number>;
    translate?: KitsResponsiveValue<number>; // handled as [X, Y]
    transformOrigin?: null; // Not supported in RN transforms
    rotate?: KitsResponsiveValue<'0deg' | '90deg' | '-90deg' | '180deg' | '-180deg'>;
}

export interface ITransition {
    transitionProperty?: null;
    transitionDuration?: null;
    transitionFunction?: null;
    transitionDelay?: null;
}

export interface IBorder {
    borderRadius?: KitsResponsiveValue<ViewStyle['borderRadius']>;
    borderRadiusTop?: KitsResponsiveValue<ViewStyle['borderTopLeftRadius'] | ViewStyle['borderTopRightRadius']>;
    borderRadiusBottom?: KitsResponsiveValue<ViewStyle['borderBottomLeftRadius'] | ViewStyle['borderBottomRightRadius']>;
    borderRadiusRight?: KitsResponsiveValue<ViewStyle['borderTopRightRadius'] | ViewStyle['borderBottomRightRadius']>;
    borderRadiusLeft?: KitsResponsiveValue<ViewStyle['borderTopLeftRadius'] | ViewStyle['borderBottomLeftRadius']>;
    borderTopLeftRadius?: KitsResponsiveValue<ViewStyle['borderTopLeftRadius']>;
    borderBottomLeftRadius?: KitsResponsiveValue<ViewStyle['borderBottomLeftRadius']>;
    borderTopRightRadius?: KitsResponsiveValue<ViewStyle['borderTopRightRadius']>;
    borderBottomRightRadius?: KitsResponsiveValue<ViewStyle['borderBottomRightRadius']>;

    borderWidth?: KitsResponsiveValue<ViewStyle['borderWidth']>;
    borderW?: KitsResponsiveValue<ViewStyle['borderWidth']>;
    borderX?: KitsResponsiveValue<ViewStyle['borderLeftWidth'] | ViewStyle['borderRightWidth']>;
    borderY?: KitsResponsiveValue<ViewStyle['borderTopWidth'] | ViewStyle['borderBottomWidth']>;
    borderTop?: KitsResponsiveValue<ViewStyle['borderTopWidth']>;
    borderBottom?: KitsResponsiveValue<ViewStyle['borderBottomWidth']>;
    borderRight?: KitsResponsiveValue<ViewStyle['borderRightWidth']>;
    borderLeft?: KitsResponsiveValue<ViewStyle['borderLeftWidth']>;

    borderStyle?: KitsResponsiveValue<ViewStyle['borderStyle']>;
    borderColor?: KitsResponsiveValue<ViewStyle['borderColor'] | ColorValue | ColorValue$1>;

    // Logical/Directional radius – fallback to null
    borderStartStartRadius?: null;
    borderStartEndRadius?: null;
    borderEndStartRadius?: null;
    borderEndEndRadius?: null;

    // Non-RN border props – null fallback
    borderCollapse?: null;
    borderSpacing?: null;
    border?: null | 'none';
    borderBlock?: null;
    borderBlockColor?: null;
    borderBlockStyle?: null;
    borderBlockWidth?: null;
    borderBlockEnd?: null;
    borderBlockStart?: null;
    borderInline?: null;
    borderInlineColor?: null;
    borderInlineStyle?: null;
    borderInlineWidth?: null;
    borderInlineEnd?: null;
    borderInlineStart?: null;

    // Individual sides color/style/width – partial support
    borderTopColor?: KitsResponsiveValue<ViewStyle['borderColor']>;
    borderTopStyle?: KitsResponsiveValue<ViewStyle['borderStyle']>;
    borderTopWidth?: KitsResponsiveValue<ViewStyle['borderTopWidth']>;

    borderBottomColor?: KitsResponsiveValue<ViewStyle['borderColor']>;
    borderBottomStyle?: KitsResponsiveValue<ViewStyle['borderStyle']>;
    borderBottomWidth?: KitsResponsiveValue<ViewStyle['borderBottomWidth']>;

    borderLeftColor?: KitsResponsiveValue<ViewStyle['borderColor']>;
    borderLeftStyle?: KitsResponsiveValue<ViewStyle['borderStyle']>;
    borderLeftWidth?: KitsResponsiveValue<ViewStyle['borderLeftWidth']>;

    borderRightColor?: KitsResponsiveValue<ViewStyle['borderColor']>;
    borderRightStyle?: KitsResponsiveValue<ViewStyle['borderStyle']>;
    borderRightWidth?: KitsResponsiveValue<ViewStyle['borderRightWidth']>;

}

export interface IBg {

    backgroundColor?: KitsResponsiveValue<ColorValue | ColorValue$1>;
    bgColor?: KitsResponsiveValue<ColorValue | ColorValue$1>;

    // ❌ Not supported directly in RN
    backgroundImage?: null;
    bgImage?: null;
    backgroundRepeat?: null;
    bgRepeat?: null;
    backgroundSize?: null;
    bgSize?: null;
    backgroundPosition?: null;
    bgPosition?: null;
}

export interface ILayout {
    display?: KitsResponsiveValue<ViewStyle["display"]>; // "none" | "flex"
    overflow?: KitsResponsiveValue<ViewStyle["overflow"] | 'auto'>; // "visible" | "hidden" | "scroll"
    overflowY?: KitsResponsiveValue<"visible" | "hidden">; // ❌ RN does not separate X/Y overflow — you must handle manually
    overflowX?: KitsResponsiveValue<"visible" | "hidden">;

    position?: KitsResponsiveValue<ViewStyle["position"] | 'fixed' | 'sticky'>;
    top?: KitsResponsiveValue<ViewStyle['top']>;
    bottom?: KitsResponsiveValue<ViewStyle['bottom']>;
    right?: KitsResponsiveValue<ViewStyle['right']>;
    left?: KitsResponsiveValue<ViewStyle['left']>;
    zIndex?: KitsResponsiveValue<ViewStyle["zIndex"]>;
    aspectRatio?: KitsResponsiveValue<number | string>; // RN supports this as number (w/h) or string

}

export interface IAnimation {
    transition?: KitsResponsiveValue<string>; // e.g., "all 0.3s ease"
    animation?: AnimationsValues;            // predefined enums like "fadeIn", "bounce"
    animationDuration?: number;
    animationDelay?: number;
    animationIteration?: "linear" | "ease-in" | "ease-out" | "ease-in-out";
    animationFunction?: "auto" | 0 | 50 | 100;
    animationFill?: "none" | "forwards" | "backwards" | "both";
}

export interface IDisplay {
    gap?: KitsResponsiveValue<number | string>;
    rowGap?: KitsResponsiveValue<number | string>;
    columnGap?: KitsResponsiveValue<number | string>;
}

export interface IAlignment {
    justifyContent?: KitsResponsiveValue<
        "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly"
    >;
    alignContent?: KitsResponsiveValue<
        "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "stretch"
    >;
    alignItems?: KitsResponsiveValue<
        "flex-start" | "flex-end" | "center" | "stretch" | "baseline"
    >;
    alignSelf?: KitsResponsiveValue<
        "auto" | "flex-start" | "flex-end" | "center" | "stretch" | "baseline"
    >;

    // ❌ Not supported in React Native styles
    verticalAlign?: any;
}

export interface IFlexAlignment {
    flex?: KitsResponsiveValue<number>;
    flexDirection?: KitsResponsiveValue<"row" | "column" | "row-reverse" | "column-reverse">;
    direction?: KitsResponsiveValue<"row" | "column" | "row-reverse" | "column-reverse">;
    flexWrap?: KitsResponsiveValue<"wrap" | "nowrap" | "wrap-reverse">;
    flexGrow?: KitsResponsiveValue<number>;
    flexShrink?: KitsResponsiveValue<number>;
    flexBasis?: KitsResponsiveValue<string>;

    // ❌ Not supported in RN
    flexOrder?: null;
}

export interface IText {
    letterSpacing?: KitsResponsiveValue<number | string>;
    fontSize?: KitsResponsiveValue<number | "base" | Omit<SizingValue, "md"> | HighSizingValue>;
    fontWeight?: KitsResponsiveValue<
        "normal" | "bold" | 'light' | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900"
    >;
    fontColor?: KitsResponsiveValue<ColorValue | ColorValue$1 | string>;
    fontFamily?: KitsResponsiveValue<string>;
    fontStyle?: KitsResponsiveValue<"normal" | "italic">;
    textAlign?: KitsResponsiveValue<"auto" | "left" | "right" | "center" | "justify">;
    textDecoration?: "underline" | "line-through" | "none";
    textTransform?: "none" | "uppercase" | "lowercase" | "capitalize";
    lineHeight?: KitsResponsiveValue<number | `${number}${string}`>;
    textOverflow?: "ellipsis" | "clip" | null;
    whiteSpace?: "nowrap" | "normal" | null;
    numberOfLines?:KitsResponsiveValue<number>;
}

export interface IGrid {
    templateAreas?: KitsResponsiveValue<string>;
    gridTemplateRows?: KitsResponsiveValue<string>;
    gridTemplateColumns?: KitsResponsiveValue<string>;
    columns?: KitsResponsiveValue<number>;
    rows?: KitsResponsiveValue<number>;
    area?: KitsResponsiveValue<number | string>;
    columnGap?: KitsResponsiveValue<number | string>;
    rowGap?: KitsResponsiveValue<number | string>;
    rowSpan?: KitsResponsiveValue<number | string>;
    rowOffset?: KitsResponsiveValue<number | string>;
    colSpan?: KitsResponsiveValue<number | string>;
    colOffset?: KitsResponsiveValue<Numbering0_12>;
    rowStart?: KitsResponsiveValue<number | string>;
    rowEnd?: KitsResponsiveValue<number | string>;
    colStart?: KitsResponsiveValue<number | string>;
    colEnd?: KitsResponsiveValue<number | string>;
}

export interface IGridItem extends IGrid {}

export type ICssStyling = ISpacing &
    ISizing &
    IBorder &
    IBg &
    IDisplay &
    IFlexAlignment &
    IGrid &
    IGridItem &
    IEffects &
    IInteractivity &
    ITransforms &
    ITransition &
    ILayout &
    IAnimation &
    IAlignment &
    IListing &
    IText;
export type IStyleClasses = ICssStyling & {
    _hover?: ICssStyling;
    _focus?: ICssStyling;
};

// Factory/constants/breakpoints.native.ts

declare const GUTTER = 8; // ~0.5rem
declare const FIELD_MARGIN = 16; // ~1rem
declare const FIELD_LABEL_MARGIN = 8;
declare const HELPER_TEXT_MARGIN = 4;
declare const SPACER = 16;

// packages/types/src/… (e.g. style/index.ts or similar)
// Breakpoint thresholds (dp) aligned with the web pixel thresholds so that
// array-style responsive values behave consistently across platforms.
// base: 0  → phones < 480dp
// xs:   480 → large phones / phablets
// sm:   576 → small tablets
// md:   768 → tablets
// lg:   992 → large tablets / landscape
// xl:   1200 → desktops / TVs
declare const breakpoints = {
    base: 0,
    xs: 480,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
    xxl: 1600,
    xxxl: 1920,
} as const;

// packages/types/src/style/Responsive/index.ts

// These reflect the keys in your breakpoint map.
export type Breakpoint = 'base' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl';

// Valid platforms
export type PlatformKey = 'web' | 'ios' | 'android';

// (Optional) Orientation if you support portrait/landscape
export type Orientation = 'portrait' | 'landscape';

export type IRadioCheckboxListItem<T = any> = {
    id?: string;
    label?: string;
    component?:
        | ((args: {
        selected?: boolean;
        value?: T;
        isInvalid: boolean;
    }) => ReactElement)
        | ReactElement;

    /**
     * Identity value (kept in original type).
     * Internally stringified only when a provider requires it (e.g., Gluestack).
     */
    value: T;

    withBulbs?: boolean; // keep withBulbs
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    labelPosition?: "left" | "right" | "top" | "bottom" | "default";

    w?: IStyleClasses["w"];

    /**
     * Optional per-item control (list mode).
     * - checked: controlled
     * - defaultChecked: uncontrolled initial
     */
    checked?: boolean;
    defaultChecked?: boolean;
};

export type IconType = ReactElement

export interface IRTLDetection {
    ignoreDirection?: boolean;
}

declare enum EKeyFilter {
    INT = "int",
    PositiveInteger = "pint",
    Number = "num",
    PositiveNumber = "pnum",
    Money = "money",
    Alphabetic = "alpha",
    Alphanumeric = "alphanum",
    Email = "email",
}
declare enum EDateFormat {
    dayOfMonthNoLeadingZero = "d", // Day of the month (no leading zero)
    dayOfMonthLeadingZero = "dd", // Day of the month (with leading zero)
    abbreviatedMonth = "M", // Abbreviated month name (e.g., Jan)
    fullMonth = "MM", // Full month name (e.g., January)
    twoDigitYear = "y", // Two-digit year (e.g., 21)
    fourDigitYear = "yy", // Four-digit year (e.g., 2021)
    mm_dd_yy = "mm/dd/yy", // Short date format (e.g., 09/13/2023)
    MM_dd_yyyy = "MM dd, yy", // Long date format (e.g., September 13, 2023)
    dayOfWeek = "DD", // Full day of the week (e.g., Tuesday)
    shortDayOfWeek = "D", // Full day of the week (e.g., Tuesday)
    dayOfYearNoLeadingZeros = "o", // Day of the year (no leading zeros)
    dayOfYearThreeDigit = "oo", // Day of the year (three digit)
    "yy/MM/dd" = "yy/MM/dd", // Custom date format (e.g., 2023/September/13)
    yy_M_dd = "yy/M/dd", // Custom date format (e.g., 2023/Sep/13)
    dd_m_yy = "dd/m/yy", // Another custom date format (e.g., 13/9/2023)
    dd_mm_yy = "dd/mm/yy", // Another custom date format (e.g., 13/09/2023)
    MM_yy = "MM yy", // Year and month (e.g., September 2023)
    MM_dd = "MM dd", // Month and day (e.g., September 13)
    customDate = "",
}

export interface IButtonProps<IconT> extends IStyleClasses{
    id?:string;
    'type'?:'submit' | 'button';
    ref?:Ref<any>;
    // Unified props that work on both platforms
    children?: string | ReactNode;
    severity?: "secondary" | "success" | "info" | "warning" | "help" | "danger" | "contrast" | "brand" | undefined;
    icon?: IconT;
    iconPos?: 'left' | 'right' | 'top' | 'bottom';
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    loading?: boolean;
    outlined?: boolean;
    raised?: boolean;
    rounded?: boolean;
    onPress?: MouseEventHandler<any>;
    onClick?: MouseEventHandler<any>;
    label?: string;
    isLoadingText?: string;

    tooltip?:string;
    tooltipOptions?:{
        position?:string
    }

    style?: IStyleClasses;
    // Optional styling
    className?: string; // For web Tailwind
    testID?: string;
}

// Internal shared state/logic interface
export interface IButtonState {
    isPressed: boolean;
    isHovered: boolean;
}

export type ElementProps<T = ViewProps> = IStyleClasses & IKitsAnimation & T & {
    ref?: React$1.Ref<any>;
    onClick?:MouseEventHandler<any> | Function
    className?: string;
}

export type LabelVariant =
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "warning"
    | "info"
    | "outline"
    | "link";

export type TextProps = ElementProps<TextProps$1>;

export interface IBoxComponent extends ElementProps {
    ref?: Ref<ViewProps> | undefined;
    className?: string;
    /** Wrap children in ScrollView (native only) */
    scrollable?: boolean;
}

export type IFlexComponent<T = ViewProps> = Omit<ElementProps<T>, 'style'> & {
    // ref?: Ref<T> | undefined;
    className?: string;
    style?: ViewProps['style'] & {
        border?: string;
        borderBottom?: string;
        borderTop?: string;
        borderLeft?: string;
        borderRight?: string;
    };
    as?:any
    /** Wrap children in ScrollView (native only) */
    scrollable?: boolean;
}

export interface ICollapseProps {
    isOpen: boolean;
    children: ReactNode;
    duration?: number;
}

export interface IGridComponent extends ElementProps<ViewProps> {
    ref?: Ref<any> | undefined;
    children?: ReactNode;
    gap?: number;
    flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
    padding?: number;
    paddingLeft?: number;
    paddingRight?: number;
    paddingStart?: number;
    paddingEnd?: number;
    borderWidth?: number;
    _extra?: { className: string };
}

export interface IGridItemComponent extends ElementProps<ViewProps> {
    fixedWidth?: number;
    children?: ReactNode;
    ref?: Ref<any> | undefined;
    index?: number;
    _extra?: { className: string };
}

export interface ISVGComponent extends ElementProps<React.SVGProps<SVGSVGElement>> {
    ref?: Ref<SVGSVGElement> | undefined;
}

export interface NativeModalProps {
    isOpen?: boolean;
    onClose?: () => void;
    children?: ReactNode;
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'full';
    className?: string;
}

export type IModalComponent = NativeModalProps & IStyleClasses;

export type ICardComponent<T = any> = ElementProps<T> & {
    footer?: ReactNode | ((props: T) => ReactNode);
    header?: ReactNode | ((props: T) => ReactNode);
    title?: ReactNode | ((props: T) => ReactNode);
    subTitle?: ReactNode | ((props: T) => ReactNode);
    size?:'sm'|'md'|'lg'
    variant?:'elevated' | 'outline' | 'ghost' | 'filled'
    coloring?: {
        backgroundColor: string;
        fontColor: string;
        iconColor: string;
    };
    localProps?:T;
    ref?: Ref<T> | undefined;
} & IStyleClasses

export type IImageComponent = IStyleClasses & ImageProps & {
    preview?: boolean;
    zoomSrc?: string;
    indicatorIcon?: ReactNode;
    style?: IStyleClasses;
    src?: string;
    alt?: string;
    size?: '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full' | 'none';
    ref?: Ref<any> | undefined;
}

export interface ITranslateComponent {
    ref?: Ref<Text$1> | undefined;
    label?: string;
}

export interface ITextComponent extends Omit<
    TextProps,
    "width" | "height" | "colSpan" | "rowSpan" | "rows" | "translate" | "as" | 'size'
>{
    as?: "p" | "span" | "small" | "label";
    size?:
        | "xs"
        | "sm"
        | "md"
        | "lg"
        | "xl"
        | "2xl"
        | "3xl"
        | "4xl"
        | "5xl"
        | "6xl";
    isTruncated?: boolean;
    bold?: boolean;
    underline?: boolean;
    strikeThrough?: boolean;
    disabled?: boolean;
    sub?: boolean;
    italic?: boolean;
    highlight?: boolean;
    color?: string;
    children?: ReactNode;
    onClick?: () => void;
    onPress?: () => void;
    variant?: LabelVariant;
    onDoubleClick?:()=>void;
    onLongPress?:()=>void;
    htmlFor?:any
}

export interface NativeLinkProps {
    href?: string;
    isDisabled?: boolean;
    onPress?: (event: any) => void;
    children?: ReactNode;
    className?: string;
}

export interface ILinkComponent extends ElementProps<NativeLinkProps>{
    isExternal?: boolean;
    as?: ElementType;
    to?: string;
    variant?: LabelVariant;
}

export interface IHeadingComponent
    extends ElementProps<TextProps> {
    as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
    size?:
        | "xs"
        | "sm"
        | "md"
        | "lg"
        | "xl"
        | "2xl"
        | "3xl"
        | "4xl"
        | "5xl";
    isTruncated?: boolean;
    bold?: boolean;
    underline?: boolean;
    strikeThrough?: boolean;
    sub?: boolean;
    italic?: boolean;
    highlight?: boolean;
    color?: string;
    children?: ReactNode;
    onClick?: () => void;
    onPress?: () => void;
    variant?: LabelVariant;
}

export interface IStackProps extends ElementProps{

    children?:ReactNode
    /** Gap between children (xs–4xl) */
    space?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
    /** Reverse children order */
    reversed?: boolean;
    /** Wrap children in ScrollView (native only) */
    scrollable?: boolean;
}

export interface ISkeletonText {
    lines?: number;
    width?: string | number;
    // height?: string | number;
    gap?: 1 | 2 | 3 | 4
    spacing?: string | number;
    variant?: 'rounded' | 'sharp' | 'circular'; // Gluestack
    shape?: 'rectangle' | 'circle'; // PrimeReact
    className?: string;
    startColor?: string;
    isLoaded?: boolean;
    speed?: 1 | 2 | 3 | 4
    animation?: 'wave' | 'none'; // PrimeReact only
    borderRadius?: string | number;
    size?: string | number;
    container?:IFlexComponent
    children?:string;
    style:IStyleClasses;

}

export interface ISkeleton {
    variant?: 'rounded' | 'sharp' | 'circular'; // Shape of the skeleton component
    startColor?: string;                        // Skeleton animation color
    isLoaded?: boolean;                         // Toggle to show content when loaded
    speed?: 1 | 2 | 3 | 4;                             // Animation speed
    className?: string;                         // Optional class name for styling
    container?:IFlexComponent;
    style?:any
}

export type IScrollViewComponent = ElementProps<ScrollViewProps>;

export interface IDividerComponent extends IStyleClasses {
    align?: 'center' | 'left' | 'top' | 'bottom' | 'right';
    children?: ReactNode;
    layout?: 'horizontal' | 'vertical';
    type?: 'dashed' | 'dotted' | 'solid';
    unstyled?: boolean;
}

export type IFormAddon =
    | string
    | number
    | IconType
    | ReactNode
    | ((props: { size?: number; color?: string }) => ReactNode)
    | null
    | undefined;


export interface IFormSingleElement<Value = any> {
    id?: string;
    name?: string;
    ref?: any;

    value?: Value;
    defaultValue?: Value;
    attached?:boolean;

    required?: boolean;
    disabled?: boolean;
    invalid?: boolean;
    hideError?: boolean;

    isFloatedLabel?: boolean;
    inputSize?: "sm" | "md" | "lg";

    onChange?: (e: any, item?: any) => void;

    errors?: string | string[] | Record<string, FieldError> | FieldError;

    placeholder?:string;
    label?:
        | string
        | ReactElement
        | {
        placement?: "RL" | "B" | "T";
        text?: string;
        element?: ReactElement;
    };

    helperText?: ReactNode;

    leftAddon?: IFormAddon;
    rightAddon?: IFormAddon;

    ignoreDirection?: boolean;

    /** allow style props */
    style?: IStyleClasses;
    containerStyle?: IStyleClasses;


}

export interface ILabelProps {
    label: IFormSingleElement["label"];
    isFormControl?:boolean;
    className?:string;
    elementId: string; // kept for API parity, unused on native
    as?: ITextComponent['as'] | IHeadingComponent['as']
    required?: boolean;
}

export interface IKitsContainer
    extends IFormSingleElement,
        Omit<
            ElementProps,
            "onChange" | "onBlur" | "onFocus" | "value" | "defaultValue" | "ref" | "style" | "label"
        >,
        IStyleClasses {
    children?:ReactNode
    containerStyle?: IStyleClasses;
    additionalClassName?: string;
}

export interface IEditableProps {
    defaultValue?: string;
    value?: string;

    onChange?: (value: string) => void;
    onSubmit?: (value: string) => void;

    activationMode?: "click" | "dblclick";
    disabled?: boolean;

    type?: "input" | "textarea";

    previewProps?: Record<string, any>;
    inputProps?: Record<string, any>;
    textareaProps?: Record<string, any>;

    controls?: (helpers: {
        submit(): void;
        cancel(): void;
    }) => ReactNode;
}

// packages/types/src/Components/Molecules/Form/Inputs/Number/types.native.ts



export interface IKitsInputNumber extends IFormSingleElement {
    value?: number | null;

    locale?: string;
    useGrouping?: boolean;
    minFractionDigits?: number;
    maxFractionDigits?: number;

    mode?: "decimal" | "currency";
    currency?: string;
    prefix?: string;
    suffix?: string;

    min?: number;
    max?: number;

    localProps?: Record<string, any>;

    onChange?: (event: { value: number | null }) => void;

    ref?: Ref<any>;
}

// ----------------------------------------------------------------
// 2. React Native Interface (Identical Keys)
// ----------------------------------------------------------------
export interface IGlobalEvents {
    // Mouse / Pointer Events mapped to Touch/Gestures
    onClick?: (event: GestureResponderEvent) => void;      // Conceptually maps to `onPress`
    onDoubleClick?: any;                                   // RN requires Double-tap gesture handlers
    onMouseDown?: (event: GestureResponderEvent) => void;  // Conceptually maps to `onPressIn`
    onMouseUp?: (event: GestureResponderEvent) => void;    // Conceptually maps to `onPressOut`
    onMouseEnter?: any;                                    // Hovering doesn't exist on standard mobile touch
    onMouseLeave?: any;
    onMouseMove?: any;

    // Keyboard Events
    onKeyDown?: any;                                       // Hardware keyboards are usually handled globally
    onKeyUp?: any;
    onKeyPress?: (event: NativeSyntheticEvent<TextInputKeyPressEventData>) => void; // Used mostly on TextInput

    // Focus Events
    onFocus?: (event: NativeSyntheticEvent<TargetedEvent>) => void;
    onBlur?: (event: NativeSyntheticEvent<TargetedEvent>) => void;

    // Touch Events
    onTouchStart?: (event: GestureResponderEvent) => void;
    onTouchMove?: (event: GestureResponderEvent) => void;
    onTouchEnd?: (event: GestureResponderEvent) => void;
    onTouchCancel?: (event: GestureResponderEvent) => void;

    // UI Events
    onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void; // Used mostly on ScrollView/FlatList
}

export interface IKitsInputTextBase extends IFormSingleElement, IGlobalEvents {
    value?: string;

    placeholder?: string;
    autoFocus?: boolean;
    isChecked?: boolean;
    hidden?: boolean;

    onSubmitEditing?:()=>void

    containerStyle?: IStyleClasses;

    keyFilter?: EKeyFilter | RegExp;

    className?:string;
    /** platform-specific escape hatch */
    localProps?: unknown;

    style?:any;

    ref?: Ref<any>;
}

export interface IKitsInputMask extends IKitsInputTextBase {
    /** Same API — custom implementation */
    mask?: string;
    unmask?: boolean;

}

/**
 * Native-only extension
 * keyFilter will be implemented manually
 */
export interface IKitsInputText extends IKitsInputTextBase {
    localProps?: {
        keyboardType?: "default" | "numeric" | "email-address";
        secureTextEntry?: boolean;
    } | any;
    /** Override the ID used for keyboard navigation registration (used by PhoneInput). */
    keyboardNavId?: string;
}

export interface IKitsInputTextareaBase extends IFormSingleElement,IGlobalEvents {
    value?: string;

    rows?: number;
    cols?: number;
    autoResize?: boolean;
    maxLength?: number;

    hidden?: boolean;
    isChecked?: boolean;
    autoFocus?: boolean;
    onSubmitEditing?:()=>void

    containerStyle?: IStyleClasses;
    keyFilter?: EKeyFilter | RegExp;

    localProps?: unknown;
    ref?: Ref<any>;
}

export interface IKitsInputTextarea extends IKitsInputTextareaBase {
    localProps?: {
        multiline?: boolean;
        numberOfLines?: number;
    };
}

export interface IKitsInputSwitch extends Omit<IFormSingleElement, 'onChange'> {
    /** Controlled value for the switch (true/false) */
    value?: boolean;
    /** Primereact-like onChange handler */
    onChange?: (e: { target: { value: boolean }; value?: boolean }) => void;
    /** Pre-checked state for uncontrolled usage */
    checked?: boolean;
    /** For passing any extra props to underlying libs */
    localProps?: any;
    /** Ref forwarding */
    ref?: Ref<any>;
}

// packages/types/src/Components/Molecules/Form/Inputs/Password/index.ts


export interface IKitsInputPassword extends Omit<IFormSingleElement, 'onChange'> {
    value?: string;
    defaultValue?: string;
    onChange?: (e: { target: { value: string }; value?: string }) => void;

    promptLabel?: string;
    weakLabel?: string;
    mediumLabel?: string;
    strongLabel?: string;
    header?: ReactElement;
    footer?: ReactElement;
    feedback?: boolean;
    toggleEye?: boolean;
    showStrengthProgress?: boolean;
    localProps?: any;
    schema?:Yup.Schema | Yup.AnySchema
    ref?: Ref<any>;

    /** Custom icon shown when password is hidden (native only; web uses PrimeReact's built-in icon) */
    eyeIcon?: ReactNode;
    /** Custom icon shown when password is visible (native only; web uses PrimeReact's built-in icon) */
    eyeSlashIcon?: ReactNode;
}

export interface IKitsInputCalendar<T = any> extends IFormSingleElement {
    value?: Date | Date[] | null;
    defaultValue?: Date | Date[] | null;
    onChange?: (val: Date | Date[] | null) => void;
    placeholder?: string;
    localProps?: Omit<T, 'value' | 'onChange'> | {
        dateFormat?:string;
        placeholder?:string;
        selectionMode?:"range" | "single";
        view?:"date",
        numberOfMonths?:number
    };
}

export interface downloadableFileResponse {
  url?: string | null;
  file_name?: string | null;
}

export type FetchSuccess<T = any, Y = {}, X = {}> = {
  success: true;
  data: T;
  message?: string;
  meta?: Y
} & X;

export type FetchError = {
  pageCode: number;
  success: false;
  message: string;
};

export type ServerResponse<T = any, Y = {}, X = {}> = FetchSuccess<T, Y, X> | FetchError;

export type FetchTablePaginationData = {
  requested_page_size: number;
  actual_page_size: number;
  page_index: number;
  page_count: number;
  total: number;
};
export type FetchTableDataRes<T> = T[];

declare type Booleanish = boolean | 'true' | 'false';
declare type Numberish = number | string;
declare type Nullable<T = void> = T | null | undefined;

export interface FormTarget<T = any> {
    name: string;
    id: string;
    value: Nullable<T>;
    checked?: boolean;
    [key: string]: any;
}

export interface FormBooleanTarget {
    name: string;
    id: string;
    value: boolean;
    checked: boolean;
    [key: string]: any;
}

export interface FormEvent<T = any, E = React$1.SyntheticEvent> {
    originalEvent?: E;
    value: Nullable<T>;
    checked?: boolean;
    stopPropagation(): void;
    preventDefault(): void;
    target: FormTarget<T>;
}

export interface FormBooleanEvent<E = React$1.SyntheticEvent> {
    originalEvent?: E;
    value: boolean;
    checked: boolean;
    stopPropagation(): void;
    preventDefault(): void;
    target: FormBooleanTarget;
}

export type Timeout = ReturnType<typeof setTimeout> | null

// ─── Inlined tree types (originally from @lmb-it/kitsconcertomobile) ────

export type ExpandedKeys = { [key: string]: boolean };

export type TreeCheckboxSelectionKeyType = {
    checked: boolean;
    partialChecked?: boolean;
};

export type TreeCheckboxSelectionKeys = TreeCheckboxSelectionKeyType;

export interface TreeSelectionEvent {
    originalEvent: React$1.SyntheticEvent;
    value: string | { [key: string]: boolean } | { [key: string]: TreeCheckboxSelectionKeyType } | null;
}

export type TreeNodeClickEvent<T = any> = {
    originalEvent: React$1.SyntheticEvent;
    node: T;
};

export interface TreeRef {
    filter?: (value: any) => void;
}

export interface TreeProps<T = any> {
    ref?: Ref<TreeRef>;
    value?: TreeNode<any>[];
    expandedKeys?: ExpandedKeys;
    onToggle?: (e: { originalEvent: React$1.SyntheticEvent; value: TreeNode<any>[] }) => void;
    onExpand?: (e: { node: TreeNode<any>; originalEvent?: any }) => void;
    onCollapse?: (e: { node: TreeNode<any>; originalEvent?: any }) => void;
    selectionMode?: 'single' | 'multiple' | 'checkbox';
    selectionKeys?: string | Record<string, boolean> | TreeCheckboxSelectionKeyType | null;
    metaKeySelection?: boolean;
    onSelectionChange?: (e: TreeSelectionEvent) => void;
    filter?: boolean;
    filterValue?: string;
    filterBy?: string;
    filterMode?: 'lenient' | 'strict';
    filterPlaceholder?: string;
    nodeTemplate?: (node: TreeNode<any>, options?: any) => any;
    togglerTemplate?: (node: TreeNode<any>, options?: any) => any;
    /** When true, only parent nodes that have children are rendered */
    onlyParentsWithChildren?: boolean;
    /** Text shown when there are no records */
    emptyMessage?: string;
    lazy?: boolean;
    loading?: boolean;
    dragdropScope?: string;
    onDragDrop?: (e: any) => void;
    onNodeClick?: (e: TreeNodeClickEvent<TreeNode<any>>) => void;
    contextMenuSelectionKey?: string;
    onContextMenuSelectionChange?: (e: any) => void;
    onContextMenu?: (e: any) => void;
    className?: string;
    style?: any;
    pt?: any;
}

// ─── TreeNode ────────────────────────────────────────────────────────

export type TreeNode<T = any> = {
    id?: string | undefined;
    key?: string | number | undefined;
    label?: string | undefined;
    data?: T;
    icon?: any | undefined;
    children?: TreeNode<T>[] | undefined;
    style?: IStyleClasses | undefined;
    className?: string | undefined;
    droppable?: boolean | undefined;
    draggable?: boolean | undefined;
    selectable?: boolean | undefined;
    disabled?: boolean | undefined;
    leaf?: boolean | undefined;
    expanded?: boolean | undefined;
}

export type TreeNodeTemplateOptions = {
    onTogglerClick(event: React$1.SyntheticEvent): void;
    className: string;
    element: JSX.Element;
    props: TreeProps;
    expanded: boolean;
}

export interface IToolbarProps<T> {
    props: ITreeViewProps<T>;
    filterValue: string;
    setFilterValue: (val: string) => void;
    treeRef: TreeRef | null;
    selectedNode: TreeNode<ITreeItem<T>> | null;
    expandAll: () => void;
    collapseAll: () => void;
    onAddNode: (key?: any) => void;
    onAddNodeItem: (key?: any) => void;
    onDeleteNode: (key?: any) => void;
    onEditNode: (key?: any) => void;
    build: () => void;
}

export interface ServerMethod {
    (node: ITreeItem): Promise<ServerResponse<ITreeItem>> | null;
}

export type ITreeItem<T = any> = {
    isItem: boolean;
    label: string;
    value: number | string;
    parentId?: null | number | string;
    data: T;
    icon?: string;
};

// Interface for server-side interactions
export interface ServerSideProps {
    listFetcher?: () => Promise<ServerResponse<ITreeItem[]>>;
    onAddCategory?: ServerMethod;
    onAddItem?: ServerMethod;
    onDeleteCategory?: (
        node: ITreeItem,
    ) => Promise<ServerResponse<ITreeItem>> | null;
    onDeleteItem?: (node: ITreeItem) => Promise<ServerResponse<ITreeItem>> | null;
    onUpdateCategory?: ServerMethod;
    onUpdateItem?: ServerMethod;
    onSortItem?: (
        node: ITreeItem,
        toNode: ITreeItem | null,
    ) => Promise<ServerResponse<ITreeItem>> | null;
}

// Interface for callback props
export interface CallbackProps<T> {
    onAddCategory?: (newItem: ITreeItem<T>) => void;
    onAddItem?: (newItem: ITreeItem<T>) => void;
    onDeleteCategory?: (node: ITreeItem<T>) => void;
    onDeleteItem?: (node: ITreeItem<T>) => void;
    onUpdateCategory?: (node: ITreeItem<T>) => void;
    onUpdateItem?: (node: ITreeItem<T>) => void;
    onSortItem?: (node: ITreeItem<T>, toNode: ITreeItem<T> | null) => void;
    onSelectItem?: (node: ITreeItem<T>) => void;
}

// Interface for validation methods
export interface ValidationProps<T> {
    beforeAddCategory?: (
        parentNode: ITreeItem<T> | null,
    ) => Promise<[boolean, ITreeItem<T>?]>;
    beforeAddItem?: (
        parentNode: ITreeItem<T> | null,
    ) => Promise<[boolean, ITreeItem<T>?]>;
    beforeDeleteCategory?: (node: ITreeItem<T>) => Promise<[boolean, string]>;
    beforeDeleteItem?: (node: ITreeItem<T>) => Promise<[boolean, string]>;
    beforeUpdateCategory?: (node: ITreeItem<T>) => Promise<[boolean, ITreeItem<T>?]>;
    beforeUpdateItem?: (node: ITreeItem<T>) => Promise<[boolean, ITreeItem<T>?]>;
    beforeSortItem?: (
        node: ITreeItem<T>,
        to: ITreeItem<T> | null,
    ) => Promise<[boolean, ITreeItem<T>?]>;
}

export type clearFunction = (
    specify?:
        | "all"
        | "checkedCategories"
        | "checkedItems"
        | "unCheckedCategories"
        | "unCheckedItems"
        | "newItems"
        | "newCategories"
        | "editedItems"
        | "editedCategories"
        | "deletedItems"
        | "deletedCategories",
) => void;

// Interface for tree change notification
export interface TreeChangeProps {
    onUpdateChecklist?: (oldNode: ITreeItem, newNode: ITreeItem) => void;
    onTreeChange?: (
        props: {
            checkedCategories: (string | number)[];
            checkedItems: (string | number)[];
            unCheckedCategories: (string | number)[];
            unCheckedItems: (string | number)[];
            newItems: ITreeItem[];
            newCategories: ITreeItem[];
            editedItems: ITreeItem[];
            editedCategories: ITreeItem[];
            deletedItems: ITreeItem[];
            deletedCategories: ITreeItem[];
        },
        clear: clearFunction,
    ) => void;
}

// Interface for customizable text labels
export interface TextLabels {
    addNode?: string;
    addItem?: string;
    deleteNode?: string;
    editNode?: string;
    deleteItem?: string;
    editItem?: string;
}

// Main interface for the CustomTreeView component props
export interface ITreeViewProps<T=any>
    extends CallbackProps<T>,
        ValidationProps<T>,
        TreeChangeProps {
    tree?: ITreeItem<T>[];
    checkbox?: boolean;
    nodeTemplate?: (
        node: TreeNode<ITreeItem<T>>,
        options: TreeNodeTemplateOptions,
    ) => ReactNode;
    allowNoCategoryItem?: boolean;
    expendableControls?: boolean;
    isExpended?: boolean;
    isStructured?: boolean;
    preselectList?: (string | number)[];
    isReadOnly?: boolean;
    containerProps?: IFlexComponent;
    rules?: {
        addCategory?: boolean;
        addSubCategory?: boolean;
        addItem?: boolean;

        updateCategory?: boolean;
        updateSubCategory?: boolean;
        updateItem?: boolean;

        deleteCategory?: boolean;
        deleteSubCategory?: boolean;
        deleteItem?: boolean;

        allowIndependentItem?: boolean;
    };
    hideDisabledButton?: boolean;
    serverSide?: ServerSideProps;
    isLoading?: boolean;
    hideSearchBox?: boolean;
    renderedItemTemplate?: (node: TreeNode<ITreeItem<T>>) => React.ReactNode;
    sortable?: boolean;
    text?: TextLabels;
    // New props for toolbar hiding logic passed from original implementation
    hideToolbar?: boolean;
}

export interface IRef {
    value?: string | number | string[] | number[] | null;
    setValue?: (value: string | number | string[] | number[] | null) => void;
}
export interface ITreeSelectNode {
    key: string;
    label?: string;
    data?: any;
    icon?: React.ReactNode;

    children?: ITreeSelectNode[];

    selectable?: boolean;
    disabled?: boolean;

    style?: any;
    className?: string;
}

export interface TreeViewProps {
    nodes: ITreeSelectNode[];
    selectionMode?: 'single' | 'multiple' | 'checkbox';
    value?: any;
    expandedKeys?: Record<string, boolean>;

    filter?: boolean;
    filterBy?: string;

    nodeTemplate?: (node: ITreeSelectNode) => ReactNode;

    onChange?: (e: ChangeEvent<{ value: any }>) => void;
    onToggle?: (e: ChangeEvent<{ value: any }>) => void;
}


// 1. Data Definitions
export type IListItem = Record<string, any> | string | number;


export type IList = IListItem[] | (() => Promise<ServerResponse<IListItem[]>>);

// 2. Base Props (Shared by ALL Select components)
// TStyle = CSSProperties (Web) | ViewStyle (Native)
// TLocalProps = PrimeReact Props | Gluestack Props
export interface ISelectCore<TStyle = any, TLocalProps = any> extends IFormSingleElement{
    // Data & State
    list: IList;
    loading?: boolean;

    attached?:boolean;

    // Keys Configuration
    labelKey?: string;
    valueKey?: string;
    childrenKey?: string;
    outputValueKey?: string;

    // UI / Layout
    inputSize?: "sm" | "md" | "lg";

    // Feature Flags
    withFilter?: boolean;
    filterBy?: string;
    virtualScroll?: boolean | any; // Type 'any' allows passing specific config objects
    emptyFilterMessage?: ReactNode;
    showClear?: boolean;
    itemTemplate?: (item: any) => ReactNode;

    // Platform Passthrough
    className?: string;
    localProps?: TLocalProps; // Escape hatch for library-specific props
}

// 3. Component Specific Cores

export interface ICascadeSelectCore<S, P> extends ISelectCore<S, P> {
    withArrow?: boolean;
}
export interface IDropdownCore<S, P> extends ISelectCore<S, P> {
    withArrow?: boolean;
}

export interface IMultiSelectCore<S, P> extends ISelectCore<S, P> {
    withArrow?: boolean;
    selectionLimit?: number;
    // 'chip' or 'comma' (web) / 'text' (native)
    valueMode?: "chip" | "comma" | "text";
}

export interface IAutoCompleteCore<S, P> extends ISelectCore<S, P> {
    completeMethod?: (query: string) => void | Promise<any>;
    forceSelection?: boolean;
    isMultiple?: boolean;
    withArrow?: boolean;
    delay?: number;
    minLength?: number;
    selectionLimit?: number;
    showEmptyMessage?: boolean;
}

export interface IListBoxCore<S, P> extends ISelectCore<S, P> {
    isMultiple?: boolean;
}

export interface ITreeSelectCore<S, P> extends ISelectCore<S, P> {
    isMultiple?: boolean;
    isStructured?: boolean; // If true, assumes data is already in ITreeSelectNode format
    valueMode?: "chip" | "comma";
    /** When true, only parent nodes that have children are rendered */
    onlyParentsWithChildren?: boolean;
    /** Resets filter value when the overlay panel is hidden */
    resetFilterOnHide?: boolean;
    /** Maximum height of the options panel in pixels (default: 350) */
    scrollHeight?: number;
    /** Text shown when there are no options */
    emptyMessage?: string;
}

// Generic Type for the Hook
export type ISelect = ISelectCore<any, any>;

export interface IContextValues<T=any> {
    onChange: (e: any, item?: any) => void;
    selectedValue: any;
    list: ITreeItem<T>[];
    labelKey: string;
    valueKey: string;
    hideError?: boolean;
    outputValueKey: string;
    childrenKey: string | null;
}

export interface ISelectType {
    shape?: "cascade" | "dropdown" | "multiselect" | "autocomplete" | "listBox" | "treeSelect"
}

// Define the concrete types used by components
export type ICascadeSelect = ICascadeSelectCore<ViewStyle, any>;
export type IDropdownSelect = IDropdownCore<ViewStyle, any>;
export type IMultiSelect = IMultiSelectCore<ViewStyle, any>;
export type IAutoCompleteElement = IAutoCompleteCore<ViewStyle, any>;
export type IListBoxSelect = IListBoxCore<ViewStyle, any>;
export type ITreeSelect = ITreeSelectCore<ViewStyle, any>;

export type ISelectElement =
    | ICascadeSelect
    | IDropdownSelect
    | IMultiSelect
    | IAutoCompleteElement
    | IListBoxSelect
    | ITreeSelect;

export type IAddressSearchResults = (
  pSearchTerm: string,
  pCountryISO?: string
) => Promise<
  AxiosResponse<{
    result: {
      confidence: string
      more_results_available: boolean
      suggestions?: {
        global_address_key: string
        text: string
        format: string
      }[]
    }
  }>
>
export type ICountrySearchResults = (pCountryISO?:string) => Promise<AxiosResponse<{
    result: {
        country_iso_3: string;
        country_name: string;
        datasets: {
            id: string;
            name: string;
        }[]
    }
}>>
export type IEmailSearchResults = (pEmail:string) => Promise<AxiosResponse<{
    result: {
        result: {
            verbose_output: string;
            email: string;
            confidence: string;
        },
        metadata: {
            domain_detail: {
                type: string;
            }
        }
    }
}>>
export type IAddressExperianFormat = {
    global_address_key: string;
    confidence: string;
    address: {
        address_line_1: string;
        address_line_2: string;
        address_line_3: string;
        locality: string;
        region: string;
        postal_code: string;
        country: string;
    },
    components: {
        language: string;
        country_name: string;
        country_iso_3: string;
        country_iso_2: string;
        postal_code: {
            full_name: string;
            primary: string;
        },
        building: {
            building_number: string;
        },
        street: {
            full_name: string;
            name: string;
            type: string;
        },
        locality: {
            region: {
                name: string;
                code: string;
            },
            town: {
                name: string;
            }
        }
    }
}
export type IAddressFormatResults = (pGlobalAddressKey:string) => Promise<AxiosResponse<{
    result: IAddressExperianFormat
}>>
export type IPhoneValidationResults = (pPhoneNumber: any, pCountryCode?:string) => Promise<AxiosResponse<{
    result: {
        number: string;
        validated_phone_number: string;
        formatted_phone_number: string;
        phone_type: string;
        confidence: string;
        ported_date: string;
        disposable_number: string;
    },
    metadata: {
        phone_detail: {
            original_operator_name: string;
            original_network_status: string;
            original_home_network_identity: string;
            original_country_prefix: string;
            original_country_name: string;
            original_country_iso: string;
            operator_name: string;
            network_status: string;
            home_network_identity: string;
            country_prefix: string;
            country_name: string;
            country_iso: string;
            is_ported: string;
            cache_value_days: string;
            date_cached: string;
        }
    }
}>>

export type IAddressFormat = {
    formatted_address?: string;
    city?: string;
    country?: string;
};

export interface IKitsInputLocation
    extends Omit<IAutoCompleteElement, "shape"> {
    onAddressClick?: (props: IAddressFormat) => void;
    countryISO?:string;
    provider?: "google" | "experian";
    api_key?: string;
    forceSelection?: boolean;
}



export interface ILocationDetailsResponse {
    result: {
        address_components: {
            long_name: string;
            short_name: string;
            types: string[];
        }[];
        formatted_address: string;
        // add other fields as necessary
    };
    // add other fields as necessary
}

export interface ILocationResponse {
    predictions: Prediction[];
    status: string;
}

export interface Prediction {
    description: string;
    matched_substrings: MatchedSubString[];
    place_id: string;
    reference: string;
    structured_formatting: StructuredFormatting;
    terms: Term[];
    types: string[];
}

export interface MatchedSubString {
    length: number;
    offset: number;
}

export interface StructuredFormatting {
    main_text: string;
    main_text_matched_substrings: MatchedSubString[];
    secondary_text: string;
}

export interface Term {
    offset: number;
    value: string;
}

/** Structured phone output when outputFormat is "object" */
export interface IPhoneObjectValue {
    /** Country calling code (e.g., "61" for Australia) */
    countryCode: string;
    /** National phone number digits without country code (e.g., "412345678") */
    nationalNumber: string;
    /** Full international formatted display (e.g., "+61-4-1234-5678") */
    internationalFormatted: string;
    /** National formatted display without country prefix (e.g., "4-1234-5678") */
    nationalFormatted: string;
    /** ISO 3166-1 alpha-2 code (e.g., "AU") */
    iso: string;
}

/** Phone value — either E.164 string or structured object depending on outputFormat */
export type IPhoneValue = string | IPhoneObjectValue;

export interface IKitsPhoneInput
    extends Omit<IKitsInputMask, "onBlur" | "onFocus" | "onChange"> {
    value?: any;
    isWithCountryCode?: boolean;
    /**
     * Controls the shape of the onChange output.
     * - "string": emits E.164 string (e.g., "+15551234567")
     * - "object": emits IPhoneObjectValue with countryCode, nationalNumber, formatted values
     * @default "string"
     */
    outputFormat?: 'string' | 'object';
    /** Default country ISO code for initial flag display (e.g., "US") */
    defaultCountry?: string;
    onChange?: (value: any) => void;
    onFocus?: (value: any) => void;
    onBlur?: (value: any) => void;
    /** @deprecated Masking is now handled automatically via format-as-you-type */
    withMask?: boolean;
    /** @deprecated No longer needed — country selection removed */
    labelKey?: string;
    /** @deprecated No longer needed — country selection removed */
    valueKey?: string;
    customCountriesCodesList?: { name: string; code: string | number; iso?: string; flag?: string }[];
    includedCountries?: string[];
    excludedCountries?: string[];
    ref?: Ref<{
        value: IPhoneValue;
        setValue(value: any): void;
    }>;
}

export interface IKitsInputRating extends Omit<IFormSingleElement, 'leftAddon' | 'rightAddon' | 'style'> {
    value?: any;
    starsNumber?: number;
    readOnly?: boolean;
    cancelIcon?: ReactElement;
    onIcon?: ReactElement;
    offIcon?: ReactElement;
    onChange?: (event: FormEvent<number>) => void;
    containerStyle?:IStyleClasses
}

export interface IKitsInputColorPicker extends IFormSingleElement {
    /** Controlled value (string or object depending on format) */
    value?: any;
    /** Uncontrolled default value */
    defaultValue?: any;
    /** Output the color change (string or object) */
    onChange?: (value: any) => void;
    /** Format: `hex` | `rgb` | `hsl` (for native, determine accordingly) */
    colorFormat?: 'hex' | 'rgb' | 'hsb';
    /** Inline display (web only) */
    inline?: boolean;
    /** Local props (web-only for Primereact `<ColorPicker>`), typed loosely */
    localProps?: Record<string, any>;

    containerStyle?:any
}

/**
 * Native equivalent of PrimeReact SliderSlideEndEvent
 * We intentionally normalize this to the final value
 * to keep API consistent across platforms.
 */
export interface SliderChangeEvent {
    /**
     * Slide event
     */
    originalEvent?: React$1.SyntheticEvent;
    /**
     * New value
     */
    value: number | [number, number];
}
export interface ISliderProps extends ElementProps, IStyleClasses {
    minValue: number;
    maxValue?: number;
    size?: KitsResponsiveValue<any>;
    prefix?: string;
    orientation?: "horizontal" | "vertical";
    value?: number | [number, number];
    isRange?: boolean;
    required?: boolean;

    step?: number;
    disabled?: boolean;
    onChange?(e: { value: number | [number, number] }): void;
    onSlideEnd?(e: SliderChangeEvent): void;
}

declare const fileTypeIcon:Record<string, any> = {
    pdf: FaFilePdf,
    mp3: FaFileAudio,
    wav: FaFileAudio,
    csv: FaFileCsv,
    png: FaFileImage,
    jpg: FaFileImage,
    jpeg: FaFileImage,
    gif: FaFileImage,
    js: IoLogoJavascript,
    unknown: AiFillFileUnknown,
};

declare const imagesTypes = {
    "png": "image/png",
    "jpgv": "video/jpeg",
    "jpg": "image/jpeg",
    "jpe": "image/jpeg",
    "gif": "image/gif",
    "jpeg": "image/jpeg",
} as const;


declare const filesTypes = {
    allFiles: ["*/*", "public.item", "*"],
    pdf: ["application/pdf", "com.adobe.pdf"],
    json: ["application/json", "public.json"],
    txt: ["text/plain", "public.plain-text"],
    doc: ["application/msword", "com.microsoft.word.doc"],
    docx: [
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "org.openxmlformats.wordprocessingml.document",
    ],
    xls: ["application/vnd.ms-excel", "com.microsoft.excel.xls"],
    xlsx: [
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "org.openxmlformats.spreadsheetml.sheet",
    ],
    ppt: ["application/vnd.ms-powerpoint", "com.microsoft.powerpoint.ppt"],
    pptx: [
        "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        "org.openxmlformats.presentationml.presentation",
    ],
    zip: ["application/zip", "public.zip-archive"],
    csv: ["text/csv", "public.comma-separated-values-text"],
    audio: ["audio/*", "public.audio"],
    video: ["video/*", "public.movie"],
    images: ["image/*", "public.image"],
    "123": "application/vnd.lotus-1-2-3",
    "1km": "application/vnd.1000minds.decision-model+xml",
    "3dml": "text/vnd.in3d.3dml",
    "3ds": "image/x-3ds",
    "3g2": "video/3gpp2",
    "3gp": "video/3gpp",
    "3gpp": "video/3gpp",
    "3mf": "model/3mf",
    "7z": "application/x-7z-compressed",
    "aab": "application/x-authorware-bin",
    "aac": "audio/x-aac",
    "aam": "application/x-authorware-map",
    "aas": "application/x-authorware-seg",
    "abw": "application/x-abiword",
    "ac": "application/vnd.nokia.n-gage.ac+xml",
    "acc": "application/vnd.americandynamics.acc",
    "ace": "application/x-ace-compressed",
    "acu": "application/vnd.acucobol",
    "acutc": "application/vnd.acucorp",
    "adp": "audio/adpcm",
    "adts": "audio/aac",
    "aep": "application/vnd.audiograph",
    "afm": "application/x-font-type1",
    "afp": "application/vnd.ibm.modcap",
    "age": "application/vnd.age",
    "ahead": "application/vnd.ahead.space",
    "ai": "application/postscript",
    "aif": "audio/x-aiff",
    "aifc": "audio/x-aiff",
    "aiff": "audio/x-aiff",
    "air": "application/vnd.adobe.air-application-installer-package+zip",
    "ait": "application/vnd.dvb.ait",
    "ami": "application/vnd.amiga.ami",
    "aml": "application/automationml-aml+xml",
    "amlx": "application/automationml-amlx+zip",
    "amr": "audio/amr",
    "apk": "application/vnd.android.package-archive",
    "apng": "image/apng",
    "appcache": "text/cache-manifest",
    "appinstaller": "application/appinstaller",
    "application": "application/x-ms-application",
    "appx": "application/appx",
    "appxbundle": "application/appxbundle",
    "apr": "application/vnd.lotus-approach",
    "arc": "application/x-freearc",
    "arj": "application/x-arj",
    "asc": "application/pgp-signature",
    "asf": "video/x-ms-asf",
    "asm": "text/x-asm",
    "aso": "application/vnd.accpac.simply.aso",
    "asx": "video/x-ms-asf",
    "atc": "application/vnd.acucorp",
    "atom": "application/atom+xml",
    "atomcat": "application/atomcat+xml",
    "atomdeleted": "application/atomdeleted+xml",
    "atomsvc": "application/atomsvc+xml",
    "atx": "application/vnd.antix.game-component",
    "au": "audio/basic",
    "avci": "image/avci",
    "avcs": "image/avcs",
    "avi": "video/x-msvideo",
    "avif": "image/avif",
    "aw": "application/applixware",
    "azf": "application/vnd.airzip.filesecure.azf",
    "azs": "application/vnd.airzip.filesecure.azs",
    "azv": "image/vnd.airzip.accelerator.azv",
    "azw": "application/vnd.amazon.ebook",
    "b16": "image/vnd.pco.b16",
    "bat": "application/x-msdownload",
    "bcpio": "application/x-bcpio",
    "bdf": "application/x-font-bdf",
    "bdm": "application/vnd.syncml.dm+wbxml",
    "bdoc": "application/x-bdoc",
    "bed": "application/vnd.realvnc.bed",
    "bh2": "application/vnd.fujitsu.oasysprs",
    "bin": "application/octet-stream",
    "blb": "application/x-blorb",
    "blorb": "application/x-blorb",
    "bmi": "application/vnd.bmi",
    "bmml": "application/vnd.balsamiq.bmml+xml",
    "bmp": "image/x-ms-bmp",
    "book": "application/vnd.framemaker",
    "box": "application/vnd.previewsystems.box",
    "boz": "application/x-bzip2",
    "bpk": "application/octet-stream",
    "bsp": "model/vnd.valve.source.compiled-map",
    "btf": "image/prs.btif",
    "btif": "image/prs.btif",
    "buffer": "application/octet-stream",
    "bz": "application/x-bzip",
    "bz2": "application/x-bzip2",
    "c": "text/x-c",
    "c11amc": "application/vnd.cluetrust.cartomobile-config",
    "c11amz": "application/vnd.cluetrust.cartomobile-config-pkg",
    "c4d": "application/vnd.clonk.c4group",
    "c4f": "application/vnd.clonk.c4group",
    "c4g": "application/vnd.clonk.c4group",
    "c4p": "application/vnd.clonk.c4group",
    "c4u": "application/vnd.clonk.c4group",
    "cab": "application/vnd.ms-cab-compressed",
    "caf": "audio/x-caf",
    "cap": "application/vnd.tcpdump.pcap",
    "car": "application/vnd.curl.car",
    "cat": "application/vnd.ms-pki.seccat",
    "cb7": "application/x-cbr",
    "cba": "application/x-cbr",
    "cbr": "application/x-cbr",
    "cbt": "application/x-cbr",
    "cbz": "application/x-cbr",
    "cc": "text/x-c",
    "cco": "application/x-cocoa",
    "cct": "application/x-director",
    "ccxml": "application/ccxml+xml",
    "cdbcmsg": "application/vnd.contact.cmsg",
    "cdf": "application/x-netcdf",
    "cdfx": "application/cdfx+xml",
    "cdkey": "application/vnd.mediastation.cdkey",
    "cdmia": "application/cdmi-capability",
    "cdmic": "application/cdmi-container",
    "cdmid": "application/cdmi-domain",
    "cdmio": "application/cdmi-object",
    "cdmiq": "application/cdmi-queue",
    "cdx": "chemical/x-cdx",
    "cdxml": "application/vnd.chemdraw+xml",
    "cdy": "application/vnd.cinderella",
    "cer": "application/pkix-cert",
    "cfs": "application/x-cfs-compressed",
    "cgm": "image/cgm",
    "chat": "application/x-chat",
    "chm": "application/vnd.ms-htmlhelp",
    "chrt": "application/vnd.kde.kchart",
    "cif": "chemical/x-cif",
    "cii": "application/vnd.anser-web-certificate-issue-initiation",
    "cil": "application/vnd.ms-artgalry",
    "cjs": "application/node",
    "cla": "application/vnd.claymore",
    "class": "application/java-vm",
    "cld": "model/vnd.cld",
    "clkk": "application/vnd.crick.clicker.keyboard",
    "clkp": "application/vnd.crick.clicker.palette",
    "clkt": "application/vnd.crick.clicker.template",
    "clkw": "application/vnd.crick.clicker.wordbank",
    "clkx": "application/vnd.crick.clicker",
    "clp": "application/x-msclip",
    "cmc": "application/vnd.cosmocaller",
    "cmdf": "chemical/x-cmdf",
    "cml": "chemical/x-cml",
    "cmp": "application/vnd.yellowriver-custom-menu",
    "cmx": "image/x-cmx",
    "cod": "application/vnd.rim.cod",
    "coffee": "text/coffeescript",
    "com": "application/x-msdownload",
    "conf": "text/plain",
    "cpio": "application/x-cpio",
    "cpl": "application/cpl+xml",
    "cpp": "text/x-c",
    "cpt": "application/mac-compactpro",
    "crd": "application/x-mscardfile",
    "crl": "application/pkix-crl",
    "crt": "application/x-x509-ca-cert",
    "crx": "application/x-chrome-extension",
    "cryptonote": "application/vnd.rig.cryptonote",
    "csh": "application/x-csh",
    "csl": "application/vnd.citationstyles.style+xml",
    "csml": "chemical/x-csml",
    "csp": "application/vnd.commonspace",
    "css": "text/css",
    "cst": "application/x-director",
    "cu": "application/cu-seeme",
    "curl": "text/vnd.curl",
    "cwl": "application/cwl",
    "cww": "application/prs.cww",
    "cxt": "application/x-director",
    "cxx": "text/x-c",
    "dae": "model/vnd.collada+xml",
    "daf": "application/vnd.mobius.daf",
    "dart": "application/vnd.dart",
    "dataless": "application/vnd.fdsn.seed",
    "davmount": "application/davmount+xml",
    "dbf": "application/vnd.dbf",
    "dbk": "application/docbook+xml",
    "dcr": "application/x-director",
    "dcurl": "text/vnd.curl.dcurl",
    "dd2": "application/vnd.oma.dd2+xml",
    "ddd": "application/vnd.fujixerox.ddd",
    "ddf": "application/vnd.syncml.dmddf+xml",
    "dds": "image/vnd.ms-dds",
    "deb": "application/x-debian-package",
    "def": "text/plain",
    "deploy": "application/octet-stream",
    "der": "application/x-x509-ca-cert",
    "dfac": "application/vnd.dreamfactory",
    "dgc": "application/x-dgc-compressed",
    "dib": "image/bmp",
    "dic": "text/x-c",
    "dir": "application/x-director",
    "dis": "application/vnd.mobius.dis",
    "disposition-notification": "message/disposition-notification",
    "dist": "application/octet-stream",
    "distz": "application/octet-stream",
    "djv": "image/vnd.djvu",
    "djvu": "image/vnd.djvu",
    "dll": "application/x-msdownload",
    "dmg": "application/x-apple-diskimage",
    "dmp": "application/vnd.tcpdump.pcap",
    "dms": "application/octet-stream",
    "dna": "application/vnd.dna",
    "docm": "application/vnd.ms-word.document.macroenabled.12",
    "dot": "application/msword",
    "dotm": "application/vnd.ms-word.template.macroenabled.12",
    "dotx": "application/vnd.openxmlformats-officedocument.wordprocessingml.template",
    "dp": "application/vnd.osgi.dp",
    "dpg": "application/vnd.dpgraph",
    "dpx": "image/dpx",
    "dra": "audio/vnd.dra",
    "drle": "image/dicom-rle",
    "dsc": "text/prs.lines.tag",
    "dssc": "application/dssc+der",
    "dtb": "application/x-dtbook+xml",
    "dtd": "application/xml-dtd",
    "dts": "audio/vnd.dts",
    "dtshd": "audio/vnd.dts.hd",
    "dump": "application/octet-stream",
    "dvb": "video/vnd.dvb.file",
    "dvi": "application/x-dvi",
    "dwd": "application/atsc-dwd+xml",
    "dwf": "model/vnd.dwf",
    "dwg": "image/vnd.dwg",
    "dxf": "image/vnd.dxf",
    "dxp": "application/vnd.spotfire.dxp",
    "dxr": "application/x-director",
    "ear": "application/java-archive",
    "ecelp4800": "audio/vnd.nuera.ecelp4800",
    "ecelp7470": "audio/vnd.nuera.ecelp7470",
    "ecelp9600": "audio/vnd.nuera.ecelp9600",
    "ecma": "application/ecmascript",
    "edm": "application/vnd.novadigm.edm",
    "edx": "application/vnd.novadigm.edx",
    "efif": "application/vnd.picsel",
    "ei6": "application/vnd.pg.osasli",
    "elc": "application/octet-stream",
    "emf": "image/emf",
    "eml": "message/rfc822",
    "emma": "application/emma+xml",
    "emotionml": "application/emotionml+xml",
    "emz": "application/x-msmetafile",
    "eol": "audio/vnd.digital-winds",
    "eot": "application/vnd.ms-fontobject",
    "eps": "application/postscript",
    "epub": "application/epub+zip",
    "es3": "application/vnd.eszigno3+xml",
    "esa": "application/vnd.osgi.subsystem",
    "esf": "application/vnd.epson.esf",
    "et3": "application/vnd.eszigno3+xml",
    "etx": "text/x-setext",
    "eva": "application/x-eva",
    "evy": "application/x-envoy",
    "exe": "application/x-msdownload",
    "exi": "application/exi",
    "exp": "application/express",
    "exr": "image/aces",
    "ext": "application/vnd.novadigm.ext",
    "ez": "application/andrew-inset",
    "ez2": "application/vnd.ezpix-album",
    "ez3": "application/vnd.ezpix-package",
    "f": "text/x-fortran",
    "f4v": "video/x-f4v",
    "f77": "text/x-fortran",
    "f90": "text/x-fortran",
    "fbs": "image/vnd.fastbidsheet",
    "fcdt": "application/vnd.adobe.formscentral.fcdt",
    "fcs": "application/vnd.isac.fcs",
    "fdf": "application/vnd.fdf",
    "fdt": "application/fdt+xml",
    "fe_launch": "application/vnd.denovo.fcselayout-link",
    "fg5": "application/vnd.fujitsu.oasysgp",
    "fgd": "application/x-director",
    "fh": "image/x-freehand",
    "fh4": "image/x-freehand",
    "fh5": "image/x-freehand",
    "fh7": "image/x-freehand",
    "fhc": "image/x-freehand",
    "fig": "application/x-xfig",
    "fits": "image/fits",
    "flac": "audio/x-flac",
    "fli": "video/x-fli",
    "flo": "application/vnd.micrografx.flo",
    "flv": "video/x-flv",
    "flw": "application/vnd.kde.kivio",
    "flx": "text/vnd.fmi.flexstor",
    "fly": "text/vnd.fly",
    "fm": "application/vnd.framemaker",
    "fnc": "application/vnd.frogans.fnc",
    "fo": "application/vnd.software602.filler.form+xml",
    "for": "text/x-fortran",
    "fpx": "image/vnd.fpx",
    "frame": "application/vnd.framemaker",
    "fsc": "application/vnd.fsc.weblaunch",
    "fst": "image/vnd.fst",
    "ftc": "application/vnd.fluxtime.clip",
    "fti": "application/vnd.anser-web-funds-transfer-initiation",
    "fvt": "video/vnd.fvt",
    "fxp": "application/vnd.adobe.fxp",
    "fxpl": "application/vnd.adobe.fxp",
    "fzs": "application/vnd.fuzzysheet",
    "g2w": "application/vnd.geoplan",
    "g3": "image/g3fax",
    "g3w": "application/vnd.geospace",
    "gac": "application/vnd.groove-account",
    "gam": "application/x-tads",
    "gbr": "application/rpki-ghostbusters",
    "gca": "application/x-gca-compressed",
    "gdl": "model/vnd.gdl",
    "gdoc": "application/vnd.google-apps.document",
    "ged": "text/vnd.familysearch.gedcom",
    "geo": "application/vnd.dynageo",
    "geojson": "application/geo+json",
    "gex": "application/vnd.geometry-explorer",
    "ggb": "application/vnd.geogebra.file",
    "ggt": "application/vnd.geogebra.tool",
    "ghf": "application/vnd.groove-help",
    "gim": "application/vnd.groove-identity-message",
    "glb": "model/gltf-binary",
    "gltf": "model/gltf+json",
    "gml": "application/gml+xml",
    "gmx": "application/vnd.gmx",
    "gnumeric": "application/x-gnumeric",
    "gph": "application/vnd.flographit",
    "gpx": "application/gpx+xml",
    "gqf": "application/vnd.grafeq",
    "gqs": "application/vnd.grafeq",
    "gram": "application/srgs",
    "gramps": "application/x-gramps-xml",
    "gre": "application/vnd.geometry-explorer",
    "grv": "application/vnd.groove-injector",
    "grxml": "application/srgs+xml",
    "gsf": "application/x-font-ghostscript",
    "gsheet": "application/vnd.google-apps.spreadsheet",
    "gslides": "application/vnd.google-apps.presentation",
    "gtar": "application/x-gtar",
    "gtm": "application/vnd.groove-tool-message",
    "gtw": "model/vnd.gtw",
    "gv": "text/vnd.graphviz",
    "gxf": "application/gxf",
    "gxt": "application/vnd.geonext",
    "gz": "application/gzip",
    "h": "text/x-c",
    "h261": "video/h261",
    "h263": "video/h263",
    "h264": "video/h264",
    "hal": "application/vnd.hal+xml",
    "hbci": "application/vnd.hbci",
    "hbs": "text/x-handlebars-template",
    "hdd": "application/x-virtualbox-hdd",
    "hdf": "application/x-hdf",
    "heic": "image/heic",
    "heics": "image/heic-sequence",
    "heif": "image/heif",
    "heifs": "image/heif-sequence",
    "hej2": "image/hej2k",
    "held": "application/atsc-held+xml",
    "hh": "text/x-c",
    "hjson": "application/hjson",
    "hlp": "application/winhlp",
    "hpgl": "application/vnd.hp-hpgl",
    "hpid": "application/vnd.hp-hpid",
    "hps": "application/vnd.hp-hps",
    "hqx": "application/mac-binhex40",
    "hsj2": "image/hsj2",
    "htc": "text/x-component",
    "htke": "application/vnd.kenameaapp",
    "htm": "text/html",
    "html": "text/html",
    "hvd": "application/vnd.yamaha.hv-dic",
    "hvp": "application/vnd.yamaha.hv-voice",
    "hvs": "application/vnd.yamaha.hv-script",
    "i2g": "application/vnd.intergeo",
    "icc": "application/vnd.iccprofile",
    "ice": "x-conference/x-cooltalk",
    "icm": "application/vnd.iccprofile",
    "ico": "image/x-icon",
    "ics": "text/calendar",
    "ief": "image/ief",
    "ifb": "text/calendar",
    "ifm": "application/vnd.shana.informed.formdata",
    "iges": "model/iges",
    "igl": "application/vnd.igloader",
    "igm": "application/vnd.insors.igm",
    "igs": "model/iges",
    "igx": "application/vnd.micrografx.igx",
    "iif": "application/vnd.shana.informed.interchange",
    "img": "application/octet-stream",
    "imp": "application/vnd.accpac.simply.imp",
    "ims": "application/vnd.ms-ims",
    "in": "text/plain",
    "ini": "text/plain",
    "ink": "application/inkml+xml",
    "inkml": "application/inkml+xml",
    "install": "application/x-install-instructions",
    "iota": "application/vnd.astraea-software.iota",
    "ipfix": "application/ipfix",
    "ipk": "application/vnd.shana.informed.package",
    "irm": "application/vnd.ibm.rights-management",
    "irp": "application/vnd.irepository.package+xml",
    "iso": "application/x-iso9660-image",
    "itp": "application/vnd.shana.informed.formtemplate",
    "its": "application/its+xml",
    "ivp": "application/vnd.immervision-ivp",
    "ivu": "application/vnd.immervision-ivu",
    "jad": "text/vnd.sun.j2me.app-descriptor",
    "jade": "text/jade",
    "jam": "application/vnd.jam",
    "jar": "application/java-archive",
    "jardiff": "application/x-java-archive-diff",
    "java": "text/x-java-source",
    "jhc": "image/jphc",
    "jisp": "application/vnd.jisp",
    "jls": "image/jls",
    "jlt": "application/vnd.hp-jlyt",
    "jng": "image/x-jng",
    "jnlp": "application/x-java-jnlp-file",
    "joda": "application/vnd.joost.joda-archive",
    "jp2": "image/jp2",
    "jpf": "image/jpx",
    "jpg2": "image/jp2",
    "jpgm": "video/jpm",
    "jph": "image/jph",
    "jpm": "video/jpm",
    "jpx": "image/jpx",
    "js": "text/javascript",
    "json5": "application/json5",
    "jsonld": "application/ld+json",
    "jsonml": "application/jsonml+json",
    "jsx": "text/jsx",
    "jt": "model/jt",
    "jxr": "image/jxr",
    "jxra": "image/jxra",
    "jxrs": "image/jxrs",
    "jxs": "image/jxs",
    "jxsc": "image/jxsc",
    "jxsi": "image/jxsi",
    "jxss": "image/jxss",
    "kar": "audio/midi",
    "karbon": "application/vnd.kde.karbon",
    "kdbx": "application/x-keepass2",
    "key": "application/x-iwork-keynote-sffkey",
    "kfo": "application/vnd.kde.kformula",
    "kia": "application/vnd.kidspiration",
    "kml": "application/vnd.google-earth.kml+xml",
    "kmz": "application/vnd.google-earth.kmz",
    "kne": "application/vnd.kinar",
    "knp": "application/vnd.kinar",
    "kon": "application/vnd.kde.kontour",
    "kpr": "application/vnd.kde.kpresenter",
    "kpt": "application/vnd.kde.kpresenter",
    "kpxx": "application/vnd.ds-keypoint",
    "ksp": "application/vnd.kde.kspread",
    "ktr": "application/vnd.kahootz",
    "ktx": "image/ktx",
    "ktx2": "image/ktx2",
    "ktz": "application/vnd.kahootz",
    "kwd": "application/vnd.kde.kword",
    "kwt": "application/vnd.kde.kword",
    "lasxml": "application/vnd.las.las+xml",
    "latex": "application/x-latex",
    "lbd": "application/vnd.llamagraphics.life-balance.desktop",
    "lbe": "application/vnd.llamagraphics.life-balance.exchange+xml",
    "les": "application/vnd.hhe.lesson-player",
    "less": "text/less",
    "lgr": "application/lgr+xml",
    "lha": "application/x-lzh-compressed",
    "link66": "application/vnd.route66.link66+xml",
    "list": "text/plain",
    "list3820": "application/vnd.ibm.modcap",
    "listafp": "application/vnd.ibm.modcap",
    "litcoffee": "text/coffeescript",
    "lnk": "application/x-ms-shortcut",
    "log": "text/plain",
    "lostxml": "application/lost+xml",
    "lrf": "application/octet-stream",
    "lrm": "application/vnd.ms-lrm",
    "ltf": "application/vnd.frogans.ltf",
    "lua": "text/x-lua",
    "luac": "application/x-lua-bytecode",
    "lvp": "audio/vnd.lucent.voice",
    "lwp": "application/vnd.lotus-wordpro",
    "lzh": "application/x-lzh-compressed",
    "m13": "application/x-msmediaview",
    "m14": "application/x-msmediaview",
    "m1v": "video/mpeg",
    "m21": "application/mp21",
    "m2a": "audio/mpeg",
    "m2v": "video/mpeg",
    "m3a": "audio/mpeg",
    "m3u": "audio/x-mpegurl",
    "m3u8": "application/vnd.apple.mpegurl",
    "m4a": "audio/x-m4a",
    "m4p": "application/mp4",
    "m4s": "video/iso.segment",
    "m4u": "video/vnd.mpegurl",
    "m4v": "video/x-m4v",
    "ma": "application/mathematica",
    "mads": "application/mads+xml",
    "maei": "application/mmt-aei+xml",
    "mag": "application/vnd.ecowin.chart",
    "maker": "application/vnd.framemaker",
    "man": "text/troff",
    "manifest": "text/cache-manifest",
    "map": "application/json",
    "mar": "application/octet-stream",
    "markdown": "text/markdown",
    "mathml": "application/mathml+xml",
    "mb": "application/mathematica",
    "mbk": "application/vnd.mobius.mbk",
    "mbox": "application/mbox",
    "mc1": "application/vnd.medcalcdata",
    "mcd": "application/vnd.mcd",
    "mcurl": "text/vnd.curl.mcurl",
    "md": "text/markdown",
    "mdb": "application/x-msaccess",
    "mdi": "image/vnd.ms-modi",
    "mdx": "text/mdx",
    "me": "text/troff",
    "mesh": "model/mesh",
    "meta4": "application/metalink4+xml",
    "metalink": "application/metalink+xml",
    "mets": "application/mets+xml",
    "mfm": "application/vnd.mfmp",
    "mft": "application/rpki-manifest",
    "mgp": "application/vnd.osgeo.mapguide.package",
    "mgz": "application/vnd.proteus.magazine",
    "mid": "audio/midi",
    "midi": "audio/midi",
    "mie": "application/x-mie",
    "mif": "application/vnd.mif",
    "mime": "message/rfc822",
    "mj2": "video/mj2",
    "mjp2": "video/mj2",
    "mjs": "text/javascript",
    "mk3d": "video/x-matroska",
    "mka": "audio/x-matroska",
    "mkd": "text/x-markdown",
    "mks": "video/x-matroska",
    "mkv": "video/x-matroska",
    "mlp": "application/vnd.dolby.mlp",
    "mmd": "application/vnd.chipnuts.karaoke-mmd",
    "mmf": "application/vnd.smaf",
    "mml": "text/mathml",
    "mmr": "image/vnd.fujixerox.edmics-mmr",
    "mng": "video/x-mng",
    "mny": "application/x-msmoney",
    "mobi": "application/x-mobipocket-ebook",
    "mods": "application/mods+xml",
    "mov": "video/quicktime",
    "movie": "video/x-sgi-movie",
    "mp2": "audio/mpeg",
    "mp21": "application/mp21",
    "mp2a": "audio/mpeg",
    "mp3": "audio/mpeg",
    "mp4": "video/mp4",
    "mp4a": "audio/mp4",
    "mp4s": "application/mp4",
    "mp4v": "video/mp4",
    "mpc": "application/vnd.mophun.certificate",
    "mpd": "application/dash+xml",
    "mpe": "video/mpeg",
    "mpeg": "video/mpeg",
    "mpf": "application/media-policy-dataset+xml",
    "mpg": "video/mpeg",
    "mpg4": "video/mp4",
    "mpga": "audio/mpeg",
    "mpkg": "application/vnd.apple.installer+xml",
    "mpm": "application/vnd.blueice.multipass",
    "mpn": "application/vnd.mophun.application",
    "mpp": "application/vnd.ms-project",
    "mpt": "application/vnd.ms-project",
    "mpy": "application/vnd.ibm.minipay",
    "mqy": "application/vnd.mobius.mqy",
    "mrc": "application/marc",
    "mrcx": "application/marcxml+xml",
    "ms": "text/troff",
    "mscml": "application/mediaservercontrol+xml",
    "mseed": "application/vnd.fdsn.mseed",
    "mseq": "application/vnd.mseq",
    "msf": "application/vnd.epson.msf",
    "msg": "application/vnd.ms-outlook",
    "msh": "model/mesh",
    "msi": "application/x-msdownload",
    "msix": "application/msix",
    "msixbundle": "application/msixbundle",
    "msl": "application/vnd.mobius.msl",
    "msm": "application/octet-stream",
    "msp": "application/octet-stream",
    "msty": "application/vnd.muvee.style",
    "mtl": "model/mtl",
    "mts": "model/vnd.mts",
    "mus": "application/vnd.musician",
    "musd": "application/mmt-usd+xml",
    "musicxml": "application/vnd.recordare.musicxml+xml",
    "mvb": "application/x-msmediaview",
    "mvt": "application/vnd.mapbox-vector-tile",
    "mwf": "application/vnd.mfer",
    "mxf": "application/mxf",
    "mxl": "application/vnd.recordare.musicxml",
    "mxmf": "audio/mobile-xmf",
    "mxml": "application/xv+xml",
    "mxs": "application/vnd.triscape.mxs",
    "mxu": "video/vnd.mpegurl",
    "n-gage": "application/vnd.nokia.n-gage.symbian.install",
    "n3": "text/n3",
    "nb": "application/mathematica",
    "nbp": "application/vnd.wolfram.player",
    "nc": "application/x-netcdf",
    "ncx": "application/x-dtbncx+xml",
    "nfo": "text/x-nfo",
    "ngdat": "application/vnd.nokia.n-gage.data",
    "nitf": "application/vnd.nitf",
    "nlu": "application/vnd.neurolanguage.nlu",
    "nml": "application/vnd.enliven",
    "nnd": "application/vnd.noblenet-directory",
    "nns": "application/vnd.noblenet-sealer",
    "nnw": "application/vnd.noblenet-web",
    "npx": "image/vnd.net-fpx",
    "nq": "application/n-quads",
    "nsc": "application/x-conference",
    "nsf": "application/vnd.lotus-notes",
    "nt": "application/n-triples",
    "ntf": "application/vnd.nitf",
    "numbers": "application/x-iwork-numbers-sffnumbers",
    "nzb": "application/x-nzb",
    "oa2": "application/vnd.fujitsu.oasys2",
    "oa3": "application/vnd.fujitsu.oasys3",
    "oas": "application/vnd.fujitsu.oasys",
    "obd": "application/x-msbinder",
    "obgx": "application/vnd.openblox.game+xml",
    "obj": "model/obj",
    "oda": "application/oda",
    "odb": "application/vnd.oasis.opendocument.database",
    "odc": "application/vnd.oasis.opendocument.chart",
    "odf": "application/vnd.oasis.opendocument.formula",
    "odft": "application/vnd.oasis.opendocument.formula-template",
    "odg": "application/vnd.oasis.opendocument.graphics",
    "odi": "application/vnd.oasis.opendocument.image",
    "odm": "application/vnd.oasis.opendocument.text-master",
    "odp": "application/vnd.oasis.opendocument.presentation",
    "ods": "application/vnd.oasis.opendocument.spreadsheet",
    "odt": "application/vnd.oasis.opendocument.text",
    "oga": "audio/ogg",
    "ogex": "model/vnd.opengex",
    "ogg": "audio/ogg",
    "ogv": "video/ogg",
    "ogx": "application/ogg",
    "omdoc": "application/omdoc+xml",
    "onepkg": "application/onenote",
    "onetmp": "application/onenote",
    "onetoc": "application/onenote",
    "onetoc2": "application/onenote",
    "opf": "application/oebps-package+xml",
    "opml": "text/x-opml",
    "oprc": "application/vnd.palm",
    "opus": "audio/ogg",
    "org": "text/x-org",
    "osf": "application/vnd.yamaha.openscoreformat",
    "osfpvg": "application/vnd.yamaha.openscoreformat.osfpvg+xml",
    "osm": "application/vnd.openstreetmap.data+xml",
    "otc": "application/vnd.oasis.opendocument.chart-template",
    "otf": "font/otf",
    "otg": "application/vnd.oasis.opendocument.graphics-template",
    "oth": "application/vnd.oasis.opendocument.text-web",
    "oti": "application/vnd.oasis.opendocument.image-template",
    "otp": "application/vnd.oasis.opendocument.presentation-template",
    "ots": "application/vnd.oasis.opendocument.spreadsheet-template",
    "ott": "application/vnd.oasis.opendocument.text-template",
    "ova": "application/x-virtualbox-ova",
    "ovf": "application/x-virtualbox-ovf",
    "owl": "application/rdf+xml",
    "oxps": "application/oxps",
    "oxt": "application/vnd.openofficeorg.extension",
    "p": "text/x-pascal",
    "p10": "application/pkcs10",
    "p12": "application/x-pkcs12",
    "p7b": "application/x-pkcs7-certificates",
    "p7c": "application/pkcs7-mime",
    "p7m": "application/pkcs7-mime",
    "p7r": "application/x-pkcs7-certreqresp",
    "p7s": "application/pkcs7-signature",
    "p8": "application/pkcs8",
    "pac": "application/x-ns-proxy-autoconfig",
    "pages": "application/x-iwork-pages-sffpages",
    "pas": "text/x-pascal",
    "paw": "application/vnd.pawaafile",
    "pbd": "application/vnd.powerbuilder6",
    "pbm": "image/x-portable-bitmap",
    "pcap": "application/vnd.tcpdump.pcap",
    "pcf": "application/x-font-pcf",
    "pcl": "application/vnd.hp-pcl",
    "pclxl": "application/vnd.hp-pclxl",
    "pct": "image/x-pict",
    "pcurl": "application/vnd.curl.pcurl",
    "pcx": "image/x-pcx",
    "pdb": "application/x-pilot",
    "pde": "text/x-processing",
    "pem": "application/x-x509-ca-cert",
    "pfa": "application/x-font-type1",
    "pfb": "application/x-font-type1",
    "pfm": "application/x-font-type1",
    "pfr": "application/font-tdpfr",
    "pfx": "application/x-pkcs12",
    "pgm": "image/x-portable-graymap",
    "pgn": "application/x-chess-pgn",
    "pgp": "application/pgp-encrypted",
    "php": "application/x-httpd-php",
    "pic": "image/x-pict",
    "pkg": "application/octet-stream",
    "pki": "application/pkixcmp",
    "pkipath": "application/pkix-pkipath",
    "pkpass": "application/vnd.apple.pkpass",
    "pl": "application/x-perl",
    "plb": "application/vnd.3gpp.pic-bw-large",
    "plc": "application/vnd.mobius.plc",
    "plf": "application/vnd.pocketlearn",
    "pls": "application/pls+xml",
    "pm": "application/x-perl",
    "pml": "application/vnd.ctc-posml",
    "pnm": "image/x-portable-anymap",
    "portpkg": "application/vnd.macports.portpkg",
    "pot": "application/vnd.ms-powerpoint",
    "potm": "application/vnd.ms-powerpoint.template.macroenabled.12",
    "potx": "application/vnd.openxmlformats-officedocument.presentationml.template",
    "ppam": "application/vnd.ms-powerpoint.addin.macroenabled.12",
    "ppd": "application/vnd.cups-ppd",
    "ppm": "image/x-portable-pixmap",
    "pps": "application/vnd.ms-powerpoint",
    "ppsm": "application/vnd.ms-powerpoint.slideshow.macroenabled.12",
    "ppsx": "application/vnd.openxmlformats-officedocument.presentationml.slideshow",
    "pptm": "application/vnd.ms-powerpoint.presentation.macroenabled.12",
    "pqa": "application/vnd.palm",
    "prc": "model/prc",
    "pre": "application/vnd.lotus-freelance",
    "prf": "application/pics-rules",
    "provx": "application/provenance+xml",
    "ps": "application/postscript",
    "psb": "application/vnd.3gpp.pic-bw-small",
    "psd": "image/vnd.adobe.photoshop",
    "psf": "application/x-font-linux-psf",
    "pskcxml": "application/pskc+xml",
    "pti": "image/prs.pti",
    "ptid": "application/vnd.pvi.ptid1",
    "pub": "application/x-mspublisher",
    "pvb": "application/vnd.3gpp.pic-bw-var",
    "pwn": "application/vnd.3m.post-it-notes",
    "pya": "audio/vnd.ms-playready.media.pya",
    "pyo": "model/vnd.pytha.pyox",
    "pyox": "model/vnd.pytha.pyox",
    "pyv": "video/vnd.ms-playready.media.pyv",
    "qam": "application/vnd.epson.quickanime",
    "qbo": "application/vnd.intu.qbo",
    "qfx": "application/vnd.intu.qfx",
    "qps": "application/vnd.publishare-delta-tree",
    "qt": "video/quicktime",
    "qwd": "application/vnd.quark.quarkxpress",
    "qwt": "application/vnd.quark.quarkxpress",
    "qxb": "application/vnd.quark.quarkxpress",
    "qxd": "application/vnd.quark.quarkxpress",
    "qxl": "application/vnd.quark.quarkxpress",
    "qxt": "application/vnd.quark.quarkxpress",
    "ra": "audio/x-realaudio",
    "ram": "audio/x-pn-realaudio",
    "raml": "application/raml+yaml",
    "rapd": "application/route-apd+xml",
    "rar": "application/x-rar-compressed",
    "ras": "image/x-cmu-raster",
    "rcprofile": "application/vnd.ipunplugged.rcprofile",
    "rdf": "application/rdf+xml",
    "rdz": "application/vnd.data-vision.rdz",
    "relo": "application/p2p-overlay+xml",
    "rep": "application/vnd.businessobjects",
    "res": "application/x-dtbresource+xml",
    "rgb": "image/x-rgb",
    "rif": "application/reginfo+xml",
    "rip": "audio/vnd.rip",
    "ris": "application/x-research-info-systems",
    "rl": "application/resource-lists+xml",
    "rlc": "image/vnd.fujixerox.edmics-rlc",
    "rld": "application/resource-lists-diff+xml",
    "rm": "application/vnd.rn-realmedia",
    "rmi": "audio/midi",
    "rmp": "audio/x-pn-realaudio-plugin",
    "rms": "application/vnd.jcp.javame.midlet-rms",
    "rmvb": "application/vnd.rn-realmedia-vbr",
    "rnc": "application/relax-ng-compact-syntax",
    "rng": "application/xml",
    "roa": "application/rpki-roa",
    "roff": "text/troff",
    "rp9": "application/vnd.cloanto.rp9",
    "rpm": "application/x-redhat-package-manager",
    "rpss": "application/vnd.nokia.radio-presets",
    "rpst": "application/vnd.nokia.radio-preset",
    "rq": "application/sparql-query",
    "rs": "application/rls-services+xml",
    "rsat": "application/atsc-rsat+xml",
    "rsd": "application/rsd+xml",
    "rsheet": "application/urc-ressheet+xml",
    "rss": "application/rss+xml",
    "rtf": "text/rtf",
    "rtx": "text/richtext",
    "run": "application/x-makeself",
    "rusd": "application/route-usd+xml",
    "s": "text/x-asm",
    "s3m": "audio/s3m",
    "saf": "application/vnd.yamaha.smaf-audio",
    "sass": "text/x-sass",
    "sbml": "application/sbml+xml",
    "sc": "application/vnd.ibm.secure-container",
    "scd": "application/x-msschedule",
    "scm": "application/vnd.lotus-screencam",
    "scq": "application/scvp-cv-request",
    "scs": "application/scvp-cv-response",
    "scss": "text/x-scss",
    "scurl": "text/vnd.curl.scurl",
    "sda": "application/vnd.stardivision.draw",
    "sdc": "application/vnd.stardivision.calc",
    "sdd": "application/vnd.stardivision.impress",
    "sdkd": "application/vnd.solent.sdkm+xml",
    "sdkm": "application/vnd.solent.sdkm+xml",
    "sdp": "application/sdp",
    "sdw": "application/vnd.stardivision.writer",
    "sea": "application/x-sea",
    "see": "application/vnd.seemail",
    "seed": "application/vnd.fdsn.seed",
    "sema": "application/vnd.sema",
    "semd": "application/vnd.semd",
    "semf": "application/vnd.semf",
    "senmlx": "application/senml+xml",
    "sensmlx": "application/sensml+xml",
    "ser": "application/java-serialized-object",
    "setpay": "application/set-payment-initiation",
    "setreg": "application/set-registration-initiation",
    "sfd-hdstx": "application/vnd.hydrostatix.sof-data",
    "sfs": "application/vnd.spotfire.sfs",
    "sfv": "text/x-sfv",
    "sgi": "image/sgi",
    "sgl": "application/vnd.stardivision.writer-global",
    "sgm": "text/sgml",
    "sgml": "text/sgml",
    "sh": "application/x-sh",
    "shar": "application/x-shar",
    "shex": "text/shex",
    "shf": "application/shf+xml",
    "shtml": "text/html",
    "sid": "image/x-mrsid-image",
    "sieve": "application/sieve",
    "sig": "application/pgp-signature",
    "sil": "audio/silk",
    "silo": "model/mesh",
    "sis": "application/vnd.symbian.install",
    "sisx": "application/vnd.symbian.install",
    "sit": "application/x-stuffit",
    "sitx": "application/x-stuffitx",
    "siv": "application/sieve",
    "skd": "application/vnd.koan",
    "skm": "application/vnd.koan",
    "skp": "application/vnd.koan",
    "skt": "application/vnd.koan",
    "sldm": "application/vnd.ms-powerpoint.slide.macroenabled.12",
    "sldx": "application/vnd.openxmlformats-officedocument.presentationml.slide",
    "slim": "text/slim",
    "slm": "text/slim",
    "sls": "application/route-s-tsid+xml",
    "slt": "application/vnd.epson.salt",
    "sm": "application/vnd.stepmania.stepchart",
    "smf": "application/vnd.stardivision.math",
    "smi": "application/smil+xml",
    "smil": "application/smil+xml",
    "smv": "video/x-smv",
    "smzip": "application/vnd.stepmania.package",
    "snd": "audio/basic",
    "snf": "application/x-font-snf",
    "so": "application/octet-stream",
    "spc": "application/x-pkcs7-certificates",
    "spdx": "text/spdx",
    "spf": "application/vnd.yamaha.smaf-phrase",
    "spl": "application/x-futuresplash",
    "spot": "text/vnd.in3d.spot",
    "spp": "application/scvp-vp-response",
    "spq": "application/scvp-vp-request",
    "spx": "audio/ogg",
    "sql": "application/x-sql",
    "src": "application/x-wais-source",
    "srt": "application/x-subrip",
    "sru": "application/sru+xml",
    "srx": "application/sparql-results+xml",
    "ssdl": "application/ssdl+xml",
    "sse": "application/vnd.kodak-descriptor",
    "ssf": "application/vnd.epson.ssf",
    "ssml": "application/ssml+xml",
    "st": "application/vnd.sailingtracker.track",
    "stc": "application/vnd.sun.xml.calc.template",
    "std": "application/vnd.sun.xml.draw.template",
    "stf": "application/vnd.wt.stf",
    "sti": "application/vnd.sun.xml.impress.template",
    "stk": "application/hyperstudio",
    "stl": "model/stl",
    "stpx": "model/step+xml",
    "stpxz": "model/step-xml+zip",
    "stpz": "model/step+zip",
    "str": "application/vnd.pg.format",
    "stw": "application/vnd.sun.xml.writer.template",
    "styl": "text/stylus",
    "stylus": "text/stylus",
    "sub": "text/vnd.dvb.subtitle",
    "sus": "application/vnd.sus-calendar",
    "susp": "application/vnd.sus-calendar",
    "sv4cpio": "application/x-sv4cpio",
    "sv4crc": "application/x-sv4crc",
    "svc": "application/vnd.dvb.service",
    "svd": "application/vnd.svd",
    "svg": "image/svg+xml",
    "svgz": "image/svg+xml",
    "swa": "application/x-director",
    "swf": "application/x-shockwave-flash",
    "swi": "application/vnd.aristanetworks.swi",
    "swidtag": "application/swid+xml",
    "sxc": "application/vnd.sun.xml.calc",
    "sxd": "application/vnd.sun.xml.draw",
    "sxg": "application/vnd.sun.xml.writer.global",
    "sxi": "application/vnd.sun.xml.impress",
    "sxm": "application/vnd.sun.xml.math",
    "sxw": "application/vnd.sun.xml.writer",
    "t": "text/troff",
    "t3": "application/x-t3vm-image",
    "t38": "image/t38",
    "taglet": "application/vnd.mynfc",
    "tao": "application/vnd.tao.intent-module-archive",
    "tap": "image/vnd.tencent.tap",
    "tar": "application/x-tar",
    "tcap": "application/vnd.3gpp2.tcap",
    "tcl": "application/x-tcl",
    "td": "application/urc-targetdesc+xml",
    "teacher": "application/vnd.smart.teacher",
    "tei": "application/tei+xml",
    "teicorpus": "application/tei+xml",
    "tex": "application/x-tex",
    "texi": "application/x-texinfo",
    "texinfo": "application/x-texinfo",
    "text": "text/plain",
    "tfi": "application/thraud+xml",
    "tfm": "application/x-tex-tfm",
    "tfx": "image/tiff-fx",
    "tga": "image/x-tga",
    "thmx": "application/vnd.ms-officetheme",
    "tif": "image/tiff",
    "tiff": "image/tiff",
    "tk": "application/x-tcl",
    "tmo": "application/vnd.tmobile-livetv",
    "toml": "application/toml",
    "torrent": "application/x-bittorrent",
    "tpl": "application/vnd.groove-tool-template",
    "tpt": "application/vnd.trid.tpt",
    "tr": "text/troff",
    "tra": "application/vnd.trueapp",
    "trig": "application/trig",
    "trm": "application/x-msterminal",
    "ts": "video/mp2t",
    "tsd": "application/timestamped-data",
    "tsv": "text/tab-separated-values",
    "ttc": "font/collection",
    "ttf": "font/ttf",
    "ttl": "text/turtle",
    "ttml": "application/ttml+xml",
    "twd": "application/vnd.simtech-mindmapper",
    "twds": "application/vnd.simtech-mindmapper",
    "txd": "application/vnd.genomatix.tuxedo",
    "txf": "application/vnd.mobius.txf",
    "u32": "application/x-authorware-bin",
    "u3d": "model/u3d",
    "u8dsn": "message/global-delivery-status",
    "u8hdr": "message/global-headers",
    "u8mdn": "message/global-disposition-notification",
    "u8msg": "message/global",
    "ubj": "application/ubjson",
    "udeb": "application/x-debian-package",
    "ufd": "application/vnd.ufdl",
    "ufdl": "application/vnd.ufdl",
    "ulx": "application/x-glulx",
    "umj": "application/vnd.umajin",
    "unityweb": "application/vnd.unity",
    "uo": "application/vnd.uoml+xml",
    "uoml": "application/vnd.uoml+xml",
    "uri": "text/uri-list",
    "uris": "text/uri-list",
    "urls": "text/uri-list",
    "usda": "model/vnd.usda",
    "usdz": "model/vnd.usdz+zip",
    "ustar": "application/x-ustar",
    "utz": "application/vnd.uiq.theme",
    "uu": "text/x-uuencode",
    "uva": "audio/vnd.dece.audio",
    "uvd": "application/vnd.dece.data",
    "uvf": "application/vnd.dece.data",
    "uvg": "image/vnd.dece.graphic",
    "uvh": "video/vnd.dece.hd",
    "uvi": "image/vnd.dece.graphic",
    "uvm": "video/vnd.dece.mobile",
    "uvp": "video/vnd.dece.pd",
    "uvs": "video/vnd.dece.sd",
    "uvt": "application/vnd.dece.ttml+xml",
    "uvu": "video/vnd.uvvu.mp4",
    "uvv": "video/vnd.dece.video",
    "uvva": "audio/vnd.dece.audio",
    "uvvd": "application/vnd.dece.data",
    "uvvf": "application/vnd.dece.data",
    "uvvg": "image/vnd.dece.graphic",
    "uvvh": "video/vnd.dece.hd",
    "uvvi": "image/vnd.dece.graphic",
    "uvvm": "video/vnd.dece.mobile",
    "uvvp": "video/vnd.dece.pd",
    "uvvs": "video/vnd.dece.sd",
    "uvvt": "application/vnd.dece.ttml+xml",
    "uvvu": "video/vnd.uvvu.mp4",
    "uvvv": "video/vnd.dece.video",
    "uvvx": "application/vnd.dece.unspecified",
    "uvvz": "application/vnd.dece.zip",
    "uvx": "application/vnd.dece.unspecified",
    "uvz": "application/vnd.dece.zip",
    "vbox": "application/x-virtualbox-vbox",
    "vbox-extpack": "application/x-virtualbox-vbox-extpack",
    "vcard": "text/vcard",
    "vcd": "application/x-cdlink",
    "vcf": "text/x-vcard",
    "vcg": "application/vnd.groove-vcard",
    "vcs": "text/x-vcalendar",
    "vcx": "application/vnd.vcx",
    "vdi": "application/x-virtualbox-vdi",
    "vds": "model/vnd.sap.vds",
    "vhd": "application/x-virtualbox-vhd",
    "vis": "application/vnd.visionary",
    "viv": "video/vnd.vivo",
    "vmdk": "application/x-virtualbox-vmdk",
    "vob": "video/x-ms-vob",
    "vor": "application/vnd.stardivision.writer",
    "vox": "application/x-authorware-bin",
    "vrml": "model/vrml",
    "vsd": "application/vnd.visio",
    "vsf": "application/vnd.vsf",
    "vss": "application/vnd.visio",
    "vst": "application/vnd.visio",
    "vsw": "application/vnd.visio",
    "vtf": "image/vnd.valve.source.texture",
    "vtt": "text/vtt",
    "vtu": "model/vnd.vtu",
    "vxml": "application/voicexml+xml",
    "w3d": "application/x-director",
    "wad": "application/x-doom",
    "wadl": "application/vnd.sun.wadl+xml",
    "war": "application/java-archive",
    "wasm": "application/wasm",
    "wav": "audio/x-wav",
    "wax": "audio/x-ms-wax",
    "wbmp": "image/vnd.wap.wbmp",
    "wbs": "application/vnd.criticaltools.wbs+xml",
    "wbxml": "application/vnd.wap.wbxml",
    "wcm": "application/vnd.ms-works",
    "wdb": "application/vnd.ms-works",
    "wdp": "image/vnd.ms-photo",
    "weba": "audio/webm",
    "webapp": "application/x-web-app-manifest+json",
    "webm": "video/webm",
    "webmanifest": "application/manifest+json",
    "webp": "image/webp",
    "wg": "application/vnd.pmi.widget",
    "wgsl": "text/wgsl",
    "wgt": "application/widget",
    "wif": "application/watcherinfo+xml",
    "wks": "application/vnd.ms-works",
    "wm": "video/x-ms-wm",
    "wma": "audio/x-ms-wma",
    "wmd": "application/x-ms-wmd",
    "wmf": "image/wmf",
    "wml": "text/vnd.wap.wml",
    "wmlc": "application/vnd.wap.wmlc",
    "wmls": "text/vnd.wap.wmlscript",
    "wmlsc": "application/vnd.wap.wmlscriptc",
    "wmv": "video/x-ms-wmv",
    "wmx": "video/x-ms-wmx",
    "wmz": "application/x-msmetafile",
    "woff": "font/woff",
    "woff2": "font/woff2",
    "wpd": "application/vnd.wordperfect",
    "wpl": "application/vnd.ms-wpl",
    "wps": "application/vnd.ms-works",
    "wqd": "application/vnd.wqd",
    "wri": "application/x-mswrite",
    "wrl": "model/vrml",
    "wsc": "message/vnd.wfa.wsc",
    "wsdl": "application/wsdl+xml",
    "wspolicy": "application/wspolicy+xml",
    "wtb": "application/vnd.webturbo",
    "wvx": "video/x-ms-wvx",
    "x32": "application/x-authorware-bin",
    "x3d": "model/x3d+xml",
    "x3db": "model/x3d+fastinfoset",
    "x3dbz": "model/x3d+binary",
    "x3dv": "model/x3d-vrml",
    "x3dvz": "model/x3d+vrml",
    "x3dz": "model/x3d+xml",
    "x_b": "model/vnd.parasolid.transmit.binary",
    "x_t": "model/vnd.parasolid.transmit.text",
    "xaml": "application/xaml+xml",
    "xap": "application/x-silverlight-app",
    "xar": "application/vnd.xara",
    "xav": "application/xcap-att+xml",
    "xbap": "application/x-ms-xbap",
    "xbd": "application/vnd.fujixerox.docuworks.binder",
    "xbm": "image/x-xbitmap",
    "xca": "application/xcap-caps+xml",
    "xcs": "application/calendar+xml",
    "xdf": "application/xcap-diff+xml",
    "xdm": "application/vnd.syncml.dm+xml",
    "xdp": "application/vnd.adobe.xdp+xml",
    "xdssc": "application/dssc+xml",
    "xdw": "application/vnd.fujixerox.docuworks",
    "xel": "application/xcap-el+xml",
    "xenc": "application/xenc+xml",
    "xer": "application/patch-ops-error+xml",
    "xfdf": "application/xfdf",
    "xfdl": "application/vnd.xfdl",
    "xht": "application/xhtml+xml",
    "xhtm": "application/vnd.pwg-xhtml-print+xml",
    "xhtml": "application/xhtml+xml",
    "xhvml": "application/xv+xml",
    "xif": "image/vnd.xiff",
    "xla": "application/vnd.ms-excel",
    "xlam": "application/vnd.ms-excel.addin.macroenabled.12",
    "xlc": "application/vnd.ms-excel",
    "xlf": "application/xliff+xml",
    "xlm": "application/vnd.ms-excel",
    "xlsb": "application/vnd.ms-excel.sheet.binary.macroenabled.12",
    "xlsm": "application/vnd.ms-excel.sheet.macroenabled.12",
    "xlt": "application/vnd.ms-excel",
    "xltm": "application/vnd.ms-excel.template.macroenabled.12",
    "xltx": "application/vnd.openxmlformats-officedocument.spreadsheetml.template",
    "xlw": "application/vnd.ms-excel",
    "xm": "audio/xm",
    "xml": "text/xml",
    "xns": "application/xcap-ns+xml",
    "xo": "application/vnd.olpc-sugar",
    "xop": "application/xop+xml",
    "xpi": "application/x-xpinstall",
    "xpl": "application/xproc+xml",
    "xpm": "image/x-xpixmap",
    "xpr": "application/vnd.is-xpr",
    "xps": "application/vnd.ms-xpsdocument",
    "xpw": "application/vnd.intercon.formnet",
    "xpx": "application/vnd.intercon.formnet",
    "xsd": "application/xml",
    "xsf": "application/prs.xsf+xml",
    "xsl": "application/xslt+xml",
    "xslt": "application/xslt+xml",
    "xsm": "application/vnd.syncml+xml",
    "xspf": "application/xspf+xml",
    "xul": "application/vnd.mozilla.xul+xml",
    "xvm": "application/xv+xml",
    "xvml": "application/xv+xml",
    "xwd": "image/x-xwindowdump",
    "xyz": "chemical/x-xyz",
    "xz": "application/x-xz",
    "yaml": "text/yaml",
    "yang": "application/yang",
    "yin": "application/yin+xml",
    "yml": "text/yaml",
    "ymp": "text/x-suse-ymp",
    "z1": "application/x-zmachine",
    "z2": "application/x-zmachine",
    "z3": "application/x-zmachine",
    "z4": "application/x-zmachine",
    "z5": "application/x-zmachine",
    "z6": "application/x-zmachine",
    "z7": "application/x-zmachine",
    "z8": "application/x-zmachine",
    "zaz": "application/vnd.zzazz.deck+xml",
    "zir": "application/vnd.zul",
    "zirz": "application/vnd.zul",
    "zmm": "application/vnd.handheld-entertainment+xml"
} as const

/* =========================
   DERIVED TYPES
   ========================= */

export type ImageTypeMap = typeof imagesTypes;
export type FileTypeMap = typeof filesTypes;

export type IImagesExtTypeKeys = keyof ImageTypeMap;
export type IFilesExtTypeKeys = keyof FileTypeMap;

// If you still need the old names:
export type IMemes = IImagesExtTypeKeys | IFilesExtTypeKeys;

export type ISelectedFileType = { uri: string } | File | string;
export type ISelectedFile = { name: string; ext: string; file: ISelectedFileType };

/* =========================
   INTERNAL HELPERS
   ========================= */

export type MimeOrArray = string | readonly string[];

declare const toArray = (v: MimeOrArray): string[] => (Array.isArray(v) ? [...v] : [v as unknown as string]);

/**
 * Returns all mime candidates for an ext (new API)
 */
declare const getTypes = (ext: IFilesExtTypeKeys | IImagesExtTypeKeys): string[] => {
    const key = String(ext).toLowerCase() as IMemes;

    if (key in imagesTypes) return toArray(imagesTypes[key as IImagesExtTypeKeys]);
    if (key in filesTypes) return toArray(filesTypes[key as IFilesExtTypeKeys]);

    return [];
};

/**
 * OLD BEHAVIOR: returns ONE string (preferred mime)
 * Keeps the rest of your components unchanged.
 */
declare const getMeme = (ext: IFilesExtTypeKeys | IImagesExtTypeKeys): string => {
    return getTypes(ext)[0] ?? "";
};

/**
 * OLD BEHAVIOR: alias of getMeme (backward compatible)
 */
declare const getType = (ext: IFilesExtTypeKeys | IImagesExtTypeKeys): string => {
    return getMeme(ext);
};

declare const toMemes = (ext: (IFilesExtTypeKeys | IImagesExtTypeKeys)[])=>{

    let _accepted: string[] = [];

    ext.forEach((value)=>{
        getTypes(value).forEach(type=>{
            _accepted.push(type)
        })

    })

    return _accepted;
}
/* =========================
   ACCEPTED LISTS
   ========================= */

// Old “ext lists” are no longer needed for key typing, but keep if your code imports them
declare const imagesExt = Object.keys(imagesTypes) as IImagesExtTypeKeys[];
declare const filesExt = Object.keys({ ...filesTypes, ...imagesTypes }) as IMemes[];

// Old “meme lists”: these are FLAT string[] lists
declare const imagesMemes = imagesExt.flatMap((k) => getTypes(k));
declare const filesMemes = filesExt.flatMap((k) => getTypes(k));

/* =========================
   VALIDATION
   ========================= */

declare const checkExtAgainstAccepted = (filename: string, accepted: string[]) => {
    if (accepted.length === 0) return true;

    const ext = filename.split(".").pop();
    const fileExt = ext ? ext.toLowerCase() : "";

    // validate ext exists in our maps
    if (!(fileExt in imagesTypes) && !(fileExt in filesTypes)) return false;

    // NEW: allow multiple mime candidates
    const mimeCandidates = getTypes(fileExt as IMemes);

    return mimeCandidates.some((m) => accepted.includes(m));
};

declare function convertSize(sizeInBytes:number) {
    const KB = 1024;
    const MB = 1024 * KB;

    if (sizeInBytes < KB) {

        return `${sizeInBytes} Bytes`;
    } else if (sizeInBytes < MB) {
        return `${(sizeInBytes / KB).toFixed(2)} KB`;
    } else {
        return `${(sizeInBytes / MB).toFixed(2)} MB`;
    }
}
declare const fileValidation = (props:
                                 { min?: number, max?: number, acceptedTypes:string[] | string, minSize?:number, maxSize?:number } = {min: 1, max: 1, acceptedTypes:'*', minSize:0, maxSize:5242880}) => yup.mixed()
  .test('fileSizeMax', `File size should be less that ${convertSize(props.maxSize ?? 0)}`,  (value) =>{

      const checkFile = (file:any)=>{
          if(file instanceof File){
              if(!props.minSize && props.maxSize){
                  return file.size <= props.maxSize
              }
          }
          return true;
      }

      if(Array.isArray(value)){

          return value.every(checkFile);
      }else{
          return checkFile(value);
      }
  })
  .test('fileSizeMin', `File size should be over ${convertSize(props.minSize ?? 0)}` ,  (value) =>{
      const checkFile = (file:any)=>{
          if(file instanceof File){
              if(props.minSize && !props.maxSize){
                  return file.size >= props.minSize
              }

          }
          return true;
      }

      if(Array.isArray(value)){

          return value.every(checkFile);
      }else{
          return checkFile(value);
      }
  })
  .test('fileType', `File type not accepted` ,  (value) =>{
      const checkFile = (file:any)=>{
          if(props.acceptedTypes == '*'){
              return true;
          }
          if(file instanceof File){
              const fileExtension = file.name.split('.').pop() ?? '';
              return props.acceptedTypes.includes(fileExtension.toLowerCase());
          }
          return true;
      }

      if(Array.isArray(value)){

          return value.every(checkFile);
      }else{
          return checkFile(value);
      }
  })
  .test('fileLengthMin', `The minimum files allowed is ${props.min}` ,  (value) =>{
      if(Array.isArray(value) && props.min){

          return value.length >= props.min;
      }else{
          return true;
      }
  })
  .test('fileLengthMax', `The maximum files allowed is ${props.max}` ,  (value) =>{
      if(Array.isArray(value) && props.max){
          return value.length <= props.max;
      }else{
          return true;
      }
  })

export type IFileUploaderTypes = "File" | "Image";

export type File$1 = {
    uri: string;
    name: string;
    type?: string; // mime
    size?: number; // bytes
};

export type FileUploaderTemplateParams<T = File$1> = {
    /** Current selected files */
    values: T[];
    /** Trigger the native file/image picker */
    browse: () => void;
    /** Replace the entire file selection */
    update: (files: T | T[]) => void;
    /** Remove a file by index */
    remove: (index: number) => void;
    /** Whether the uploader is for files or images */
    type: 'file' | 'image';
    /** Whether multiple files can be selected */
    isMultiple: boolean;
};

export type FileUploaderTemplate<T = File$1> = (params: FileUploaderTemplateParams<T>) => ReactNode;

export interface IFileUploader<T = File$1>
    extends Omit<IFormSingleElement, "onChange" | "defaultValue"> {
    type: IFileUploaderTypes;
    isJsonOutput?: boolean;

    onChange?: (
        files: T[],
        base64Data: { filename: string; base64: string; type: string }[]
    ) => void;

    onError?: (err: any) => void;

    classicUploader?: boolean;
    multiple?: boolean;
    placeholder?: string;
    limit?: number;
    minFileSize?: number; // KB
    maxFileSize?: number; // KB
    acceptedTypes?: (IImagesExtTypeKeys | IFilesExtTypeKeys)[];
    defaultValue?: string | string[];
    text?: {
        ClickDragLabel?: string;
        selectedFile?: string;
    };
    /** Custom render template for the uploader UI */
    template?: FileUploaderTemplate<T>;
}

export interface IKitsCheckboxProps<T> extends IFormSingleElement<Array<T>>{
    item: IRadioCheckboxListItem<T> | IRadioCheckboxListItem<T>[];

    checked?:boolean;
    limit?:number;

    onChange?: (
        checked:boolean,
        item: T,
        allItems?: T[]
    ) => void;

    appearanceMode?: "vertical" | "horizontal"; // default vertical
}

export interface IKitsRadioProps<T>  extends IFormSingleElement<T>{
    item: IRadioCheckboxListItem<T> | IRadioCheckboxListItem<T>[];

    onChange?: (
        checked: boolean,
        meta: {
            item: IRadioCheckboxListItem<T>;
            index: number;
            value: T;
        }
    ) => void;

    appearanceMode?: "vertical" | "horizontal"; // default vertical
}

export interface ISkeletonRowsProps {
    rowsLength: number;
    isTable?: boolean;
}

export type IAccordionProps<LocalType=any> = {
    accordionTitle?: ReactNode | string;
    accordionItems?: {
        button: ReactNode;
        panel: ReactNode;
        onToggle?: (isExpanded: boolean) => void;
    }[];
    allOpenedByDefault?: boolean;
    isLoading?: boolean;
    localProps?: LocalType;
};

export interface IAlertComponent {
    status?: "error" | "success" | "warning" | "info" | "brand";
    variant?: "subtle" | "solid" | "left-accent" | "top-accent";
    children: React$1.ReactNode;
    className?: string;
}

export interface IAlertProps {
    status?: "error" | "success" | "warning" | "info" | "brand";
    variant?: "subtle" | "solid" | "left-accent" | "top-accent";
    children: React$1.ReactNode;
    className?: string;

    title?: string;
    description?: string;
    withIcon?: boolean;
}

export interface IContainerProps extends IFlexComponent {
    title?: ReactNode | string;
    rightElement?: ReactNode | string;
    childrenContainerProps?: IFlexComponent;
}

export interface ICircularProgressProps {
    size?: number; // Diameter of the circle
    strokeWidth?: number; // Thickness of the circle
    value: number; // Progress value (0-100)
    color?: string; // Stroke color for progress
    trackColor?: string; // Stroke color for track
    loading?: boolean; // Show spinner animation
    children?: ReactNode; // Custom content in the center
}

/**
 * Unified severity type used across all messaging components
 * (KitsConfirm, KitsDialog, KitsToast).
 */
export type Severity =
    | 'success'
    | 'info'
    | 'warning'
    | 'danger'
    | 'help'
    | 'secondary'
    | 'brand';

/**
 * Color slots resolved per-severity.
 * Each value is a theme token reference (e.g. 'green.500'), NOT a raw hex value.
 * Resolution happens at render time via resolveToken().
 */
export interface ISeverityColorSlots {
    /** Solid accent color — icon bubble fill, solid buttons */
    solid: string;
    /** Light background tint — panel background */
    bgTint: string;
    /** Icon foreground color on soft circle */
    iconFg: string;
    /** Icon circle background (soft circle fill, ~20% feel) */
    iconBg: string;
    /** Text color for severity-tinted surfaces */
    text: string;
    /** Border accent */
    border: string;
}

/**
 * Full severity theme map. Keyed by Severity.
 * Overridable via extendTheme().
 */
export type ISeverityThemeMap = Record<Severity, ISeverityColorSlots>;

/**
 * Custom confirm dialog options
 */
export interface ConfirmDialogOptions {
    /**
     * Callback to execute when action is confirmed.
     */
    accept(): void;
    /**
     * Callback to execute when action is rejected.
     */
    reject(): void;
    /**
     * Style class of the accept button.
     */
    acceptClassName: string;
    /**
     * Style class of the reject button.
     */
    rejectClassName: string;
    /**
     * Label of the accept button.
     * @defaultValue Yes
     */
    acceptLabel: string;
    /**
     * Label of the reject button.
     * @defaultValue No
     */
    rejectLabel: string;
    /**
     * Element to receive the focus when the dialog gets visible, valid values are "accept" and "reject".
     * @defaultValue accept
     */
    defaultFocus: string;
    /**
     * Default element created by the component.
     */
    element: React$1.ReactNode;
    /**
     * All component props
     * @type {ConfirmDialogProps}
     */
    props: ConfirmDialogProps;
    /**
     * Extra options
     */
    [key: string]: any;
}

export type ConfirmDialogProps = {
    /**
     * Optional key to match the key of the confirmation, useful to target a specific confirm dialog instance.
     */
    group?: string | undefined;
    /**
     * Unique tag key used to separate the confirmDialog components in the page.
     */
    tagKey?: string | undefined;
    /**
     * Specifies the visibility of the confirm dialog.
     * @defaultValue false
     */
    visible?: boolean | undefined;
    /**
     * Message of the confirmation.
     */
    message?: React$1.ReactNode | ((options: ConfirmDialogOptions) => React$1.ReactNode);
    /**
     * Label of the reject button.
     * @defaultValue No
     */
    rejectLabel?: string | undefined;
    /**
     * Label of the accept button.
     * @defaultValue Yes
     */
    acceptLabel?: string | undefined;
    /**
     * Icon to display next to the message.
     */
    icon?: any | undefined;
    /**
     * Icon of the reject button.
     */
    rejectIcon?: any | undefined;
    /**
     * Icon of the accept button.
     */
    acceptIcon?: any | undefined;
    /**
     * Style class of the reject button.
     */
    rejectClassName?: string | undefined;
    /**
     * Style class of the accept button.
     */
    acceptClassName?: string | undefined;
    /**
     * Element to receive the focus when the dialog gets visible, valid values are "accept" and "reject".
     * @defaultValue accept
     */
    defaultFocus?: string | undefined;
    /**
     * DOM element instance where the overlay panel should be mounted. Valid values are any DOM Element and "self". The "self" value is used to render a component where it is located.
     * @defaultValue document.body
     */
    appendTo?: 'self' | ReactElement | undefined | null | (() => ReactElement);
    /**
     * Style class of the element.
     */
    className?: string | undefined;
    /**
     * Footer content of the confirm dialog.
     */
    footer?: React$1.ReactNode | ((options: ConfirmDialogOptions) => React$1.ReactNode);
    /**
     * Callback to invoke when confirm dialog is hidden.
     */
    onHide?(result: string): void;
    /**
     * Callback to execute when action is confirmed.
     */
    accept?(): void;
    /**
     * Callback to execute when action is rejected.
     */
    reject?(): void;
    /**
     * Used to get the child elements of the component.
     * @readonly
     */
    children?: React$1.ReactNode | undefined;
    /**
     * Uses to pass attributes to DOM elements inside the component.
     * @type {ConfirmDialogPassThroughOptions}
     */
    pt?: any;
    /**
     * Used to configure passthrough(pt) options of the component.
     * @type {PassThroughOptions}
     */
    ptOptions?: any;
    /**
     * When enabled, it removes component related styles in the core.
     * @defaultValue false
     */
    unstyled?: boolean;
}

/**
 * Object returned by the {@link confirmDialog} method.
 */
export interface ConfirmDialogReturn {
    /**
     * Used to show the dialog.
     */
    show(): void;
    /**
     * Used to hide the dialog.
     */
    hide(): void;
}


export type Types = Severity;

export interface IDialogButton {
    title: string;
    outlined?: boolean;
    rounded?: boolean;
    type?: Types;
    loading?: boolean;
    disabled?: boolean;
    onClick: (
        hide: () => void,
        accept?: () => void,
        reject?: () => void
    ) => void;
}

export interface IConfirmDialogProps extends ConfirmDialogProps {
    visible?: boolean;
    defaultUI?: boolean; // fallback to native PrimeReact UI
    headless?: boolean; // force use of custom content renderer
    type?: Types; // color scheme
    buttons?: IDialogButton[];
    async?: boolean; // block close until onClick resolves
    header?:ReactNode
    content?:ReactNode
}

export interface IConfirmPopupProps {
    visible?: boolean;
    target?: any;
    message?: React$1.ReactNode;
    icon?: any;
    accept?(): void;
    reject?(): void;
    acceptLabel?: string;
    rejectLabel?: string;
    type?: Types;
    async?: boolean;
}

export type DialogProps = {
    contentStyle?:any
}
export interface IDialogProps
    extends Omit<DialogProps, "visible" | "onHide" | "children" | "content"> {
    children?: ReactNode | ((props: any) => ReactNode);
    onClose?: () => void;
    asyncClose?: boolean;
    /** Severity determines background tint, icon colors, and accent styling */
    type?: Severity;
    /** Icon name string or React element */
    icon?: string | ReactNode;
    header?:ReactNode;
    footer?:ReactNode;
}

export interface IDialogRef {
    open: (props: Omit<IDialogProps, "visible">) => void;
    close: () => void;
}

export interface IDialogState extends IDialogProps {
    visible?: boolean;
}

export interface IKitsDialogControlled {
    state: IDialogState;
    onHide: () => void;
}

export type ToastPosition =
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right"
    | "top-center"
    | "bottom-center";

export type ToastSeverity = "success" | "info" | "warn" | "error" | "loading" | "brand";

export type ToastSize = "sm" | "md" | "lg";

export type IToastParams = [
    severity: ToastSeverity,
    summary: string,
    body?: string,
    position?: ToastPosition,
    isUpdate?: boolean,
    size?: ToastSize,
];

export type IToastFunction = (...args: IToastParams) => void;

export interface IKitsToastRef {
    toast: IToastFunction;
    dismiss: (position?: ToastPosition) => void;
    dismissAll: () => void;
}

export interface PrimeTooltipProps {

}
export interface TooltipDataAttributes {
    "data-pr-disabled"?: boolean; // Whether the tooltip should be hidden.
    "data-pr-classname"?: string; // Style class of the tooltip.
    "data-pr-position"?: "left" | "top" | "bottom" | "right" | "mouse"; // Position of the tooltip.
    "data-pr-my"?: string; // Defines the position on the tooltip being positioned to align with the target element.
    "data-pr-at"?: string; // Defines the position on the target element to align the tooltip.
    "data-pr-event"?: "both" | "focus" | "hover"; // Event to show the tooltip.
    "data-pr-showevent"?: string; // Event to show the tooltip if the event property is empty.
    "data-pr-hideevent"?: string; // Event to hide the tooltip if the event property is empty.
    "data-pr-mousetrack"?: boolean; // Whether the tooltip follows the mouse.
    "data-pr-mousetracktop"?: number; // Top position relative to the mouse when mouseTrack is enabled.
    "data-pr-mousetrackleft"?: number; // Left position relative to the mouse when mouseTrack is enabled.
    "data-pr-showdelay"?: number; // Delay to show the tooltip in milliseconds.
    "data-pr-updatedelay"?: number; // Delay to update the tooltip in milliseconds.
    "data-pr-hidedelay"?: number; // Delay to hide the tooltip in milliseconds.
    "data-pr-autohide"?: boolean; // Whether to hide the tooltip when hovering over its content.
    "data-pr-showondisabled"?: boolean; // Whether to show tooltip for disabled elements.
}

export interface TooltipProps extends Omit<PrimeTooltipProps, "target"> {
    children?: React$1.ReactNode;
    label: string;
    tooltipProps?: TooltipDataAttributes;
}

export type children =
  | JSX.Element
  | (({ onClose }: { onClose: () => void }) => JSX.Element);

export type IPopoverProps = {
  label: string | ReactNode | JSX.Element;
  onPopoverClosed?: () => void;
  onPopoverOpened?: () => void;
  tooltipMessage?: string;
  success?: boolean;
  error?: boolean;
  closeButton?: boolean;
  placement?: any; // PlacementWithLogical;
  disableOnSuccess?: boolean;
  children: children;
};

export type DetailItemInputType = 'text' | 'number' | 'textarea' | 'select' | 'multiselect';

export interface IDetailItem<T extends Record<string, any>> {
    /** The key from your data object */
    name: keyof T & string;
    /** The display label on the left */
    label: string;
    /** Controls which standalone form component renders during edit mode */
    type?: DetailItemInputType;
    /** Optional custom renderer for display mode (e.g., rendering stars, chips, badges) */
    body?: (value: T[keyof T & string], row: T) => ReactNode;
    /** Whether this specific row can be toggled into edit mode */
    editable?: boolean;
    /** Data source for 'select' or 'multiselect' input types */
    list?: any[];
    /** Key to use as option label in select/multiselect lists (default: "label") */
    labelKey?: string;
    /** Key to use as option value in select/multiselect lists (default: "value") */
    valueKey?: string;
    /** Additional props forwarded to the edit control */
    inputProps?: Record<string, any>;
    /** Handler triggered when the built-in save button is clicked */
    onSave?: (name: keyof T & string, newValue: any) => Promise<void> | void;
}

export interface IDetailListProps<T extends Record<string, any> = any> {
    /** Top-level heading */
    title?: string | ReactNode;
    /** Top-level description */
    description?: string | ReactNode;
    /** The actual data record */
    data: T;
    /** Array of field configurations */
    items: IDetailItem<T>[];
    /** Custom area on the top-right of the heading */
    headerActions?: ReactNode;
    /** Inject extra buttons for a specific row, rendered to the left of the Edit button */
    itemActions?: (item: IDetailItem<T>, row: T) => ReactNode;
}

export type ColorsType =
  | 'Amber'
  | 'Blue Grey'
  | 'Blue'
  | 'Brown'
  | 'Cyan'
  | 'Deep Orange'
  | 'Deep Purple'
  | 'Green'
  | 'Grey'
  | 'Indigo'
  | 'Light Blue'
  | 'Light Green'
  | 'Lime'
  | 'Orange'
  | 'Pink'
  | 'Purple'
  | 'Red'
  | 'Teal'
  | 'Yellow'

export type Shades = '50' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900'

export type Colors = { [key in ColorsType]: { [shade in Shades]: string } }

export interface IModalFormProps {
  isOpen: boolean
  onClose: () => void
}
export interface IStatisticsProps {
  stats: IStats[]
}
export interface IWidgetChartProp<T> {
  //<Widget.BarChart
  data: T
  type: 'BarChart' | 'LineChart' | 'PieChart'| 'RadarChart'| 'PolarAreaChart' | 'DoughnutChart'
  label: string
  id?: string
  info?: string
  aspectRatio?: number
  height?: string;
  enableExportButton?: boolean
  isLoading?: boolean
  colors: {
    labels: string
    gridLines: string
  }
  containerProps?:IContainerProps;
  horizontal?:boolean;
  isDarkMode: boolean
  centerDisplay?: (total: number) => string
  enableMultipleDatasets?: boolean
}

export interface ChartData<T> {
  labels?: any[];
  xLabels?: any[];
  yLabels?: any[];
  datasets: any[];
}

export type IBarChartProps = IWidgetData<ChartData<'bar'>>
export type ILineChartProps = IWidgetData<ChartData<'line'>>
export type IPieChartProps = IWidgetData<ChartData<'pie'>>
export type IRadarChartProps = IWidgetData<ChartData<'radar'>>
export type IPolarAreaChartProps = IWidgetData<ChartData<'polarArea'>>
export type IDoughnutChartProps = IWidgetData<ChartData<'doughnut'>>

export type IOneOfTypes = IBarChartProps | ILineChartProps | IPieChartProps | IRadarChartProps | IDoughnutChartProps | IPolarAreaChartProps

export type IWidgetBarIncomingProp = IWidgetChartProp<IBarChartProps> //<Widget.Bar
export type IWidgetLineIncomingProp = IWidgetChartProp<ILineChartProps> //<Widget.Line
export type IWidgetPieIncomingProp = IWidgetChartProp<IPieChartProps> //<Widget.Pie
export type IWidgetRadarIncomingProp = IWidgetChartProp<IRadarChartProps> //<Widget.Pie
export type IWidgetPolarAreaIncomingProp = IWidgetChartProp<IPolarAreaChartProps> //<Widget.Pie
export type IWidgetDoughnutIncomingProp = IWidgetChartProp<IDoughnutChartProps> //<Widget.Doughnut

export type IWidgetChartContextProps = IWidgetChartProp<IOneOfTypes> //<Widget

export interface IStats {
  label: string
  stats: {
    label: string
    value: number
  }[]
}

export interface settings1 {
  [x: string]: any
}

export interface settings2 {
  label: string
  value: settings1
}

export interface IWidgetData<T> {
  data: T
  stats?: IStats[]
  datasets?: {
    fixedOptions: settings1
    variableOptions: settings2[]
  }
  settings?: {
    [x: string]: any
  }
}

// Base, platform-agnostic
export interface ILoaderProps<
    TColor = string,
    TStyle = unknown,
    TLocal = Record<string, unknown>
> {
    localProps?: TLocal;
    animating?: boolean;
    /** The foreground color of the spinner (default is gray). */
    color?: TColor;
    /** Hide when not animating (true by default). */
    hidesWhenStopped?: boolean;
    /**
     * Size of the indicator.
     * Small ~20px, large ~36px.
     */
    size?: number | 'small' | 'large';
    style?: TStyle;
}

export interface IIconProps extends IStyleClasses {
    name: IconName | ElementType;
    size?: '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    color?: string;
    strokeWidth?: number;
}

export type IconName =
    | "address-book"
    | "align-center"
    | "align-justify"
    | "align-left"
    | "align-right"
    | "amazon"
    | "android"
    | "angle-double-down"
    | "angle-double-left"
    | "angle-double-right"
    | "angle-double-up"
    | "angle-down"
    | "angle-left"
    | "angle-right"
    | "angle-up"
    | "apple"
    | "arrow-circle-down"
    | "arrow-circle-left"
    | "arrow-circle-right"
    | "arrow-circle-up"
    | "arrow-down"
    | "arrow-down-left"
    | "arrow-down-left-and-arrow-up-right-to-center"
    | "arrow-down-right"
    | "arrow-left"
    | "arrow-right"
    | "arrow-right-arrow-left"
    | "arrow-up"
    | "arrow-up-left"
    | "arrow-up-right"
    | "arrow-up-right-and-arrow-down-left-from-center"
    | "arrows-alt"
    | "arrows-h"
    | "arrows-v"
    | "asterisk"
    | "at"
    | "backward"
    | "ban"
    | "barcode"
    | "bars"
    | "bell"
    | "bell-slash"
    | "bitcoin"
    | "bolt"
    | "book"
    | "bookmark"
    | "bookmark-fill"
    | "box"
    | "briefcase"
    | "building"
    | "building-columns"
    | "bullseye"
    | "calculator"
    | "calendar"
    | "calendar-clock"
    | "calendar-minus"
    | "calendar-plus"
    | "calendar-times"
    | "camera"
    | "car"
    | "caret-down"
    | "caret-left"
    | "caret-right"
    | "caret-up"
    | "cart-arrow-down"
    | "cart-minus"
    | "cart-plus"
    | "chart-bar"
    | "chart-line"
    | "chart-pie"
    | "chart-scatter"
    | "check"
    | "check-circle"
    | "check-square"
    | "chevron-circle-down"
    | "chevron-circle-left"
    | "chevron-circle-right"
    | "chevron-circle-up"
    | "chevron-down"
    | "chevron-left"
    | "chevron-right"
    | "chevron-up"
    | "circle"
    | "circle-fill"
    | "clipboard"
    | "clock"
    | "clone"
    | "cloud"
    | "cloud-download"
    | "cloud-upload"
    | "code"
    | "cog"
    | "comment"
    | "comments"
    | "compass"
    | "copy"
    | "credit-card"
    | "crown"
    | "database"
    | "delete-left"
    | "desktop"
    | "directions"
    | "directions-alt"
    | "discord"
    | "dollar"
    | "download"
    | "eject"
    | "ellipsis-h"
    | "ellipsis-v"
    | "envelope"
    | "equals"
    | "eraser"
    | "ethereum"
    | "euro"
    | "exclamation-circle"
    | "exclamation-triangle"
    | "expand"
    | "external-link"
    | "eye"
    | "eye-slash"
    | "face-smile"
    | "facebook"
    | "fast-backward"
    | "fast-forward"
    | "file"
    | "file-arrow-up"
    | "file-check"
    | "file-edit"
    | "file-excel"
    | "file-export"
    | "file-import"
    | "file-pdf"
    | "file-plus"
    | "file-word"
    | "filter"
    | "filter-fill"
    | "filter-slash"
    | "flag"
    | "flag-fill"
    | "folder"
    | "folder-open"
    | "folder-plus"
    | "forward"
    | "gauge"
    | "gift"
    | "github"
    | "globe"
    | "google"
    | "graduation-cap"
    | "hammer"
    | "hashtag"
    | "headphones"
    | "heart"
    | "heart-fill"
    | "history"
    | "home"
    | "hourglass"
    | "id-card"
    | "image"
    | "images"
    | "inbox"
    | "indian-rupee"
    | "info"
    | "info-circle"
    | "instagram"
    | "key"
    | "language"
    | "lightbulb"
    | "link"
    | "linkedin"
    | "list"
    | "list-check"
    | "lock"
    | "lock-open"
    | "map"
    | "map-marker"
    | "mars"
    | "megaphone"
    | "microchip"
    | "microchip-ai"
    | "microphone"
    | "microsoft"
    | "minus"
    | "minus-circle"
    | "mobile"
    | "money-bill"
    | "moon"
    | "objects-column"
    | "palette"
    | "paperclip"
    | "pause"
    | "pause-circle"
    | "paypal"
    | "pen-to-square"
    | "pencil"
    | "percentage"
    | "phone"
    | "pinterest"
    | "play"
    | "play-circle"
    | "plus"
    | "plus-circle"
    | "pound"
    | "power-off"
    | "prime"
    | "print"
    | "qrcode"
    | "question"
    | "question-circle"
    | "receipt"
    | "reddit"
    | "refresh"
    | "replay"
    | "reply"
    | "save"
    | "search"
    | "search-minus"
    | "search-plus"
    | "send"
    | "server"
    | "share-alt"
    | "shield"
    | "shop"
    | "shopping-bag"
    | "shopping-cart"
    | "sign-in"
    | "sign-out"
    | "sitemap"
    | "slack"
    | "sliders-h"
    | "sliders-v"
    | "sort"
    | "sort-alpha-down"
    | "sort-alpha-down-alt"
    | "sort-alpha-up"
    | "sort-alpha-up-alt"
    | "sort-alt"
    | "sort-alt-slash"
    | "sort-amount-down"
    | "sort-amount-down-alt"
    | "sort-amount-up"
    | "sort-amount-up-alt"
    | "sort-down"
    | "sort-down-fill"
    | "sort-numeric-down"
    | "sort-numeric-down-alt"
    | "sort-numeric-up"
    | "sort-numeric-up-alt"
    | "sort-up"
    | "sort-up-fill"
    | "sparkles"
    | "spinner"
    | "spinner-dotted"
    | "star"
    | "star-fill"
    | "star-half"
    | "star-half-fill"
    | "step-backward"
    | "step-backward-alt"
    | "step-forward"
    | "step-forward-alt"
    | "stop"
    | "stop-circle"
    | "stopwatch"
    | "sun"
    | "sync"
    | "table"
    | "tablet"
    | "tag"
    | "tags"
    | "telegram"
    | "th-large"
    | "thumbs-down"
    | "thumbs-down-fill"
    | "thumbs-up"
    | "thumbs-up-fill"
    | "thumbtack"
    | "ticket"
    | "tiktok"
    | "times"
    | "times-circle"
    | "trash"
    | "trophy"
    | "truck"
    | "turkish-lira"
    | "twitch"
    | "twitter"
    | "undo"
    | "unlock"
    | "upload"
    | "user"
    | "user-edit"
    | "user-minus"
    | "user-plus"
    | "users"
    | "venus"
    | "verified"
    | "video"
    | "vimeo"
    | "volume-down"
    | "volume-off"
    | "volume-up"
    | "wallet"
    | "warehouse"
    | "wave-pulse"
    | "whatsapp"
    | "wifi"
    | "window-maximize"
    | "window-minimize"
    | "wrench"
    | `pi pi-${string}`

/**
 * Optional cross-platform injection types
 * (Web passes its real types; Native can use `any`)
 */
export interface INonCrossPlatformTypes {
    MenuItem?: any; // Web: MenuItem from primereact/menuitem
    Theme?: any;    // Web: PrimeReactPTOptions
    Element?: any;  // Web: JSX.Element
}

/**
 * Language structure
 */
export type ILanguage = {
    lang: string; // e.g. 'en', 'ar', 'es', ...
    translations: Record<string, string>;
};
/**
 * Locale context props
 */
export interface ILocaleContextProps {
    languages?: ILanguage[];
    defaultLanguage?: string;
    onChangeLanguage?: (language: string) => void;
}

/**
 * Locale context values
 */
export interface ILocaleContextValues {
    changeLanguage(key: string | null): void;
    t(key: string, ...params: (number | string)[]): string;
    isKeyExists(key: string): boolean;
    currentLanguage: string;
    isRTL: boolean;
}

/** A single color scale with shades from 50 to 900 */
export type ColorScale = {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
};

/** Semantic color aliases that resolve to a palette reference (e.g. 'blue.500') or raw hex */
export type SemanticColorTokens = {
    primary: string;
    secondary: string;
    success: string;
    danger: string;
    warning: string;
    info: string;
    text: string;
    'text-secondary': string;
    bg: string;
    'bg-subtle': string;
    border: string;
    'surface-ground': string;
    'surface-card': string;
    'surface-overlay': string;
    'surface-hover': string;
    [key: string]: string;
};

export type ColorMode = 'light' | 'dark';

export interface IKitsThemeColors {
    blue: ColorScale;
    green: ColorScale;
    red: ColorScale;
    yellow: ColorScale;
    orange: ColorScale;
    purple: ColorScale;
    teal: ColorScale;
    cyan: ColorScale;
    pink: ColorScale;
    gray: ColorScale;
    indigo: ColorScale;
    [key: string]: ColorScale;
}

export interface IKitsThemeSpacing {
    '0': string;
    '0.5': string;
    '1': string;
    '1.5': string;
    '2': string;
    '3': string;
    '4': string;
    '5': string;
    '6': string;
    '8': string;
    '10': string;
    '12': string;
    '16': string;
    '20': string;
    '24': string;
    [key: string]: string;
}

export interface IKitsThemeRadii {
    none: string;
    sm: string;
    base: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    full: string;
    [key: string]: string;
}

export interface IKitsThemeShadows {
    none: string;
    sm: string;
    base: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
    inner: string;
    [key: string]: string;
}

export interface IKitsThemeFonts {
    heading: string;
    body: string;
    mono: string;
}

export interface IKitsThemeFontSizes {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    '4xl': string;
    '5xl': string;
    '6xl': string;
    [key: string]: string;
}

export interface IKitsThemeFontWeights {
    light: number;
    normal: number;
    medium: number;
    semibold: number;
    bold: number;
    [key: string]: number;
}

export interface IKitsThemeLineHeights {
    none: number;
    tight: number;
    snug: number;
    normal: number;
    relaxed: number;
    loose: number;
    [key: string]: number;
}

export type ComponentSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/** Per-component theme config: behavioral prop defaults + visual style overrides */
export interface IComponentThemeConfig<P = Record<string, any>> {
    /** Default prop values (e.g. rounded, size, severity). User props always win. */
    props?: Partial<P>;
    /** CSS style overrides applied to the component root (borderRadius, fontSize, etc.). */
    style?: Record<string, any>;
}

/** Typed component defaults map */
export interface IKitsComponentDefaults {
    Button?: IComponentThemeConfig<{ rounded?: boolean; size?: string; severity?: string; outlined?: boolean; raised?: boolean }>;

    // Base groups — apply to all members of the group
    Input?: IComponentThemeConfig<{ inputSize?: string }>;
    Select?: IComponentThemeConfig;

    // Input group members (inherit from Input)
    InputText?: IComponentThemeConfig<{ inputSize?: string }>;
    InputNumber?: IComponentThemeConfig<{ inputSize?: string }>;
    InputMask?: IComponentThemeConfig<{ inputSize?: string }>;
    InputPassword?: IComponentThemeConfig<{ inputSize?: string }>;
    Textarea?: IComponentThemeConfig;
    Datepicker?: IComponentThemeConfig<{ inputSize?: string }>;
    ColorPicker?: IComponentThemeConfig<{ inputSize?: string }>;
    PhoneInput?: IComponentThemeConfig<{ inputSize?: string }>;

    // Select group members (inherit from Select)
    DropdownSelect?: IComponentThemeConfig;
    MultiSelect?: IComponentThemeConfig;
    TreeSelect?: IComponentThemeConfig;
    AutoComplete?: IComponentThemeConfig;
    ListBox?: IComponentThemeConfig;
    CascadeSelect?: IComponentThemeConfig;

    // Form container (wraps all form elements)
    FormContainer?: IComponentThemeConfig;

    // Standalone
    Card?: IComponentThemeConfig<{ variant?: string; size?: string }>;
    Switch?: IComponentThemeConfig;
    Checkbox?: IComponentThemeConfig;
    Radio?: IComponentThemeConfig;

    [componentName: string]: IComponentThemeConfig<any> | undefined;
}

export interface IKitsThemeConfig {
    initialColorMode: ColorMode;
    useSystemColorMode: boolean;
    /** Brand logo rendered as icon when severity is 'brand' (SVG, PNG, or any ReactNode) */
    logo?: ReactNode;
}

/** Full theme definition */
export interface IKitsTheme {
    colors: IKitsThemeColors;
    semanticTokens: {
        light: SemanticColorTokens;
        dark: SemanticColorTokens;
    };
    spacing: IKitsThemeSpacing;
    radii: IKitsThemeRadii;
    shadows: IKitsThemeShadows;
    fonts: IKitsThemeFonts;
    fontSizes: IKitsThemeFontSizes;
    fontWeights: IKitsThemeFontWeights;
    lineHeights: IKitsThemeLineHeights;
    severity: ISeverityThemeMap;
    components: IKitsComponentDefaults;
    config: IKitsThemeConfig;
}

/** Deep-partial version for consumer customization */
export type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type KitsThemeOverride = DeepPartial<IKitsTheme>;

/** Context value provided by KitsThemeProvider */
export interface IKitsThemeContextValues {
    theme: IKitsTheme;
    colorMode: ColorMode;
    toggleColorMode: () => void;
    setColorMode: (mode: ColorMode) => void;
    resolveToken: (token: string) => string;
}

export interface IThemeContextProps {
    theme: 'light' | 'dark';
    kitsTheme?: KitsThemeOverride;
}

export interface IThemeContextValues {
    switchTheme(themeFile?: string): void;
    theme: 'light' | 'dark';
}

// Generic placeholders for non-cross-platform UI and theme types.
export interface IMainContextProps<
    TMenuItem = any,
    TTheme = any,
    TComponent = JSX.Element
> {
    renderRouter?: boolean;
    onLogOut?: () => void;
    languages?: ILanguage[];
    menuItems?: TMenuItem[];
    defaultLanguage?: string;
    logo?: TComponent;
    theme?: TTheme;
    /** KitsConcerto theme override — colors, spacing, radii, component defaults, etc. */
    kitsTheme?: KitsThemeOverride;
    nonAuthRoutes?: TMenuItem[];
    authedRoutes?: TMenuItem[];
    permissions?: string[] | null;
    onChangeLanguage?: (language: string) => void;
    ref?:Ref<any>
}

export interface IMainContextValues<TMenuItem = any, TComponent = JSX.Element> {
    onLogOut?: () => void;
    logo?: TComponent;
    menuItems?: TMenuItem[];
    mq: {
        isSmall: boolean;
        isTablet: boolean;
        isDesktop: boolean;
        isLandscape: boolean;
        isPortrait: boolean;
    };
    appendToHeader?: (element: ReactNode) => void;
}

export type INativeProps<T> = T & {
    className?:string;
    as?:string;
    style?:any,
    _extra?:{className:string}
}
export interface IResponsiveElement<T> {
    cssProps: IStyleClasses;
    nativeProps: INativeProps<T>
    additionalStyles?: IStyleClasses;
    additionalClasses?: string;
    scrollable?: boolean;
    entering?: EnteringAnimation;
    exiting?: ExitingAnimation;
    as?:
        | "Skeleton"
        | "VStack"
        | "HStack"
        | "Center"
        | "Heading"
        | "Text"
        | "Grid"
        | "GridItem"
        | "Card"
        | "Sidebar"
        | "Button"
        | "ButtonGroup"
        | "Image"
        | "List"
        | "ListItem"
        | "a"
        | "Svg"
        | "Box"
        | "Router"
        | "span"
        | "Pressable"
        | "Modal"
        | "AlertDialog"
        | "Toast"
        | "Divider"
        | "Toolbar"
        | "TabView"
        | "Stepper"
        | "Timeline"
        | "ScrollView";
    ref?: any;
}

export type UseDisclosureReturnType = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    onToggle: () => void;
};

declare const defaultSeverityTheme: ISeverityThemeMap = {
    success: {
        solid: 'green.500',
        bgTint: 'green.50',
        iconFg: 'green.600',
        iconBg: 'green.100',
        text: 'green.700',
        border: 'green.500',
    },
    info: {
        solid: 'blue.500',
        bgTint: 'blue.50',
        iconFg: 'blue.600',
        iconBg: 'blue.100',
        text: 'blue.700',
        border: 'blue.500',
    },
    warning: {
        solid: 'yellow.500',
        bgTint: 'yellow.50',
        iconFg: 'yellow.600',
        iconBg: 'yellow.100',
        text: 'yellow.700',
        border: 'yellow.500',
    },
    danger: {
        solid: 'red.500',
        bgTint: 'red.50',
        iconFg: 'red.600',
        iconBg: 'red.100',
        text: 'red.700',
        border: 'red.500',
    },
    help: {
        solid: 'teal.500',
        bgTint: 'teal.50',
        iconFg: 'teal.600',
        iconBg: 'teal.100',
        text: 'teal.700',
        border: 'teal.500',
    },
    secondary: {
        solid: 'gray.500',
        bgTint: 'gray.50',
        iconFg: 'gray.600',
        iconBg: 'gray.100',
        text: 'gray.700',
        border: 'gray.400',
    },
    brand: {
        solid: 'cyan.500',
        bgTint: 'cyan.50',
        iconFg: 'cyan.600',
        iconBg: 'cyan.100',
        text: 'cyan.700',
        border: 'cyan.500',
    },
};

declare const defaultTheme: IKitsTheme = {
    colors: {
        blue: {
            50: '#EFF6FF', 100: '#DBEAFE', 200: '#BFDBFE', 300: '#93C5FD', 400: '#60A5FA',
            500: '#3B82F6', 600: '#2563EB', 700: '#1D4ED8', 800: '#1E40AF', 900: '#1E3A8A',
        },
        green: {
            50: '#F0FDF4', 100: '#DCFCE7', 200: '#BBF7D0', 300: '#86EFAC', 400: '#4ADE80',
            500: '#22C55E', 600: '#16A34A', 700: '#15803D', 800: '#166534', 900: '#14532D',
        },
        red: {
            50: '#FEF2F2', 100: '#FEE2E2', 200: '#FECACA', 300: '#FCA5A5', 400: '#F87171',
            500: '#EF4444', 600: '#DC2626', 700: '#B91C1C', 800: '#991B1B', 900: '#7F1D1D',
        },
        yellow: {
            50: '#FEFCE8', 100: '#FEF9C3', 200: '#FEF08A', 300: '#FDE047', 400: '#FACC15',
            500: '#EAB308', 600: '#CA8A04', 700: '#A16207', 800: '#854D0E', 900: '#713F12',
        },
        orange: {
            50: '#FFF7ED', 100: '#FFEDD5', 200: '#FED7AA', 300: '#FDBA74', 400: '#FB923C',
            500: '#F97316', 600: '#EA580C', 700: '#C2410C', 800: '#9A3412', 900: '#7C2D12',
        },
        purple: {
            50: '#FAF5FF', 100: '#F3E8FF', 200: '#E9D5FF', 300: '#D8B4FE', 400: '#C084FC',
            500: '#8B5CF6', 600: '#7C3AED', 700: '#6D28D9', 800: '#5B21B6', 900: '#4C1D95',
        },
        teal: {
            50: '#F0FDFA', 100: '#CCFBF1', 200: '#99F6E4', 300: '#5EEAD4', 400: '#2DD4BF',
            500: '#14B8A6', 600: '#0D9488', 700: '#0F766E', 800: '#115E59', 900: '#134E4A',
        },
        cyan: {
            50: '#ECFEFF', 100: '#CFFAFE', 200: '#A5F3FC', 300: '#67E8F9', 400: '#22D3EE',
            500: '#06B6D4', 600: '#0891B2', 700: '#0E7490', 800: '#155E75', 900: '#164E63',
        },
        pink: {
            50: '#FDF2F8', 100: '#FCE7F3', 200: '#FBCFE8', 300: '#F9A8D4', 400: '#F472B6',
            500: '#EC4899', 600: '#DB2777', 700: '#BE185D', 800: '#9D174D', 900: '#831843',
        },
        gray: {
            50: '#F9FAFB', 100: '#F3F4F6', 200: '#E5E7EB', 300: '#D1D5DB', 400: '#9CA3AF',
            500: '#6B7280', 600: '#4B5563', 700: '#374151', 800: '#1F2937', 900: '#111827',
        },
        indigo: {
            50: '#EEF2FF', 100: '#E0E7FF', 200: '#C7D2FE', 300: '#A5B4FC', 400: '#818CF8',
            500: '#6366F1', 600: '#4F46E5', 700: '#4338CA', 800: '#3730A3', 900: '#312E81',
        },
    },
    semanticTokens: {
        light: {
            primary: '#20aab0',
            secondary: 'gray.600',
            success: 'green.500',
            danger: 'red.500',
            warning: 'yellow.500',
            info: 'blue.400',
            text: 'gray.900',
            'text-secondary': 'gray.500',
            bg: '#FFFFFF',
            'bg-subtle': 'gray.50',
            border: 'gray.200',
            divider: 'gray.200',
            'surface-ground': 'gray.50',
            'surface-card': '#FFFFFF',
            'surface-overlay': 'gray.300',
            'surface-hover': 'gray.100',
        },
        dark: {
            primary: 'teal.400',
            secondary: 'gray.400',
            success: 'green.400',
            danger: 'red.400',
            warning: 'yellow.400',
            info: 'blue.300',
            text: 'gray.50',
            'text-secondary': 'gray.400',
            bg: 'gray.900',
            'bg-subtle': 'gray.800',
            border: 'gray.700',
            divider: 'gray.700',
            'surface-ground': 'gray.900',
            'surface-card': 'gray.800',
            'surface-overlay': 'gray.700',
            'surface-hover': 'gray.700',
        },
    },
    spacing: {
        '0': '0',
        '0.5': '0.125rem',
        '1': '0.25rem',
        '1.5': '0.375rem',
        '2': '0.5rem',
        '3': '0.75rem',
        '4': '1rem',
        '5': '1.25rem',
        '6': '1.5rem',
        '8': '2rem',
        '10': '2.5rem',
        '12': '3rem',
        '16': '4rem',
        '20': '5rem',
        '24': '6rem',
    },
    radii: {
        none: '0',
        sm: '0.125rem',
        base: '0.25rem',
        md: '0.375rem',
        lg: '0.5rem',
        xl: '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        full: '9999px',
    },
    shadows: {
        none: 'none',
        sm: '0 1px 2px 0 rgba(0,0,0,0.05)',
        base: '0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px -1px rgba(0,0,0,0.1)',
        md: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)',
        lg: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)',
        xl: '0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)',
        '2xl': '0 25px 50px -12px rgba(0,0,0,0.25)',
        inner: 'inset 0 2px 4px 0 rgba(0,0,0,0.05)',
    },
    fonts: {
        heading: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
        body: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
        mono: 'SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace',
    },
    fontSizes: {
        xs: '0.75rem',
        sm: '0.875rem',
        md: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '3.75rem',
    },
    fontWeights: {
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
    },
    lineHeights: {
        none: 1,
        tight: 1.25,
        snug: 1.375,
        normal: 1.5,
        relaxed: 1.625,
        loose: 2,
    },
    severity: defaultSeverityTheme,
    components: {},
    config: {
        initialColorMode: 'light',
        useSystemColorMode: false,
    },
};

/** Deep-merge source into target, returning a new object. Source values win. */
declare function deepMerge<T extends Record<string, any>>(target: T, source: Record<string, any>): T {
    const result = {...target} as Record<string, any>;

    for (const key of Object.keys(source)) {
        const srcVal = source[key];
        const tgtVal = result[key];

        if (isPlainObject(srcVal) && isPlainObject(tgtVal)) {
            result[key] = deepMerge(tgtVal, srcVal);
        } else if (srcVal !== undefined) {
            result[key] = srcVal;
        }
    }

    return result as T;
}

/**
 * Merges consumer overrides with the default theme.
 *
 * @example
 * const theme = extendTheme({
 *   colors: {
 *     brand: { 50: '#E6F0FF', 100: '#B3D4FF', ... },
 *   },
 *   semanticTokens: {
 *     light: { primary: 'brand.500' },
 *   },
 *   components: {
 *     Button: { rounded: true, colorScheme: 'brand' },
 *   },
 * });
 */
declare function extendTheme(overrides: KitsThemeOverride): IKitsTheme {
    return deepMerge(defaultTheme, overrides as Record<string, any>);
}

/**
 * Resolves a theme token string to a platform-appropriate value.
 *
 * Resolution order:
 * 1. Raw values (#hex, rgb, hsl, transparent) — pass through
 * 2. Semantic tokens ('primary', 'danger') — look up in semanticTokens[colorMode]
 * 3. Dot-notation ('blue.500') — look up in theme.colors
 * 4. Prefixed tokens ('$spacing.4', '$radii.lg', '$shadows.md', '$fontSizes.lg')
 * 5. Legacy var() — pass through on web, resolved separately on native
 * 6. Legacy dash-notation ('blue-500') — look up in theme.colors
 */
declare function resolveTokenValue(
    theme: IKitsTheme,
    colorMode: ColorMode,
    token: string,
    platform: 'web' | 'native' = 'web',
): string {
    if (typeof token !== 'string') return token;

    // 1. Raw values — pass through
    if (
        token.startsWith('#') ||
        token.startsWith('rgb') ||
        token.startsWith('hsl') ||
        token === 'transparent' ||
        token === 'inherit' ||
        token === 'currentColor'
    ) {
        return token;
    }

    // 2. Semantic token lookup
    const semantics = theme.semanticTokens[colorMode];
    if (semantics && token in semantics) {
        const resolved = semantics[token]!;
        return resolveTokenValue(theme, colorMode, resolved, platform);
    }

    // 3. Dot-notation: 'blue.500'
    const dotMatch = token.match(DOT_NOTATION_RE);
    if (dotMatch) {
        const [, family, shade] = dotMatch;
        const scale = theme.colors[family!] as ColorScale | undefined;
        if (scale && shade! in scale) {
            const hex = scale[shade as unknown as keyof ColorScale];
            return platform === 'web' ? `var(--kits-${family}-${shade})` : hex;
        }
    }

    // 4. Prefixed tokens: $spacing.4, $radii.lg, $shadows.md, $fontSizes.lg
    if (token.startsWith('$')) {
        const dotIdx = token.indexOf('.');
        if (dotIdx > 1) {
            const category = token.substring(1, dotIdx);
            const key = token.substring(dotIdx + 1);

            switch (category) {
                case 'spacing':
                    if (key in theme.spacing) {
                        return platform === 'web' ? `var(--kits-space-${key})` : theme.spacing[key]!;
                    }
                    break;
                case 'radii':
                    if (key in theme.radii) {
                        return platform === 'web' ? `var(--kits-radii-${key})` : theme.radii[key]!;
                    }
                    break;
                case 'shadows':
                    if (key in theme.shadows) {
                        return platform === 'web' ? `var(--kits-shadow-${key})` : theme.shadows[key]!;
                    }
                    break;
                case 'fontSizes':
                    if (key in theme.fontSizes) {
                        return platform === 'web' ? `var(--kits-fontSize-${key})` : theme.fontSizes[key]!;
                    }
                    break;
                case 'fonts':
                    if (key in theme.fonts) {
                        return platform === 'web' ? `var(--kits-font-${key})` : theme.fonts[key as keyof typeof theme.fonts]!;
                    }
                    break;
            }
        }
    }

    // 5. Legacy var() — pass through
    if (token.startsWith('var(')) {
        return token;
    }

    // 6. Legacy dash-notation: 'blue-500'
    const dashMatch = token.match(DASH_NOTATION_RE);
    if (dashMatch) {
        const [, family, shade] = dashMatch;
        const scale = theme.colors[family!] as ColorScale | undefined;
        if (scale && shade! in scale) {
            const hex = scale[shade as unknown as keyof ColorScale];
            return platform === 'web' ? `var(--kits-${family}-${shade})` : hex;
        }
    }

    return token;
}

/**
 * Checks if a given string is a known semantic token name.
 * Used by the web style pipeline to detect tokens that should be resolved.
 */
declare function isSemanticToken(value: string, theme?: IKitsTheme): boolean {
    if (SEMANTIC_KEYS.has(value)) return true;
    if (theme) {
        return value in theme.semanticTokens.light || value in theme.semanticTokens.dark;
    }
    return false;
}

/**
 * Checks if a value looks like a theme token (dot-notation, $prefix, or semantic).
 */
declare function isThemeToken(value: string): boolean {
    if (typeof value !== 'string') return false;
    if (DOT_NOTATION_RE.test(value)) return true;
    if (value.startsWith('$')) return true;
    if (SEMANTIC_KEYS.has(value)) return true;
    return false;
}

export type NativeLoaderProps = ILoaderProps<ColorValue$1, StyleProp<ViewStyle>, Record<string, unknown>>;
declare const Loader: ({ color, size, animating, style }: NativeLoaderProps) => react_jsx_runtime.JSX.Element;

declare function Icon({ name, size, color, strokeWidth, ...rest }: IIconProps): react_jsx_runtime.JSX.Element;

declare const KitsContainer: FC<PropsWithChildren<IKitsContainer>>;

declare const KitsInputText: ({ ref, ...rawProps }: IKitsInputText) => react_jsx_runtime.JSX.Element;

declare const KitsInputNumber: ({ ref, ...rawProps }: IKitsInputNumber) => react_jsx_runtime.JSX.Element;

declare const KitsInputMask: ({ ref, ...rawProps }: IKitsInputMask) => react_jsx_runtime.JSX.Element;

declare const KitsInputColorPicker: ({ ref, ...rawProps }: IKitsInputColorPicker) => react_jsx_runtime.JSX.Element;

export type NativeTextareaRef = {
    focus(): void;
    blur(): void;
    clear(): void;
};
declare const KitsInputTextarea: React__default.ForwardRefExoticComponent<Omit<IKitsInputTextarea, "ref"> & React__default.RefAttributes<NativeTextareaRef>>;

declare const KitsInputPassword: ({ ref, ...rawProps }: IKitsInputPassword) => react_jsx_runtime.JSX.Element;

declare const KitsPhoneComponent: ({ ref, isWithCountryCode, label, value, placeholder, onChange, invalid, disabled, required, errors, hideError, id, defaultCountry, inputSize, isFloatedLabel, leftAddon, rightAddon, includedCountries, excludedCountries, outputFormat, ...props }: IKitsPhoneInput) => react_jsx_runtime.JSX.Element;

declare const KitsInputLocation: ({ id, label, errors, invalid, value, hideError, onAddressClick, onChange, disabled, placeholder, countryISO, helperText, provider, api_key, labelKey, valueKey, list, ...rest }: IKitsInputLocation) => react_jsx_runtime.JSX.Element;

declare const KitsInputCalendar: <T = DatePickerOptions>({ ref, ...rawProps }: IKitsInputCalendar<T>) => react_jsx_runtime.JSX.Element;

declare const KitsInputSwitch: React__default.FC<IKitsInputSwitch>;

declare const Editable: FC<IEditableProps>;

declare const KitsCheckbox: <T>({ id, label, required, errors, hideError, isFloatedLabel, helperText, item, value, checked, defaultValue, onChange, limit, appearanceMode, disabled, invalid, attached, containerStyle }: IKitsCheckboxProps<T>) => react_jsx_runtime.JSX.Element;

declare const KitsRadio: <T>({ id, label, required, errors, hideError, isFloatedLabel, helperText, item, value, defaultValue, onChange, appearanceMode, disabled, invalid, }: IKitsRadioProps<T>) => react_jsx_runtime.JSX.Element;

declare const KitsAutoComplete: FunctionComponent<IAutoCompleteElement>;
declare const KitsDropdown: FunctionComponent<IDropdownSelect>;
declare const KitsMultiSelect: FunctionComponent<IMultiSelect>;

declare const KitsTreeSelect: FunctionComponent<ITreeSelect>;

declare const KitsListBox: FunctionComponent<IListBoxSelect>;
declare const KitsCascadeSelect: FunctionComponent<ICascadeSelect>;

declare const FormSelect: ({ ref, ...props }: ISelectElement & ISelectType) => react_jsx_runtime.JSX.Element;

declare const FilePicker: FC<IFileUploader>;

declare const KitsSliders: FC<ISliderProps>;

declare const Label: FunctionComponent<ILabelProps>;

declare const cardStyle: _gluestack_ui_utils_nativewind_utils.TVReturnType<{
    size: {
        sm: string;
        md: string;
        lg: string;
    };
    variant: {
        elevated: string;
        outline: string;
        ghost: string;
        filled: string;
    };
} | ({
    size: {
        sm: string;
        md: string;
        lg: string;
    };
    variant: {
        elevated: string;
        outline: string;
        ghost: string;
        filled: string;
    };
} & {
    size: {
        sm: tailwind_merge.ClassNameValue | {
            base?: tailwind_merge.ClassNameValue;
        };
        md: tailwind_merge.ClassNameValue | {
            base?: tailwind_merge.ClassNameValue;
        };
        lg: tailwind_merge.ClassNameValue | {
            base?: tailwind_merge.ClassNameValue;
        };
    };
    variant: {
        elevated: tailwind_merge.ClassNameValue | {
            base?: tailwind_merge.ClassNameValue;
        };
        outline: tailwind_merge.ClassNameValue | {
            base?: tailwind_merge.ClassNameValue;
        };
        ghost: tailwind_merge.ClassNameValue | {
            base?: tailwind_merge.ClassNameValue;
        };
        filled: tailwind_merge.ClassNameValue | {
            base?: tailwind_merge.ClassNameValue;
        };
    };
}), undefined, "" | "flex flex-col relative z-0", TVConfig<V, EV>, {
    size: {
        sm: string;
        md: string;
        lg: string;
    };
    variant: {
        elevated: string;
        outline: string;
        ghost: string;
        filled: string;
    };
}, undefined, _gluestack_ui_utils_nativewind_utils.TVReturnType<{
    size: {
        sm: string;
        md: string;
        lg: string;
    };
    variant: {
        elevated: string;
        outline: string;
        ghost: string;
        filled: string;
    };
}, undefined, "" | "flex flex-col relative z-0", TVConfig<V, EV>, unknown, unknown, undefined>>;

export type ICardProps = ViewProps & VariantProps<typeof cardStyle> & {
    className?: string;
};

// TriStateCheckbox.types.native.ts


export interface TriStateCheckboxProps {
  value?: boolean | null;
  disabled?: boolean;
  readOnly?: boolean;
  invalid?: boolean;
  autoFocus?: boolean;
  variant?: "filled" | "outlined";
  tooltip?: string;
  unstyled?: boolean;

  checkIcon?: ComponentType<any>;
  uncheckIcon?: ComponentType<any>;

  onChange?: (event: {
    value: boolean | null;
    checked: boolean;
  }) => void;

  children?: ReactNode;
}

export interface SelectButtonChangeEvent<T = any> {
  value: T;
  checked: boolean;
}

export interface SelectButtonOption {
  label?: string;
  value?: any;
  disabled?: boolean;
  icon?: ReactNode;
  [key: string]: any;
}

export interface SelectButtonProps<T = any> {
  value?: T | T[] | null;
  options: SelectButtonOption[];

  multiple?: boolean;
  allowEmpty?: boolean;
  unselectable?: boolean;
  disabled?: boolean;
  invalid?: boolean;

  optionLabel?: string;
  optionValue?: string;
  optionDisabled?: string | ((option: any) => boolean);

  dataKey?: string;

  itemTemplate?: (option: any, selected: boolean) => ReactNode;

  onChange?: (event: SelectButtonChangeEvent<T | T[]>) => void;

  style?: any;
  className?: string;

  unstyled?: boolean;
}

/**
 * Matches PrimeReact severity union
 */
export type BadgeSeverity =
  | null
  | "success"
  | "warning"
  | "secondary"
  | "info"
  | "danger"
  | "contrast";

/**
 * Matches PrimeReact size union
 */
export type BadgeSize =
  | null
  | "normal"
  | "large"
  | "xlarge";

/**
 * Kept for API parity with PrimeReact.
 * No-op on native.
 */
export type BadgePassThroughOptions = any;
export type PassThroughOptions = any;

export interface BadgeProps {
  children?: ReactNode;
  value?: any;

  severity?: BadgeSeverity;
  size?: BadgeSize;
  unstyled?: boolean;

  pt?: BadgePassThroughOptions;
  ptOptions?: PassThroughOptions;

  // React Native passthrough
  testID?: string;
  style?: any;
}

declare const SelectButton: (props: SelectButtonProps) => react_jsx_runtime.JSX.Element;

declare const TriStateCheckbox: (props: TriStateCheckboxProps) => react_jsx_runtime.JSX.Element;

declare const Grid: React__default.ForwardRefExoticComponent<Omit<React__default.PropsWithChildren<IGridComponent>, "ref"> & React__default.RefAttributes<any>>;

declare const GridItem: React$1.ForwardRefExoticComponent<Omit<PropsWithChildren<IGridItemComponent>, "ref"> & React$1.RefAttributes<any>>;

declare const Flex: {
    ({ className, children, ref, ...props }: PropsWithChildren<IFlexComponent>): react_jsx_runtime.JSX.Element;
    displayName: string;
};

declare const Image: ({ style, ref, src, ...props }: IImageComponent) => react_jsx_runtime.JSX.Element;

declare const Text: React__default.FC<ITextComponent>;

declare const Translate: ({ label, children }: PropsWithChildren<ITranslateComponent>) => react_jsx_runtime.JSX.Element;

declare const Heading: React__default.FC<IHeadingComponent>;

declare const Center: ({ className, children, ref, ...props }: PropsWithChildren<IFlexComponent>) => react_jsx_runtime.JSX.Element;

declare const Box: ({ children, ref, ...props }: PropsWithChildren<IFlexComponent>) => react_jsx_runtime.JSX.Element;

declare const Card: (rawProps: ICardComponent<Omit<ICardProps, "title">>) => react_jsx_runtime.JSX.Element;

declare const Collapse: React__default.FC<ICollapseProps>;

declare const List: ({ className, children, ref, ...props }: PropsWithChildren<IFlexComponent>) => react_jsx_runtime.JSX.Element;

declare const ListItem: ({ className, children, ref, ...props }: PropsWithChildren<IFlexComponent>) => react_jsx_runtime.JSX.Element;

declare const Link: React__default.FC<ILinkComponent>;

declare const Svg: ({ className, children, ref, ...props }: PropsWithChildren<ISVGComponent>) => react_jsx_runtime.JSX.Element;

declare const HStack: React__default.FC<PropsWithChildren<IStackProps>>;

declare const VStack: React__default.FC<PropsWithChildren<IStackProps>>;

declare const KitsScrollView: ({ children, ref, ...props }: PropsWithChildren<IScrollViewComponent>) => react_jsx_runtime.JSX.Element;

declare const KitsAnimatePresence: ({ children }: React__default.PropsWithChildren) => react_jsx_runtime.JSX.Element;

declare const Divider: React__default.FC<IDividerComponent>;

declare function Button(rawProps: IButtonProps<IconName | string | ElementType | ReactElement>): react_jsx_runtime.JSX.Element;

declare function useButton(props: IButtonProps<any>): {
    state: IButtonState;
    handlers: {
        onClick: React__default.MouseEventHandler<any>;
        onPressIn: () => void;
        onPressOut: () => void;
        onMouseEnter: () => void;
        onMouseLeave: () => void;
    };
    _nativeProps: {
        id?: string;
        type?: "submit" | "button";
        ref?: React__default.Ref<any>;
        children?: string | ReactNode;
        severity?: "secondary" | "success" | "info" | "warning" | "help" | "danger" | "contrast" | "brand" | undefined;
        icon?: any;
        iconPos?: "left" | "right" | "top" | "bottom";
        size?: "sm" | "md" | "lg";
        outlined?: boolean;
        raised?: boolean;
        rounded?: boolean;
        label?: string;
        isLoadingText?: string;
        tooltip?: string;
        tooltipOptions?: {
            position?: string;
        };
        style?: IStyleClasses;
        className?: string;
        testID?: string;
        p?: KitsResponsiveValue<react_native.ViewStyle["padding"] | `${number}${string}`>;
        padding?: KitsResponsiveValue<react_native.ViewStyle["padding"] | `${number}${string}`>;
        pt?: KitsResponsiveValue<react_native.ViewStyle["paddingTop"] | `${number}${string}`>;
        paddingTop?: KitsResponsiveValue<react_native.ViewStyle["paddingTop"] | `${number}${string}`>;
        pr?: KitsResponsiveValue<react_native.ViewStyle["paddingRight"] | `${number}${string}`>;
        paddingRight?: KitsResponsiveValue<react_native.ViewStyle["paddingRight"] | `${number}${string}`>;
        pb?: KitsResponsiveValue<react_native.ViewStyle["paddingBottom"] | `${number}${string}`>;
        paddingBottom?: KitsResponsiveValue<react_native.ViewStyle["paddingBottom"] | `${number}${string}`>;
        pl?: KitsResponsiveValue<react_native.ViewStyle["paddingLeft"] | `${number}${string}`>;
        paddingLeft?: KitsResponsiveValue<react_native.ViewStyle["paddingLeft"] | `${number}${string}`>;
        px?: KitsResponsiveValue<react_native.ViewStyle["padding"] | `${number}${string}`>;
        paddingX?: KitsResponsiveValue<react_native.ViewStyle["padding"] | `${number}${string}`>;
        py?: KitsResponsiveValue<react_native.ViewStyle["padding"] | `${number}${string}`>;
        paddingY?: KitsResponsiveValue<react_native.ViewStyle["padding"] | `${number}${string}`>;
        paddingHorizontal?: KitsResponsiveValue<react_native.ViewStyle["padding"] | `${number}${string}`>;
        paddingVertical?: KitsResponsiveValue<react_native.ViewStyle["padding"] | `${number}${string}`>;
        m?: KitsResponsiveValue<react_native.ViewStyle["margin"] | `${number}${string}`>;
        margin?: KitsResponsiveValue<react_native.ViewStyle["margin"] | `${number}${string}`>;
        mt?: KitsResponsiveValue<react_native.ViewStyle["marginTop"] | `${number}${string}`>;
        marginTop?: KitsResponsiveValue<react_native.ViewStyle["marginTop"] | `${number}${string}`>;
        mr?: KitsResponsiveValue<react_native.ViewStyle["marginRight"] | `${number}${string}`>;
        marginRight?: KitsResponsiveValue<react_native.ViewStyle["marginRight"] | `${number}${string}`>;
        mb?: KitsResponsiveValue<react_native.ViewStyle["marginBottom"] | `${number}${string}`>;
        marginBottom?: KitsResponsiveValue<react_native.ViewStyle["marginBottom"] | `${number}${string}`>;
        ml?: KitsResponsiveValue<react_native.ViewStyle["marginLeft"] | `${number}${string}`>;
        marginLeft?: KitsResponsiveValue<react_native.ViewStyle["marginLeft"] | `${number}${string}`>;
        mx?: KitsResponsiveValue<react_native.ViewStyle["margin"] | `${number}${string}`>;
        marginX?: KitsResponsiveValue<react_native.ViewStyle["margin"] | `${number}${string}`>;
        my?: KitsResponsiveValue<react_native.ViewStyle["margin"] | `${number}${string}`>;
        marginY?: KitsResponsiveValue<react_native.ViewStyle["margin"] | `${number}${string}`>;
        marginInline?: KitsResponsiveValue<number | `${number}${string}`>;
        w?: KitsResponsiveValue<react_native.ViewStyle["width"] | "full" | "screen" | string | `${number}${string}`>;
        width?: KitsResponsiveValue<react_native.ViewStyle["width"] | "full" | "screen" | string | `${number}${string}`>;
        minW?: KitsResponsiveValue<react_native.ViewStyle["minWidth"] | "full" | "screen" | string | `${number}${string}`>;
        minWidth?: KitsResponsiveValue<react_native.ViewStyle["minWidth"] | "full" | "screen" | string | `${number}${string}`>;
        maxW?: KitsResponsiveValue<react_native.ViewStyle["maxWidth"] | "full" | "screen" | string | `${number}${string}`>;
        maxWidth?: KitsResponsiveValue<react_native.ViewStyle["maxWidth"] | "full" | "screen" | string | `${number}${string}`>;
        h?: KitsResponsiveValue<react_native.ViewStyle["height"] | "full" | "screen" | string | `${number}${string}`>;
        height?: KitsResponsiveValue<react_native.ViewStyle["height"] | "full" | "screen" | string | `${number}${string}`>;
        minH?: KitsResponsiveValue<react_native.ViewStyle["minHeight"] | "full" | "screen" | string | `${number}${string}`>;
        minHeight?: KitsResponsiveValue<react_native.ViewStyle["minHeight"] | "full" | "screen" | string | `${number}${string}`>;
        maxH?: KitsResponsiveValue<react_native.ViewStyle["maxHeight"] | "full" | "screen" | string | `${number}${string}`>;
        maxHeight?: KitsResponsiveValue<react_native.ViewStyle["maxHeight"] | "full" | "screen" | string | `${number}${string}`>;
        borderRadius?: KitsResponsiveValue<react_native.ViewStyle["borderRadius"]>;
        borderRadiusTop?: KitsResponsiveValue<react_native.ViewStyle["borderTopLeftRadius"] | react_native.ViewStyle["borderTopRightRadius"]>;
        borderRadiusBottom?: KitsResponsiveValue<react_native.ViewStyle["borderBottomLeftRadius"] | react_native.ViewStyle["borderBottomRightRadius"]>;
        borderRadiusRight?: KitsResponsiveValue<react_native.ViewStyle["borderTopRightRadius"] | react_native.ViewStyle["borderBottomRightRadius"]>;
        borderRadiusLeft?: KitsResponsiveValue<react_native.ViewStyle["borderTopLeftRadius"] | react_native.ViewStyle["borderBottomLeftRadius"]>;
        borderTopLeftRadius?: KitsResponsiveValue<react_native.ViewStyle["borderTopLeftRadius"]>;
        borderBottomLeftRadius?: KitsResponsiveValue<react_native.ViewStyle["borderBottomLeftRadius"]>;
        borderTopRightRadius?: KitsResponsiveValue<react_native.ViewStyle["borderTopRightRadius"]>;
        borderBottomRightRadius?: KitsResponsiveValue<react_native.ViewStyle["borderBottomRightRadius"]>;
        borderWidth?: KitsResponsiveValue<react_native.ViewStyle["borderWidth"]>;
        borderW?: KitsResponsiveValue<react_native.ViewStyle["borderWidth"]>;
        borderX?: KitsResponsiveValue<react_native.ViewStyle["borderLeftWidth"] | react_native.ViewStyle["borderRightWidth"]>;
        borderY?: KitsResponsiveValue<react_native.ViewStyle["borderTopWidth"] | react_native.ViewStyle["borderBottomWidth"]>;
        borderTop?: KitsResponsiveValue<react_native.ViewStyle["borderTopWidth"]>;
        borderBottom?: KitsResponsiveValue<react_native.ViewStyle["borderBottomWidth"]>;
        borderRight?: KitsResponsiveValue<react_native.ViewStyle["borderRightWidth"]>;
        borderLeft?: KitsResponsiveValue<react_native.ViewStyle["borderLeftWidth"]>;
        borderStyle?: KitsResponsiveValue<react_native.ViewStyle["borderStyle"]>;
        borderColor?: KitsResponsiveValue<react_native.ViewStyle["borderColor"] | ColorValue | react_native.ColorValue>;
        borderStartStartRadius?: null;
        borderStartEndRadius?: null;
        borderEndStartRadius?: null;
        borderEndEndRadius?: null;
        borderCollapse?: null;
        borderSpacing?: null;
        border?: null | "none";
        borderBlock?: null;
        borderBlockColor?: null;
        borderBlockStyle?: null;
        borderBlockWidth?: null;
        borderBlockEnd?: null;
        borderBlockStart?: null;
        borderInline?: null;
        borderInlineColor?: null;
        borderInlineStyle?: null;
        borderInlineWidth?: null;
        borderInlineEnd?: null;
        borderInlineStart?: null;
        borderTopColor?: KitsResponsiveValue<react_native.ViewStyle["borderColor"]>;
        borderTopStyle?: KitsResponsiveValue<react_native.ViewStyle["borderStyle"]>;
        borderTopWidth?: KitsResponsiveValue<react_native.ViewStyle["borderTopWidth"]>;
        borderBottomColor?: KitsResponsiveValue<react_native.ViewStyle["borderColor"]>;
        borderBottomStyle?: KitsResponsiveValue<react_native.ViewStyle["borderStyle"]>;
        borderBottomWidth?: KitsResponsiveValue<react_native.ViewStyle["borderBottomWidth"]>;
        borderLeftColor?: KitsResponsiveValue<react_native.ViewStyle["borderColor"]>;
        borderLeftStyle?: KitsResponsiveValue<react_native.ViewStyle["borderStyle"]>;
        borderLeftWidth?: KitsResponsiveValue<react_native.ViewStyle["borderLeftWidth"]>;
        borderRightColor?: KitsResponsiveValue<react_native.ViewStyle["borderColor"]>;
        borderRightStyle?: KitsResponsiveValue<react_native.ViewStyle["borderStyle"]>;
        borderRightWidth?: KitsResponsiveValue<react_native.ViewStyle["borderRightWidth"]>;
        backgroundColor?: KitsResponsiveValue<ColorValue | react_native.ColorValue>;
        bgColor?: KitsResponsiveValue<ColorValue | react_native.ColorValue>;
        backgroundImage?: null;
        bgImage?: null;
        backgroundRepeat?: null;
        bgRepeat?: null;
        backgroundSize?: null;
        bgSize?: null;
        backgroundPosition?: null;
        bgPosition?: null;
        gap?: KitsResponsiveValue<number | string>;
        rowGap?: KitsResponsiveValue<number | string>;
        columnGap?: KitsResponsiveValue<number | string>;
        flex?: KitsResponsiveValue<number>;
        flexDirection?: KitsResponsiveValue<"row" | "column" | "row-reverse" | "column-reverse">;
        direction?: KitsResponsiveValue<"row" | "column" | "row-reverse" | "column-reverse">;
        flexWrap?: KitsResponsiveValue<"wrap" | "nowrap" | "wrap-reverse">;
        flexGrow?: KitsResponsiveValue<number>;
        flexShrink?: KitsResponsiveValue<number>;
        flexBasis?: KitsResponsiveValue<string>;
        flexOrder?: null;
        templateAreas?: KitsResponsiveValue<string>;
        gridTemplateRows?: KitsResponsiveValue<string>;
        gridTemplateColumns?: KitsResponsiveValue<string>;
        columns?: KitsResponsiveValue<number>;
        rows?: KitsResponsiveValue<number>;
        area?: KitsResponsiveValue<number | string>;
        rowSpan?: KitsResponsiveValue<number | string>;
        rowOffset?: KitsResponsiveValue<number | string>;
        colSpan?: KitsResponsiveValue<number | string>;
        colOffset?: KitsResponsiveValue<Numbering0_12>;
        rowStart?: KitsResponsiveValue<number | string>;
        rowEnd?: KitsResponsiveValue<number | string>;
        colStart?: KitsResponsiveValue<number | string>;
        colEnd?: KitsResponsiveValue<number | string>;
        boxShadow?: KitsResponsiveValue<react_native.ViewStyle["shadowColor"] | react_native.ViewStyle["shadowOffset"] | react_native.ViewStyle["shadowOpacity"] | react_native.ViewStyle["shadowRadius"]>;
        shadow?: KitsResponsiveValue<react_native.ViewStyle["shadowColor"] | react_native.ViewStyle["shadowOffset"] | react_native.ViewStyle["shadowOpacity"] | react_native.ViewStyle["shadowRadius"]>;
        opacity?: KitsResponsiveValue<react_native.ViewStyle["opacity"]>;
        shadowColor?: KitsResponsiveValue<react_native.ViewStyle["shadowColor"]>;
        shadowOffset?: KitsResponsiveValue<react_native.ViewStyle["shadowOffset"]>;
        shadowRadius?: KitsResponsiveValue<react_native.ViewStyle["shadowRadius"]>;
        shadowOpacity?: KitsResponsiveValue<react_native.ViewStyle["shadowOpacity"]>;
        elevation?: KitsResponsiveValue<react_native.ViewStyle["elevation"]>;
        objectFit?: any;
        objectPosition?: any;
        appearance?: null;
        cursor?: any;
        outline?: null;
        pointerEvents?: react_native.ViewStyle["pointerEvents"];
        userSelect?: any;
        translateX?: KitsResponsiveValue<number>;
        translateY?: KitsResponsiveValue<number>;
        translate?: KitsResponsiveValue<number>;
        transformOrigin?: null;
        rotate?: KitsResponsiveValue<"0deg" | "90deg" | "-90deg" | "180deg" | "-180deg">;
        transitionProperty?: null;
        transitionDuration?: null;
        transitionFunction?: null;
        transitionDelay?: null;
        display?: KitsResponsiveValue<react_native.ViewStyle["display"]>;
        overflow?: KitsResponsiveValue<react_native.ViewStyle["overflow"] | "auto">;
        overflowY?: KitsResponsiveValue<"visible" | "hidden">;
        overflowX?: KitsResponsiveValue<"visible" | "hidden">;
        position?: KitsResponsiveValue<react_native.ViewStyle["position"] | "fixed" | "sticky">;
        top?: KitsResponsiveValue<react_native.ViewStyle["top"]>;
        bottom?: KitsResponsiveValue<react_native.ViewStyle["bottom"]>;
        right?: KitsResponsiveValue<react_native.ViewStyle["right"]>;
        left?: KitsResponsiveValue<react_native.ViewStyle["left"]>;
        zIndex?: KitsResponsiveValue<react_native.ViewStyle["zIndex"]>;
        aspectRatio?: KitsResponsiveValue<number | string>;
        transition?: KitsResponsiveValue<string>;
        animation?: AnimationsValues;
        animationDuration?: number;
        animationDelay?: number;
        animationIteration?: "linear" | "ease-in" | "ease-out" | "ease-in-out";
        animationFunction?: "auto" | 0 | 50 | 100;
        animationFill?: "none" | "forwards" | "backwards" | "both";
        justifyContent?: KitsResponsiveValue<"flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly">;
        alignContent?: KitsResponsiveValue<"flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "stretch">;
        alignItems?: KitsResponsiveValue<"flex-start" | "flex-end" | "center" | "stretch" | "baseline">;
        alignSelf?: KitsResponsiveValue<"auto" | "flex-start" | "flex-end" | "center" | "stretch" | "baseline">;
        verticalAlign?: any;
        listStyleType?: null;
        listStyle?: null;
        letterSpacing?: KitsResponsiveValue<number | string>;
        fontSize?: KitsResponsiveValue<number | "base" | Omit<SizingValue, "md"> | HighSizingValue>;
        fontWeight?: KitsResponsiveValue<"normal" | "bold" | "light" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900">;
        fontColor?: KitsResponsiveValue<ColorValue | react_native.ColorValue | string>;
        fontFamily?: KitsResponsiveValue<string>;
        fontStyle?: KitsResponsiveValue<"normal" | "italic">;
        textAlign?: KitsResponsiveValue<"auto" | "left" | "right" | "center" | "justify">;
        textDecoration?: "underline" | "line-through" | "none";
        textTransform?: "none" | "uppercase" | "lowercase" | "capitalize";
        lineHeight?: KitsResponsiveValue<number | `${number}${string}`>;
        textOverflow?: "ellipsis" | "clip" | null;
        whiteSpace?: "nowrap" | "normal" | null;
        numberOfLines?: KitsResponsiveValue<number>;
        _hover?: ICssStyling;
        _focus?: ICssStyling;
    };
    isDisabled: boolean;
};

declare const Badge: (props: BadgeProps) => react_jsx_runtime.JSX.Element;

declare function KitsDialogControlled({ state, onHide }: IKitsDialogControlled): react_jsx_runtime.JSX.Element;

declare function KitsConfirm(props: IConfirmDialogProps): react_jsx_runtime.JSX.Element;

declare const KitsToast: ({ ref }: {
    ref?: Ref<IKitsToastRef>;
}) => react_jsx_runtime.JSX.Element;

declare const CircularProgress: ({ size, strokeWidth, value, color, trackColor, loading, children, }: ICircularProgressProps) => react_jsx_runtime.JSX.Element;

declare const Tooltip: ({ children, label, tooltipProps, ...props }: TooltipProps) => react_jsx_runtime.JSX.Element;

declare const Alert: ({ status, variant, className, withIcon, children, title, description }: IAlertProps) => react_jsx_runtime.JSX.Element;

declare const CustomAccordion: ({ accordionTitle, accordionItems, isLoading, allOpenedByDefault, localProps, }: IAccordionProps<any>) => react_jsx_runtime.JSX.Element;

export interface IBreadCrumbProps {
}
declare const BreadCrumb: FunctionComponent<IBreadCrumbProps>;

declare const CustomPopover: FC<IPopoverProps>;

declare const SkeletonRows: (props: ISkeletonRowsProps) => any;

declare const Container$1: FunctionComponent<PropsWithChildren<IContainerProps>>;

declare const Bar: FunctionComponent<Omit<IWidgetBarIncomingProp, 'type' | 'colors' | 'isDarkMode'>>;
declare const Line: FunctionComponent<Omit<IWidgetLineIncomingProp, 'type' | 'colors' | 'isDarkMode'>>;
declare const Pie: FunctionComponent<Omit<IWidgetPieIncomingProp, 'type' | 'colors' | 'isDarkMode'>>;
declare const Radar: FunctionComponent<Omit<IWidgetRadarIncomingProp, 'type' | 'colors' | 'isDarkMode'>>;
declare const PolarArea: FunctionComponent<Omit<IWidgetPolarAreaIncomingProp, 'type' | 'colors' | 'isDarkMode'>>;
declare const Doughnut: FunctionComponent<Omit<IWidgetDoughnutIncomingProp, 'type' | 'colors' | 'isDarkMode'>>;

declare const index_native_Bar: typeof Bar;
declare const index_native_Doughnut: typeof Doughnut;
declare const index_native_Line: typeof Line;
declare const index_native_Pie: typeof Pie;
declare const index_native_PolarArea: typeof PolarArea;
declare const index_native_Radar: typeof Radar;
declare namespace index_native {
  export {
    index_native_Bar as Bar,
    index_native_Doughnut as Doughnut,
    index_native_Line as Line,
    index_native_Pie as Pie,
    index_native_PolarArea as PolarArea,
    index_native_Radar as Radar,
  };
}

declare const Skeleton$1: React__default.FC<ISkeletonText>;

declare const Skeleton: React__default.FC<ISkeleton>;

declare const DetailList: <T extends Record<string, any>>({ title, description, data, items, headerActions, itemActions, }: IDetailListProps<T>) => react_jsx_runtime.JSX.Element;

declare const Form: <T extends FieldValues>({ elements, onSubmit, onInvalidSubmit, outputFormat, id, grid, onChangeSingleValue, onChange, submitButtonProps, onMount, ref, children, animation }: IFormComponent<T>) => react_jsx_runtime.JSX.Element;

declare const Select: <T extends FieldValues>({ element, control, getValues, fieldLogic, }: UseFieldLogicElementProps<T>) => react_jsx_runtime.JSX.Element;

declare const InputText: <T extends FieldValues>({ element, control, getValues, fieldLogic, }: UseFieldLogicElementProps<T>) => react_jsx_runtime.JSX.Element;

/**
 * Renders a number input component.
 * All logic is handled by the useFieldLogic hook, making this a simple, declarative component.
 */
declare const InputNumber: <T extends FieldValues>({ element, control, getValues, fieldLogic, }: UseFieldLogicElementProps<T>) => react_jsx_runtime.JSX.Element;

/**
 * Renders a password input with an optional strength meter.
 * All logic is handled by the useFieldLogic hook.
 */
declare const Password: <T extends FieldValues>({ element, control, getValues, fieldLogic, }: UseFieldLogicElementProps<T>) => react_jsx_runtime.JSX.Element;

/**
 * Renders a group of checkboxes.

 */
declare const Radios: <T extends FieldValues>({ element, control, getValues, fieldLogic, }: UseFieldLogicElementProps<T>) => react_jsx_runtime.JSX.Element;

/**
 * Renders a group of checkboxes.
 */
declare const Checkboxes: <T extends FieldValues>({ element, control, getValues, fieldLogic, }: UseFieldLogicElementProps<T>) => react_jsx_runtime.JSX.Element;

/**
 * Renders a textarea component.

 */
declare const Textarea: <T extends FieldValues>({ element, control, getValues, fieldLogic, }: UseFieldLogicElementProps<T>) => react_jsx_runtime.JSX.Element;

/**
 * Renders a file or image uploader.
 * It uses useFieldLogic for standard field state and useFormContext for form-level
 * configurations like outputFormat and error handling.
 */
declare const FileUploader: <T extends FieldValues>({ element, control, getValues, fieldLogic, }: UseFieldLogicElementProps<T>) => react_jsx_runtime.JSX.Element;

/**
 * Renders a switch (toggle) component.
 */
declare const Switch: <T extends FieldValues>({ element, control, getValues, fieldLogic, }: UseFieldLogicElementProps<T>) => react_jsx_runtime.JSX.Element;

/**
 * Renders a phone number input with auto-detected country flag.
 * Value is an E.164 string (e.g., "+15551234567").
 */
declare const Phone: <T extends FieldValues>({ element, control, getValues, fieldLogic, }: UseFieldLogicElementProps<T>) => react_jsx_runtime.JSX.Element;

export interface ContainerProps<T extends FieldValues> extends UseFieldLogicElementProps<T> {
    parentPath?: string;
}
declare const Container: <T extends FieldValues>({ element, control, groupField, getValues, parentPath, fieldLogic }: ContainerProps<T>) => react_jsx_runtime.JSX.Element;

/**
 * Renders a date picker component.

 */
declare const DateField: <T extends FieldValues>({ element, control, getValues, fieldLogic, }: UseFieldLogicElementProps<T>) => react_jsx_runtime.JSX.Element;

/**
 * Renders a location/address search input.
 * All logic is handled by the useFieldLogic hook, making this a simple, declarative component.
 */
declare const Location: <T extends FieldValues>({ element, control, getValues, fieldLogic, }: UseFieldLogicElementProps<T>) => react_jsx_runtime.JSX.Element;

/**
 * Renders a color picker input.

 */
declare const ColorPicker: <T extends FieldValues>({ element, control, getValues, fieldLogic, }: UseFieldLogicElementProps<T>) => react_jsx_runtime.JSX.Element;

/**
 * Renders a repeatable group of fields (a field array), preserving all the logic
 * for default values, min/max repeats, and custom action buttons.
 */
declare const Group: <T extends FieldValues>({ element, control, getValues, groupField, focusedField, setFocusedField, fieldLogic, }: UseFieldLogicElementProps<T>) => react_jsx_runtime.JSX.Element;

/**
 * Renders a static, non-repeatable group of fields (a nested object).
 * It provides a layout wrapper and recursively renders its children with the correct nested path.
 */
declare const ObjectElement: <T extends FieldValues>({ element, control, getValues, groupField, focusedField, setFocusedField, fieldLogic, }: UseFieldLogicElementProps<T>) => react_jsx_runtime.JSX.Element;

/**
 * Combined element: groups multiple child inputs under one logical field.
 *
 * - Renders a single KitsContainer with one label and one validation error.
 * - Child elements render with `attached: true` (no individual containers/labels).
 * - The parent's value is computed from child values via the `output` template.
 */
declare const CombinedElement: <T extends FieldValues>({ element, control, getValues, groupField, focusedField, setFocusedField, fieldLogic, }: UseFieldLogicElementProps<T>) => react_jsx_runtime.JSX.Element;

/**
 * The core logic engine for an individual form field.
 * This hook replaces LogicContext and FormFieldContext. It watches dependencies,
 * calculates all dynamic properties (visibility, disabled state, required status, etc.),
 * and provides the necessary props from react-hook-form.
 *
 * @param {UseFieldLogicProps<T>} props - The element definition and form control.
 * @returns {UseFieldLogicReturn<T>} An object containing all necessary props and states for rendering the field.
 */
declare const useFieldLogic: <T extends FieldValues>({ element: { onDepsChange, ...element }, control, getValues, isFocused, groupField, watchedValues }: UseFieldLogicProps<T>) => UseFieldLogicReturn<T>;

export interface UseFormManagerReturn<T extends FieldValues> {
    /**
     * The original, unmodified methods returned from react-hook-form's useForm hook.
     * This is what gets passed to the FormProvider.
     */
    formMethods: UseFormReturn<T>;
    /**
     * Our custom loading state for the submit button.
     */
    isSubmitting: boolean;
    /**
     * Our wrapped submit handler that manages the isSubmitting state.
     * This is what the <form> element's onSubmit will call.
     */
    handleSubmit: () => void;
    setIsSubmitting: Dispatch<SetStateAction<boolean>>;
}
declare const useFormManager: <T extends FieldValues>({ elements, onSubmit, onInvalidSubmit, id, onChange, onChangeSingleValue, outputFormat }: IFormComponent<T>, isSubmitting: boolean, setIsSubmitting: Dispatch<SetStateAction<boolean>>) => UseFormManagerReturn<T>;

/**
 * Safely retrieves a nested property from an object using a string path (e.g., "a.b[0].c").
 * This is useful for accessing nested form errors from react-hook-form's formState.
 *
 * @param {object} obj The object to query.
 * @param {string} path The string path to the desired property.
 * @returns {any} The value at the specified path, or undefined if not found.
 */
declare const getPropertyByPath: (obj: Record<string, any>, path: string) => any;
export interface FileValidationProps {
    min?: number;
    max?: number;
    minKB?: number;
    maxKB?: number;
}
/**
 * A custom Yup validation test for file and image uploads.
 *
 * Handles all output shapes produced by KitsFilePicker:
 *   - string URL              — existing server file (defaultValue / initialUri)
 *   - {base64, filename, type}  — JSON output (isJsonOutput=true, native & web)
 *   - {uri, name, type?, size?} — FormData output on native
 *   - DOM File instance         — FormData output on web
 */
declare const formFileValidation: ({ min, max, minKB, maxKB }?: FileValidationProps) => Yup.MixedSchema<any, AnyObject, any>;
/**
 * Recursively checks for duplicate field IDs at each level of the element tree.
 * Throws an error if a duplicate is found.
 * @param fields The array of elements to check.
 */
declare const checkNameDuplication: (fields: IFormElement<any>[]) => void;
/**
 * Recursively builds the initial `defaultValues` object for react-hook-form.
 * @param fields The array of elements to process.
 * @returns An object with the form's default values.
 */
declare const getDefaultValues: (fields: IFormElement<any>[]) => Record<string, any>;
/**
 * Recursively collects the IDs of all child elements inside Combined elements.
 * These IDs are internal to the Combined and should not appear in the form's output data.
 */
declare const getCombinedChildIds: (fields: IFormElement<any>[]) => Set<string>;

/**
 * Recursively builds a Yup validation schema from an array of form element definitions.
 *
 * @param {IFormElement<T>[]} elements - The array of element configurations.
 * @param id
 * @returns {Yup.ObjectSchema<any>} A Yup object schema representing the form structure.
 */
declare const schemaBuilder: <T extends FieldValues>(elements: IFormElement<T>[], id: string) => Yup.ObjectSchema<any>;

declare function dynamicList<T extends FieldValues>(element: IFormElement<T>, watchedValues: any[], allFormValues: T, groupField: GroupFieldConfigs<T>["groupField"], ctx: UseFormReturn<T, any, T>): any[];

declare const TableContext: React$1.Context<IDataTableContextValues<any>>;
declare function useTable<T extends Record<string, any> = any>(): IDataTableContextValues<T>;
declare const sizeMapping: {
    readonly small: "5px";
    readonly normal: "10px";
    readonly large: "15px";
};
declare const fontSizeMapping: {
    readonly small: "13px";
    readonly normal: "16px";
    readonly large: "20px";
};
declare const Datatable: <T extends Record<string, any> = any>(_props: IDataTableProps<T>) => any;

declare const DataViewContext: React__default.Context<IDataViewContextValues>;
declare const DataView: (props: IDataViewProps) => react_jsx_runtime.JSX.Element;

declare const useDataView: () => IDataViewContextValues;

declare const TreeView: <T = any>(props: ITreeViewProps<T>) => react_jsx_runtime.JSX.Element;

declare const AuthLayout: () => any;

declare const LocaleContext: React__default.Context<ILocaleContextValues>;
declare const LocaleContextProvider: FC<PropsWithChildren<ILocaleContextProps>>;

declare const MainContext: React__default.Context<IMainContextValues<any, React__default.JSX.Element>>;
declare function MainContextProvider({ children, theme, kitsTheme, onLogOut, nonAuthRoutes, menuItems, permissions, logo, languages, defaultLanguage, authedRoutes, onChangeLanguage }: PropsWithChildren<IMainContextProps>): react_jsx_runtime.JSX.Element;

export interface KitsThemeProviderProps {
    theme?: KitsThemeOverride;
    children: React__default.ReactNode;
}
declare function KitsThemeProvider({ theme: themeOverride, children }: KitsThemeProviderProps): react_jsx_runtime.JSX.Element;
declare function useKitsTheme(): IKitsThemeContextValues;
/** Returns the resolved native color map for use in style functions */
declare function useNativeColorMap(): Record<string, string>;

declare const ThemeContextProvider: FC<PropsWithChildren<IThemeContextProps>>;

declare const useTheme: () => IThemeContextValues;

export interface Ctx {
    confirm: (props: IConfirmDialogProps) => void;
    confirmPopup: (props: IConfirmPopupProps) => void;
    dialog: (props: IDialogState) => void;
    toast: IToastFunction;
    toastDismiss: (position?: ToastPosition) => void;
    toastDismissAll: () => void;
    alert: (message: React__default.ReactNode, opts?: IConfirmDialogProps) => Promise<void>;
    confirmAsync: (opts: IConfirmDialogProps) => Promise<boolean>;
    prompt: (render: (api: {
        resolve: (v: any) => void;
        reject: () => void;
        hide: () => void;
    }) => React__default.ReactNode, opts?: IConfirmDialogProps) => Promise<any>;
}
declare const usePopup: () => Ctx;
declare const useDialog: () => Ctx;

export type BooleanParams = {
    mode: "boolean";
    value?: boolean;
    defaultValue?: boolean;
    onChange?: (checked: boolean) => void;
};
export type TristateParams = {
    mode: "tristate";
    value?: boolean | null;
    defaultValue?: boolean | null;
    onChange?: (val: boolean | null) => void;
};
export type SingleParams<T> = {
    mode: "single";
    value?: T;
    defaultValue?: T;
    onChange?: (val: T) => void;
    allowDeselect?: boolean;
};
export type MultiParams<T> = {
    mode: "multiple";
    value?: T[];
    defaultValue?: T[];
    onChange?: (val: T[]) => void;
};
export type Params<T> = BooleanParams | TristateParams | SingleParams<T> | MultiParams<T>;
declare function useSelectionController<T = string>(params: Params<T>): {
    mode: "boolean" | "tristate" | "single" | "multiple";
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

declare const useDisclosure: (defaultIsOpen?: boolean) => UseDisclosureReturnType;

export type ScrollDirection = "up" | "down";
export type ScrollState = {
    y: number;
    isScrolled: boolean;
    direction: ScrollDirection;
};

export type Options = {
    threshold?: number;
    target?: any;
};
declare const useScrollState: (options?: Options) => {
    scrollState: ScrollState;
    onScroll: (e: any) => void;
};

declare const useLanguage: () => ILocaleContextValues;

declare const useKitsConcerto: () => IMainContextValues<any, React$1.JSX.Element>;

export interface UseComponentDefaultsResult<T> {
    /** Props with theme defaults merged in (user props always win) */
    mergedProps: T;
    /** CSS style overrides from theme.components[name].style */
    themeStyle: Record<string, any>;
}
/**
 * Merges theme-level component defaults with user-supplied props.
 * Supports base-group inheritance: e.g. `useComponentDefaults('InputNumber', rawProps, 'Input')`
 * merges Input base config first, then InputNumber overrides, then user props.
 *
 * @example
 * function InputNumber(rawProps: IKitsInputNumber) {
 *   const { mergedProps: props, themeStyle } = useComponentDefaults('InputNumber', rawProps, 'Input');
 *   // themeStyle = { ...theme.components.Input.style, ...theme.components.InputNumber.style }
 * }
 */
declare function useComponentDefaults<T extends Record<string, any>>(componentName: string, props: T, baseGroup?: string): UseComponentDefaultsResult<T>;

/**
 * Resolves theme tokens in a style object and maps KitsConcerto
 * CSS prop names to standard React CSSProperties keys.
 *
 * Used by components that don't use ResponsiveElement (e.g. PrimeReact form controls)
 * to apply theme.components[name].style as inline styles.
 */
declare function useResolvedStyle(themeStyle: Record<string, any>): React.CSSProperties;

/**
 * Derives color-related style props from a colorScheme name and optional variant.
 * Returns CSS prop overrides that can be spread into cssProps.
 *
 * @example
 * const colorStyles = useKitsColorScheme('blue', 'solid');
 * // colorStyles = { bgColor: 'blue.500', fontColor: 'white' }
 */
declare function useKitsColorScheme(colorScheme: string | undefined, variant?: 'solid' | 'subtle' | 'outline' | 'ghost'): Partial<IStyleClasses>;

export interface ResolvedSeverityColors {
    solid: string;
    bgTint: string;
    iconFg: string;
    iconBg: string;
    text: string;
    border: string;
}
/**
 * Resolves all severity color slots for a given severity using the current theme.
 * Returns platform-appropriate values (CSS vars on web, hex on native).
 * Handles dark mode by swapping shade levels for subtle tints.
 */
declare function useSeverityColors(severity: Severity): ResolvedSeverityColors;
/**
 * Returns the full resolved map for all severities.
 * Useful when a component needs to look up colors dynamically
 * (e.g., per-button severity in a buttons array).
 */
declare function useAllSeverityColors(): Record<Severity, ResolvedSeverityColors>;

/**
 * Native focus-style helper.
 * Merges `_focus` styles into the computed style object when `isFocused` is true.
 * Returns a React Native ViewStyle object ready for the `style` prop.
 */
declare function useFocusStyles(themeStyle: IStyleClasses | undefined, isFocused: boolean): Partial<react_native.ViewStyle>;

export interface KeyboardNavContextValue {
    register: (id: string, ref: React.RefObject<TextInput | null>) => void;
    unregister: (id: string) => void;
    setElementsOrder: (ids: string[]) => void;
    getNavProps: (id: string) => {
        returnKeyType: 'next' | 'done';
        blurOnSubmit: boolean;
        onSubmitEditing: () => void;
    };
}
declare const KeyboardNavContext: React$1.Context<KeyboardNavContextValue>;
declare const useKeyboardNav: () => KeyboardNavContextValue;
/**
 * Creates the keyboard navigation provider value.
 * Maintains a ref registry and element order to wire up
 * returnKeyType / blurOnSubmit / onSubmitEditing on native TextInputs.
 */
declare function useKeyboardNavProvider(): KeyboardNavContextValue;

/**
 * Convenience hook for native text input molecules.
 * Creates a local TextInput ref, registers it in the KeyboardNavContext,
 * and returns the ref + navigation props to spread on the InputField.
 */
declare function useFormFieldKeyboardNav(id: string | undefined): {
    inputRef: React$1.RefObject<TextInput>;
    navProps: {};
};

declare const isValidURL: (url: string) => boolean;
declare const isNumber: (value: any) => value is number;

declare const getParams: (key: string) => string;

declare const dateTimeFormat: (datetimeValue: string) => string;

declare const downloadCanvas: (content: HTMLCanvasElement, filename: string, type: string) => void;

declare const isToday: (date: moment.Moment) => boolean;
declare const timeAgo: (timestamp: string) => string;
declare const timeSince: (days: number) => string;
declare const getCustomDateTime: (value?: number, unit?: moment.unitOfTime.DurationConstructor, format?: string) => string;
declare const getDateElements: (date: string) => {
    day: string;
    time: string;
    date: true | {
        dateString: string;
        month: string;
        date: string;
        year: string;
    };
};

declare const capitalizeFirstLetter: (str: string) => string;
declare const getURLParams: (getKey: string) => string;

declare const AnyFile: {
    parts: (fileName: string) => {
        name: string;
        ext: string;
    };
    ext: (fileName: string) => string;
    shortName: (fileName: string, startLength?: number, endLength?: number) => string;
};

export type PossibleRef<T> = Ref<T> | undefined | null;
/**
 * Merges multiple React refs into a single ref callback.
 * Useful when a component needs both a local ref and a forwarded ref
 * pointing to the same DOM/native element.
 */
declare function mergeRefs<T>(...refs: PossibleRef<T>[]): RefCallback<T>;

declare const localeFiles: {
    ar: {
        startsWith: string;
        contains: string;
        notContains: string;
        endsWith: string;
        equals: string;
        notEquals: string;
        noFilter: string;
        filter: string;
        lt: string;
        lte: string;
        gt: string;
        gte: string;
        dateIs: string;
        dateIsNot: string;
        dateBefore: string;
        dateAfter: string;
        custom: string;
        clear: string;
        apply: string;
        matchAll: string;
        matchAny: string;
        addRule: string;
        removeRule: string;
        accept: string;
        reject: string;
        choose: string;
        upload: string;
        cancel: string;
        completed: string;
        pending: string;
        fileSizeTypes: string[];
        dayNames: string[];
        dayNamesShort: string[];
        dayNamesMin: string[];
        monthNames: string[];
        monthNamesShort: string[];
        chooseYear: string;
        chooseMonth: string;
        chooseDate: string;
        prevDecade: string;
        nextDecade: string;
        prevYear: string;
        nextYear: string;
        prevMonth: string;
        nextMonth: string;
        prevHour: string;
        nextHour: string;
        prevMinute: string;
        nextMinute: string;
        prevSecond: string;
        nextSecond: string;
        am: string;
        pm: string;
        today: string;
        now: string;
        weekHeader: string;
        firstDayOfWeek: number;
        showMonthAfterYear: boolean;
        dateFormat: string;
        weak: string;
        medium: string;
        strong: string;
        passwordPrompt: string;
        emptyFilterMessage: string;
        searchMessage: string;
        selectionMessage: string;
        emptySelectionMessage: string;
        emptySearchMessage: string;
        emptyMessage: string;
        emptyFileUploadMessage: string;
        password: string;
        openMenu: string;
        toggleColorMode: string;
        signOut: string;
        profile: string;
        filesSelected: string;
        dragFilesHere: string;
        filesBeingDropped: string;
        typeNotSupported: string;
        maximumAllowedFiles: string;
        remove: string;
        edit: string;
        save: string;
        generatePhoto: string;
        settings: string;
        addCategory: string;
        addItem: string;
        delete: string;
        any: string;
        chooseFile: string;
        greaterThan: string;
        greaterThanOrEqualTo: string;
        lessThan: string;
        lessThanOrEqualTo: string;
        between: string;
        include: string;
        equal: string;
        after: string;
        before: string;
        not: string;
        aria: {
            trueLabel: string;
            falseLabel: string;
            nullLabel: string;
            star: string;
            stars: string;
            selectAll: string;
            unselectAll: string;
            close: string;
            previous: string;
            next: string;
            navigation: string;
            scrollTop: string;
            moveTop: string;
            moveUp: string;
            moveDown: string;
            moveBottom: string;
            moveToTarget: string;
            moveToSource: string;
            moveAllToTarget: string;
            moveAllToSource: string;
            pageLabel: string;
            firstPageLabel: string;
            lastPageLabel: string;
            nextPageLabel: string;
            previousPageLabel: string;
            rowsPerPageLabel: string;
            jumpToPageDropdownLabel: string;
            jumpToPageInputLabel: string;
            selectRow: string;
            unselectRow: string;
            expandRow: string;
            collapseRow: string;
            showFilterMenu: string;
            hideFilterMenu: string;
            filterOperator: string;
            filterConstraint: string;
            editRow: string;
            saveEdit: string;
            cancelEdit: string;
            listView: string;
            gridView: string;
            slide: string;
            slideNumber: string;
            zoomImage: string;
            zoomIn: string;
            zoomOut: string;
            rotateRight: string;
            rotateLeft: string;
        };
    };
    bg: {
        accept: string;
        reject: string;
        choose: string;
        upload: string;
        cancel: string;
        dayNames: string[];
        dayNamesShort: string[];
        dayNamesMin: string[];
        monthNames: string[];
        monthNamesShort: string[];
        today: string;
        clear: string;
        weekHeader: string;
        firstDayOfWeek: number;
        showMonthAfterYear: boolean;
        dateFormat: string;
        weak: string;
        medium: string;
        strong: string;
        passwordPrompt: string;
        startsWith: string;
        contains: string;
        notContains: string;
        endsWith: string;
        equals: string;
        notEquals: string;
        noFilter: string;
        lt: string;
        lte: string;
        gt: string;
        gte: string;
        dateIs: string;
        dateIsNot: string;
        dateBefore: string;
        dateAfter: string;
        custom: string;
        apply: string;
        matchAll: string;
        matchAny: string;
        addRule: string;
        removeRule: string;
        emptyFilterMessage: string;
        emptyMessage: string;
    };
    ca: {
        startsWith: string;
        contains: string;
        notContains: string;
        endsWith: string;
        equals: string;
        notEquals: string;
        noFilter: string;
        lt: string;
        lte: string;
        gt: string;
        gte: string;
        dateIs: string;
        dateIsNot: string;
        dateBefore: string;
        dateAfter: string;
        custom: string;
        clear: string;
        apply: string;
        matchAll: string;
        matchAny: string;
        addRule: string;
        removeRule: string;
        accept: string;
        reject: string;
        choose: string;
        upload: string;
        cancel: string;
        fileSizeTypes: string[];
        dayNames: string[];
        dayNamesShort: string[];
        dayNamesMin: string[];
        monthNames: string[];
        monthNamesShort: string[];
        today: string;
        now: string;
        weekHeader: string;
        firstDayOfWeek: number;
        showMonthAfterYear: boolean;
        dateFormat: string;
        weak: string;
        medium: string;
        strong: string;
        passwordPrompt: string;
        emptyFilterMessage: string;
        emptyMessage: string;
        openMenu: string;
        toggleColorMode: string;
        signOut: string;
        profile: string;
        filesSelected: string;
        dragFilesHere: string;
        filesBeingDropped: string;
        typeNotSupported: string;
        maximumAllowedFiles: string;
        remove: string;
        edit: string;
        save: string;
        generatePhoto: string;
        settings: string;
        addCategory: string;
        addItem: string;
        delete: string;
        any: string;
        chooseFile: string;
        greaterThan: string;
        greaterThanOrEqualTo: string;
        lessThan: string;
        lessThanOrEqualTo: string;
        between: string;
        include: string;
        equal: string;
        after: string;
        before: string;
        not: string;
        aria: {
            trueLabel: string;
            falseLabel: string;
            nullLabel: string;
            star: string;
            stars: string;
            selectAll: string;
            unselectAll: string;
            close: string;
            previous: string;
            next: string;
            navigation: string;
            scrollTop: string;
            moveTop: string;
            moveUp: string;
            moveDown: string;
            moveBottom: string;
            moveToTarget: string;
            moveToSource: string;
            moveAllToTarget: string;
            moveAllToSource: string;
            pageLabel: string;
            firstPageLabel: string;
            lastPageLabel: string;
            nextPageLabel: string;
            previousPageLabel: string;
            rowsPerPageLabel: string;
            jumpToPageDropdownLabel: string;
            jumpToPageInputLabel: string;
            selectRow: string;
            unselectRow: string;
            expandRow: string;
            collapseRow: string;
            showFilterMenu: string;
            hideFilterMenu: string;
            filterOperator: string;
            filterConstraint: string;
            editRow: string;
            saveEdit: string;
            cancelEdit: string;
            listView: string;
            gridView: string;
            slide: string;
            slideNumber: string;
            zoomImage: string;
            zoomIn: string;
            zoomOut: string;
            rotateRight: string;
            rotateLeft: string;
        };
    };
    cs: {
        startsWith: string;
        contains: string;
        notContains: string;
        endsWith: string;
        equals: string;
        notEquals: string;
        noFilter: string;
        filter: string;
        lt: string;
        lte: string;
        gt: string;
        gte: string;
        dateIs: string;
        dateIsNot: string;
        dateBefore: string;
        dateAfter: string;
        custom: string;
        clear: string;
        apply: string;
        matchAll: string;
        matchAny: string;
        addRule: string;
        removeRule: string;
        accept: string;
        reject: string;
        choose: string;
        upload: string;
        cancel: string;
        completed: string;
        pending: string;
        dayNames: string[];
        dayNamesShort: string[];
        dayNamesMin: string[];
        monthNames: string[];
        monthNamesShort: string[];
        chooseYear: string;
        chooseMonth: string;
        chooseDate: string;
        prevDecade: string;
        nextDecade: string;
        prevYear: string;
        nextYear: string;
        prevMonth: string;
        nextMonth: string;
        prevHour: string;
        nextHour: string;
        prevMinute: string;
        nextMinute: string;
        prevSecond: string;
        nextSecond: string;
        am: string;
        pm: string;
        today: string;
        weekHeader: string;
        firstDayOfWeek: number;
        showMonthAfterYear: boolean;
        dateFormat: string;
        weak: string;
        medium: string;
        strong: string;
        passwordPrompt: string;
        emptyFilterMessage: string;
        searchMessage: string;
        selectionMessage: string;
        emptySelectionMessage: string;
        emptySearchMessage: string;
        emptyMessage: string;
        openMenu: string;
        toggleColorMode: string;
        signOut: string;
        profile: string;
        filesSelected: string;
        dragFilesHere: string;
        filesBeingDropped: string;
        typeNotSupported: string;
        maximumAllowedFiles: string;
        remove: string;
        edit: string;
        save: string;
        generatePhoto: string;
        settings: string;
        addCategory: string;
        addItem: string;
        delete: string;
        any: string;
        chooseFile: string;
        greaterThan: string;
        greaterThanOrEqualTo: string;
        lessThan: string;
        lessThanOrEqualTo: string;
        between: string;
        include: string;
        equal: string;
        after: string;
        before: string;
        not: string;
        aria: {
            trueLabel: string;
            falseLabel: string;
            nullLabel: string;
            star: string;
            stars: string;
            selectAll: string;
            unselectAll: string;
            close: string;
            previous: string;
            next: string;
            navigation: string;
            scrollTop: string;
            moveTop: string;
            moveUp: string;
            moveDown: string;
            moveBottom: string;
            moveToTarget: string;
            moveToSource: string;
            moveAllToTarget: string;
            moveAllToSource: string;
            pageLabel: string;
            firstPageLabel: string;
            lastPageLabel: string;
            nextPageLabel: string;
            previousPageLabel: string;
            rowsPerPageLabel: string;
            jumpToPageDropdownLabel: string;
            jumpToPageInputLabel: string;
            selectRow: string;
            unselectRow: string;
            expandRow: string;
            collapseRow: string;
            showFilterMenu: string;
            hideFilterMenu: string;
            filterOperator: string;
            filterConstraint: string;
            editRow: string;
            saveEdit: string;
            cancelEdit: string;
            listView: string;
            gridView: string;
            slide: string;
            slideNumber: string;
            zoomImage: string;
            zoomIn: string;
            zoomOut: string;
            rotateRight: string;
            rotateLeft: string;
        };
    };
    da: {
        startsWith: string;
        contains: string;
        notContains: string;
        endsWith: string;
        equals: string;
        notEquals: string;
        noFilter: string;
        filter: string;
        lt: string;
        lte: string;
        gt: string;
        gte: string;
        dateIs: string;
        dateIsNot: string;
        dateBefore: string;
        dateAfter: string;
        custom: string;
        clear: string;
        apply: string;
        matchAll: string;
        matchAny: string;
        addRule: string;
        removeRule: string;
        accept: string;
        reject: string;
        choose: string;
        upload: string;
        cancel: string;
        completed: string;
        pending: string;
        dayNames: string[];
        dayNamesShort: string[];
        dayNamesMin: string[];
        monthNames: string[];
        monthNamesShort: string[];
        chooseYear: string;
        chooseMonth: string;
        chooseDate: string;
        prevDecade: string;
        nextDecade: string;
        prevYear: string;
        nextYear: string;
        prevMonth: string;
        nextMonth: string;
        prevHour: string;
        nextHour: string;
        prevMinute: string;
        nextMinute: string;
        prevSecond: string;
        nextSecond: string;
        am: string;
        pm: string;
        today: string;
        weekHeader: string;
        firstDayOfWeek: number;
        showMonthAfterYear: boolean;
        dateFormat: string;
        weak: string;
        medium: string;
        strong: string;
        passwordPrompt: string;
        emptyFilterMessage: string;
        searchMessage: string;
        selectionMessage: string;
        emptySelectionMessage: string;
        emptySearchMessage: string;
        emptyMessage: string;
        openMenu: string;
        toggleColorMode: string;
        signOut: string;
        profile: string;
        filesSelected: string;
        dragFilesHere: string;
        filesBeingDropped: string;
        typeNotSupported: string;
        maximumAllowedFiles: string;
        remove: string;
        edit: string;
        save: string;
        generatePhoto: string;
        settings: string;
        addCategory: string;
        addItem: string;
        delete: string;
        any: string;
        chooseFile: string;
        greaterThan: string;
        greaterThanOrEqualTo: string;
        lessThan: string;
        lessThanOrEqualTo: string;
        between: string;
        include: string;
        equal: string;
        after: string;
        before: string;
        not: string;
        aria: {
            trueLabel: string;
            falseLabel: string;
            nullLabel: string;
            star: string;
            stars: string;
            selectAll: string;
            unselectAll: string;
            close: string;
            previous: string;
            next: string;
            navigation: string;
            scrollTop: string;
            moveTop: string;
            moveUp: string;
            moveDown: string;
            moveBottom: string;
            moveToTarget: string;
            moveToSource: string;
            moveAllToTarget: string;
            moveAllToSource: string;
            pageLabel: string;
            firstPageLabel: string;
            lastPageLabel: string;
            nextPageLabel: string;
            previousPageLabel: string;
            rowsPerPageLabel: string;
            jumpToPageDropdownLabel: string;
            jumpToPageInputLabel: string;
            selectRow: string;
            unselectRow: string;
            expandRow: string;
            collapseRow: string;
            showFilterMenu: string;
            hideFilterMenu: string;
            filterOperator: string;
            filterConstraint: string;
            editRow: string;
            saveEdit: string;
            cancelEdit: string;
            listView: string;
            gridView: string;
            slide: string;
            slideNumber: string;
            zoomImage: string;
            zoomIn: string;
            zoomOut: string;
            rotateRight: string;
            rotateLeft: string;
        };
    };
    de: {
        startsWith: string;
        contains: string;
        notContains: string;
        endsWith: string;
        equals: string;
        notEquals: string;
        noFilter: string;
        filter: string;
        lt: string;
        lte: string;
        gt: string;
        gte: string;
        dateIs: string;
        dateIsNot: string;
        dateBefore: string;
        dateAfter: string;
        custom: string;
        clear: string;
        apply: string;
        matchAll: string;
        matchAny: string;
        addRule: string;
        removeRule: string;
        accept: string;
        reject: string;
        choose: string;
        upload: string;
        cancel: string;
        completed: string;
        pending: string;
        dayNames: string[];
        dayNamesShort: string[];
        dayNamesMin: string[];
        monthNames: string[];
        monthNamesShort: string[];
        chooseYear: string;
        chooseMonth: string;
        chooseDate: string;
        prevDecade: string;
        nextDecade: string;
        prevYear: string;
        nextYear: string;
        prevMonth: string;
        nextMonth: string;
        prevHour: string;
        nextHour: string;
        prevMinute: string;
        nextMinute: string;
        prevSecond: string;
        nextSecond: string;
        am: string;
        pm: string;
        today: string;
        now: string;
        weekHeader: string;
        firstDayOfWeek: number;
        showMonthAfterYear: boolean;
        dateFormat: string;
        weak: string;
        medium: string;
        strong: string;
        passwordPrompt: string;
        emptyFilterMessage: string;
        searchMessage: string;
        selectionMessage: string;
        emptySelectionMessage: string;
        emptySearchMessage: string;
        emptyMessage: string;
        openMenu: string;
        toggleColorMode: string;
        signOut: string;
        profile: string;
        filesSelected: string;
        dragFilesHere: string;
        filesBeingDropped: string;
        typeNotSupported: string;
        maximumAllowedFiles: string;
        remove: string;
        edit: string;
        save: string;
        generatePhoto: string;
        settings: string;
        addCategory: string;
        addItem: string;
        delete: string;
        any: string;
        chooseFile: string;
        greaterThan: string;
        greaterThanOrEqualTo: string;
        lessThan: string;
        lessThanOrEqualTo: string;
        between: string;
        include: string;
        equal: string;
        after: string;
        before: string;
        not: string;
        aria: {
            trueLabel: string;
            falseLabel: string;
            nullLabel: string;
            star: string;
            stars: string;
            selectAll: string;
            unselectAll: string;
            close: string;
            previous: string;
            next: string;
            navigation: string;
            scrollTop: string;
            moveTop: string;
            moveUp: string;
            moveDown: string;
            moveBottom: string;
            moveToTarget: string;
            moveToSource: string;
            moveAllToTarget: string;
            moveAllToSource: string;
            pageLabel: string;
            firstPageLabel: string;
            lastPageLabel: string;
            nextPageLabel: string;
            previousPageLabel: string;
            rowsPerPageLabel: string;
            jumpToPageDropdownLabel: string;
            jumpToPageInputLabel: string;
            selectRow: string;
            unselectRow: string;
            expandRow: string;
            collapseRow: string;
            showFilterMenu: string;
            hideFilterMenu: string;
            filterOperator: string;
            filterConstraint: string;
            editRow: string;
            saveEdit: string;
            cancelEdit: string;
            listView: string;
            gridView: string;
            slide: string;
            slideNumber: string;
            zoomImage: string;
            zoomIn: string;
            zoomOut: string;
            rotateRight: string;
            rotateLeft: string;
        };
    };
    en: {
        startsWith: string;
        contains: string;
        notContains: string;
        endsWith: string;
        equals: string;
        notEquals: string;
        noFilter: string;
        filter: string;
        lt: string;
        lte: string;
        gt: string;
        gte: string;
        dateIs: string;
        dateIsNot: string;
        dateBefore: string;
        dateAfter: string;
        custom: string;
        clear: string;
        apply: string;
        matchAll: string;
        matchAny: string;
        addRule: string;
        removeRule: string;
        accept: string;
        reject: string;
        choose: string;
        upload: string;
        cancel: string;
        completed: string;
        pending: string;
        fileSizeTypes: string[];
        dayNames: string[];
        dayNamesShort: string[];
        dayNamesMin: string[];
        monthNames: string[];
        monthNamesShort: string[];
        chooseYear: string;
        chooseMonth: string;
        chooseDate: string;
        prevDecade: string;
        nextDecade: string;
        prevYear: string;
        nextYear: string;
        prevMonth: string;
        nextMonth: string;
        prevHour: string;
        nextHour: string;
        prevMinute: string;
        nextMinute: string;
        prevSecond: string;
        nextSecond: string;
        am: string;
        pm: string;
        today: string;
        now: string;
        weekHeader: string;
        firstDayOfWeek: number;
        showMonthAfterYear: boolean;
        dateFormat: string;
        weak: string;
        medium: string;
        strong: string;
        passwordPrompt: string;
        emptyFilterMessage: string;
        searchMessage: string;
        selectionMessage: string;
        emptySelectionMessage: string;
        emptySearchMessage: string;
        emptyMessage: string;
        emptyFileUploadMessage: string;
        password: string;
        openMenu: string;
        toggleColorMode: string;
        signOut: string;
        profile: string;
        filesSelected: string;
        dragFilesHere: string;
        filesBeingDropped: string;
        typeNotSupported: string;
        maximumAllowedFiles: string;
        remove: string;
        edit: string;
        save: string;
        generatePhoto: string;
        settings: string;
        addCategory: string;
        addItem: string;
        delete: string;
        any: string;
        chooseFile: string;
        greaterThan: string;
        greaterThanOrEqualTo: string;
        lessThan: string;
        lessThanOrEqualTo: string;
        between: string;
        include: string;
        equal: string;
        after: string;
        before: string;
        not: string;
        aria: {
            trueLabel: string;
            falseLabel: string;
            nullLabel: string;
            star: string;
            stars: string;
            selectAll: string;
            unselectAll: string;
            close: string;
            previous: string;
            next: string;
            navigation: string;
            scrollTop: string;
            moveTop: string;
            moveUp: string;
            moveDown: string;
            moveBottom: string;
            moveToTarget: string;
            moveToSource: string;
            moveAllToTarget: string;
            moveAllToSource: string;
            pageLabel: string;
            firstPageLabel: string;
            lastPageLabel: string;
            nextPageLabel: string;
            previousPageLabel: string;
            rowsPerPageLabel: string;
            jumpToPageDropdownLabel: string;
            jumpToPageInputLabel: string;
            selectRow: string;
            unselectRow: string;
            expandRow: string;
            collapseRow: string;
            showFilterMenu: string;
            hideFilterMenu: string;
            filterOperator: string;
            filterConstraint: string;
            editRow: string;
            saveEdit: string;
            cancelEdit: string;
            listView: string;
            gridView: string;
            slide: string;
            slideNumber: string;
            zoomImage: string;
            zoomIn: string;
            zoomOut: string;
            rotateRight: string;
            rotateLeft: string;
        };
    };
    es: {
        startsWith: string;
        contains: string;
        notContains: string;
        endsWith: string;
        equals: string;
        notEquals: string;
        noFilter: string;
        lt: string;
        lte: string;
        gt: string;
        gte: string;
        dateIs: string;
        dateIsNot: string;
        dateBefore: string;
        dateAfter: string;
        custom: string;
        clear: string;
        apply: string;
        matchAll: string;
        matchAny: string;
        addRule: string;
        removeRule: string;
        accept: string;
        reject: string;
        choose: string;
        upload: string;
        cancel: string;
        fileSizeTypes: string[];
        dayNames: string[];
        dayNamesShort: string[];
        dayNamesMin: string[];
        monthNames: string[];
        monthNamesShort: string[];
        today: string;
        now: string;
        weekHeader: string;
        firstDayOfWeek: number;
        showMonthAfterYear: boolean;
        dateFormat: string;
        weak: string;
        medium: string;
        strong: string;
        passwordPrompt: string;
        emptyFilterMessage: string;
        emptyMessage: string;
        openMenu: string;
        toggleColorMode: string;
        signOut: string;
        profile: string;
        filesSelected: string;
        dragFilesHere: string;
        filesBeingDropped: string;
        typeNotSupported: string;
        maximumAllowedFiles: string;
        remove: string;
        edit: string;
        save: string;
        generatePhoto: string;
        settings: string;
        addCategory: string;
        addItem: string;
        delete: string;
        any: string;
        chooseFile: string;
        greaterThan: string;
        greaterThanOrEqualTo: string;
        lessThan: string;
        lessThanOrEqualTo: string;
        between: string;
        include: string;
        equal: string;
        after: string;
        before: string;
        not: string;
        aria: {
            trueLabel: string;
            falseLabel: string;
            nullLabel: string;
            star: string;
            stars: string;
            selectAll: string;
            unselectAll: string;
            close: string;
            previous: string;
            next: string;
            navigation: string;
            scrollTop: string;
            moveTop: string;
            moveUp: string;
            moveDown: string;
            moveBottom: string;
            moveToTarget: string;
            moveToSource: string;
            moveAllToTarget: string;
            moveAllToSource: string;
            pageLabel: string;
            firstPageLabel: string;
            lastPageLabel: string;
            nextPageLabel: string;
            previousPageLabel: string;
            rowsPerPageLabel: string;
            jumpToPageDropdownLabel: string;
            jumpToPageInputLabel: string;
            selectRow: string;
            unselectRow: string;
            expandRow: string;
            collapseRow: string;
            showFilterMenu: string;
            hideFilterMenu: string;
            filterOperator: string;
            filterConstraint: string;
            editRow: string;
            saveEdit: string;
            cancelEdit: string;
            listView: string;
            gridView: string;
            slide: string;
            slideNumber: string;
            zoomImage: string;
            zoomIn: string;
            zoomOut: string;
            rotateRight: string;
            rotateLeft: string;
        };
    };
    fa: {
        accept: string;
        reject: string;
        choose: string;
        upload: string;
        cancel: string;
        dayNames: string[];
        dayNamesShort: string[];
        dayNamesMin: string[];
        monthNames: string[];
        monthNamesShort: string[];
        today: string;
        clear: string;
        weekHeader: string;
        firstDayOfWeek: number;
        showMonthAfterYear: boolean;
        dateFormat: string;
        weak: string;
        medium: string;
        strong: string;
        passwordPrompt: string;
        startsWith: string;
        contains: string;
        notContains: string;
        endsWith: string;
        equals: string;
        notEquals: string;
        noFilter: string;
        filter: string;
        lt: string;
        lte: string;
        gt: string;
        gte: string;
        dateIs: string;
        dateIsNot: string;
        dateBefore: string;
        dateAfter: string;
        custom: string;
        apply: string;
        matchAll: string;
        matchAny: string;
        addRule: string;
        removeRule: string;
        completed: string;
        pending: string;
        chooseYear: string;
        chooseMonth: string;
        chooseDate: string;
        prevDecade: string;
        nextDecade: string;
        prevYear: string;
        nextYear: string;
        prevMonth: string;
        nextMonth: string;
        prevHour: string;
        nextHour: string;
        prevMinute: string;
        nextMinute: string;
        prevSecond: string;
        nextSecond: string;
        am: string;
        pm: string;
        emptyFilterMessage: string;
        searchMessage: string;
        selectionMessage: string;
        emptySelectionMessage: string;
        emptySearchMessage: string;
        emptyMessage: string;
        openMenu: string;
        toggleColorMode: string;
        signOut: string;
        profile: string;
        filesSelected: string;
        dragFilesHere: string;
        filesBeingDropped: string;
        typeNotSupported: string;
        maximumAllowedFiles: string;
        remove: string;
        edit: string;
        save: string;
        generatePhoto: string;
        settings: string;
        addCategory: string;
        addItem: string;
        delete: string;
        any: string;
        chooseFile: string;
        greaterThan: string;
        greaterThanOrEqualTo: string;
        lessThan: string;
        lessThanOrEqualTo: string;
        between: string;
        include: string;
        equal: string;
        after: string;
        before: string;
        not: string;
        aria: {
            trueLabel: string;
            falseLabel: string;
            nullLabel: string;
            star: string;
            stars: string;
            selectAll: string;
            unselectAll: string;
            close: string;
            previous: string;
            next: string;
            navigation: string;
            scrollTop: string;
            moveTop: string;
            moveUp: string;
            moveDown: string;
            moveBottom: string;
            moveToTarget: string;
            moveToSource: string;
            moveAllToTarget: string;
            moveAllToSource: string;
            pageLabel: string;
            firstPageLabel: string;
            lastPageLabel: string;
            nextPageLabel: string;
            previousPageLabel: string;
            rowsPerPageLabel: string;
            jumpToPageDropdownLabel: string;
            jumpToPageInputLabel: string;
            selectRow: string;
            unselectRow: string;
            expandRow: string;
            collapseRow: string;
            showFilterMenu: string;
            hideFilterMenu: string;
            filterOperator: string;
            filterConstraint: string;
            editRow: string;
            saveEdit: string;
            cancelEdit: string;
            listView: string;
            gridView: string;
            slide: string;
            slideNumber: string;
            zoomImage: string;
            zoomIn: string;
            zoomOut: string;
            rotateRight: string;
            rotateLeft: string;
        };
    };
    fi: {
        startsWith: string;
        contains: string;
        notContains: string;
        endsWith: string;
        equals: string;
        notEquals: string;
        noFilter: string;
        lt: string;
        lte: string;
        gt: string;
        gte: string;
        dateIs: string;
        dateIsNot: string;
        dateBefore: string;
        dateAfter: string;
        custom: string;
        clear: string;
        apply: string;
        matchAll: string;
        matchAny: string;
        addRule: string;
        removeRule: string;
        accept: string;
        reject: string;
        choose: string;
        upload: string;
        cancel: string;
        dayNames: string[];
        dayNamesShort: string[];
        dayNamesMin: string[];
        monthNames: string[];
        monthNamesShort: string[];
        chooseYear: string;
        chooseMonth: string;
        chooseDate: string;
        prevDecade: string;
        nextDecade: string;
        prevYear: string;
        nextYear: string;
        prevMonth: string;
        nextMonth: string;
        prevHour: string;
        nextHour: string;
        prevMinute: string;
        nextMinute: string;
        prevSecond: string;
        nextSecond: string;
        am: string;
        pm: string;
        today: string;
        now: string;
        weekHeader: string;
        firstDayOfWeek: number;
        showMonthAfterYear: boolean;
        dateFormat: string;
        weak: string;
        medium: string;
        strong: string;
        passwordPrompt: string;
        emptyFilterMessage: string;
        searchMessage: string;
        selectionMessage: string;
        emptySelectionMessage: string;
        emptySearchMessage: string;
        emptyMessage: string;
        openMenu: string;
        toggleColorMode: string;
        signOut: string;
        profile: string;
        filesSelected: string;
        dragFilesHere: string;
        filesBeingDropped: string;
        typeNotSupported: string;
        maximumAllowedFiles: string;
        remove: string;
        edit: string;
        save: string;
        generatePhoto: string;
        settings: string;
        addCategory: string;
        addItem: string;
        delete: string;
        any: string;
        chooseFile: string;
        greaterThan: string;
        greaterThanOrEqualTo: string;
        lessThan: string;
        lessThanOrEqualTo: string;
        between: string;
        include: string;
        equal: string;
        after: string;
        before: string;
        not: string;
        aria: {
            trueLabel: string;
            falseLabel: string;
            nullLabel: string;
            star: string;
            stars: string;
            selectAll: string;
            unselectAll: string;
            close: string;
            previous: string;
            next: string;
            navigation: string;
            scrollTop: string;
            moveTop: string;
            moveUp: string;
            moveDown: string;
            moveBottom: string;
            moveToTarget: string;
            moveToSource: string;
            pageLabel: string;
            firstPageLabel: string;
            lastPageLabel: string;
            nextPageLabel: string;
            prevPageLabel: string;
            rowsPerPageLabel: string;
            jumpToPageDropdownLabel: string;
            jumpToPageInputLabel: string;
            selectRow: string;
            unselectRow: string;
            expandRow: string;
            collapseRow: string;
            showFilterMenu: string;
            hideFilterMenu: string;
            filterOperator: string;
            filterConstraint: string;
            editRow: string;
            saveEdit: string;
            cancelEdit: string;
            listView: string;
            gridView: string;
            slide: string;
            slideNumber: string;
            zoomImage: string;
            zoomIn: string;
            zoomOut: string;
            rotateRight: string;
            rotateLeft: string;
        };
    };
    fr: {
        startsWith: string;
        contains: string;
        notContains: string;
        endsWith: string;
        equals: string;
        notEquals: string;
        noFilter: string;
        filter: string;
        lt: string;
        lte: string;
        gt: string;
        gte: string;
        dateIs: string;
        dateIsNot: string;
        dateBefore: string;
        dateAfter: string;
        custom: string;
        clear: string;
        apply: string;
        matchAll: string;
        matchAny: string;
        addRule: string;
        removeRule: string;
        accept: string;
        reject: string;
        choose: string;
        upload: string;
        cancel: string;
        completed: string;
        pending: string;
        fileSizeTypes: string[];
        dayNames: string[];
        dayNamesShort: string[];
        dayNamesMin: string[];
        monthNames: string[];
        monthNamesShort: string[];
        chooseYear: string;
        chooseMonth: string;
        chooseDate: string;
        prevDecade: string;
        nextDecade: string;
        prevYear: string;
        nextYear: string;
        prevMonth: string;
        nextMonth: string;
        prevHour: string;
        nextHour: string;
        prevMinute: string;
        nextMinute: string;
        prevSecond: string;
        nextSecond: string;
        am: string;
        pm: string;
        today: string;
        now: string;
        weekHeader: string;
        firstDayOfWeek: number;
        showMonthAfterYear: boolean;
        dateFormat: string;
        weak: string;
        medium: string;
        strong: string;
        passwordPrompt: string;
        emptyFilterMessage: string;
        searchMessage: string;
        selectionMessage: string;
        emptySelectionMessage: string;
        emptySearchMessage: string;
        emptyMessage: string;
        openMenu: string;
        toggleColorMode: string;
        signOut: string;
        profile: string;
        filesSelected: string;
        dragFilesHere: string;
        filesBeingDropped: string;
        typeNotSupported: string;
        maximumAllowedFiles: string;
        remove: string;
        edit: string;
        save: string;
        generatePhoto: string;
        settings: string;
        addCategory: string;
        addItem: string;
        delete: string;
        any: string;
        chooseFile: string;
        greaterThan: string;
        greaterThanOrEqualTo: string;
        lessThan: string;
        lessThanOrEqualTo: string;
        between: string;
        include: string;
        equal: string;
        after: string;
        before: string;
        not: string;
        aria: {
            trueLabel: string;
            falseLabel: string;
            nullLabel: string;
            star: string;
            stars: string;
            selectAll: string;
            unselectAll: string;
            close: string;
            previous: string;
            next: string;
            navigation: string;
            scrollTop: string;
            moveTop: string;
            moveUp: string;
            moveDown: string;
            moveBottom: string;
            moveToTarget: string;
            moveToSource: string;
            moveAllToTarget: string;
            moveAllToSource: string;
            pageLabel: string;
            firstPageLabel: string;
            lastPageLabel: string;
            nextPageLabel: string;
            rowsPerPageLabel: string;
            previousPageLabel: string;
            jumpToPageDropdownLabel: string;
            jumpToPageInputLabel: string;
            selectRow: string;
            unselectRow: string;
            expandRow: string;
            collapseRow: string;
            showFilterMenu: string;
            hideFilterMenu: string;
            filterOperator: string;
            filterConstraint: string;
            editRow: string;
            saveEdit: string;
            cancelEdit: string;
            listView: string;
            gridView: string;
            slide: string;
            slideNumber: string;
            zoomImage: string;
            zoomIn: string;
            zoomOut: string;
            rotateRight: string;
            rotateLeft: string;
        };
    };
    gr: {
        startsWith: string;
        contains: string;
        notContains: string;
        endsWith: string;
        equals: string;
        notEquals: string;
        noFilter: string;
        lt: string;
        lte: string;
        gt: string;
        gte: string;
        dateIs: string;
        dateIsNot: string;
        dateBefore: string;
        dateAfter: string;
        custom: string;
        clear: string;
        apply: string;
        matchAll: string;
        matchAny: string;
        addRule: string;
        removeRule: string;
        accept: string;
        reject: string;
        choose: string;
        upload: string;
        cancel: string;
        dayNames: string[];
        dayNamesShort: string[];
        dayNamesMin: string[];
        monthNames: string[];
        monthNamesShort: string[];
        today: string;
        weekHeader: string;
        firstDayOfWeek: number;
        showMonthAfterYear: boolean;
        dateFormat: string;
        weak: string;
        medium: string;
        strong: string;
        passwordPrompt: string;
        emptyFilterMessage: string;
        emptyMessage: string;
        openMenu: string;
        toggleColorMode: string;
        signOut: string;
        profile: string;
        filesSelected: string;
        dragFilesHere: string;
        filesBeingDropped: string;
        typeNotSupported: string;
        maximumAllowedFiles: string;
        remove: string;
        edit: string;
        save: string;
        generatePhoto: string;
        settings: string;
        addCategory: string;
        addItem: string;
        delete: string;
        any: string;
        chooseFile: string;
        greaterThan: string;
        greaterThanOrEqualTo: string;
        lessThan: string;
        lessThanOrEqualTo: string;
        between: string;
        include: string;
        equal: string;
        after: string;
        before: string;
        not: string;
        aria: {
            close: string;
            previous: string;
            next: string;
            trueLabel: string;
            falseLabel: string;
            nullLabel: string;
            pageLabel: string;
            firstPageLabel: string;
            lastPageLabel: string;
            nextPageLabel: string;
            previousPageLabel: string;
        };
    };
    he: {
        startsWith: string;
        contains: string;
        notContains: string;
        endsWith: string;
        equals: string;
        notEquals: string;
        noFilter: string;
        filter: string;
        lt: string;
        lte: string;
        gt: string;
        gte: string;
        dateIs: string;
        dateIsNot: string;
        dateBefore: string;
        dateAfter: string;
        custom: string;
        clear: string;
        apply: string;
        matchAll: string;
        matchAny: string;
        addRule: string;
        removeRule: string;
        accept: string;
        reject: string;
        choose: string;
        upload: string;
        cancel: string;
        completed: string;
        pending: string;
        fileSizeTypes: string[];
        dayNames: string[];
        dayNamesShort: string[];
        dayNamesMin: string[];
        monthNames: string[];
        monthNamesShort: string[];
        chooseYear: string;
        chooseMonth: string;
        chooseDate: string;
        prevDecade: string;
        nextDecade: string;
        prevYear: string;
        nextYear: string;
        prevMonth: string;
        nextMonth: string;
        prevHour: string;
        nextHour: string;
        prevMinute: string;
        nextMinute: string;
        prevSecond: string;
        nextSecond: string;
        am: string;
        pm: string;
        today: string;
        now: string;
        weekHeader: string;
        firstDayOfWeek: number;
        showMonthAfterYear: boolean;
        dateFormat: string;
        weak: string;
        medium: string;
        strong: string;
        passwordPrompt: string;
        emptyFilterMessage: string;
        searchMessage: string;
        selectionMessage: string;
        emptySelectionMessage: string;
        emptySearchMessage: string;
        emptyMessage: string;
        openMenu: string;
        toggleColorMode: string;
        signOut: string;
        profile: string;
        filesSelected: string;
        dragFilesHere: string;
        filesBeingDropped: string;
        typeNotSupported: string;
        maximumAllowedFiles: string;
        remove: string;
        edit: string;
        save: string;
        generatePhoto: string;
        settings: string;
        addCategory: string;
        addItem: string;
        delete: string;
        any: string;
        chooseFile: string;
        greaterThan: string;
        greaterThanOrEqualTo: string;
        lessThan: string;
        lessThanOrEqualTo: string;
        between: string;
        include: string;
        equal: string;
        after: string;
        before: string;
        not: string;
        aria: {
            trueLabel: string;
            falseLabel: string;
            nullLabel: string;
            star: string;
            stars: string;
            selectAll: string;
            unselectAll: string;
            close: string;
            previous: string;
            next: string;
            navigation: string;
            scrollTop: string;
            moveTop: string;
            moveUp: string;
            moveDown: string;
            moveBottom: string;
            moveToTarget: string;
            moveToSource: string;
            moveAllToTarget: string;
            moveAllToSource: string;
            pageLabel: string;
            firstPageLabel: string;
            lastPageLabel: string;
            nextPageLabel: string;
            previousPageLabel: string;
            rowsPerPageLabel: string;
            jumpToPageDropdownLabel: string;
            jumpToPageInputLabel: string;
            selectRow: string;
            unselectRow: string;
            expandRow: string;
            collapseRow: string;
            showFilterMenu: string;
            hideFilterMenu: string;
            filterOperator: string;
            filterConstraint: string;
            editRow: string;
            saveEdit: string;
            cancelEdit: string;
            listView: string;
            gridView: string;
            slide: string;
            slideNumber: string;
            zoomImage: string;
            zoomIn: string;
            zoomOut: string;
            rotateRight: string;
            rotateLeft: string;
        };
    };
    hi: {
        startsWith: string;
        contains: string;
        notContains: string;
        endsWith: string;
        equals: string;
        notEquals: string;
        noFilter: string;
        filter: string;
        lt: string;
        lte: string;
        gt: string;
        gte: string;
        dateIs: string;
        dateIsNot: string;
        dateBefore: string;
        dateAfter: string;
        custom: string;
        clear: string;
        apply: string;
        matchAll: string;
        matchAny: string;
        addRule: string;
        removeRule: string;
        accept: string;
        reject: string;
        choose: string;
        upload: string;
        cancel: string;
        completed: string;
        pending: string;
        fileSizeTypes: string[];
        dayNames: string[];
        dayNamesShort: string[];
        dayNamesMin: string[];
        monthNames: string[];
        monthNamesShort: string[];
        chooseYear: string;
        chooseMonth: string;
        chooseDate: string;
        prevDecade: string;
        nextDecade: string;
        prevYear: string;
        nextYear: string;
        prevMonth: string;
        nextMonth: string;
        prevHour: string;
        nextHour: string;
        prevMinute: string;
        nextMinute: string;
        prevSecond: string;
        nextSecond: string;
        am: string;
        pm: string;
        today: string;
        now: string;
        weekHeader: string;
        firstDayOfWeek: number;
        showMonthAfterYear: boolean;
        dateFormat: string;
        weak: string;
        medium: string;
        strong: string;
        passwordPrompt: string;
        emptyFilterMessage: string;
        searchMessage: string;
        selectionMessage: string;
        emptySelectionMessage: string;
        emptySearchMessage: string;
        emptyMessage: string;
        openMenu: string;
        toggleColorMode: string;
        signOut: string;
        profile: string;
        filesSelected: string;
        dragFilesHere: string;
        filesBeingDropped: string;
        typeNotSupported: string;
        maximumAllowedFiles: string;
        remove: string;
        edit: string;
        save: string;
        generatePhoto: string;
        settings: string;
        addCategory: string;
        addItem: string;
        delete: string;
        any: string;
        chooseFile: string;
        greaterThan: string;
        greaterThanOrEqualTo: string;
        lessThan: string;
        lessThanOrEqualTo: string;
        between: string;
        include: string;
        equal: string;
        after: string;
        before: string;
        not: string;
        aria: {
            trueLabel: string;
            falseLabel: string;
            nullLabel: string;
            star: string;
            stars: string;
            selectAll: string;
            unselectAll: string;
            close: string;
            previous: string;
            next: string;
            navigation: string;
            scrollTop: string;
            moveTop: string;
            moveUp: string;
            moveDown: string;
            moveBottom: string;
            moveToTarget: string;
            moveToSource: string;
            moveAllToTarget: string;
            moveAllToSource: string;
            pageLabel: string;
            firstPageLabel: string;
            lastPageLabel: string;
            nextPageLabel: string;
            previousPageLabel: string;
            rowsPerPageLabel: string;
            jumpToPageDropdownLabel: string;
            jumpToPageInputLabel: string;
            selectRow: string;
            unselectRow: string;
            expandRow: string;
            collapseRow: string;
            showFilterMenu: string;
            hideFilterMenu: string;
            filterOperator: string;
            filterConstraint: string;
            editRow: string;
            saveEdit: string;
            cancelEdit: string;
            listView: string;
            gridView: string;
            slide: string;
            slideNumber: string;
            zoomImage: string;
            zoomIn: string;
            zoomOut: string;
            rotateRight: string;
            rotateLeft: string;
        };
    };
    hu: {
        startsWith: string;
        contains: string;
        notContains: string;
        endsWith: string;
        equals: string;
        notEquals: string;
        noFilter: string;
        filter: string;
        lt: string;
        lte: string;
        gt: string;
        gte: string;
        dateIs: string;
        dateIsNot: string;
        dateBefore: string;
        dateAfter: string;
        custom: string;
        clear: string;
        apply: string;
        matchAll: string;
        matchAny: string;
        addRule: string;
        removeRule: string;
        accept: string;
        reject: string;
        choose: string;
        upload: string;
        cancel: string;
        completed: string;
        pending: string;
        dayNames: string[];
        dayNamesShort: string[];
        dayNamesMin: string[];
        monthNames: string[];
        monthNamesShort: string[];
        chooseYear: string;
        chooseMonth: string;
        chooseDate: string;
        prevDecade: string;
        nextDecade: string;
        prevYear: string;
        nextYear: string;
        prevMonth: string;
        nextMonth: string;
        prevHour: string;
        nextHour: string;
        prevMinute: string;
        nextMinute: string;
        prevSecond: string;
        nextSecond: string;
        am: string;
        pm: string;
        today: string;
        now: string;
        weekHeader: string;
        firstDayOfWeek: number;
        showMonthAfterYear: boolean;
        dateFormat: string;
        weak: string;
        medium: string;
        strong: string;
        passwordPrompt: string;
        emptyFilterMessage: string;
        searchMessage: string;
        selectionMessage: string;
        emptySelectionMessage: string;
        emptySearchMessage: string;
        emptyMessage: string;
        openMenu: string;
        toggleColorMode: string;
        signOut: string;
        profile: string;
        filesSelected: string;
        dragFilesHere: string;
        filesBeingDropped: string;
        typeNotSupported: string;
        maximumAllowedFiles: string;
        remove: string;
        edit: string;
        save: string;
        generatePhoto: string;
        settings: string;
        addCategory: string;
        addItem: string;
        delete: string;
        any: string;
        chooseFile: string;
        greaterThan: string;
        greaterThanOrEqualTo: string;
        lessThan: string;
        lessThanOrEqualTo: string;
        between: string;
        include: string;
        equal: string;
        after: string;
        before: string;
        not: string;
        aria: {
            trueLabel: string;
            falseLabel: string;
            nullLabel: string;
            star: string;
            stars: string;
            selectAll: string;
            unselectAll: string;
            close: string;
            previous: string;
            next: string;
            navigation: string;
            scrollTop: string;
            moveTop: string;
            moveUp: string;
            moveDown: string;
            moveBottom: string;
            moveToTarget: string;
            moveToSource: string;
            moveAllToTarget: string;
            moveAllToSource: string;
            pageLabel: string;
            firstPageLabel: string;
            lastPageLabel: string;
            nextPageLabel: string;
            previousPageLabel: string;
            rowsPerPageLabel: string;
            jumpToPageDropdownLabel: string;
            jumpToPageInputLabel: string;
            selectRow: string;
            unselectRow: string;
            expandRow: string;
            collapseRow: string;
            showFilterMenu: string;
            hideFilterMenu: string;
            filterOperator: string;
            filterConstraint: string;
            editRow: string;
            saveEdit: string;
            cancelEdit: string;
            listView: string;
            gridView: string;
            slide: string;
            slideNumber: string;
            zoomImage: string;
            zoomIn: string;
            zoomOut: string;
            rotateRight: string;
            rotateLeft: string;
        };
    };
    id: {
        startsWith: string;
        contains: string;
        notContains: string;
        endsWith: string;
        equals: string;
        notEquals: string;
        noFilter: string;
        filter: string;
        lt: string;
        lte: string;
        gt: string;
        gte: string;
        dateIs: string;
        dateIsNot: string;
        dateBefore: string;
        dateAfter: string;
        custom: string;
        clear: string;
        apply: string;
        matchAll: string;
        matchAny: string;
        addRule: string;
        removeRule: string;
        accept: string;
        reject: string;
        choose: string;
        upload: string;
        cancel: string;
        completed: string;
        pending: string;
        dayNames: string[];
        dayNamesShort: string[];
        dayNamesMin: string[];
        monthNames: string[];
        monthNamesShort: string[];
        chooseYear: string;
        chooseMonth: string;
        chooseDate: string;
        prevDecade: string;
        nextDecade: string;
        prevYear: string;
        nextYear: string;
        prevMonth: string;
        nextMonth: string;
        prevHour: string;
        nextHour: string;
        prevMinute: string;
        nextMinute: string;
        prevSecond: string;
        nextSecond: string;
        am: string;
        pm: string;
        today: string;
        weekHeader: string;
        firstDayOfWeek: number;
        showMonthAfterYear: boolean;
        dateFormat: string;
        weak: string;
        medium: string;
        strong: string;
        passwordPrompt: string;
        emptyFilterMessage: string;
        searchMessage: string;
        selectionMessage: string;
        emptySelectionMessage: string;
        emptySearchMessage: string;
        emptyMessage: string;
        openMenu: string;
        toggleColorMode: string;
        signOut: string;
        profile: string;
        filesSelected: string;
        dragFilesHere: string;
        filesBeingDropped: string;
        typeNotSupported: string;
        maximumAllowedFiles: string;
        remove: string;
        edit: string;
        save: string;
        generatePhoto: string;
        settings: string;
        addCategory: string;
        addItem: string;
        delete: string;
        any: string;
        chooseFile: string;
        greaterThan: string;
        greaterThanOrEqualTo: string;
        lessThan: string;
        lessThanOrEqualTo: string;
        between: string;
        include: string;
        equal: string;
        after: string;
        before: string;
        not: string;
        aria: {
            trueLabel: string;
            falseLabel: string;
            nullLabel: string;
            star: string;
            stars: string;
            selectAll: string;
            unselectAll: string;
            close: string;
            previous: string;
            next: string;
            navigation: string;
            scrollTop: string;
            moveTop: string;
            moveUp: string;
            moveDown: string;
            moveBottom: string;
            moveToTarget: string;
            moveToSource: string;
            moveAllToTarget: string;
            moveAllToSource: string;
            pageLabel: string;
            firstPageLabel: string;
            lastPageLabel: string;
            nextPageLabel: string;
            previousPageLabel: string;
            rowsPerPageLabel: string;
            jumpToPageDropdownLabel: string;
            jumpToPageInputLabel: string;
            selectRow: string;
            unselectRow: string;
            expandRow: string;
            collapseRow: string;
            showFilterMenu: string;
            hideFilterMenu: string;
            filterOperator: string;
            filterConstraint: string;
            editRow: string;
            saveEdit: string;
            cancelEdit: string;
            listView: string;
            gridView: string;
            slide: string;
            slideNumber: string;
            zoomImage: string;
            zoomIn: string;
            zoomOut: string;
            rotateRight: string;
            rotateLeft: string;
        };
    };
    it: {
        startsWith: string;
        contains: string;
        notContains: string;
        endsWith: string;
        equals: string;
        notEquals: string;
        noFilter: string;
        filter: string;
        lt: string;
        lte: string;
        gt: string;
        gte: string;
        dateIs: string;
        dateIsNot: string;
        dateBefore: string;
        dateAfter: string;
        custom: string;
        clear: string;
        apply: string;
        matchAll: string;
        matchAny: string;
        addRule: string;
        removeRule: string;
        accept: string;
        reject: string;
        choose: string;
        upload: string;
        cancel: string;
        completed: string;
        pending: string;
        fileSizeTypes: string[];
        dayNames: string[];
        dayNamesShort: string[];
        dayNamesMin: string[];
        monthNames: string[];
        monthNamesShort: string[];
        chooseYear: string;
        chooseMonth: string;
        chooseDate: string;
        prevDecade: string;
        nextDecade: string;
        prevYear: string;
        nextYear: string;
        prevMonth: string;
        nextMonth: string;
        prevHour: string;
        nextHour: string;
        prevMinute: string;
        nextMinute: string;
        prevSecond: string;
        nextSecond: string;
        am: string;
        pm: string;
        today: string;
        now: string;
        weekHeader: string;
        firstDayOfWeek: number;
        showMonthAfterYear: boolean;
        dateFormat: string;
        weak: string;
        medium: string;
        strong: string;
        passwordPrompt: string;
        emptyFilterMessage: string;
        searchMessage: string;
        selectionMessage: string;
        emptySelectionMessage: string;
        emptySearchMessage: string;
        emptyMessage: string;
        openMenu: string;
        toggleColorMode: string;
        signOut: string;
        profile: string;
        filesSelected: string;
        dragFilesHere: string;
        filesBeingDropped: string;
        typeNotSupported: string;
        maximumAllowedFiles: string;
        remove: string;
        edit: string;
        save: string;
        generatePhoto: string;
        settings: string;
        addCategory: string;
        addItem: string;
        delete: string;
        any: string;
        chooseFile: string;
        greaterThan: string;
        greaterThanOrEqualTo: string;
        lessThan: string;
        lessThanOrEqualTo: string;
        between: string;
        include: string;
        equal: string;
        after: string;
        before: string;
        not: string;
        aria: {
            trueLabel: string;
            falseLabel: string;
            nullLabel: string;
            pageLabel: string;
            firstPageLabel: string;
            lastPageLabel: string;
            nextPageLabel: string;
            previousPageLabel: string;
            selectLabel: string;
            unselectLabel: string;
            expandLabel: string;
            collapseLabel: string;
            star: string;
            stars: string;
            selectAll: string;
            unselectAll: string;
            close: string;
            previous: string;
            next: string;
            navigation: string;
            scrollTop: string;
            moveTop: string;
            moveUp: string;
            moveDown: string;
            moveBottom: string;
            moveToTarget: string;
            moveToSource: string;
            moveAllToTarget: string;
            moveAllToSource: string;
            rowsPerPageLabel: string;
            jumpToPageDropdownLabel: string;
            jumpToPageInputLabel: string;
            selectRow: string;
            unselectRow: string;
            expandRow: string;
            collapseRow: string;
            showFilterMenu: string;
            hideFilterMenu: string;
            filterOperator: string;
            filterConstraint: string;
            editRow: string;
            saveEdit: string;
            cancelEdit: string;
            listView: string;
            gridView: string;
            slide: string;
            slideNumber: string;
            zoomImage: string;
            zoomIn: string;
            zoomOut: string;
            rotateRight: string;
            rotateLeft: string;
        };
    };
    ja: {
        startsWith: string;
        contains: string;
        notContains: string;
        endsWith: string;
        equals: string;
        notEquals: string;
        noFilter: string;
        filter: string;
        lt: string;
        lte: string;
        gt: string;
        gte: string;
        dateIs: string;
        dateIsNot: string;
        dateBefore: string;
        dateAfter: string;
        custom: string;
        clear: string;
        apply: string;
        matchAll: string;
        matchAny: string;
        addRule: string;
        removeRule: string;
        accept: string;
        reject: string;
        choose: string;
        upload: string;
        cancel: string;
        completed: string;
        pending: string;
        dayNames: string[];
        dayNamesShort: string[];
        dayNamesMin: string[];
        monthNames: string[];
        monthNamesShort: string[];
        chooseYear: string;
        chooseMonth: string;
        chooseDate: string;
        prevDecade: string;
        nextDecade: string;
        prevYear: string;
        nextYear: string;
        prevMonth: string;
        nextMonth: string;
        prevHour: string;
        nextHour: string;
        prevMinute: string;
        nextMinute: string;
        prevSecond: string;
        nextSecond: string;
        am: string;
        pm: string;
        today: string;
        weekHeader: string;
        firstDayOfWeek: number;
        showMonthAfterYear: boolean;
        dateFormat: string;
        weak: string;
        medium: string;
        strong: string;
        passwordPrompt: string;
        emptyFilterMessage: string;
        searchMessage: string;
        selectionMessage: string;
        emptySelectionMessage: string;
        emptySearchMessage: string;
        emptyMessage: string;
        openMenu: string;
        toggleColorMode: string;
        signOut: string;
        profile: string;
        filesSelected: string;
        dragFilesHere: string;
        filesBeingDropped: string;
        typeNotSupported: string;
        maximumAllowedFiles: string;
        remove: string;
        edit: string;
        save: string;
        generatePhoto: string;
        settings: string;
        addCategory: string;
        addItem: string;
        delete: string;
        any: string;
        chooseFile: string;
        greaterThan: string;
        greaterThanOrEqualTo: string;
        lessThan: string;
        lessThanOrEqualTo: string;
        between: string;
        include: string;
        equal: string;
        after: string;
        before: string;
        not: string;
        aria: {
            trueLabel: string;
            falseLabel: string;
            nullLabel: string;
            star: string;
            stars: string;
            selectAll: string;
            unselectAll: string;
            close: string;
            previous: string;
            next: string;
            navigation: string;
            scrollTop: string;
            moveTop: string;
            moveUp: string;
            moveDown: string;
            moveBottom: string;
            moveToTarget: string;
            moveToSource: string;
            moveAllToTarget: string;
            moveAllToSource: string;
            pageLabel: string;
            firstPageLabel: string;
            lastPageLabel: string;
            nextPageLabel: string;
            previousPageLabel: string;
            rowsPerPageLabel: string;
            jumpToPageDropdownLabel: string;
            jumpToPageInputLabel: string;
            selectRow: string;
            unselectRow: string;
            expandRow: string;
            collapseRow: string;
            showFilterMenu: string;
            hideFilterMenu: string;
            filterOperator: string;
            filterConstraint: string;
            editRow: string;
            saveEdit: string;
            cancelEdit: string;
            listView: string;
            gridView: string;
            slide: string;
            slideNumber: string;
            zoomImage: string;
            zoomIn: string;
            zoomOut: string;
            rotateRight: string;
            rotateLeft: string;
        };
    };
    kg: {
        startsWith: string;
        contains: string;
        notContains: string;
        endsWith: string;
        equals: string;
        notEquals: string;
        noFilter: string;
        filter: string;
        lt: string;
        lte: string;
        gt: string;
        gte: string;
        dateIs: string;
        dateIsNot: string;
        dateBefore: string;
        dateAfter: string;
        custom: string;
        clear: string;
        apply: string;
        matchAll: string;
        matchAny: string;
        addRule: string;
        removeRule: string;
        accept: string;
        reject: string;
        choose: string;
        upload: string;
        cancel: string;
        completed: string;
        pending: string;
        fileSizeTypes: string[];
        dayNames: string[];
        dayNamesShort: string[];
        dayNamesMin: string[];
        monthNames: string[];
        monthNamesShort: string[];
        chooseYear: string;
        chooseMonth: string;
        chooseDate: string;
        prevDecade: string;
        nextDecade: string;
        prevYear: string;
        nextYear: string;
        prevMonth: string;
        nextMonth: string;
        prevHour: string;
        nextHour: string;
        prevMinute: string;
        nextMinute: string;
        prevSecond: string;
        nextSecond: string;
        am: string;
        pm: string;
        today: string;
        now: string;
        weekHeader: string;
        firstDayOfWeek: number;
        showMonthAfterYear: boolean;
        dateFormat: string;
        weak: string;
        medium: string;
        strong: string;
        passwordPrompt: string;
        emptyFilterMessage: string;
        searchMessage: string;
        selectionMessage: string;
        emptySelectionMessage: string;
        emptySearchMessage: string;
        emptyMessage: string;
        openMenu: string;
        toggleColorMode: string;
        signOut: string;
        profile: string;
        filesSelected: string;
        dragFilesHere: string;
        filesBeingDropped: string;
        typeNotSupported: string;
        maximumAllowedFiles: string;
        remove: string;
        edit: string;
        save: string;
        generatePhoto: string;
        settings: string;
        addCategory: string;
        addItem: string;
        delete: string;
        any: string;
        chooseFile: string;
        greaterThan: string;
        greaterThanOrEqualTo: string;
        lessThan: string;
        lessThanOrEqualTo: string;
        between: string;
        include: string;
        equal: string;
        after: string;
        before: string;
        not: string;
        aria: {
            trueLabel: string;
            falseLabel: string;
            nullLabel: string;
            star: string;
            stars: string;
            selectAll: string;
            unselectAll: string;
            close: string;
            previous: string;
            next: string;
            navigation: string;
            scrollTop: string;
            moveTop: string;
            moveUp: string;
            moveDown: string;
            moveBottom: string;
            moveToTarget: string;
            moveToSource: string;
            moveAllToTarget: string;
            moveAllToSource: string;
            pageLabel: string;
            firstPageLabel: string;
            lastPageLabel: string;
            nextPageLabel: string;
            previousPageLabel: string;
            rowsPerPageLabel: string;
            jumpToPageDropdownLabel: string;
            jumpToPageInputLabel: string;
            selectRow: string;
            unselectRow: string;
            expandRow: string;
            collapseRow: string;
            showFilterMenu: string;
            hideFilterMenu: string;
            filterOperator: string;
            filterConstraint: string;
            editRow: string;
            saveEdit: string;
            cancelEdit: string;
            listView: string;
            gridView: string;
            slide: string;
            slideNumber: string;
            zoomImage: string;
            zoomIn: string;
            zoomOut: string;
            rotateRight: string;
            rotateLeft: string;
        };
    };
    ko: {
        startsWith: string;
        contains: string;
        notContains: string;
        endsWith: string;
        equals: string;
        notEquals: string;
        noFilter: string;
        filter: string;
        lt: string;
        lte: string;
        gt: string;
        gte: string;
        dateIs: string;
        dateIsNot: string;
        dateBefore: string;
        dateAfter: string;
        custom: string;
        clear: string;
        apply: string;
        matchAll: string;
        matchAny: string;
        addRule: string;
        removeRule: string;
        accept: string;
        reject: string;
        choose: string;
        upload: string;
        cancel: string;
        completed: string;
        pending: string;
        fileSizeTypes: string[];
        dayNames: string[];
        dayNamesShort: string[];
        dayNamesMin: string[];
        monthNames: string[];
        monthNamesShort: string[];
        chooseYear: string;
        chooseMonth: string;
        chooseDate: string;
        prevDecade: string;
        nextDecade: string;
        prevYear: string;
        nextYear: string;
        prevMonth: string;
        nextMonth: string;
        prevHour: string;
        nextHour: string;
        prevMinute: string;
        nextMinute: string;
        prevSecond: string;
        nextSecond: string;
        am: string;
        pm: string;
        today: string;
        now: string;
        weekHeader: string;
        firstDayOfWeek: number;
        showMonthAfterYear: boolean;
        dateFormat: string;
        weak: string;
        medium: string;
        strong: string;
        passwordPrompt: string;
        emptyFilterMessage: string;
        searchMessage: string;
        selectionMessage: string;
        emptySelectionMessage: string;
        emptySearchMessage: string;
        emptyMessage: string;
        openMenu: string;
        toggleColorMode: string;
        signOut: string;
        profile: string;
        filesSelected: string;
        dragFilesHere: string;
        filesBeingDropped: string;
        typeNotSupported: string;
        maximumAllowedFiles: string;
        remove: string;
        edit: string;
        save: string;
        generatePhoto: string;
        settings: string;
        addCategory: string;
        addItem: string;
        delete: string;
        any: string;
        chooseFile: string;
        greaterThan: string;
        greaterThanOrEqualTo: string;
        lessThan: string;
        lessThanOrEqualTo: string;
        between: string;
        include: string;
        equal: string;
        after: string;
        before: string;
        not: string;
        aria: {
            trueLabel: string;
            falseLabel: string;
            nullLabel: string;
            star: string;
            stars: string;
            selectAll: string;
            unselectAll: string;
            close: string;
            previous: string;
            next: string;
            navigation: string;
            scrollTop: string;
            moveTop: string;
            moveUp: string;
            moveDown: string;
            moveBottom: string;
            moveToTarget: string;
            moveToSource: string;
            moveAllToTarget: string;
            moveAllToSource: string;
            pageLabel: string;
            firstPageLabel: string;
            lastPageLabel: string;
            nextPageLabel: string;
            previousPageLabel: string;
            rowsPerPageLabel: string;
            jumpToPageDropdownLabel: string;
            jumpToPageInputLabel: string;
            selectRow: string;
            unselectRow: string;
            expandRow: string;
            collapseRow: string;
            showFilterMenu: string;
            hideFilterMenu: string;
            filterOperator: string;
            filterConstraint: string;
            editRow: string;
            saveEdit: string;
            cancelEdit: string;
            listView: string;
            gridView: string;
            slide: string;
            slideNumber: string;
            zoomImage: string;
            zoomIn: string;
            zoomOut: string;
            rotateRight: string;
            rotateLeft: string;
        };
    };
    ku: {
        startsWith: string;
        contains: string;
        notContains: string;
        endsWith: string;
        equals: string;
        notEquals: string;
        noFilter: string;
        filter: string;
        lt: string;
        lte: string;
        gt: string;
        gte: string;
        dateIs: string;
        dateIsNot: string;
        dateBefore: string;
        dateAfter: string;
        custom: string;
        clear: string;
        apply: string;
        matchAll: string;
        matchAny: string;
        addRule: string;
        removeRule: string;
        accept: string;
        reject: string;
        choose: string;
        upload: string;
        cancel: string;
        completed: string;
        pending: string;
        dayNames: string[];
        dayNamesShort: string[];
        dayNamesMin: string[];
        monthNames: string[];
        monthNamesShort: string[];
        chooseYear: string;
        chooseMonth: string;
        chooseDate: string;
        prevDecade: string;
        nextDecade: string;
        prevYear: string;
        nextYear: string;
        prevMonth: string;
        nextMonth: string;
        prevHour: string;
        nextHour: string;
        prevMinute: string;
        nextMinute: string;
        prevSecond: string;
        nextSecond: string;
        am: string;
        pm: string;
        today: string;
        weekHeader: string;
        firstDayOfWeek: number;
        showMonthAfterYear: boolean;
        dateFormat: string;
        weak: string;
        medium: string;
        strong: string;
        passwordPrompt: string;
        emptyFilterMessage: string;
        searchMessage: string;
        selectionMessage: string;
        emptySelectionMessage: string;
        emptySearchMessage: string;
        emptyMessage: string;
        openMenu: string;
        toggleColorMode: string;
        signOut: string;
        profile: string;
        filesSelected: string;
        dragFilesHere: string;
        filesBeingDropped: string;
        typeNotSupported: string;
        maximumAllowedFiles: string;
        remove: string;
        edit: string;
        save: string;
        generatePhoto: string;
        settings: string;
        addCategory: string;
        addItem: string;
        delete: string;
        any: string;
        chooseFile: string;
        greaterThan: string;
        greaterThanOrEqualTo: string;
        lessThan: string;
        lessThanOrEqualTo: string;
        between: string;
        include: string;
        equal: string;
        after: string;
        before: string;
        not: string;
        aria: {
            trueLabel: string;
            falseLabel: string;
            nullLabel: string;
            star: string;
            stars: string;
            selectAll: string;
            unselectAll: string;
            close: string;
            previous: string;
            next: string;
            navigation: string;
            scrollTop: string;
            moveTop: string;
            moveUp: string;
            moveDown: string;
            moveBottom: string;
            moveToTarget: string;
            moveToSource: string;
            moveAllToTarget: string;
            moveAllToSource: string;
            pageLabel: string;
            firstPageLabel: string;
            lastPageLabel: string;
            nextPageLabel: string;
            previousPageLabel: string;
            rowsPerPageLabel: string;
            jumpToPageDropdownLabel: string;
            jumpToPageInputLabel: string;
            selectRow: string;
            unselectRow: string;
            expandRow: string;
            collapseRow: string;
            showFilterMenu: string;
            hideFilterMenu: string;
            filterOperator: string;
            filterConstraint: string;
            editRow: string;
            saveEdit: string;
            cancelEdit: string;
            listView: string;
            gridView: string;
            slide: string;
            slideNumber: string;
            zoomImage: string;
            zoomIn: string;
            zoomOut: string;
            rotateRight: string;
            rotateLeft: string;
        };
    };
    lv: {
        startsWith: string;
        contains: string;
        notContains: string;
        endsWith: string;
        equals: string;
        notEquals: string;
        noFilter: string;
        filter: string;
        lt: string;
        lte: string;
        gt: string;
        gte: string;
        dateIs: string;
        dateIsNot: string;
        dateBefore: string;
        dateAfter: string;
        custom: string;
        clear: string;
        apply: string;
        matchAll: string;
        matchAny: string;
        addRule: string;
        removeRule: string;
        accept: string;
        reject: string;
        choose: string;
        upload: string;
        cancel: string;
        completed: string;
        pending: string;
        dayNames: string[];
        dayNamesShort: string[];
        dayNamesMin: string[];
        monthNames: string[];
        monthNamesShort: string[];
        chooseYear: string;
        chooseMonth: string;
        chooseDate: string;
        prevDecade: string;
        nextDecade: string;
        prevYear: string;
        nextYear: string;
        prevMonth: string;
        nextMonth: string;
        prevHour: string;
        nextHour: string;
        prevMinute: string;
        nextMinute: string;
        prevSecond: string;
        nextSecond: string;
        am: string;
        pm: string;
        today: string;
        now: string;
        weekHeader: string;
        firstDayOfWeek: number;
        showMonthAfterYear: boolean;
        dateFormat: string;
        weak: string;
        medium: string;
        strong: string;
        passwordPrompt: string;
        emptyFilterMessage: string;
        searchMessage: string;
        selectionMessage: string;
        emptySelectionMessage: string;
        emptySearchMessage: string;
        emptyMessage: string;
        openMenu: string;
        toggleColorMode: string;
        signOut: string;
        profile: string;
        filesSelected: string;
        dragFilesHere: string;
        filesBeingDropped: string;
        typeNotSupported: string;
        maximumAllowedFiles: string;
        remove: string;
        edit: string;
        save: string;
        generatePhoto: string;
        settings: string;
        addCategory: string;
        addItem: string;
        delete: string;
        any: string;
        chooseFile: string;
        greaterThan: string;
        greaterThanOrEqualTo: string;
        lessThan: string;
        lessThanOrEqualTo: string;
        between: string;
        include: string;
        equal: string;
        after: string;
        before: string;
        not: string;
        aria: {
            trueLabel: string;
            falseLabel: string;
            nullLabel: string;
            star: string;
            stars: string;
            selectAll: string;
            unselectAll: string;
            close: string;
            previous: string;
            next: string;
            navigation: string;
            scrollTop: string;
            moveTop: string;
            moveUp: string;
            moveDown: string;
            moveBottom: string;
            moveToTarget: string;
            moveToSource: string;
            moveAllToTarget: string;
            moveAllToSource: string;
            pageLabel: string;
            firstPageLabel: string;
            lastPageLabel: string;
            nextPageLabel: string;
            previousPageLabel: string;
            rowsPerPageLabel: string;
            jumpToPageDropdownLabel: string;
            jumpToPageInputLabel: string;
            selectRow: string;
            unselectRow: string;
            expandRow: string;
            collapseRow: string;
            showFilterMenu: string;
            hideFilterMenu: string;
            filterOperator: string;
            filterConstraint: string;
            editRow: string;
            saveEdit: string;
            cancelEdit: string;
            listView: string;
            gridView: string;
            slide: string;
            slideNumber: string;
            zoomImage: string;
            zoomIn: string;
            zoomOut: string;
            rotateRight: string;
            rotateLeft: string;
        };
    };
    ms: {
        accept: string;
        reject: string;
        choose: string;
        upload: string;
        cancel: string;
        dayNames: string[];
        dayNamesShort: string[];
        dayNamesMin: string[];
        monthNames: string[];
        monthNamesShort: string[];
        today: string;
        clear: string;
        weekHeader: string;
        firstDayOfWeek: number;
        showMonthAfterYear: boolean;
        dateFormat: string;
        weak: string;
        medium: string;
        strong: string;
        passwordPrompt: string;
    };
    nl: {
        startsWith: string;
        contains: string;
        notContains: string;
        endsWith: string;
        equals: string;
        notEquals: string;
        noFilter: string;
        filter: string;
        lt: string;
        lte: string;
        gt: string;
        gte: string;
        dateIs: string;
        dateIsNot: string;
        dateBefore: string;
        dateAfter: string;
        custom: string;
        clear: string;
        apply: string;
        matchAll: string;
        matchAny: string;
        addRule: string;
        removeRule: string;
        accept: string;
        reject: string;
        choose: string;
        upload: string;
        cancel: string;
        completed: string;
        pending: string;
        fileSizeTypes: string[];
        dayNames: string[];
        dayNamesShort: string[];
        dayNamesMin: string[];
        monthNames: string[];
        monthNamesShort: string[];
        chooseYear: string;
        chooseMonth: string;
        chooseDate: string;
        prevDecade: string;
        nextDecade: string;
        prevYear: string;
        nextYear: string;
        prevMonth: string;
        nextMonth: string;
        prevHour: string;
        nextHour: string;
        prevMinute: string;
        nextMinute: string;
        prevSecond: string;
        nextSecond: string;
        am: string;
        pm: string;
        today: string;
        now: string;
        weekHeader: string;
        firstDayOfWeek: number;
        showMonthAfterYear: boolean;
        dateFormat: string;
        weak: string;
        medium: string;
        strong: string;
        passwordPrompt: string;
        emptyFilterMessage: string;
        searchMessage: string;
        selectionMessage: string;
        emptySelectionMessage: string;
        emptySearchMessage: string;
        emptyMessage: string;
        openMenu: string;
        toggleColorMode: string;
        signOut: string;
        profile: string;
        filesSelected: string;
        dragFilesHere: string;
        filesBeingDropped: string;
        typeNotSupported: string;
        maximumAllowedFiles: string;
        remove: string;
        edit: string;
        save: string;
        generatePhoto: string;
        settings: string;
        addCategory: string;
        addItem: string;
        delete: string;
        any: string;
        chooseFile: string;
        greaterThan: string;
        greaterThanOrEqualTo: string;
        lessThan: string;
        lessThanOrEqualTo: string;
        between: string;
        include: string;
        equal: string;
        after: string;
        before: string;
        not: string;
        aria: {
            trueLabel: string;
            falseLabel: string;
            nullLabel: string;
            star: string;
            stars: string;
            selectAll: string;
            unselectAll: string;
            close: string;
            previous: string;
            next: string;
            navigation: string;
            scrollTop: string;
            moveTop: string;
            moveUp: string;
            moveDown: string;
            moveBottom: string;
            moveToTarget: string;
            moveToSource: string;
            moveAllToTarget: string;
            moveAllToSource: string;
            pageLabel: string;
            firstPageLabel: string;
            lastPageLabel: string;
            nextPageLabel: string;
            previousPageLabel: string;
            rowsPerPageLabel: string;
            jumpToPageDropdownLabel: string;
            jumpToPageInputLabel: string;
            selectRow: string;
            unselectRow: string;
            expandRow: string;
            collapseRow: string;
            showFilterMenu: string;
            hideFilterMenu: string;
            filterOperator: string;
            filterConstraint: string;
            editRow: string;
            saveEdit: string;
            cancelEdit: string;
            listView: string;
            gridView: string;
            slide: string;
            slideNumber: string;
            zoomImage: string;
            zoomIn: string;
            zoomOut: string;
            rotateRight: string;
            rotateLeft: string;
        };
    };
    pl: {
        startsWith: string;
        contains: string;
        notContains: string;
        endsWith: string;
        equals: string;
        notEquals: string;
        noFilter: string;
        lt: string;
        lte: string;
        gt: string;
        gte: string;
        dateIs: string;
        dateIsNot: string;
        dateBefore: string;
        dateAfter: string;
        clear: string;
        apply: string;
        matchAll: string;
        matchAny: string;
        addRule: string;
        removeRule: string;
        accept: string;
        reject: string;
        choose: string;
        upload: string;
        cancel: string;
        completed: string;
        pending: string;
        dayNames: string[];
        dayNamesShort: string[];
        dayNamesMin: string[];
        monthNames: string[];
        monthNamesShort: string[];
        quarterNames: string[];
        quarterNamesShort: string[];
        chooseYear: string;
        chooseMonth: string;
        chooseDate: string;
        prevDecade: string;
        nextDecade: string;
        prevYear: string;
        nextYear: string;
        prevMonth: string;
        nextMonth: string;
        prevHour: string;
        nextHour: string;
        prevMinute: string;
        nextMinute: string;
        prevSecond: string;
        nextSecond: string;
        today: string;
        now: string;
        weekHeader: string;
        firstDayOfWeek: number;
        showMonthAfterYear: boolean;
        dateFormat: string;
        weak: string;
        medium: string;
        strong: string;
        passwordPrompt: string;
        emptyFilterMessage: string;
        searchMessage: string;
        selectionMessage: string;
        emptySelectionMessage: string;
        emptySearchMessage: string;
        emptyMessage: string;
        openMenu: string;
        toggleColorMode: string;
        signOut: string;
        profile: string;
        filesSelected: string;
        dragFilesHere: string;
        filesBeingDropped: string;
        typeNotSupported: string;
        maximumAllowedFiles: string;
        remove: string;
        edit: string;
        save: string;
        generatePhoto: string;
        settings: string;
        addCategory: string;
        addItem: string;
        delete: string;
        any: string;
        chooseFile: string;
        greaterThan: string;
        greaterThanOrEqualTo: string;
        lessThan: string;
        lessThanOrEqualTo: string;
        between: string;
        include: string;
        equal: string;
        after: string;
        before: string;
        not: string;
        aria: {
            trueLabel: string;
            falseLabel: string;
            nullLabel: string;
            star: string;
            stars: string;
            selectAll: string;
            unselectAll: string;
            close: string;
            previous: string;
            next: string;
            navigation: string;
            scrollTop: string;
            moveTop: string;
            moveUp: string;
            moveDown: string;
            moveBottom: string;
            moveToTarget: string;
            moveToSource: string;
            moveAllToTarget: string;
            moveAllToSource: string;
            pageLabel: string;
            firstPageLabel: string;
            lastPageLabel: string;
            nextPageLabel: string;
            previousPageLabel: string;
            rowsPerPageLabel: string;
            selectRow: string;
            unselectRow: string;
            expandRow: string;
            collapseRow: string;
            showFilterMenu: string;
            hideFilterMenu: string;
            filterOperator: string;
            filterConstraint: string;
            editRow: string;
            saveEdit: string;
            cancelEdit: string;
            listView: string;
            gridView: string;
            slide: string;
            slideNumber: string;
            zoomImage: string;
            zoomIn: string;
            zoomOut: string;
            rotateRight: string;
            rotateLeft: string;
        };
    };
    pt: {
        startsWith: string;
        contains: string;
        notContains: string;
        endsWith: string;
        equals: string;
        notEquals: string;
        noFilter: string;
        filter: string;
        lt: string;
        lte: string;
        gt: string;
        gte: string;
        dateIs: string;
        dateIsNot: string;
        dateBefore: string;
        dateAfter: string;
        custom: string;
        clear: string;
        close: string;
        apply: string;
        matchAll: string;
        matchAny: string;
        addRule: string;
        removeRule: string;
        accept: string;
        reject: string;
        choose: string;
        upload: string;
        cancel: string;
        completed: string;
        pending: string;
        fileSizeTypes: string[];
        dayNames: string[];
        dayNamesShort: string[];
        dayNamesMin: string[];
        monthNames: string[];
        monthNamesShort: string[];
        chooseYear: string;
        chooseMonth: string;
        chooseDate: string;
        prevDecade: string;
        nextDecade: string;
        prevYear: string;
        nextYear: string;
        prevMonth: string;
        nextMonth: string;
        prevHour: string;
        nextHour: string;
        prevMinute: string;
        nextMinute: string;
        prevSecond: string;
        nextSecond: string;
        am: string;
        pm: string;
        today: string;
        now: string;
        weekHeader: string;
        firstDayOfWeek: number;
        showMonthAfterYear: boolean;
        dateFormat: string;
        weak: string;
        medium: string;
        strong: string;
        passwordPrompt: string;
        emptyFilterMessage: string;
        searchMessage: string;
        selectionMessage: string;
        emptySelectionMessage: string;
        emptySearchMessage: string;
        emptyMessage: string;
        openMenu: string;
        toggleColorMode: string;
        signOut: string;
        profile: string;
        filesSelected: string;
        dragFilesHere: string;
        filesBeingDropped: string;
        typeNotSupported: string;
        maximumAllowedFiles: string;
        remove: string;
        edit: string;
        save: string;
        generatePhoto: string;
        settings: string;
        addCategory: string;
        addItem: string;
        delete: string;
        any: string;
        chooseFile: string;
        greaterThan: string;
        greaterThanOrEqualTo: string;
        lessThan: string;
        lessThanOrEqualTo: string;
        between: string;
        include: string;
        equal: string;
        after: string;
        before: string;
        not: string;
        aria: {
            trueLabel: string;
            falseLabel: string;
            nullLabel: string;
            star: string;
            stars: string;
            selectAll: string;
            unselectAll: string;
            close: string;
            previous: string;
            next: string;
            navigation: string;
            scrollTop: string;
            moveTop: string;
            moveUp: string;
            moveDown: string;
            moveBottom: string;
            moveToTarget: string;
            moveToSource: string;
            moveAllToTarget: string;
            moveAllToSource: string;
            pageLabel: string;
            firstPageLabel: string;
            lastPageLabel: string;
            nextPageLabel: string;
            previousPageLabel: string;
            rowsPerPageLabel: string;
            jumpToPageDropdownLabel: string;
            jumpToPageInputLabel: string;
            selectRow: string;
            unselectRow: string;
            expandRow: string;
            collapseRow: string;
            showFilterMenu: string;
            hideFilterMenu: string;
            filterOperator: string;
            filterConstraint: string;
            editRow: string;
            saveEdit: string;
            cancelEdit: string;
            listView: string;
            gridView: string;
            slide: string;
            slideNumber: string;
            zoomImage: string;
            zoomIn: string;
            zoomOut: string;
            rotateRight: string;
            rotateLeft: string;
        };
    };
    ro: {
        startsWith: string;
        contains: string;
        notContains: string;
        endsWith: string;
        equals: string;
        notEquals: string;
        noFilter: string;
        filter: string;
        lt: string;
        lte: string;
        gt: string;
        gte: string;
        dateIs: string;
        dateIsNot: string;
        dateBefore: string;
        dateAfter: string;
        custom: string;
        clear: string;
        apply: string;
        matchAll: string;
        matchAny: string;
        addRule: string;
        removeRule: string;
        accept: string;
        reject: string;
        choose: string;
        upload: string;
        cancel: string;
        completed: string;
        pending: string;
        dayNames: string[];
        dayNamesShort: string[];
        dayNamesMin: string[];
        monthNames: string[];
        monthNamesShort: string[];
        chooseYear: string;
        chooseMonth: string;
        chooseDate: string;
        prevDecade: string;
        nextDecade: string;
        prevYear: string;
        nextYear: string;
        prevMonth: string;
        nextMonth: string;
        prevHour: string;
        nextHour: string;
        prevMinute: string;
        nextMinute: string;
        prevSecond: string;
        nextSecond: string;
        am: string;
        pm: string;
        today: string;
        now: string;
        weekHeader: string;
        firstDayOfWeek: number;
        showMonthAfterYear: boolean;
        dateFormat: string;
        weak: string;
        medium: string;
        strong: string;
        passwordPrompt: string;
        emptyFilterMessage: string;
        searchMessage: string;
        selectionMessage: string;
        emptySelectionMessage: string;
        emptySearchMessage: string;
        emptyMessage: string;
        openMenu: string;
        toggleColorMode: string;
        signOut: string;
        profile: string;
        filesSelected: string;
        dragFilesHere: string;
        filesBeingDropped: string;
        typeNotSupported: string;
        maximumAllowedFiles: string;
        remove: string;
        edit: string;
        save: string;
        generatePhoto: string;
        settings: string;
        addCategory: string;
        addItem: string;
        delete: string;
        any: string;
        chooseFile: string;
        greaterThan: string;
        greaterThanOrEqualTo: string;
        lessThan: string;
        lessThanOrEqualTo: string;
        between: string;
        include: string;
        equal: string;
        after: string;
        before: string;
        not: string;
        aria: {
            trueLabel: string;
            falseLabel: string;
            nullLabel: string;
            star: string;
            stars: string;
            selectAll: string;
            unselectAll: string;
            close: string;
            previous: string;
            next: string;
            navigation: string;
            scrollTop: string;
            moveTop: string;
            moveUp: string;
            moveDown: string;
            moveBottom: string;
            moveToTarget: string;
            moveToSource: string;
            moveAllToTarget: string;
            moveAllToSource: string;
            pageLabel: string;
            firstPageLabel: string;
            lastPageLabel: string;
            nextPageLabel: string;
            previousPageLabel: string;
            rowsPerPageLabel: string;
            jumpToPageDropdownLabel: string;
            jumpToPageInputLabel: string;
            selectRow: string;
            unselectRow: string;
            expandRow: string;
            collapseRow: string;
            showFilterMenu: string;
            hideFilterMenu: string;
            filterOperator: string;
            filterConstraint: string;
            editRow: string;
            saveEdit: string;
            cancelEdit: string;
            listView: string;
            gridView: string;
            slide: string;
            slideNumber: string;
            zoomImage: string;
            zoomIn: string;
            zoomOut: string;
            rotateRight: string;
            rotateLeft: string;
        };
    };
    ru: {
        startsWith: string;
        contains: string;
        notContains: string;
        endsWith: string;
        equals: string;
        notEquals: string;
        noFilter: string;
        filter: string;
        lt: string;
        lte: string;
        gt: string;
        gte: string;
        dateIs: string;
        dateIsNot: string;
        dateBefore: string;
        dateAfter: string;
        custom: string;
        clear: string;
        apply: string;
        matchAll: string;
        matchAny: string;
        addRule: string;
        removeRule: string;
        accept: string;
        reject: string;
        choose: string;
        upload: string;
        cancel: string;
        completed: string;
        pending: string;
        fileSizeTypes: string[];
        dayNames: string[];
        dayNamesShort: string[];
        dayNamesMin: string[];
        monthNames: string[];
        monthNamesShort: string[];
        chooseYear: string;
        chooseMonth: string;
        chooseDate: string;
        prevDecade: string;
        nextDecade: string;
        prevYear: string;
        nextYear: string;
        prevMonth: string;
        nextMonth: string;
        prevHour: string;
        nextHour: string;
        prevMinute: string;
        nextMinute: string;
        prevSecond: string;
        nextSecond: string;
        am: string;
        pm: string;
        today: string;
        now: string;
        weekHeader: string;
        firstDayOfWeek: number;
        showMonthAfterYear: boolean;
        dateFormat: string;
        weak: string;
        medium: string;
        strong: string;
        passwordPrompt: string;
        emptyFilterMessage: string;
        searchMessage: string;
        selectionMessage: string;
        emptySelectionMessage: string;
        emptySearchMessage: string;
        emptyMessage: string;
        openMenu: string;
        toggleColorMode: string;
        signOut: string;
        profile: string;
        filesSelected: string;
        dragFilesHere: string;
        filesBeingDropped: string;
        typeNotSupported: string;
        maximumAllowedFiles: string;
        remove: string;
        edit: string;
        save: string;
        generatePhoto: string;
        settings: string;
        addCategory: string;
        addItem: string;
        delete: string;
        any: string;
        chooseFile: string;
        greaterThan: string;
        greaterThanOrEqualTo: string;
        lessThan: string;
        lessThanOrEqualTo: string;
        between: string;
        include: string;
        equal: string;
        after: string;
        before: string;
        not: string;
        aria: {
            trueLabel: string;
            falseLabel: string;
            nullLabel: string;
            star: string;
            stars: string;
            selectAll: string;
            unselectAll: string;
            close: string;
            previous: string;
            next: string;
            navigation: string;
            scrollTop: string;
            moveTop: string;
            moveUp: string;
            moveDown: string;
            moveBottom: string;
            moveToTarget: string;
            moveToSource: string;
            moveAllToTarget: string;
            moveAllToSource: string;
            pageLabel: string;
            firstPageLabel: string;
            lastPageLabel: string;
            nextPageLabel: string;
            previousPageLabel: string;
            rowsPerPageLabel: string;
            jumpToPageDropdownLabel: string;
            jumpToPageInputLabel: string;
            selectRow: string;
            unselectRow: string;
            expandRow: string;
            collapseRow: string;
            showFilterMenu: string;
            hideFilterMenu: string;
            filterOperator: string;
            filterConstraint: string;
            editRow: string;
            saveEdit: string;
            cancelEdit: string;
            listView: string;
            gridView: string;
            slide: string;
            slideNumber: string;
            zoomImage: string;
            zoomIn: string;
            zoomOut: string;
            rotateRight: string;
            rotateLeft: string;
        };
    };
    sk: {
        startsWith: string;
        contains: string;
        notContains: string;
        endsWith: string;
        equals: string;
        notEquals: string;
        noFilter: string;
        filter: string;
        lt: string;
        lte: string;
        gt: string;
        gte: string;
        dateIs: string;
        dateIsNot: string;
        dateBefore: string;
        dateAfter: string;
        custom: string;
        clear: string;
        apply: string;
        matchAll: string;
        matchAny: string;
        addRule: string;
        removeRule: string;
        accept: string;
        reject: string;
        choose: string;
        upload: string;
        cancel: string;
        completed: string;
        pending: string;
        fileSizeTypes: string[];
        dayNames: string[];
        dayNamesShort: string[];
        dayNamesMin: string[];
        monthNames: string[];
        monthNamesShort: string[];
        chooseYear: string;
        chooseMonth: string;
        chooseDate: string;
        prevDecade: string;
        nextDecade: string;
        prevYear: string;
        nextYear: string;
        prevMonth: string;
        nextMonth: string;
        prevHour: string;
        nextHour: string;
        prevMinute: string;
        nextMinute: string;
        prevSecond: string;
        nextSecond: string;
        am: string;
        pm: string;
        today: string;
        now: string;
        weekHeader: string;
        firstDayOfWeek: number;
        showMonthAfterYear: boolean;
        dateFormat: string;
        weak: string;
        medium: string;
        strong: string;
        passwordPrompt: string;
        emptyFilterMessage: string;
        searchMessage: string;
        selectionMessage: string;
        emptySelectionMessage: string;
        emptySearchMessage: string;
        emptyMessage: string;
        openMenu: string;
        toggleColorMode: string;
        signOut: string;
        profile: string;
        filesSelected: string;
        dragFilesHere: string;
        filesBeingDropped: string;
        typeNotSupported: string;
        maximumAllowedFiles: string;
        remove: string;
        edit: string;
        save: string;
        generatePhoto: string;
        settings: string;
        addCategory: string;
        addItem: string;
        delete: string;
        any: string;
        chooseFile: string;
        greaterThan: string;
        greaterThanOrEqualTo: string;
        lessThan: string;
        lessThanOrEqualTo: string;
        between: string;
        include: string;
        equal: string;
        after: string;
        before: string;
        not: string;
        aria: {
            trueLabel: string;
            falseLabel: string;
            nullLabel: string;
            star: string;
            stars: string;
            selectAll: string;
            unselectAll: string;
            close: string;
            previous: string;
            next: string;
            navigation: string;
            scrollTop: string;
            moveTop: string;
            moveUp: string;
            moveDown: string;
            moveBottom: string;
            moveToTarget: string;
            moveToSource: string;
            moveAllToTarget: string;
            moveAllToSource: string;
            pageLabel: string;
            firstPageLabel: string;
            lastPageLabel: string;
            nextPageLabel: string;
            previousPageLabel: string;
            rowsPerPageLabel: string;
            jumpToPageDropdownLabel: string;
            jumpToPageInputLabel: string;
            selectRow: string;
            unselectRow: string;
            expandRow: string;
            collapseRow: string;
            showFilterMenu: string;
            hideFilterMenu: string;
            filterOperator: string;
            filterConstraint: string;
            editRow: string;
            saveEdit: string;
            cancelEdit: string;
            listView: string;
            gridView: string;
            slide: string;
            slideNumber: string;
            zoomImage: string;
            zoomIn: string;
            zoomOut: string;
            rotateRight: string;
            rotateLeft: string;
        };
    };
    sl: {
        startsWith: string;
        contains: string;
        notContains: string;
        endsWith: string;
        equals: string;
        notEquals: string;
        noFilter: string;
        filter: string;
        lt: string;
        lte: string;
        gt: string;
        gte: string;
        dateIs: string;
        dateIsNot: string;
        dateBefore: string;
        dateAfter: string;
        custom: string;
        clear: string;
        apply: string;
        matchAll: string;
        matchAny: string;
        addRule: string;
        removeRule: string;
        accept: string;
        reject: string;
        choose: string;
        upload: string;
        cancel: string;
        completed: string;
        pending: string;
        dayNames: string[];
        dayNamesShort: string[];
        dayNamesMin: string[];
        monthNames: string[];
        monthNamesShort: string[];
        chooseYear: string;
        chooseMonth: string;
        chooseDate: string;
        prevDecade: string;
        nextDecade: string;
        prevYear: string;
        nextYear: string;
        prevMonth: string;
        nextMonth: string;
        prevHour: string;
        nextHour: string;
        prevMinute: string;
        nextMinute: string;
        prevSecond: string;
        nextSecond: string;
        am: string;
        pm: string;
        today: string;
        weekHeader: string;
        firstDayOfWeek: number;
        showMonthAfterYear: boolean;
        dateFormat: string;
        weak: string;
        medium: string;
        strong: string;
        passwordPrompt: string;
        emptyFilterMessage: string;
        searchMessage: string;
        selectionMessage: string;
        emptySelectionMessage: string;
        emptySearchMessage: string;
        emptyMessage: string;
        openMenu: string;
        toggleColorMode: string;
        signOut: string;
        profile: string;
        filesSelected: string;
        dragFilesHere: string;
        filesBeingDropped: string;
        typeNotSupported: string;
        maximumAllowedFiles: string;
        remove: string;
        edit: string;
        save: string;
        generatePhoto: string;
        settings: string;
        addCategory: string;
        addItem: string;
        delete: string;
        any: string;
        chooseFile: string;
        greaterThan: string;
        greaterThanOrEqualTo: string;
        lessThan: string;
        lessThanOrEqualTo: string;
        between: string;
        include: string;
        equal: string;
        after: string;
        before: string;
        not: string;
        aria: {
            trueLabel: string;
            falseLabel: string;
            nullLabel: string;
            star: string;
            stars: string;
            selectAll: string;
            unselectAll: string;
            close: string;
            previous: string;
            next: string;
            navigation: string;
            scrollTop: string;
            moveTop: string;
            moveUp: string;
            moveDown: string;
            moveBottom: string;
            moveToTarget: string;
            moveToSource: string;
            moveAllToTarget: string;
            moveAllToSource: string;
            pageLabel: string;
            firstPageLabel: string;
            lastPageLabel: string;
            nextPageLabel: string;
            previousPageLabel: string;
            rowsPerPageLabel: string;
            jumpToPageDropdownLabel: string;
            jumpToPageInputLabel: string;
            selectRow: string;
            unselectRow: string;
            expandRow: string;
            collapseRow: string;
            showFilterMenu: string;
            hideFilterMenu: string;
            filterOperator: string;
            filterConstraint: string;
            editRow: string;
            saveEdit: string;
            cancelEdit: string;
            listView: string;
            gridView: string;
            slide: string;
            slideNumber: string;
            zoomImage: string;
            zoomIn: string;
            zoomOut: string;
            rotateRight: string;
            rotateLeft: string;
        };
    };
    sv: {
        startsWith: string;
        contains: string;
        notContains: string;
        endsWith: string;
        equals: string;
        notEquals: string;
        noFilter: string;
        filter: string;
        lt: string;
        lte: string;
        gt: string;
        gte: string;
        dateIs: string;
        dateIsNot: string;
        dateBefore: string;
        dateAfter: string;
        custom: string;
        clear: string;
        apply: string;
        matchAll: string;
        matchAny: string;
        addRule: string;
        removeRule: string;
        accept: string;
        reject: string;
        choose: string;
        upload: string;
        cancel: string;
        close: string;
        dayNames: string[];
        dayNamesShort: string[];
        dayNamesMin: string[];
        monthNames: string[];
        monthNamesShort: string[];
        today: string;
        weekHeader: string;
        firstDayOfWeek: number;
        showMonthAfterYear: boolean;
        dateFormat: string;
        weak: string;
        medium: string;
        strong: string;
        passwordPrompt: string;
        emptyFilterMessage: string;
        emptyMessage: string;
        openMenu: string;
        toggleColorMode: string;
        signOut: string;
        profile: string;
        filesSelected: string;
        dragFilesHere: string;
        filesBeingDropped: string;
        typeNotSupported: string;
        maximumAllowedFiles: string;
        remove: string;
        edit: string;
        save: string;
        generatePhoto: string;
        settings: string;
        addCategory: string;
        addItem: string;
        delete: string;
        any: string;
        chooseFile: string;
        greaterThan: string;
        greaterThanOrEqualTo: string;
        lessThan: string;
        lessThanOrEqualTo: string;
        between: string;
        include: string;
        equal: string;
        after: string;
        before: string;
        not: string;
        aria: {
            trueLabel: string;
            falseLabel: string;
            nullLabel: string;
            pageLabel: string;
            firstPageLabel: string;
            lastPageLabel: string;
            nextPageLabel: string;
            previousPageLabel: string;
            selectLabel: string;
            unselectLabel: string;
            expandLabel: string;
            collapseLabel: string;
        };
    };
    tr: {
        startsWith: string;
        contains: string;
        notContains: string;
        endsWith: string;
        equals: string;
        notEquals: string;
        noFilter: string;
        filter: string;
        lt: string;
        lte: string;
        gt: string;
        gte: string;
        dateIs: string;
        dateIsNot: string;
        dateBefore: string;
        dateAfter: string;
        custom: string;
        clear: string;
        apply: string;
        matchAll: string;
        matchAny: string;
        addRule: string;
        removeRule: string;
        accept: string;
        reject: string;
        choose: string;
        upload: string;
        cancel: string;
        pending: string;
        fileSizeTypes: string[];
        dayNames: string[];
        dayNamesShort: string[];
        dayNamesMin: string[];
        monthNames: string[];
        monthNamesShort: string[];
        chooseYear: string;
        chooseMonth: string;
        chooseDate: string;
        prevDecade: string;
        nextDecade: string;
        prevYear: string;
        nextYear: string;
        prevMonth: string;
        nextMonth: string;
        prevHour: string;
        nextHour: string;
        prevMinute: string;
        nextMinute: string;
        prevSecond: string;
        nextSecond: string;
        am: string;
        pm: string;
        today: string;
        now: string;
        weekHeader: string;
        firstDayOfWeek: number;
        showMonthAfterYear: boolean;
        dateFormat: string;
        weak: string;
        medium: string;
        strong: string;
        passwordPrompt: string;
        emptyFilterMessage: string;
        searchMessage: string;
        selectionMessage: string;
        emptySelectionMessage: string;
        emptySearchMessage: string;
        emptyMessage: string;
        openMenu: string;
        toggleColorMode: string;
        signOut: string;
        profile: string;
        filesSelected: string;
        dragFilesHere: string;
        filesBeingDropped: string;
        typeNotSupported: string;
        maximumAllowedFiles: string;
        remove: string;
        edit: string;
        save: string;
        generatePhoto: string;
        settings: string;
        addCategory: string;
        addItem: string;
        delete: string;
        any: string;
        chooseFile: string;
        greaterThan: string;
        greaterThanOrEqualTo: string;
        lessThan: string;
        lessThanOrEqualTo: string;
        between: string;
        include: string;
        equal: string;
        after: string;
        before: string;
        not: string;
        aria: {
            trueLabel: string;
            falseLabel: string;
            nullLabel: string;
            star: string;
            stars: string;
            selectAll: string;
            unselectAll: string;
            close: string;
            previous: string;
            next: string;
            navigation: string;
            scrollTop: string;
            moveTop: string;
            moveUp: string;
            moveDown: string;
            moveBottom: string;
            moveToTarget: string;
            moveToSource: string;
            moveAllToTarget: string;
            moveAllToSource: string;
            pageLabel: string;
            firstPageLabel: string;
            lastPageLabel: string;
            nextPageLabel: string;
            previousPageLabel: string;
            rowsPerPageLabel: string;
            jumpToPageDropdownLabel: string;
            jumpToPageInputLabel: string;
            selectRow: string;
            unselectRow: string;
            expandRow: string;
            collapseRow: string;
            showFilterMenu: string;
            hideFilterMenu: string;
            filterOperator: string;
            filterConstraint: string;
            editRow: string;
            saveEdit: string;
            cancelEdit: string;
            listView: string;
            gridView: string;
            slide: string;
            slideNumber: string;
            zoomImage: string;
            zoomIn: string;
            zoomOut: string;
            rotateRight: string;
            rotateLeft: string;
        };
    };
    uk: {
        startsWith: string;
        contains: string;
        notContains: string;
        endsWith: string;
        equals: string;
        notEquals: string;
        noFilter: string;
        filter: string;
        lt: string;
        lte: string;
        gt: string;
        gte: string;
        dateIs: string;
        dateIsNot: string;
        dateBefore: string;
        dateAfter: string;
        custom: string;
        clear: string;
        apply: string;
        matchAll: string;
        matchAny: string;
        addRule: string;
        removeRule: string;
        accept: string;
        reject: string;
        choose: string;
        upload: string;
        cancel: string;
        completed: string;
        pending: string;
        dayNames: string[];
        dayNamesShort: string[];
        dayNamesMin: string[];
        monthNames: string[];
        monthNamesShort: string[];
        chooseYear: string;
        chooseMonth: string;
        chooseDate: string;
        prevDecade: string;
        nextDecade: string;
        prevYear: string;
        nextYear: string;
        prevMonth: string;
        nextMonth: string;
        prevHour: string;
        nextHour: string;
        prevMinute: string;
        nextMinute: string;
        prevSecond: string;
        nextSecond: string;
        am: string;
        pm: string;
        today: string;
        now: string;
        weekHeader: string;
        firstDayOfWeek: number;
        showMonthAfterYear: boolean;
        dateFormat: string;
        weak: string;
        medium: string;
        strong: string;
        passwordPrompt: string;
        emptyFilterMessage: string;
        searchMessage: string;
        selectionMessage: string;
        emptySelectionMessage: string;
        emptySearchMessage: string;
        emptyMessage: string;
        openMenu: string;
        toggleColorMode: string;
        signOut: string;
        profile: string;
        filesSelected: string;
        dragFilesHere: string;
        filesBeingDropped: string;
        typeNotSupported: string;
        maximumAllowedFiles: string;
        remove: string;
        edit: string;
        save: string;
        generatePhoto: string;
        settings: string;
        addCategory: string;
        addItem: string;
        delete: string;
        any: string;
        chooseFile: string;
        greaterThan: string;
        greaterThanOrEqualTo: string;
        lessThan: string;
        lessThanOrEqualTo: string;
        between: string;
        include: string;
        equal: string;
        after: string;
        before: string;
        not: string;
        aria: {
            trueLabel: string;
            falseLabel: string;
            nullLabel: string;
            star: string;
            stars: string;
            selectAll: string;
            unselectAll: string;
            close: string;
            previous: string;
            next: string;
            navigation: string;
            scrollTop: string;
            moveTop: string;
            moveUp: string;
            moveDown: string;
            moveBottom: string;
            moveToTarget: string;
            moveToSource: string;
            moveAllToTarget: string;
            moveAllToSource: string;
            pageLabel: string;
            firstPageLabel: string;
            lastPageLabel: string;
            nextPageLabel: string;
            rowsPerPageLabel: string;
            previousPageLabel: string;
            jumpToPageDropdownLabel: string;
            jumpToPageInputLabel: string;
            selectRow: string;
            unselectRow: string;
            expandRow: string;
            collapseRow: string;
            showFilterMenu: string;
            hideFilterMenu: string;
            filterOperator: string;
            filterConstraint: string;
            editRow: string;
            saveEdit: string;
            cancelEdit: string;
            listView: string;
            gridView: string;
            slide: string;
            slideNumber: string;
            zoomImage: string;
            zoomIn: string;
            zoomOut: string;
            rotateRight: string;
            rotateLeft: string;
        };
    };
    vi: {
        accept: string;
        reject: string;
        choose: string;
        upload: string;
        cancel: string;
        dayNames: string[];
        dayNamesShort: string[];
        dayNamesMin: string[];
        monthNames: string[];
        monthNamesShort: string[];
        today: string;
        clear: string;
        weekHeader: string;
        firstDayOfWeek: number;
        showMonthAfterYear: boolean;
        dateFormat: string;
        weak: string;
        medium: string;
        strong: string;
        passwordPrompt: string;
    };
    "nb-no": {
        startsWith: string;
        contains: string;
        notContains: string;
        endsWith: string;
        equals: string;
        notEquals: string;
        noFilter: string;
        filter: string;
        lt: string;
        lte: string;
        gt: string;
        gte: string;
        dateIs: string;
        dateIsNot: string;
        dateBefore: string;
        dateAfter: string;
        custom: string;
        clear: string;
        apply: string;
        matchAll: string;
        matchAny: string;
        addRule: string;
        removeRule: string;
        accept: string;
        reject: string;
        choose: string;
        upload: string;
        cancel: string;
        completed: string;
        pending: string;
        dayNames: string[];
        dayNamesShort: string[];
        dayNamesMin: string[];
        monthNames: string[];
        monthNamesShort: string[];
        chooseYear: string;
        chooseMonth: string;
        chooseDate: string;
        prevDecade: string;
        nextDecade: string;
        prevYear: string;
        nextYear: string;
        prevMonth: string;
        nextMonth: string;
        prevHour: string;
        nextHour: string;
        prevMinute: string;
        nextMinute: string;
        prevSecond: string;
        nextSecond: string;
        am: string;
        pm: string;
        today: string;
        now: string;
        weekHeader: string;
        firstDayOfWeek: number;
        showMonthAfterYear: boolean;
        dateFormat: string;
        weak: string;
        medium: string;
        strong: string;
        passwordPrompt: string;
        emptyFilterMessage: string;
        searchMessage: string;
        selectionMessage: string;
        emptySelectionMessage: string;
        emptySearchMessage: string;
        emptyMessage: string;
        openMenu: string;
        toggleColorMode: string;
        signOut: string;
        profile: string;
        filesSelected: string;
        dragFilesHere: string;
        filesBeingDropped: string;
        typeNotSupported: string;
        maximumAllowedFiles: string;
        remove: string;
        edit: string;
        save: string;
        generatePhoto: string;
        settings: string;
        addCategory: string;
        addItem: string;
        delete: string;
        any: string;
        chooseFile: string;
        greaterThan: string;
        greaterThanOrEqualTo: string;
        lessThan: string;
        lessThanOrEqualTo: string;
        between: string;
        include: string;
        equal: string;
        after: string;
        before: string;
        not: string;
        aria: {
            trueLabel: string;
            falseLabel: string;
            nullLabel: string;
            star: string;
            stars: string;
            selectAll: string;
            unselectAll: string;
            close: string;
            previous: string;
            next: string;
            navigation: string;
            scrollTop: string;
            moveTop: string;
            moveUp: string;
            moveDown: string;
            moveBottom: string;
            moveToTarget: string;
            moveToSource: string;
            moveAllToTarget: string;
            moveAllToSource: string;
            pageLabel: string;
            firstPageLabel: string;
            lastPageLabel: string;
            nextPageLabel: string;
            previousPageLabel: string;
            rowsPerPageLabel: string;
            jumpToPageDropdownLabel: string;
            jumpToPageInputLabel: string;
            selectRow: string;
            unselectRow: string;
            expandRow: string;
            collapseRow: string;
            showFilterMenu: string;
            hideFilterMenu: string;
            filterOperator: string;
            filterConstraint: string;
            editRow: string;
            saveEdit: string;
            cancelEdit: string;
            listView: string;
            gridView: string;
            slide: string;
            slideNumber: string;
            zoomImage: string;
            zoomIn: string;
            zoomOut: string;
            rotateRight: string;
            rotateLeft: string;
        };
    };
    "de-at": {
        startsWith: string;
        contains: string;
        notContains: string;
        endsWith: string;
        equals: string;
        notEquals: string;
        noFilter: string;
        filter: string;
        lt: string;
        lte: string;
        gt: string;
        gte: string;
        dateIs: string;
        dateIsNot: string;
        dateBefore: string;
        dateAfter: string;
        custom: string;
        clear: string;
        apply: string;
        matchAll: string;
        matchAny: string;
        addRule: string;
        removeRule: string;
        accept: string;
        reject: string;
        choose: string;
        upload: string;
        cancel: string;
        completed: string;
        pending: string;
        fileSizeTypes: string[];
        dayNames: string[];
        dayNamesShort: string[];
        dayNamesMin: string[];
        monthNames: string[];
        monthNamesShort: string[];
        chooseYear: string;
        chooseMonth: string;
        chooseDate: string;
        prevDecade: string;
        nextDecade: string;
        prevYear: string;
        nextYear: string;
        prevMonth: string;
        nextMonth: string;
        prevHour: string;
        nextHour: string;
        prevMinute: string;
        nextMinute: string;
        prevSecond: string;
        nextSecond: string;
        am: string;
        pm: string;
        today: string;
        now: string;
        weekHeader: string;
        firstDayOfWeek: number;
        showMonthAfterYear: boolean;
        dateFormat: string;
        weak: string;
        medium: string;
        strong: string;
        passwordPrompt: string;
        emptyFilterMessage: string;
        searchMessage: string;
        selectionMessage: string;
        emptySelectionMessage: string;
        emptySearchMessage: string;
        emptyMessage: string;
        openMenu: string;
        toggleColorMode: string;
        signOut: string;
        profile: string;
        filesSelected: string;
        dragFilesHere: string;
        filesBeingDropped: string;
        typeNotSupported: string;
        maximumAllowedFiles: string;
        remove: string;
        edit: string;
        save: string;
        generatePhoto: string;
        settings: string;
        addCategory: string;
        addItem: string;
        delete: string;
        any: string;
        chooseFile: string;
        greaterThan: string;
        greaterThanOrEqualTo: string;
        lessThan: string;
        lessThanOrEqualTo: string;
        between: string;
        include: string;
        equal: string;
        after: string;
        before: string;
        not: string;
        aria: {
            trueLabel: string;
            falseLabel: string;
            nullLabel: string;
            star: string;
            stars: string;
            selectAll: string;
            unselectAll: string;
            close: string;
            previous: string;
            next: string;
            navigation: string;
            scrollTop: string;
            moveTop: string;
            moveUp: string;
            moveDown: string;
            moveBottom: string;
            moveToTarget: string;
            moveToSource: string;
            moveAllToTarget: string;
            moveAllToSource: string;
            pageLabel: string;
            firstPageLabel: string;
            lastPageLabel: string;
            nextPageLabel: string;
            previousPageLabel: string;
            rowsPerPageLabel: string;
            jumpToPageDropdownLabel: string;
            jumpToPageInputLabel: string;
            selectRow: string;
            unselectRow: string;
            expandRow: string;
            collapseRow: string;
            showFilterMenu: string;
            hideFilterMenu: string;
            filterOperator: string;
            filterConstraint: string;
            editRow: string;
            saveEdit: string;
            cancelEdit: string;
            listView: string;
            gridView: string;
            slide: string;
            slideNumber: string;
            zoomImage: string;
            zoomIn: string;
            zoomOut: string;
            rotateRight: string;
            rotateLeft: string;
        };
    };
    "en-au": {
        startsWith: string;
        contains: string;
        notContains: string;
        endsWith: string;
        equals: string;
        notEquals: string;
        noFilter: string;
        filter: string;
        lt: string;
        lte: string;
        gt: string;
        gte: string;
        dateIs: string;
        dateIsNot: string;
        dateBefore: string;
        dateAfter: string;
        custom: string;
        clear: string;
        apply: string;
        matchAll: string;
        matchAny: string;
        addRule: string;
        removeRule: string;
        accept: string;
        reject: string;
        choose: string;
        upload: string;
        cancel: string;
        completed: string;
        pending: string;
        fileSizeTypes: string[];
        dayNames: string[];
        dayNamesShort: string[];
        dayNamesMin: string[];
        monthNames: string[];
        monthNamesShort: string[];
        chooseYear: string;
        chooseMonth: string;
        chooseDate: string;
        prevDecade: string;
        nextDecade: string;
        prevYear: string;
        nextYear: string;
        prevMonth: string;
        nextMonth: string;
        prevHour: string;
        nextHour: string;
        prevMinute: string;
        nextMinute: string;
        prevSecond: string;
        nextSecond: string;
        am: string;
        pm: string;
        today: string;
        now: string;
        weekHeader: string;
        firstDayOfWeek: number;
        showMonthAfterYear: boolean;
        dateFormat: string;
        weak: string;
        medium: string;
        strong: string;
        passwordPrompt: string;
        emptyFilterMessage: string;
        searchMessage: string;
        selectionMessage: string;
        emptySelectionMessage: string;
        emptySearchMessage: string;
        emptyMessage: string;
        openMenu: string;
        toggleColorMode: string;
        signOut: string;
        profile: string;
        filesSelected: string;
        dragFilesHere: string;
        filesBeingDropped: string;
        typeNotSupported: string;
        maximumAllowedFiles: string;
        remove: string;
        edit: string;
        save: string;
        generatePhoto: string;
        settings: string;
        addCategory: string;
        addItem: string;
        delete: string;
        any: string;
        chooseFile: string;
        greaterThan: string;
        greaterThanOrEqualTo: string;
        lessThan: string;
        lessThanOrEqualTo: string;
        between: string;
        include: string;
        equal: string;
        after: string;
        before: string;
        not: string;
        aria: {
            trueLabel: string;
            falseLabel: string;
            nullLabel: string;
            star: string;
            stars: string;
            selectAll: string;
            unselectAll: string;
            close: string;
            previous: string;
            next: string;
            navigation: string;
            scrollTop: string;
            moveTop: string;
            moveUp: string;
            moveDown: string;
            moveBottom: string;
            moveToTarget: string;
            moveToSource: string;
            moveAllToTarget: string;
            moveAllToSource: string;
            pageLabel: string;
            firstPageLabel: string;
            lastPageLabel: string;
            nextPageLabel: string;
            previousPageLabel: string;
            rowsPerPageLabel: string;
            jumpToPageDropdownLabel: string;
            jumpToPageInputLabel: string;
            selectRow: string;
            unselectRow: string;
            expandRow: string;
            collapseRow: string;
            showFilterMenu: string;
            hideFilterMenu: string;
            filterOperator: string;
            filterConstraint: string;
            editRow: string;
            saveEdit: string;
            cancelEdit: string;
            listView: string;
            gridView: string;
            slide: string;
            slideNumber: string;
            zoomImage: string;
            zoomIn: string;
            zoomOut: string;
            rotateRight: string;
            rotateLeft: string;
        };
    };
    "en-gb": {
        startsWith: string;
        contains: string;
        notContains: string;
        endsWith: string;
        equals: string;
        notEquals: string;
        noFilter: string;
        filter: string;
        lt: string;
        lte: string;
        gt: string;
        gte: string;
        dateIs: string;
        dateIsNot: string;
        dateBefore: string;
        dateAfter: string;
        custom: string;
        clear: string;
        apply: string;
        matchAll: string;
        matchAny: string;
        addRule: string;
        removeRule: string;
        accept: string;
        reject: string;
        choose: string;
        upload: string;
        cancel: string;
        completed: string;
        pending: string;
        fileSizeTypes: string[];
        dayNames: string[];
        dayNamesShort: string[];
        dayNamesMin: string[];
        monthNames: string[];
        monthNamesShort: string[];
        chooseYear: string;
        chooseMonth: string;
        chooseDate: string;
        prevDecade: string;
        nextDecade: string;
        prevYear: string;
        nextYear: string;
        prevMonth: string;
        nextMonth: string;
        prevHour: string;
        nextHour: string;
        prevMinute: string;
        nextMinute: string;
        prevSecond: string;
        nextSecond: string;
        am: string;
        pm: string;
        today: string;
        now: string;
        weekHeader: string;
        firstDayOfWeek: number;
        showMonthAfterYear: boolean;
        dateFormat: string;
        weak: string;
        medium: string;
        strong: string;
        passwordPrompt: string;
        emptyFilterMessage: string;
        searchMessage: string;
        selectionMessage: string;
        emptySelectionMessage: string;
        emptySearchMessage: string;
        emptyMessage: string;
        openMenu: string;
        toggleColorMode: string;
        signOut: string;
        profile: string;
        filesSelected: string;
        dragFilesHere: string;
        filesBeingDropped: string;
        typeNotSupported: string;
        maximumAllowedFiles: string;
        remove: string;
        edit: string;
        save: string;
        generatePhoto: string;
        settings: string;
        addCategory: string;
        addItem: string;
        delete: string;
        any: string;
        chooseFile: string;
        greaterThan: string;
        greaterThanOrEqualTo: string;
        lessThan: string;
        lessThanOrEqualTo: string;
        between: string;
        include: string;
        equal: string;
        after: string;
        before: string;
        not: string;
        aria: {
            trueLabel: string;
            falseLabel: string;
            nullLabel: string;
            star: string;
            stars: string;
            selectAll: string;
            unselectAll: string;
            close: string;
            previous: string;
            next: string;
            navigation: string;
            scrollTop: string;
            moveTop: string;
            moveUp: string;
            moveDown: string;
            moveBottom: string;
            moveToTarget: string;
            moveToSource: string;
            moveAllToTarget: string;
            moveAllToSource: string;
            pageLabel: string;
            firstPageLabel: string;
            lastPageLabel: string;
            nextPageLabel: string;
            previousPageLabel: string;
            rowsPerPageLabel: string;
            jumpToPageDropdownLabel: string;
            jumpToPageInputLabel: string;
            selectRow: string;
            unselectRow: string;
            expandRow: string;
            collapseRow: string;
            showFilterMenu: string;
            hideFilterMenu: string;
            filterOperator: string;
            filterConstraint: string;
            editRow: string;
            saveEdit: string;
            cancelEdit: string;
            listView: string;
            gridView: string;
            slide: string;
            slideNumber: string;
            zoomImage: string;
            zoomIn: string;
            zoomOut: string;
            rotateRight: string;
            rotateLeft: string;
        };
    };
    "zh-CN": {
        startsWith: string;
        contains: string;
        notContains: string;
        endsWith: string;
        equals: string;
        notEquals: string;
        noFilter: string;
        filter: string;
        lt: string;
        lte: string;
        gt: string;
        gte: string;
        dateIs: string;
        dateIsNot: string;
        dateBefore: string;
        dateAfter: string;
        custom: string;
        clear: string;
        apply: string;
        matchAll: string;
        matchAny: string;
        addRule: string;
        removeRule: string;
        accept: string;
        reject: string;
        choose: string;
        upload: string;
        cancel: string;
        completed: string;
        pending: string;
        dayNames: string[];
        dayNamesShort: string[];
        dayNamesMin: string[];
        monthNames: string[];
        monthNamesShort: string[];
        chooseYear: string;
        chooseMonth: string;
        chooseDate: string;
        prevDecade: string;
        nextDecade: string;
        prevYear: string;
        nextYear: string;
        prevMonth: string;
        nextMonth: string;
        prevHour: string;
        nextHour: string;
        prevMinute: string;
        nextMinute: string;
        prevSecond: string;
        nextSecond: string;
        am: string;
        pm: string;
        today: string;
        weekHeader: string;
        firstDayOfWeek: number;
        showMonthAfterYear: boolean;
        dateFormat: string;
        weak: string;
        medium: string;
        strong: string;
        passwordPrompt: string;
        emptyFilterMessage: string;
        searchMessage: string;
        selectionMessage: string;
        emptySelectionMessage: string;
        emptySearchMessage: string;
        emptyMessage: string;
        openMenu: string;
        toggleColorMode: string;
        signOut: string;
        profile: string;
        filesSelected: string;
        dragFilesHere: string;
        filesBeingDropped: string;
        typeNotSupported: string;
        maximumAllowedFiles: string;
        remove: string;
        edit: string;
        save: string;
        generatePhoto: string;
        settings: string;
        addCategory: string;
        addItem: string;
        delete: string;
        any: string;
        chooseFile: string;
        greaterThan: string;
        greaterThanOrEqualTo: string;
        lessThan: string;
        lessThanOrEqualTo: string;
        between: string;
        include: string;
        equal: string;
        after: string;
        before: string;
        not: string;
        aria: {
            trueLabel: string;
            falseLabel: string;
            nullLabel: string;
            star: string;
            stars: string;
            selectAll: string;
            unselectAll: string;
            close: string;
            previous: string;
            next: string;
            navigation: string;
            scrollTop: string;
            moveTop: string;
            moveUp: string;
            moveDown: string;
            moveBottom: string;
            moveToTarget: string;
            moveToSource: string;
            moveAllToTarget: string;
            moveAllToSource: string;
            pageLabel: string;
            firstPageLabel: string;
            lastPageLabel: string;
            nextPageLabel: string;
            previousPageLabel: string;
            rowsPerPageLabel: string;
            jumpToPageDropdownLabel: string;
            jumpToPageInputLabel: string;
            selectRow: string;
            unselectRow: string;
            expandRow: string;
            collapseRow: string;
            showFilterMenu: string;
            hideFilterMenu: string;
            filterOperator: string;
            filterConstraint: string;
            editRow: string;
            saveEdit: string;
            cancelEdit: string;
            listView: string;
            gridView: string;
            slide: string;
            slideNumber: string;
            zoomImage: string;
            zoomIn: string;
            zoomOut: string;
            rotateRight: string;
            rotateLeft: string;
        };
    };
    "zh-TW": {
        startsWith: string;
        contains: string;
        notContains: string;
        endsWith: string;
        equals: string;
        notEquals: string;
        noFilter: string;
        filter: string;
        lt: string;
        lte: string;
        gt: string;
        gte: string;
        dateIs: string;
        dateIsNot: string;
        dateBefore: string;
        dateAfter: string;
        custom: string;
        clear: string;
        apply: string;
        matchAll: string;
        matchAny: string;
        addRule: string;
        removeRule: string;
        accept: string;
        reject: string;
        choose: string;
        upload: string;
        cancel: string;
        completed: string;
        pending: string;
        fileSizeTypes: string[];
        dayNames: string[];
        dayNamesShort: string[];
        dayNamesMin: string[];
        monthNames: string[];
        monthNamesShort: string[];
        chooseYear: string;
        chooseMonth: string;
        chooseDate: string;
        prevDecade: string;
        nextDecade: string;
        prevYear: string;
        nextYear: string;
        prevMonth: string;
        nextMonth: string;
        prevHour: string;
        nextHour: string;
        prevMinute: string;
        nextMinute: string;
        prevSecond: string;
        nextSecond: string;
        am: string;
        pm: string;
        today: string;
        now: string;
        weekHeader: string;
        firstDayOfWeek: number;
        showMonthAfterYear: boolean;
        dateFormat: string;
        weak: string;
        medium: string;
        strong: string;
        passwordPrompt: string;
        emptyFilterMessage: string;
        searchMessage: string;
        selectionMessage: string;
        emptySelectionMessage: string;
        emptySearchMessage: string;
        emptyMessage: string;
        openMenu: string;
        toggleColorMode: string;
        signOut: string;
        profile: string;
        filesSelected: string;
        dragFilesHere: string;
        filesBeingDropped: string;
        typeNotSupported: string;
        maximumAllowedFiles: string;
        remove: string;
        edit: string;
        save: string;
        generatePhoto: string;
        settings: string;
        addCategory: string;
        addItem: string;
        delete: string;
        any: string;
        chooseFile: string;
        greaterThan: string;
        greaterThanOrEqualTo: string;
        lessThan: string;
        lessThanOrEqualTo: string;
        between: string;
        include: string;
        equal: string;
        after: string;
        before: string;
        not: string;
        aria: {
            trueLabel: string;
            falseLabel: string;
            nullLabel: string;
            star: string;
            stars: string;
            selectAll: string;
            unselectAll: string;
            close: string;
            previous: string;
            next: string;
            navigation: string;
            scrollTop: string;
            moveTop: string;
            moveUp: string;
            moveDown: string;
            moveBottom: string;
            moveToTarget: string;
            moveToSource: string;
            moveAllToTarget: string;
            moveAllToSource: string;
            pageLabel: string;
            firstPageLabel: string;
            lastPageLabel: string;
            nextPageLabel: string;
            previousPageLabel: string;
            rowsPerPageLabel: string;
            jumpToPageDropdownLabel: string;
            jumpToPageInputLabel: string;
            selectRow: string;
            unselectRow: string;
            expandRow: string;
            collapseRow: string;
            showFilterMenu: string;
            hideFilterMenu: string;
            filterOperator: string;
            filterConstraint: string;
            editRow: string;
            saveEdit: string;
            cancelEdit: string;
            listView: string;
            gridView: string;
            slide: string;
            slideNumber: string;
            zoomImage: string;
            zoomIn: string;
            zoomOut: string;
            rotateRight: string;
            rotateLeft: string;
        };
    };
};

export { CustomAccordion as Accordion, Alert, KitsAnimatePresence as AnimatePresence, AnyFile, AuthLayout, Badge, Box, BreadCrumb, Button, Card, Center, Checkboxes, CircularProgress, Collapse, ColorPicker, CombinedElement, Container$1 as Container, Container as ContainerElement, CustomPopover, DataView, DataViewContext, DateField, DetailList as DetailsList, Divider, EDateFormat, EKeyFilter, Editable, FIELD_LABEL_MARGIN, FIELD_MARGIN, FileUploader, Flex, Form, FormSelect, GUTTER, Form as GoForm, Datatable as GoTable, Grid, GridItem, Group, HELPER_TEXT_MARGIN, HStack, Heading, Icon, IconMap, Image, InputNumber, KitsInputSwitch as InputSwitch, InputText, KeyboardNavContext, KitsAutoComplete, KitsCascadeSelect, KitsCheckbox as KitsCheckboxes, KitsConfirm, KitsContainer, KitsInputCalendar as KitsDatepicker, KitsDialogControlled as KitsDialog, KitsDropdown, FilePicker as KitsFilePicker, KitsInputColorPicker, KitsInputLocation, KitsInputMask, KitsInputNumber, KitsInputPassword, KitsInputText, KitsInputTextarea, KitsListBox, KitsMultiSelect, KitsPhoneComponent, KitsRadio as KitsRadios, KitsSliders, KitsThemeProvider, KitsToast, KitsTreeSelect, Label, Link, List, Select as ListBox, ListItem, Loader, LocaleContext, LocaleContextProvider, Location, MainContext, MainContextProvider, KitsMultiSelect as MultiSelect, Select as NormalSelect, ObjectElement, Password, Phone, Radios, SPACER, KitsScrollView as ScrollView, Select, SelectButton, Skeleton, SkeletonRows, Skeleton$1 as SkeletonText, Svg, Switch, TableContext, Select as TagsSelect, Text, Textarea, ThemeContextProvider, Tooltip, Translate, TreeView, TriStateCheckbox, VStack, index_native as Widgets, borderProperties, breakpoints, capitalizeFirstLetter, checkExtAgainstAccepted, checkNameDuplication, convertSize, dateTimeFormat, deepMerge, defaultSeverityTheme, defaultTheme, downloadCanvas, dynamicList, extendTheme, fileTypeIcon, fileValidation, filesExt, filesMemes, filesTypes, fontSizeMapping, formFileValidation, getCombinedChildIds, getCustomDateTime, getDateElements, getDefaultValues, getMeme, getParams, getPropertyByPath, getType, getTypes, getURLParams, imagesExt, imagesMemes, imagesTypes, isNumber, isSemanticToken, isThemeToken, isToday, isValidURL, listingProperties, localeFiles, allProperties as mapCssProperties, mergeRefs, nonPxProperties, propertiesWithoutCssEquivalent, pxProperties, resolveTokenValue, schemaBuilder, sizeMapping, sizingProperties, timeAgo, timeSince, toArray, toMemes, useAllSeverityColors, useButton, useComponentDefaults, useDataView, useDialog, useDisclosure, useFieldLogic, useFocusStyles, useFormFieldKeyboardNav, useFormManager, useKeyboardNav, useKeyboardNavProvider, useKitsColorScheme, useKitsConcerto, useKitsTheme, useLanguage, useNativeColorMap, usePopup, useResolvedStyle, useScrollState, useSelectionController, useSeverityColors, useTable, useTheme };
export type { AlignmentsValues, AnimationsValues, BaseFieldProps, Booleanish, Breakpoint, CallbackProps, ChartData, ColorMode, ColorScale, ColorValue, Colors, ColorsType, ComponentSize, ConfirmDialogOptions, ConfirmDialogProps, ConfirmDialogReturn, CustomSubmitButtonProps, DataTableSelectionSingleChangeEvent, DeepPartial, DetailItemInputType, DialogProps, DynamicValue, ElementProps, EnteringAnimation, ExitingAnimation, ExpandedKeys, FetchError, FetchSuccess, FetchTableDataRes, FetchTablePaginationData, FieldWrapperProps, File$1 as File, FileTypeMap, FileUploaderTemplate, FileUploaderTemplateParams, FlexAlignmentsValues, FlexValues, FormBooleanEvent, FormBooleanTarget, FormEvent, FormTarget, GroupFieldConfigs, HighSizingValue, IAccordionProps, IAddressExperianFormat, IAddressFormat, IAddressFormatResults, IAddressSearchResults, IAlertComponent, IAlertProps, IAlignment, IAnimation, IAutoCompleteCore, IAutoCompleteElement, IBarChartProps, IBg, IBodyTemplate, IBorder, IBoxComponent, IButton, IButtonParams, IButtonProps, IButtonState, IButtonsFilter, ICardComponent, ICascadeSelect, ICascadeSelectCore, ICheckbox, ICheckboxFilter, IChildren, IChildrenParams, ICircularProgressProps, ICollapseProps, IColorPicker, IColumn, IColumnBase, ICombined, IComponentThemeConfig, IConfirmDialogProps, IConfirmPopupProps, IContainer, IContainerProps, IContextValues, ICountrySearchResults, ICssStyling, IDVButtonsFilter, IDVCheckboxFilter, IDVDateFilter, IDVDropdownFilter, IDVFilters, IDVMessages, IDVMultiselectFilter, IDVNumberFilter, IDVPaginationRequest, IDVPaginationResponse, IDVPaginationState, IDVPhoneFilter, IDVRangeFilter, IDVTextFilter, IDVTriStateFilter, IDataTableContextValues, IDataTableProps, IDataViewContextValues, IDataViewProps, IDataViewRefValues, IDatatableRefValues, IDate, IDateFilter, IDateProps, IDetailItem, IDetailListProps, IDialogButton, IDialogProps, IDialogRef, IDialogState, IDisplay, IDividerComponent, IDoughnutChartProps, IDropdownCore, IDropdownFilter, IDropdownSelect, IEditableProps, IEditors, IEffects, IElementBase, IElementStyle, IEmail, IEmailSearchResults, IFile, IFileUploader, IFileUploaderElement, IFileUploaderTypes, IFilesExtTypeKeys, IFilters, IFlexAlignment, IFlexComponent, IFormAddon, IFormComponent, IFormContextPropsFormData, IFormContextPropsJSON, IFormElement, IFormGrid, IFormListsElements, IFormSelect, IFormSelectElements, IFormSingleElement, IGrid, IGridComponent, IGridItem, IGridItemComponent, IGroup, IGroupSettings, IHeadingComponent, IIconProps, IImageComponent, IImagesExtTypeKeys, IInteractivity, IKeyedColumn, IKitsAnimation, IKitsCheckboxProps, IKitsComponentDefaults, IKitsContainer, IKitsDialogControlled, IKitsInputCalendar, IKitsInputColorPicker, IKitsInputLocation, IKitsInputMask, IKitsInputNumber, IKitsInputPassword, IKitsInputRating, IKitsInputSwitch, IKitsInputText, IKitsInputTextarea, IKitsPhoneInput, IKitsRadioProps, IKitsTheme, IKitsThemeColors, IKitsThemeConfig, IKitsThemeContextValues, IKitsThemeFontSizes, IKitsThemeFontWeights, IKitsThemeFonts, IKitsThemeLineHeights, IKitsThemeRadii, IKitsThemeShadows, IKitsThemeSpacing, IKitsToastRef, ILabelElement, ILabelProps, ILanguage, ILayout, ILineChartProps, ILinkComponent, ILinkOverrides, IList, IListBoxCore, IListBoxElement, IListBoxSelect, IListItem, IListing, ILoaderProps, ILocaleContextProps, ILocaleContextValues, ILocation, ILocationDetailsResponse, ILocationResponse, IMainContextProps, IMainContextValues, IMemes, IMenuItem, IMessages, IMinusButton, IModalComponent, IModalFormProps, IMultiSelect, IMultiSelectCore, IMultiselect, IMultiselectFilter, INativeProps, INonCrossPlatformTypes, INumberFilter, INumberInput, INumberProps, IObjectGroup, IOneOfTypes, IPageISection, IPaginationRequest, IPaginationResponse, IPassword, IPasswordProps, IPhone, IPhoneFilter, IPhoneObjectValue, IPhoneValidationResults, IPhoneValue, IPieChartProps, IPlusButton, IPolarAreaChartProps, IPopoverProps, IRTLDetection, IRadarChartProps, IRadioCheckboxListItem, IRadioGroup, IRangeFilter, IRef, IRepeatableSettings, IResponsiveElement, ISVGComponent, IScrollViewComponent, ISelect, ISelectBase, ISelectCore, ISelectElement, ISelectType, ISelectedFile, ISelectedFileType, ISeverityColorSlots, ISeverityThemeMap, ISizing, ISkeleton, ISkeletonRowsProps, ISkeletonText, ISliderProps, ISpacing, IStackProps, IStatisticsProps, IStats, IStyleClasses, ISwitch, ITags, IText, ITextComponent, ITextFieldProps, ITextFilter, ITextInput, ITextInputProps, ITextarea, IThemeContextProps, IThemeContextValues, IToastFunction, IToastParams, IToolbarProps, ITransforms, ITransition, ITranslateComponent, ITreeItem, ITreeSelect, ITreeSelectCore, ITreeSelectElement, ITreeSelectNode, ITreeViewProps, ITriStateFilter, IUnkeyedColumn, IUseFormReturn, IWidgetBarIncomingProp, IWidgetChartContextProps, IWidgetChartProp, IWidgetData, IWidgetDoughnutIncomingProp, IWidgetLineIncomingProp, IWidgetPieIncomingProp, IWidgetPolarAreaIncomingProp, IWidgetRadarIncomingProp, IconName, IconType, ImageTypeMap, InputTextFieldProps, KitsBreakpoint, KitsConditionalObject, KitsDevice, KitsOrientation, KitsPlatform, KitsResponsiveObject, KitsResponsiveValue, KitsThemeOverride, LabelVariant, LogicFunction, MeasurementValues, MimeOrArray, NativeLinkProps, NativeModalProps, Nullable, Numbering0_12, Numbering0_32, Numberish, OnSubmitHandler, Orientation, PaginationState, Permissions, PlatformKey, PrimeTooltipProps, SelectFieldProps, SemanticColorTokens, ServerMethod, ServerResponse, ServerSideProps, SetManyOpts, Severity, Shades, Shapes, SidesValues, SizingNumbering, SizingValue, SliderChangeEvent, SortOrder$1 as SortOrder, TextLabels, TextProps, Timeout, TimingNumbering, ToastPosition, ToastSeverity, ToastSize, TooltipDataAttributes, TooltipProps, TreeChangeProps, TreeCheckboxSelectionKeyType, TreeCheckboxSelectionKeys, TreeNode, TreeNodeClickEvent, TreeNodeTemplateOptions, TreeProps, TreeRef, TreeSelectionEvent, TreeViewProps, Types, UseComponentDefaultsResult, UseDisclosureReturnType, UseFieldLogicElementProps, UseFieldLogicProps, UseFieldLogicReturn, UseFormManagerEvents, UseFormManagerReturn, ValidationProps, Various, children, clearFunction, downloadableFileResponse, settings1, settings2 };
