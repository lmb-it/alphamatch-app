'use strict';

var React = require('react');

function useButton(props) {
  const { disabled, loading, onPress, onClick, ...rest } = props;
  const [state, setState] = React.useState({
    isPressed: false,
    isHovered: false
  });
  const handlePress = React.useCallback((event) => {
    if (!disabled && !loading && onPress) {
      onPress(event);
    }
    if (!disabled && !loading && onClick) {
      onClick(event);
    }
  }, [disabled, loading, onPress]);
  const handlePressIn = React.useCallback(() => {
    setState((prev) => ({ ...prev, isPressed: true }));
  }, []);
  const handlePressOut = React.useCallback(() => {
    setState((prev) => ({ ...prev, isPressed: false }));
  }, []);
  const handleMouseEnter = React.useCallback(() => {
    setState((prev) => ({ ...prev, isHovered: true }));
  }, []);
  const handleMouseLeave = React.useCallback(() => {
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

exports.useButton = useButton;
//# sourceMappingURL=useButton.cjs.map
