'use strict';

var EKeyFilter = /* @__PURE__ */ ((EKeyFilter2) => {
  EKeyFilter2["INT"] = "int";
  EKeyFilter2["PositiveInteger"] = "pint";
  EKeyFilter2["Number"] = "num";
  EKeyFilter2["PositiveNumber"] = "pnum";
  EKeyFilter2["Money"] = "money";
  EKeyFilter2["Alphabetic"] = "alpha";
  EKeyFilter2["Alphanumeric"] = "alphanum";
  EKeyFilter2["Email"] = "email";
  return EKeyFilter2;
})(EKeyFilter || {});
var EDateFormat = /* @__PURE__ */ ((EDateFormat2) => {
  EDateFormat2["dayOfMonthNoLeadingZero"] = "d";
  EDateFormat2["dayOfMonthLeadingZero"] = "dd";
  EDateFormat2["abbreviatedMonth"] = "M";
  EDateFormat2["fullMonth"] = "MM";
  EDateFormat2["twoDigitYear"] = "y";
  EDateFormat2["fourDigitYear"] = "yy";
  EDateFormat2["mm_dd_yy"] = "mm/dd/yy";
  EDateFormat2["MM_dd_yyyy"] = "MM dd, yy";
  EDateFormat2["dayOfWeek"] = "DD";
  EDateFormat2["shortDayOfWeek"] = "D";
  EDateFormat2["dayOfYearNoLeadingZeros"] = "o";
  EDateFormat2["dayOfYearThreeDigit"] = "oo";
  EDateFormat2["yy/MM/dd"] = "yy/MM/dd";
  EDateFormat2["yy_M_dd"] = "yy/M/dd";
  EDateFormat2["dd_m_yy"] = "dd/m/yy";
  EDateFormat2["dd_mm_yy"] = "dd/mm/yy";
  EDateFormat2["MM_yy"] = "MM yy";
  EDateFormat2["MM_dd"] = "MM dd";
  EDateFormat2["customDate"] = "";
  return EDateFormat2;
})(EDateFormat || {});

exports.EDateFormat = EDateFormat;
exports.EKeyFilter = EKeyFilter;
//# sourceMappingURL=enums.cjs.map
