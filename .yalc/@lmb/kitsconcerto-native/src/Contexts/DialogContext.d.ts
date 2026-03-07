import React from "react";
import type { IConfirmDialogProps, IConfirmPopupProps, IDialogState, IToastFunction, ToastPosition } from "@lmb/kitsconcerto-types";
interface Ctx {
    confirm: (props: IConfirmDialogProps) => void;
    confirmPopup: (props: IConfirmPopupProps) => void;
    dialog: (props: IDialogState) => void;
    toast: IToastFunction;
    toastDismiss: (position?: ToastPosition) => void;
    toastDismissAll: () => void;
    alert: (message: React.ReactNode, opts?: IConfirmDialogProps) => Promise<void>;
    confirmAsync: (opts: IConfirmDialogProps) => Promise<boolean>;
    prompt: (render: (api: {
        resolve: (v: any) => void;
        reject: () => void;
        hide: () => void;
    }) => React.ReactNode, opts?: IConfirmDialogProps) => Promise<any>;
}
declare const PopupProvider: React.FC<React.PropsWithChildren>;
export declare const usePopup: () => Ctx;
export declare const useDialog: () => Ctx;
export default PopupProvider;
//# sourceMappingURL=DialogContext.d.ts.map