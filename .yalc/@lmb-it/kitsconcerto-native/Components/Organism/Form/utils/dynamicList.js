function isPromise(v) {
  return typeof v === "object" && v !== null && typeof v.then === "function";
}
function dynamicList(element, watchedValues, allFormValues, groupField, ctx) {
  if (!("list" in element)) return [];
  const { list, id } = element;
  if (Array.isArray(list)) {
    return list;
  }
  if (typeof list === "function") {
    let result;
    try {
      result = list(watchedValues, allFormValues, ctx, groupField);
    } catch (err) {
      console.error(
        `[Form] list() threw an error for element "${id.toString()}"`,
        err
      );
      return [];
    }
    if (isPromise(result)) {
      console.warn(
        `[Form] async list() is not supported. Element "${id.toString()}" must return an array synchronously.`
      );
      return [];
    }
    if (!Array.isArray(result)) {
      console.warn(
        `[Form] list() must return an array. Element "${id.toString()}" returned:`,
        result
      );
      return [];
    }
    return result;
  }
  return [];
}

export { dynamicList };
//# sourceMappingURL=dynamicList.js.map
