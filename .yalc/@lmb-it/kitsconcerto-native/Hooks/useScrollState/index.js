import { useRef, useState } from 'react';
import { computeScrollState } from './helper.js';

const useScrollState = (options = {}) => {
  const { threshold = 60 } = options;
  const lastY = useRef(0);
  const [scrollState, setScrollState] = useState({
    y: 0,
    isScrolled: false,
    direction: "up"
  });
  const onScroll = (e) => {
    const y = e.nativeEvent.contentOffset.y;
    setScrollState(
      computeScrollState(lastY.current, y, threshold)
    );
    lastY.current = y;
  };
  return { scrollState, onScroll };
};

export { useScrollState as default };
//# sourceMappingURL=index.js.map
