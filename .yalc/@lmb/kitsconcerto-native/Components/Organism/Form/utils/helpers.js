import * as Yup from 'yup';

const getPropertyByPath = (obj, path) => {
  try {
    return path.split(/[.[\]]+/).filter(Boolean).reduce((res, key) => res[key], obj);
  } catch (e) {
    return void 0;
  }
};
const isValidURL = (urlString) => {
  try {
    const url = new URL(urlString);
    return ["http:", "https:"].includes(url.protocol);
  } catch (_) {
    return false;
  }
};
const formFileValidation = ({
  min,
  max,
  minKB,
  maxKB
} = {}) => {
  return Yup.mixed().test("fileOrUrl", "Invalid file or URL format", function(value) {
    const { path, createError } = this;
    if (!value || Array.isArray(value) && value.length === 0) {
      return true;
    }
    const files = Array.isArray(value) ? value : [value];
    if (min && files.length < min) {
      return createError({ path, message: `Please upload at least ${min} file(s).` });
    }
    if (max && files.length > max) {
      return createError({ path, message: `You can upload a maximum of ${max} file(s).` });
    }
    const errorSizeFiles = [];
    for (const file of files) {
      if (file instanceof File) {
        const fileSizeKB = file.size / 1024;
        if (maxKB && fileSizeKB > maxKB || minKB && fileSizeKB < minKB) {
          errorSizeFiles.push(file.name);
        }
      } else if (!isValidURL(file) && !("value" in file)) {
        return createError({ path, message: "Items must be valid Files, URLs, or base64 objects." });
      }
    }
    if (errorSizeFiles.length > 0) {
      return createError({
        path,
        message: `Files (${errorSizeFiles.join(", ")}) are outside the size limitations.`
      });
    }
    return true;
  });
};
const checkNameDuplication = (fields) => {
  const formNames = [];
  fields.forEach((item) => {
    const itemId = item.id;
    if (formNames.includes(itemId)) {
      throw new Error(`Field ID conflict: The ID "${itemId}" is duplicated. Field IDs must be unique within their nesting level.`);
    }
    if (!("displayOnly" in item) || !item.displayOnly) {
      formNames.push(itemId);
    }
    if ((item.type === "Group" || item.type === "Object" || item.type === "Combined") && "elements" in item) {
      const elements = item.elements;
      if (typeof elements == "function") ; else {
        checkNameDuplication(elements);
      }
    }
  });
};
const getDefaultValues = (fields) => {
  const defaultFormValues = {};
  fields.forEach((element) => {
    const elementId = element.id;
    if ("displayOnly" in element && element.displayOnly) return;
    if (element.type === "Combined" && "elements" in element) {
      const childElements = element.elements;
      if (Array.isArray(childElements)) {
        const childDefaults = getDefaultValues(childElements);
        Object.assign(defaultFormValues, childDefaults);
      }
      if ("initialValue" in element && element.initialValue !== void 0) {
        defaultFormValues[elementId] = element.initialValue;
      }
      return;
    }
    if ((element.type === "Group" || element.type === "Object") && "elements" in element) {
      const elements = element.elements;
      if (typeof elements == "function") ; else {
        defaultFormValues[elementId] = getDefaultValues(elements);
      }
      if (element.type === "Group") {
        defaultFormValues[elementId] = [];
      }
      return;
    }
    if (element.type === "File" || element.type === "Image") {
      const initialUri = element.initialUri;
      const limit = element.multiple ? element.limit ?? 1 : 1;
      if (Array.isArray(initialUri)) {
        const filtered = initialUri.slice(0, limit).filter(isValidURL);
        if (filtered.length > 0) {
          defaultFormValues[elementId] = filtered;
        }
      } else if (isValidURL(initialUri)) {
        defaultFormValues[elementId] = [initialUri];
      }
      return;
    }
    if (element.type === "Tags" && element.initialValue === void 0) {
      if (element.isMultiple) {
        defaultFormValues[elementId] = [];
      }
      return;
    }
    if ("initialValue" in element && element.initialValue !== void 0) {
      defaultFormValues[elementId] = element.initialValue;
    }
  });
  return defaultFormValues;
};
const getCombinedChildIds = (fields) => {
  const childIds = /* @__PURE__ */ new Set();
  fields.forEach((element) => {
    if (element.type === "Combined" && "elements" in element) {
      const children = element.elements;
      if (Array.isArray(children)) {
        children.forEach((child) => childIds.add(child.id));
      }
    }
    if ((element.type === "Group" || element.type === "Object") && "elements" in element) {
      const nested = element.elements;
      if (typeof nested !== "function") {
        const nestedIds = getCombinedChildIds(nested);
        nestedIds.forEach((id) => childIds.add(id));
      }
    }
  });
  return childIds;
};

export { checkNameDuplication, formFileValidation, getCombinedChildIds, getDefaultValues, getPropertyByPath };
//# sourceMappingURL=helpers.js.map
