'use strict';

var React = require('react');
var useKeyboardNavigation_native = require('./useKeyboardNavigation.cjs');

function useFormFieldKeyboardNav(id) {
  const inputRef = React.useRef(null);
  const nav = useKeyboardNavigation_native.useKeyboardNav();
  React.useEffect(() => {
    if (!id || !nav) return;
    nav.register(id, inputRef);
    return () => nav.unregister(id);
  }, [id, nav]);
  const navProps = id && nav ? nav.getNavProps(id) : {};
  const focusNext = id && nav ? () => nav.focusNext(id) : void 0;
  return { inputRef, navProps, focusNext };
}

exports.useFormFieldKeyboardNav = useFormFieldKeyboardNav;
//# sourceMappingURL=useFormFieldKeyboardNav.cjs.map
