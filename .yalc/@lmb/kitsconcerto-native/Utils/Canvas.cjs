'use strict';

var reactNative = require('react-native');

const downloadCanvas = (content, filename, type) => {
  if (reactNative.Platform.OS == "web") {
    const link = document.createElement("a");
    link.href = content.toDataURL(type, 1);
    link.download = filename;
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

exports.downloadCanvas = downloadCanvas;
//# sourceMappingURL=Canvas.cjs.map
