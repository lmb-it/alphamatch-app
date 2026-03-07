import { useState, useCallback } from 'react';

const useDisclosure = (defaultIsOpen = false) => {
  const [isOpen, setIsOpen] = useState(defaultIsOpen);
  const onToggle = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);
  const onOpen = useCallback(() => {
    setIsOpen(true);
  }, []);
  const onClose = useCallback(() => {
    setIsOpen(false);
  }, []);
  return { isOpen, onOpen, onClose, onToggle };
};

export { useDisclosure as default };
//# sourceMappingURL=useDisclosure.js.map
