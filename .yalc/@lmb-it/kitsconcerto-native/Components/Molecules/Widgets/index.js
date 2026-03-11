import { jsx } from 'react/jsx-runtime';

const Widgets = (props) => {
  return null;
};
const Bar = (props) => {
  return /* @__PURE__ */ jsx(Widgets, { ...props, type: "BarChart" });
};
const Line = (props) => {
  return /* @__PURE__ */ jsx(Widgets, { ...props, type: "LineChart" });
};
const Pie = (props) => {
  return /* @__PURE__ */ jsx(Widgets, { ...props, type: "PieChart" });
};
const Radar = (props) => {
  return /* @__PURE__ */ jsx(Widgets, { ...props, type: "RadarChart" });
};
const PolarArea = (props) => {
  return /* @__PURE__ */ jsx(Widgets, { ...props, type: "PolarAreaChart" });
};
const Doughnut = (props) => {
  return /* @__PURE__ */ jsx(Widgets, { ...props, type: "DoughnutChart" });
};

export { Bar, Doughnut, Line, Pie, PolarArea, Radar };
//# sourceMappingURL=index.js.map
