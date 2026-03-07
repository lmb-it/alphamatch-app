/**
 * Shim for react-dom in React Native.
 * Some web-focused libraries (e.g. @react-aria/utils) import react-dom
 * which doesn't exist in RN. This provides no-op stubs.
 */
module.exports = {
  flushSync: (fn) => fn(),
  unstable_batchedUpdates: (fn) => fn(),
  render: () => {},
  createPortal: (children) => children,
  findDOMNode: () => null,
};
