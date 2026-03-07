import { useState, useRef, useEffect } from 'react';
import { useSharedValue } from 'react-native-reanimated';

function useFormInputController({
  value,
  defaultValue,
  onChange
}) {
  const isControlled = value !== void 0;
  const currentReanimatedValue = useSharedValue(defaultValue);
  const [internalValue, setInternalValue] = useState(
    defaultValue
  );
  const latestValueRef = useRef(value);
  latestValueRef.current = value;
  useEffect(() => {
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

export { useFormInputController };
//# sourceMappingURL=useFormInputController.js.map
