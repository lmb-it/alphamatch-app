'use strict';

var React = require('react');

const noop = () => {
};
const noopNavProps = { register: noop, unregister: noop, setElementsOrder: noop, getNavProps: () => ({}) };
const KeyboardNavContext = React.createContext(noopNavProps);
const useKeyboardNav = () => React.useContext(KeyboardNavContext);
function useKeyboardNavProvider() {
  return noopNavProps;
}

exports.KeyboardNavContext = KeyboardNavContext;
exports.useKeyboardNav = useKeyboardNav;
exports.useKeyboardNavProvider = useKeyboardNavProvider;
//# sourceMappingURL=useKeyboardNavigation.cjs.map
