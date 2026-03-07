'use strict';

var jsxRuntime = require('react/jsx-runtime');

const Widgets = (props) => {
  return null;
};
const Bar = (props) => {
  return /* @__PURE__ */ jsxRuntime.jsx(Widgets, { ...props, type: "BarChart" });
};
const Line = (props) => {
  return /* @__PURE__ */ jsxRuntime.jsx(Widgets, { ...props, type: "LineChart" });
};
const Pie = (props) => {
  return /* @__PURE__ */ jsxRuntime.jsx(Widgets, { ...props, type: "PieChart" });
};
const Radar = (props) => {
  return /* @__PURE__ */ jsxRuntime.jsx(Widgets, { ...props, type: "RadarChart" });
};
const PolarArea = (props) => {
  return /* @__PURE__ */ jsxRuntime.jsx(Widgets, { ...props, type: "PolarAreaChart" });
};
const Doughnut = (props) => {
  return /* @__PURE__ */ jsxRuntime.jsx(Widgets, { ...props, type: "DoughnutChart" });
};

exports.Bar = Bar;
exports.Doughnut = Doughnut;
exports.Line = Line;
exports.Pie = Pie;
exports.PolarArea = PolarArea;
exports.Radar = Radar;
//# sourceMappingURL=index.cjs.map
