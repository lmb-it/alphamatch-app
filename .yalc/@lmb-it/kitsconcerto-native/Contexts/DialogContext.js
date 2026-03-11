import { jsxs, jsx } from 'react/jsx-runtime';
import { createContext, useRef, useState, useCallback, useEffect, useMemo, useContext } from 'react';
import KitsToast from '../Components/Molecules/KitsToast/index.js';
import KitsConfirm from '../Components/Molecules/KitsConfirm/index.js';
import KitsDialogControlled from '../Components/Molecules/KitsDialog/index.js';
import KitsConfirmPopup from '../Components/Molecules/KitsConfirmPopup/index.js';

const PopupContext = createContext(null);
const PopupProvider = ({ children }) => {
  const toastRef = useRef(null);
  const [confirmState, setConfirmState] = useState({ visible: false });
  const confirmPromiseRef = useRef({});
  const hideConfirm = useCallback(() => setConfirmState((s) => ({ ...s, visible: false })), []);
  const doAccept = useCallback(() => {
    confirmPromiseRef.current.resolve?.(true);
    confirmPromiseRef.current = {};
    hideConfirm();
  }, [hideConfirm]);
  const doReject = useCallback(() => {
    confirmPromiseRef.current.resolve?.(false);
    confirmPromiseRef.current = {};
    hideConfirm();
  }, [hideConfirm]);
  const [confirmPopupState, setConfirmPopupState] = useState({ visible: false });
  const hideConfirmPopup = useCallback((result) => setConfirmPopupState((s) => ({ ...s, visible: false })), []);
  const [dialogState, setDialogState] = useState({ visible: false });
  const onCloseRef = useRef();
  useEffect(() => {
    onCloseRef.current = dialogState.onClose;
  }, [dialogState.onClose]);
  const hideDialog = useCallback(() => {
    setDialogState((s) => ({ ...s, visible: false }));
    onCloseRef.current?.();
  }, []);
  useEffect(() => {
    return () => {
      confirmPromiseRef.current.reject?.();
      confirmPromiseRef.current = {};
    };
  }, []);
  const toast = useCallback((...a) => {
    toastRef.current?.toast(...a);
  }, []);
  const toastDismiss = useCallback((position) => {
    toastRef.current?.dismiss?.(position);
  }, []);
  const toastDismissAll = useCallback(() => {
    toastRef.current?.dismissAll?.();
  }, []);
  const confirm = useCallback((props) => {
    setConfirmState({ visible: true, acceptLabel: "Accept", rejectLabel: "Reject", ...props });
  }, []);
  const confirmPopup = useCallback((props) => {
    setConfirmPopupState({ visible: true, ...props });
  }, []);
  const dialog = useCallback(({ visible = true, ...props }) => {
    setDialogState({ visible, ...props });
  }, []);
  const alert = useCallback((message, opts = {}) => new Promise((resolve) => {
    confirmPromiseRef.current = { resolve: () => resolve() };
    setConfirmState({
      visible: true,
      header: opts.header ?? "Alert",
      message,
      defaultUI: true,
      acceptLabel: opts.acceptLabel ?? "OK",
      type: opts.type,
      icon: opts.icon,
      headless: opts.headless
    });
  }), []);
  const confirmAsync = useCallback((opts) => new Promise((resolve) => {
    confirmPromiseRef.current = { resolve };
    setConfirmState({
      visible: true,
      defaultUI: true,
      acceptLabel: opts.acceptLabel ?? "Yes",
      rejectLabel: opts.rejectLabel ?? "No",
      ...opts
    });
  }), []);
  const prompt = useCallback((render, opts = {}) => new Promise((resolve, reject) => {
    confirmPromiseRef.current = { resolve, reject };
    const hide = () => {
      setDialogState((s) => ({ ...s, visible: false }));
      confirmPromiseRef.current = {};
    };
    setDialogState({
      visible: true,
      header: opts.header,
      children: render({
        resolve: (v) => {
          resolve(v);
          hide();
        },
        reject: () => {
          reject();
          hide();
        },
        hide
      })
    });
  }), []);
  const value = useMemo(() => ({
    confirm,
    confirmPopup,
    dialog,
    toast,
    toastDismiss,
    toastDismissAll,
    alert,
    confirmAsync,
    prompt
  }), [confirm, confirmPopup, dialog, toast, toastDismiss, toastDismissAll, alert, confirmAsync, prompt]);
  return /* @__PURE__ */ jsxs(PopupContext.Provider, { value, children: [
    children,
    /* @__PURE__ */ jsx(KitsToast, { ref: toastRef }),
    /* @__PURE__ */ jsx(KitsConfirm, { onHide: hideConfirm, accept: doAccept, reject: doReject, ...confirmState }),
    /* @__PURE__ */ jsx(KitsDialogControlled, { state: dialogState, onHide: hideDialog }),
    /* @__PURE__ */ jsx(KitsConfirmPopup, { onHide: hideConfirmPopup, ...confirmPopupState })
  ] });
};
const usePopup = () => useContext(PopupContext);
const useDialog = usePopup;

export { PopupProvider as default, useDialog, usePopup };
//# sourceMappingURL=DialogContext.js.map
