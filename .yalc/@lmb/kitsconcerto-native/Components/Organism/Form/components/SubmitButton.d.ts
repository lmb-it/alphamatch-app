import type { UseFormReturn } from "react-hook-form";
import type { CustomSubmitButtonProps } from "@lmb/kitsconcerto-types";
interface SubmitButtonProps {
    isSubmitting: boolean;
    handleSubmit: () => void;
    submitButtonProps?: CustomSubmitButtonProps;
    formMethods: UseFormReturn<any>;
}
export declare const SubmitButton: ({ isSubmitting, handleSubmit, submitButtonProps, formMethods }: SubmitButtonProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=SubmitButton.d.ts.map