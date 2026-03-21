import * as Yup from 'yup';
import { formFileValidation } from './helpers.js';

const cloneSchema = (schema) => {
  return schema.clone();
};
const buildShape = (elements, id) => {
  const shape = elements.reduce((acc, element) => {
    if ("displayOnly" in element && element.displayOnly) return acc;
    const fieldId = element.id;
    if (element.type === "File" || element.type === "Image") {
      acc[fieldId] = formFileValidation({
        max: element.limit,
        maxKB: element.maxFileSize,
        minKB: element.minFileSize
      });
      return acc;
    }
    if (element.type === "Object") {
      const nested = element.elements;
      if (typeof nested !== "function") {
        acc[fieldId] = Yup.object().shape(
          buildShape(nested)
        );
      }
      return acc;
    }
    if (element.type === "Combined") {
      if (element.schema) {
        acc[fieldId] = cloneSchema(element.schema);
      }
      return acc;
    }
    if (element.type === "Group") {
      const nested = element.elements;
      if (typeof nested !== "function") {
        acc[fieldId] = Yup.array().of(
          Yup.object().shape(
            buildShape(nested)
          )
        );
      }
      return acc;
    }
    if (element.schema) {
      acc[fieldId] = cloneSchema(element.schema);
    }
    return acc;
  }, {});
  return shape;
};
const schemaBuilder = (elements, id) => {
  const finalShape = buildShape(elements);
  return Yup.object(finalShape);
};

export { schemaBuilder };
//# sourceMappingURL=schemaBuilder.js.map
