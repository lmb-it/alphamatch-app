import * as yup from 'yup';
import type { AnyObject } from 'yup';
import type { IFormElement } from "@lmb/kitsconcerto-types";
/**
 * Safely retrieves a nested property from an object using a string path (e.g., "a.b[0].c").
 * This is useful for accessing nested form errors from react-hook-form's formState.
 *
 * @param {object} obj The object to query.
 * @param {string} path The string path to the desired property.
 * @returns {any} The value at the specified path, or undefined if not found.
 */
export declare const getPropertyByPath: (obj: Record<string, any>, path: string) => any;
interface FileValidationProps {
    min?: number;
    max?: number;
    minKB?: number;
    maxKB?: number;
}
interface FileValidationProps {
    min?: number;
    max?: number;
    minKB?: number;
    maxKB?: number;
}
/**
 * A custom Yup validation test for file and image uploads.
 * Handles single or multiple files, validating count, size, and format (File or URL).
 */
export declare const formFileValidation: ({ min, max, minKB, maxKB }?: FileValidationProps) => yup.MixedSchema<any, AnyObject, any>;
/**
 * Recursively checks for duplicate field IDs at each level of the element tree.
 * Throws an error if a duplicate is found.
 * @param fields The array of elements to check.
 */
export declare const checkNameDuplication: (fields: IFormElement<any>[]) => void;
/**
 * Recursively builds the initial `defaultValues` object for react-hook-form.
 * @param fields The array of elements to process.
 * @returns An object with the form's default values.
 */
export declare const getDefaultValues: (fields: IFormElement<any>[]) => Record<string, any>;
export {};
//# sourceMappingURL=helpers.d.ts.map