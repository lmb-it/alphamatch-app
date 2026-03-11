import { useState, useCallback } from 'react';

function useButton(props) {
  const { disabled, loading, onPress, onClick, ...rest } = props;
  const [state, setState] = useState({
    isPressed: false,
    isHovered: false
  });
  const handlePress = useCallback((event) => {
    if (!disabled && !loading && onPress) {
      onPress(event);
    }
    if (!disabled && !loading && onClick) {
      onClick(event);
    }
  }, [disabled, loading, onPress]);
  const handlePressIn = useCallback(() => {
    setState((prev) => ({ ...prev, isPressed: true }));
  }, []);
  const handlePressOut = useCallback(() => {
    setState((prev) => ({ ...prev, isPressed: false }));
  }, []);
  const handleMouseEnter = useCallback(() => {
    setState((prev) => ({ ...prev, isHovered: true }));
  }, []);
  const handleMouseLeave = useCallback(() => {
    setState((prev) => ({ ...prev, isHovered: false }));
  }, []);
  return {
    state,
    handlers: {
      onClick: handlePress,
      onPressIn: handlePressIn,
      onPressOut: handlePressOut,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave
    },
    _nativeProps: rest,
    isDisabled: disabled || loading
  };
}

export { useButton };
//# sourceMappingURL=useButton.js.map
