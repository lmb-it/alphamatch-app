'use strict';

var React = require('react');
var Animated = require('react-native-reanimated');

function useFormInputController({
  value,
  defaultValue,
  onChange
}) {
  const isControlled = value !== void 0;
  const currentReanimatedValue = Animated.useSharedValue(defaultValue);
  const [internalValue, setInternalValue] = React.useState(
    defaultValue
  );
  const latestValueRef = React.useRef(value);
  latestValueRef.current = value;
  React.useEffect(() => {
    if (isControlled) {
      setInternalValue(value);
    }
  }, [isControlled, value]);
  const emitChange = (next) => {
    console.log(next);
    if (!isControlled) {
      setInternalValue(next);
    }
    onChange?.({
      target: { value: next }
    });
  };
  const onWorkletChange = (value2) => {
    "worklet";
    currentReanimatedValue.value = value2;
  };
  return {
    value: isControlled ? value : internalValue,
    emitChange,
    onWorkletChange,
    currentReanimatedValue,
    isControlled
  };
}

exports.useFormInputController = useFormInputController;
//# sourceMappingURL=useFormInputController.cjs.map
