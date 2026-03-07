'use strict';

var Yup = require('yup');

function _interopNamespaceDefault(e) {
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n.default = e;
  return Object.freeze(n);
}

var Yup__namespace = /*#__PURE__*/_interopNamespaceDefault(Yup);

function convertSize(sizeInBytes) {
  const KB = 1024;
  const MB = 1024 * KB;
  if (sizeInBytes < KB) {
    return `${sizeInBytes} Bytes`;
  } else if (sizeInBytes < MB) {
    return `${(sizeInBytes / KB).toFixed(2)} KB`;
  } else {
    return `${(sizeInBytes / MB).toFixed(2)} MB`;
  }
}
const fileValidation = (props = { min: 1, max: 1, acceptedTypes: "*", minSize: 0, maxSize: 5242880 }) => Yup__namespace.mixed().test("fileSizeMax", `File size should be less that ${convertSize(props.maxSize ?? 0)}`, (value) => {
  const checkFile = (file) => {
    if (file instanceof File) {
      if (!props.minSize && props.maxSize) {
        return file.size <= props.maxSize;
      }
    }
    return true;
  };
  if (Array.isArray(value)) {
    return value.every(checkFile);
  } else {
    return checkFile(value);
  }
}).test("fileSizeMin", `File size should be over ${convertSize(props.minSize ?? 0)}`, (value) => {
  const checkFile = (file) => {
    if (file instanceof File) {
      if (props.minSize && !props.maxSize) {
        return file.size >= props.minSize;
      }
    }
    return true;
  };
  if (Array.isArray(value)) {
    return value.every(checkFile);
  } else {
    return checkFile(value);
  }
}).test("fileType", `File type not accepted`, (value) => {
  const checkFile = (file) => {
    if (props.acceptedTypes == "*") {
      return true;
    }
    if (file instanceof File) {
      const fileExtension = file.name.split(".").pop() ?? "";
      return props.acceptedTypes.includes(fileExtension.toLowerCase());
    }
    return true;
  };
  if (Array.isArray(value)) {
    return value.every(checkFile);
  } else {
    return checkFile(value);
  }
}).test("fileLengthMin", `The minimum files allowed is ${props.min}`, (value) => {
  if (Array.isArray(value) && props.min) {
    return value.length >= props.min;
  } else {
    return true;
  }
}).test("fileLengthMax", `The maximum files allowed is ${props.max}`, (value) => {
  if (Array.isArray(value) && props.max) {
    return value.length <= props.max;
  } else {
    return true;
  }
});

exports.fileValidation = fileValidation;
//# sourceMappingURL=fileValidation.cjs.map
