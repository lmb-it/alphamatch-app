import { createContext, useContext, useRef, useCallback } from 'react';

const KeyboardNavContext = createContext(null);
const useKeyboardNav = () => useContext(KeyboardNavContext);
function useKeyboardNavProvider() {
  const refsMap = useRef(/* @__PURE__ */ new Map());
  const elementsOrder = useRef([]);
  const register = useCallback((id, ref) => {
    refsMap.current.set(id, ref);
  }, []);
  const unregister = useCallback((id) => {
    refsMap.current.delete(id);
  }, []);
  const setElementsOrder = useCallback((ids) => {
    elementsOrder.current = ids;
  }, []);
  const getNavProps = useCallback((id) => {
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
  const focusNext = useCallback((currentId) => {
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

export { KeyboardNavContext, useKeyboardNav, useKeyboardNavProvider };
//# sourceMappingURL=useKeyboardNavigation.js.map
