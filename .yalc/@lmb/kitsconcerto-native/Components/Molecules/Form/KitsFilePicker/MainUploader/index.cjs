'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');
var DocumentPicker = require('react-native-document-picker');
var reactNativeImagePicker = require('react-native-image-picker');
var RNFS = require('react-native-fs');
require('react-icons/fa');
require('react-icons/ai');
require('react-icons/io');
var filesTypes = require('../../../../../packages/types/src/Components/Molecules/Form/FilePicker/types/filesTypes.cjs');
require('yup');
require('../../../../../packages/types/src/Css/map/index.cjs');
require('axios');
require('../../../../../Contexts/DialogContext.cjs');
require('../../KitsSelect/SelectContext.cjs');
var index = require('../../../UI/Flex/index.cjs');
require('primereact/tooltip');
require('primereact/skeleton');
var index_native$1 = require('../SingleFileUploader/index.cjs');
var index_native$2 = require('../MultipleFileUploader/index.cjs');
var index_native = require('../SingleImageUploader/index.cjs');
var index_native$3 = require('../MultipleImageUploader/index.cjs');
var File = require('../../../../../Utils/File.cjs');

const FileUploaderContext = React.createContext({
  onChangeAnyFileUploader: () => {
  },
  onPick: () => {
  },
  removeFile: () => () => {
  },
  onInvalidInput: () => {
  },
  disabled: false,
  limit: 1,
  isClassicUploader: true,
  selectedInitialFiles: [],
  selectedFiles: [],
  acceptedMemes: [],
  files: [],
  id: "",
  isImage: false
});
const stripExt = (name) => name.replace(/\.[^/.]+$/, "");
const getExt = (name) => (name.split(".").pop() ?? "").toLowerCase();
const readFileAsBase64 = async (uri) => {
  const path = uri.startsWith("file://") ? uri.replace("file://", "") : uri;
  return RNFS.readFile(path, "base64");
};
const MainUploader = (props) => {
  const {
    acceptedTypes,
    type,
    classicUploader = true,
    limit = 1,
    onError,
    onFocus,
    placeholder,
    defaultValue,
    multiple,
    isJsonOutput = true,
    onChange,
    value,
    name,
    disabled,
    maxFileSize,
    minFileSize
  } = props;
  const initialValueSynced = React.useRef(false);
  const [selectedFiles, setSelectedFiles] = React.useState([]);
  const [selectedInitialFiles, setSelectedInitialFiles] = React.useState([]);
  const [selectedFilesAsBase64, setSelectedFilesAsBase64] = React.useState([]);
  const isImage = type === "Image";
  const isOneFile = !multiple || limit < 2;
  const onInvalidInput = (err) => onError?.(err);
  const acceptedMemes = React.useMemo(() => {
    return acceptedTypes ? filesTypes.toMemes(acceptedTypes) : filesTypes.toMemes(["allFiles"]);
  }, [acceptedTypes]);
  const validateSize = (sizeBytes) => {
    if (!sizeBytes) return true;
    const sizeKB = sizeBytes / 1e3;
    if (maxFileSize && sizeKB > maxFileSize) return false;
    return !(minFileSize && sizeKB < minFileSize);
  };
  const pickDocuments = async () => {
    try {
      const types = {
        allowMultiSelection: !isOneFile,
        // copy to cache so we can read base64 reliably
        copyTo: "cachesDirectory",
        // DocumentPicker supports mime list; if empty let OS choose anything
        type: acceptedMemes.length ? acceptedMemes : [DocumentPicker.types.allFiles]
      };
      const res = await DocumentPicker.pick(types);
      const docs = (Array.isArray(res) ? res : [res]).map((d) => ({
        uri: d.fileCopyUri || d.uri,
        name: d.name || "file",
        type: d.type || void 0,
        size: d.size || void 0
      }));
      const filtered = docs.filter((d) => {
        const ok = validateSize(d.size);
        if (!ok) {
          onInvalidInput(`File "${d.name}" size is not allowed`);
        }
        return ok;
      });
      if (!filtered.length) return;
      setSelectedFiles((prev) => {
        if (isOneFile) {
          const [first] = filtered;
          return first ? [first] : prev;
        }
        return [...prev, ...filtered];
      });
      onInvalidInput("clear");
    } catch (e) {
      if (DocumentPicker.isCancel(e)) return;
      onInvalidInput(e);
    }
  };
  const pickImages = async () => {
    try {
      const res = await reactNativeImagePicker.launchImageLibrary({
        mediaType: "photo",
        selectionLimit: isOneFile ? 1 : limit,
        includeBase64: true
      });
      if (res.didCancel) return;
      if (res.errorCode) {
        onInvalidInput(res.errorMessage || res.errorCode);
        return;
      }
      const assets = res.assets || [];
      const mapped = assets.filter((a) => !!a.uri).map((a) => ({
        uri: a.uri,
        name: a.fileName || "image",
        type: a.type || "image/jpeg",
        size: a.fileSize
      })).filter((f) => {
        const ok = validateSize(f.size);
        if (!ok) onInvalidInput(`File "${f.name}" size is not allowed`);
        return ok;
      });
      if (!mapped.length) return;
      setSelectedFiles((prev) => {
        if (isOneFile) {
          const [first] = mapped;
          return first ? [first] : prev;
        }
        return [...prev, ...mapped];
      });
      onInvalidInput("clear");
      const b64 = assets.filter((a) => !!a.base64).map((a) => ({
        filename: stripExt(a.fileName || "image"),
        base64: a.base64,
        type: a.type || "image/jpeg"
      }));
      setSelectedFilesAsBase64((prev) => isOneFile ? b64.slice(0, 1) : [...prev, ...b64]);
    } catch (e) {
      onInvalidInput(e);
    }
  };
  const onChangeAnyFileUploader = (files) => {
    if (disabled) {
      return;
    }
    const filesList = [];
    setSelectedFilesAsBase64([]);
    for (let i = 0; i < files.length; i++) {
      const f = files[i];
      if (f) {
        const fileSize = f.size / 1e3;
        if ((!maxFileSize || fileSize <= maxFileSize) && (!minFileSize || fileSize >= minFileSize)) {
          filesList.push(f);
          onInvalidInput("clear");
        } else {
          let message = `File "${f.name}" is `;
          if (maxFileSize && fileSize > maxFileSize) {
            message += `too large. Maximum allowed is ${maxFileSize / 1e3} MB.`;
          } else if (minFileSize && fileSize < minFileSize) {
            message += `too small. Minimum allowed is ${minFileSize / 1e3} MB.`;
          }
          console.log(message);
          onInvalidInput(message);
        }
      }
    }
    if (!isOneFile) {
      setSelectedFiles((prevState) => {
        return [...prevState, ...filesList];
      });
    } else {
      if (filesList.length)
        setSelectedFiles(filesList.slice(0, 1));
    }
  };
  const onPick = async () => {
    if (disabled) return;
    if (isImage) return pickImages();
    return pickDocuments();
  };
  const removeFile = (fileIndex) => () => {
    if (fileIndex < selectedInitialFiles.length) {
      setSelectedInitialFiles((prev) => prev.filter((_, i) => i !== fileIndex));
      return;
    }
    const editIndex = fileIndex - selectedInitialFiles.length;
    setSelectedFiles((prev) => prev.filter((_, i) => i !== editIndex));
    setSelectedFilesAsBase64((prev) => prev.filter((_, i) => i !== editIndex));
  };
  React.useEffect(() => {
    if (isImage) return;
    const run = async () => {
      try {
        const next = [];
        for (const f of selectedFiles) {
          const b64 = await readFileAsBase64(f.uri);
          next.push({
            filename: stripExt(f.name),
            base64: b64,
            type: f.type || filesTypes.getType(getExt(f.name)) || "application/octet-stream"
          });
        }
        setSelectedFilesAsBase64(next);
      } catch (e) {
        onInvalidInput(e);
      }
    };
    run().then((r) => {
    });
  }, [selectedFiles, isImage]);
  React.useEffect(() => {
    if (disabled) return;
    if (!selectedFiles.length && !selectedInitialFiles.length) {
      onChange?.([], []);
      return;
    }
    if (isJsonOutput) {
      if (selectedFilesAsBase64.length === selectedFiles.length || isImage) {
        onChange?.(selectedFiles, selectedFilesAsBase64);
      }
    } else {
      onChange?.(selectedFiles, selectedFilesAsBase64);
    }
  }, [selectedFilesAsBase64, selectedInitialFiles, selectedFiles]);
  React.useEffect(() => {
    if (defaultValue) {
      setSelectedInitialFiles(Array.isArray(defaultValue) ? defaultValue : [defaultValue]);
    }
  }, [defaultValue]);
  React.useEffect(() => {
    if (initialValueSynced.current) return;
    if (value) {
      setSelectedInitialFiles(Array.isArray(value) ? value : [value]);
    }
    initialValueSynced.current = true;
  }, [value]);
  const display = React.useMemo(() => {
    const fromInitial = selectedInitialFiles.map((uri) => ({
      name: uri.split("/").pop() ?? uri,
      shortName: File.AnyFile.shortName(uri),
      ext: getExt(uri),
      file: { uri }
    }));
    const fromPicked = selectedFiles.map((f) => ({
      name: f.name,
      shortName: File.AnyFile.shortName(f.name),
      ext: getExt(f.name),
      file: { uri: f.uri }
    }));
    return [...fromInitial, ...fromPicked];
  }, [selectedFiles, selectedInitialFiles]);
  return /* @__PURE__ */ jsxRuntime.jsx(
    FileUploaderContext.Provider,
    {
      value: {
        onChangeAnyFileUploader,
        onPick,
        removeFile,
        onInvalidInput,
        selectedFiles,
        selectedInitialFiles,
        disabled,
        limit,
        placeholder,
        isClassicUploader: classicUploader,
        acceptedMemes,
        files: display,
        id: name ?? "",
        isImage
      },
      children: /* @__PURE__ */ jsxRuntime.jsxs(index.default, { onFocus, w: "full", children: [
        isImage && isOneFile && /* @__PURE__ */ jsxRuntime.jsx(index_native.default, {}),
        !isImage && isOneFile && /* @__PURE__ */ jsxRuntime.jsx(index_native$1.default, {}),
        !isImage && !isOneFile && /* @__PURE__ */ jsxRuntime.jsx(index_native$2.default, {}),
        isImage && !isOneFile && /* @__PURE__ */ jsxRuntime.jsx(index_native$3.default, {})
      ] })
    }
  );
};
const useUploader = () => React.useContext(FileUploaderContext);

exports.FileUploaderContext = FileUploaderContext;
exports.default = MainUploader;
exports.useUploader = useUploader;
//# sourceMappingURL=index.cjs.map
