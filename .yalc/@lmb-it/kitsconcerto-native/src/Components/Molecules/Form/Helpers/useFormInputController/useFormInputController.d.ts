interface UseFormInputControllerProps<T> {
    value?: T;
    defaultValue?: T;
    onChange?: (event: {
        target: {
            value: T;
        };
    }) => void;
}
export declare function useFormInputController<T>({ value, defaultValue, onChange, }: UseFormInputControllerProps<T>): {
    value: T;
    emitChange: (next: T) => void;
    onWorkletChange: (value: T) => void;
    currentReanimatedValue: import("react-native-reanimated").SharedValue<T>;
    isControlled: boolean;
};
export {};
//# sourceMappingURL=useFormInputController.native.d.ts.map