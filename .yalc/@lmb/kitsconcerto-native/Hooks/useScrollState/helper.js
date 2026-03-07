function computeScrollState(prevY, currentY, threshold) {
  return {
    y: currentY,
    isScrolled: currentY > threshold,
    direction: currentY > prevY ? "down" : "up"
  };
}

export { computeScrollState };
//# sourceMappingURL=helper.js.map
