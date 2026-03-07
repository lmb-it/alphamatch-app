import * as Yup from "yup";
import type { FieldValues } from 'react-hook-form';
import type { IFormElement } from '@lmb/kitsconcerto-types';
/**
 * Recursively builds a Yup validation schema from an array of form element definitions.
 *
 * @param {IFormElement<T>[]} elements - The array of element configurations.
 * @param id
 * @returns {Yup.ObjectSchema<any>} A Yup object schema representing the form structure.
 */
export declare const schemaBuilder: <T extends FieldValues>(elements: IFormElement<T>[], id: string) => Yup.ObjectSchema<any>;
//# sourceMappingURL=schemaBuilder.d.ts.map