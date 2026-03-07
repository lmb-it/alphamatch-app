'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

const useDisclosure = (defaultIsOpen = false) => {
  const [isOpen, setIsOpen] = React.useState(defaultIsOpen);
  const onToggle = React.useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);
  const onOpen = React.useCallback(() => {
    setIsOpen(true);
  }, []);
  const onClose = React.useCallback(() => {
    setIsOpen(false);
  }, []);
  return { isOpen, onOpen, onClose, onToggle };
};

exports.default = useDisclosure;
//# sourceMappingURL=useDisclosure.cjs.map
