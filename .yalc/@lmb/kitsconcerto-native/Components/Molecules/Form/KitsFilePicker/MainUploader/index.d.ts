import React from "react";
import { type IFileUploader, type File } from "@lmb/kitsconcerto-types";
interface IFileUploaderContextValues {
    onChangeAnyFileUploader(files: File[]): void;
    onPick(): void;
    removeFile(fileIndex: number): () => void;
    onInvalidInput(errors: any): void;
    selectedFiles: File[];
    selectedInitialFiles: string[];
    placeholder?: string;
    disabled?: boolean;
    isClassicUploader: boolean;
    limit: number;
    acceptedMemes: string[];
    files: {
        name: string;
        ext: string;
        shortName: string;
        file: {
            uri: string;
        } | string;
    }[];
    id: string;
    isImage: boolean;
}
export declare const FileUploaderContext: React.Context<IFileUploaderContextValues>;
declare const MainUploader: (props: IFileUploader) => import("react/jsx-runtime").JSX.Element;
export default MainUploader;
export declare const useUploader: () => IFileUploaderContextValues;
//# sourceMappingURL=index.native.d.ts.map