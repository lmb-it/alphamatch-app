'use strict';

var Yup = require('yup');
var helpers = require('./helpers.cjs');

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

const cloneSchema = (schema) => {
  return schema.clone();
};
const buildShape = (elements, id) => {
  const shape = elements.reduce((acc, element) => {
    if ("displayOnly" in element && element.displayOnly) return acc;
    const fieldId = element.id;
    if (element.type === "File" || element.type === "Image") {
      acc[fieldId] = helpers.formFileValidation({
        max: element.limit,
        maxKB: element.maxFileSize,
        minKB: element.minFileSize
      });
      return acc;
    }
    if (element.type === "Object") {
      const nested = element.elements;
      if (typeof nested !== "function") {
        acc[fieldId] = Yup__namespace.object().shape(
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
        acc[fieldId] = Yup__namespace.array().of(
          Yup__namespace.object().shape(
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
  return Yup__namespace.object(finalShape);
};

exports.schemaBuilder = schemaBuilder;
//# sourceMappingURL=schemaBuilder.cjs.map
