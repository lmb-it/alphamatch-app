'use strict';

require('react');

function ClHelper({
  isChecked,
  isInvalid,
  isDisabled,
  inputSize
}) {
  const classes = ["check-input"];
  if (isInvalid) {
    classes.push("p-invalid");
  }
  if (isDisabled) {
    classes.push("p-disable");
  }
  if (inputSize == "sm") {
    classes.push("p-inputtext-sm");
  }
  if (inputSize == "md") {
    classes.push("");
  }
  if (inputSize == "lg") {
    classes.push("p-inputtext-lg");
  }
  return classes.join(" ");
}

exports.ClHelper = ClHelper;
//# sourceMappingURL=Functions.cjs.map
