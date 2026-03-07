const React = require('react');
const Comp = React.forwardRef(() => null);
try {
  Comp.Item = "test";
  console.log("Comp.Item:", Comp.Item);
} catch (e) {
  console.log("Error:", e.message);
}
