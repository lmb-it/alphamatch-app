'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var helper = require('./helper.cjs');

const useScrollState = (options = {}) => {
  const { threshold = 60 } = options;
  const lastY = React.useRef(0);
  const [scrollState, setScrollState] = React.useState({
    y: 0,
    isScrolled: false,
    direction: "up"
  });
  const onScroll = (e) => {
    const y = e.nativeEvent.contentOffset.y;
    setScrollState(
      helper.computeScrollState(lastY.current, y, threshold)
    );
    lastY.current = y;
  };
  return { scrollState, onScroll };
};

exports.default = useScrollState;
//# sourceMappingURL=index.cjs.map
