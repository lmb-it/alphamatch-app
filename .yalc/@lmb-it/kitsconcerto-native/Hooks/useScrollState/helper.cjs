'use strict';

function computeScrollState(prevY, currentY, threshold) {
  return {
    y: currentY,
    isScrolled: currentY > threshold,
    direction: currentY > prevY ? "down" : "up"
  };
}

exports.computeScrollState = computeScrollState;
//# sourceMappingURL=helper.cjs.map
