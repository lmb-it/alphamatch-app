'use strict';

var moment = require('moment/moment');

const dateTimeFormat = (datetimeValue) => {
  return moment(datetimeValue).format("D MMM, yyyy [at] hh:mm a");
};

exports.dateTimeFormat = dateTimeFormat;
//# sourceMappingURL=Lib.cjs.map
