'use strict';

var React = require('react');

const KeyboardNavContext = React.createContext(null);
const useKeyboardNav = () => React.useContext(KeyboardNavContext);
function useKeyboardNavProvider() {
  const refsMap = React.useRef(/* @__PURE__ */ new Map());
  const elementsOrder = React.useRef([]);
  const register = React.useCallback((id, ref) => {
    refsMap.current.set(id, ref);
  }, []);
  const unregister = React.useCallback((id) => {
    refsMap.current.delete(id);
  }, []);
  const setElementsOrder = React.useCallback((ids) => {
    elementsOrder.current = ids;
  }, []);
  const getNavProps = React.useCallback((id) => {
    const visibleOrder = elementsOrder.current.filter(
      (eid) => refsMap.current.has(eid)
    );
    const idx = visibleOrder.indexOf(id);
    const isLast = idx !== -1 && idx === visibleOrder.length - 1;
    return {
      returnKeyType: isLast ? "done" : "next",
      blurOnSubmit: isLast,
      // Read from refs at call time via focusNext — avoids stale closure
      onSubmitEditing: () => {
        focusNext(id);
      }
    };
  }, [focusNext]);
  const focusNext = React.useCallback((currentId) => {
    const visibleOrder = elementsOrder.current.filter(
      (eid) => refsMap.current.has(eid)
    );
    const idx = visibleOrder.indexOf(currentId);
    if (idx === -1 || idx === visibleOrder.length - 1) return;
    const nextId = visibleOrder[idx + 1];
    if (nextId) {
      const nextRef = refsMap.current.get(nextId);
      nextRef?.current?.focus();
    }
  }, []);
  const contextValue = {
    register,
    unregister,
    setElementsOrder,
    getNavProps,
    focusNext
  };
  return contextValue;
}

exports.KeyboardNavContext = KeyboardNavContext;
exports.useKeyboardNav = useKeyboardNav;
exports.useKeyboardNavProvider = useKeyboardNavProvider;
//# sourceMappingURL=useKeyboardNavigation.cjs.map
