'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');
var index_native = require('../components/Toast/index.cjs');
var index_native$1 = require('../components/ConfirmDialog/index.cjs');
var index_native$2 = require('../components/Dialog/index.cjs');
var index_native$3 = require('../components/ConfirmPopup/index.cjs');

const PopupContext = React.createContext(null);
const PopupProvider = ({ children }) => {
  const toastRef = React.useRef(null);
  const [confirmState, setConfirmState] = React.useState({ visible: false });
  const confirmPromiseRef = React.useRef({});
  const hideConfirm = React.useCallback(() => setConfirmState((s) => ({ ...s, visible: false })), []);
  const doAccept = React.useCallback(() => {
    confirmPromiseRef.current.resolve?.(true);
    confirmPromiseRef.current = {};
    hideConfirm();
  }, [hideConfirm]);
  const doReject = React.useCallback(() => {
    confirmPromiseRef.current.resolve?.(false);
    confirmPromiseRef.current = {};
    hideConfirm();
  }, [hideConfirm]);
  const [confirmPopupState, setConfirmPopupState] = React.useState({ visible: false });
  const hideConfirmPopup = React.useCallback((result) => setConfirmPopupState((s) => ({ ...s, visible: false })), []);
  const [dialogState, setDialogState] = React.useState({ visible: false });
  const onCloseRef = React.useRef();
  React.useEffect(() => {
    onCloseRef.current = dialogState.onClose;
  }, [dialogState.onClose]);
  const hideDialog = React.useCallback(() => {
    setDialogState((s) => ({ ...s, visible: false }));
    onCloseRef.current?.();
  }, []);
  React.useEffect(() => {
    return () => {
      confirmPromiseRef.current.reject?.();
      confirmPromiseRef.current = {};
    };
  }, []);
  const toast = React.useCallback((...a) => {
    toastRef.current?.toast(...a);
  }, []);
  const toastDismiss = React.useCallback((position) => {
    toastRef.current?.dismiss?.(position);
  }, []);
  const toastDismissAll = React.useCallback(() => {
    toastRef.current?.dismissAll?.();
  }, []);
  const confirm = React.useCallback((props) => {
    setConfirmState({ visible: true, acceptLabel: "Accept", rejectLabel: "Reject", ...props });
  }, []);
  const confirmPopup = React.useCallback((props) => {
    setConfirmPopupState({ visible: true, ...props });
  }, []);
  const dialog = React.useCallback(({ visible = true, ...props }) => {
    setDialogState({ visible, ...props });
  }, []);
  const alert = React.useCallback((message, opts = {}) => new Promise((resolve) => {
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
  const confirmAsync = React.useCallback((opts) => new Promise((resolve) => {
    confirmPromiseRef.current = { resolve };
    setConfirmState({
      visible: true,
      defaultUI: true,
      acceptLabel: opts.acceptLabel ?? "Yes",
      rejectLabel: opts.rejectLabel ?? "No",
      ...opts
    });
  }), []);
  const prompt = React.useCallback((render, opts = {}) => new Promise((resolve, reject) => {
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
  const value = React.useMemo(() => ({
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
  return /* @__PURE__ */ jsxRuntime.jsxs(PopupContext.Provider, { value, children: [
    children,
    /* @__PURE__ */ jsxRuntime.jsx(index_native.default, { ref: toastRef }),
    /* @__PURE__ */ jsxRuntime.jsx(index_native$1.default, { onHide: hideConfirm, accept: doAccept, reject: doReject, ...confirmState }),
    /* @__PURE__ */ jsxRuntime.jsx(index_native$2.default, { state: dialogState, onHide: hideDialog }),
    /* @__PURE__ */ jsxRuntime.jsx(index_native$3.default, { onHide: hideConfirmPopup, ...confirmPopupState })
  ] });
};
const usePopup = () => React.useContext(PopupContext);
const useDialog = usePopup;

exports.default = PopupProvider;
exports.useDialog = useDialog;
exports.usePopup = usePopup;
//# sourceMappingURL=DialogContext.cjs.map
