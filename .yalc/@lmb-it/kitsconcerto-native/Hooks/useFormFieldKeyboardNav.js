import { useRef, useEffect } from 'react';
import { useKeyboardNav } from './useKeyboardNavigation.js';

function useFormFieldKeyboardNav(id) {
  const inputRef = useRef(null);
  const nav = useKeyboardNav();
  useEffect(() => {
    if (!id || !nav) return;
    nav.register(id, inputRef);
    return () => nav.unregister(id);
  }, [id, nav]);
  const navProps = id && nav ? nav.getNavProps(id) : {};
  const focusNext = id && nav ? () => nav.focusNext(id) : void 0;
  return { inputRef, navProps, focusNext };
}

export { useFormFieldKeyboardNav };
//# sourceMappingURL=useFormFieldKeyboardNav.js.map
