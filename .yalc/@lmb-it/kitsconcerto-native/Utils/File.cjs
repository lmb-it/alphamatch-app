'use strict';

const parts = (fileName) => {
  const cleanName = fileName.split("?")[0]?.split("#")[0];
  const lastDotIndex = cleanName?.lastIndexOf(".");
  if (lastDotIndex && lastDotIndex <= 0) {
    return {
      name: cleanName ?? "",
      ext: ""
    };
  }
  return {
    name: cleanName?.slice(0, lastDotIndex) ?? "",
    ext: cleanName?.slice((lastDotIndex ?? 0) + 1).toLowerCase() ?? ""
  };
};
const ext = (fileName) => {
  const lastDotIndex = fileName.lastIndexOf(".");
  if (lastDotIndex === -1 || lastDotIndex === 0) return "";
  return fileName.slice(lastDotIndex + 1).toLowerCase();
};
const shortName = (fileName, startLength = 15, endLength = 5) => {
  const lastDotIndex = fileName.lastIndexOf(".");
  if (lastDotIndex === -1) return fileName;
  const name = fileName.slice(0, lastDotIndex);
  const ext2 = fileName.slice(lastDotIndex);
  if (name.length <= startLength + endLength) {
    return fileName;
  }
  const start = name.slice(0, startLength);
  const end = name.slice(-endLength);
  return `${start}....${end}${ext2}`;
};
const AnyFile = { parts, ext, shortName };

exports.AnyFile = AnyFile;
//# sourceMappingURL=File.cjs.map
