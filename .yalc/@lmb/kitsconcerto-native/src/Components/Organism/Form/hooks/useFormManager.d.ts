import { type Dispatch, type SetStateAction } from 'react';
import { type FieldValues, type UseFormReturn } from 'react-hook-form';
import type { IFormComponent } from '@lmb/kitsconcerto-types';
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
export declare const useFormManager: <T extends FieldValues>({ elements, onSubmit, onInvalidSubmit, id, onChange, onChangeSingleValue, outputFormat }: IFormComponent<T>, isSubmitting: boolean, setIsSubmitting: Dispatch<SetStateAction<boolean>>) => UseFormManagerReturn<T>;
//# sourceMappingURL=useFormManager.d.ts.map