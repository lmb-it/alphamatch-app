import { type FieldValues } from 'react-hook-form';
import type { UseFieldLogicElementProps } from '@lmb/kitsconcerto-types';
interface ContainerProps<T extends FieldValues> extends UseFieldLogicElementProps<T> {
    parentPath?: string;
}
export declare const Container: <T extends FieldValues>({ element, control, groupField, getValues, parentPath, fieldLogic }: ContainerProps<T>) => import("react/jsx-runtime").JSX.Element;
export default Container;
//# sourceMappingURL=index.d.ts.map