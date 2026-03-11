import moment from 'moment/moment';

const dateTimeFormat = (datetimeValue) => {
  return moment(datetimeValue).format("D MMM, yyyy [at] hh:mm a");
};

export { dateTimeFormat };
//# sourceMappingURL=Lib.js.map
