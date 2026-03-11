'use strict';

var moment = require('moment/moment');

const isToday = (date) => {
  const currentDate = moment();
  return date.dayOfYear() === currentDate.dayOfYear() && date.year() === currentDate.year();
};
const timeAgo = (timestamp) => {
  const currentTime = moment();
  const targetTime = moment(timestamp);
  if (!isToday(targetTime)) {
    return targetTime.format("D MMMM YYYY");
  }
  const diffInMilliseconds = currentTime.diff(targetTime);
  const duration = moment.duration(diffInMilliseconds);
  const years = duration.years();
  const months = duration.months();
  const days = duration.days();
  const hours = duration.hours();
  const minutes = duration.minutes();
  if (years > 0) {
    return `${years} ${years === 1 ? "year" : "years"} ago`;
  } else if (months > 0) {
    return `${months} ${months === 1 ? "month" : "months"} ago`;
  } else if (days > 0) {
    return `${days} ${days === 1 ? "day" : "days"} ago`;
  } else if (hours > 0) {
    return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  } else if (minutes > 0) {
    return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
  } else {
    return "Just now";
  }
};
const timeSince = (days) => {
  let calcDate = new Date(Date.now() - days * 24 * 3600 * 1e3);
  let seconds = Math.floor(((/* @__PURE__ */ new Date()).getTime() - calcDate.getTime()) / 1e3);
  let interval = seconds / 31536e3;
  if (interval > 1) {
    return Math.floor(interval) + "y ago";
  }
  interval = seconds / 2592e3;
  if (interval > 1) {
    return Math.floor(interval) + "m ago";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + "d ago";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + "h ago";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + "m ago";
  }
  return Math.floor(seconds) + "s ago";
};
const getCustomDateTime = (value = 0, unit = "days", format = "HH:mm a | MMMM DD, YYYY") => {
  if (value === 0) {
    return moment().format(format);
  } else {
    return moment().add(value, unit).format(format);
  }
};
const getDateElements = (date) => {
  const dateString = moment(date).format("dddd, MMMM DD YYYY, hh:mm A");
  const dateSections = dateString.split(",");
  const day = dateSections[0];
  const time = dateSections[2];
  const datePart = dateSections[1]?.trim().split(" ");
  return {
    day,
    time,
    date: !datePart || {
      dateString: dateSections[1],
      month: datePart[0],
      date: datePart[1],
      year: datePart[2]
    }
  };
};

exports.getCustomDateTime = getCustomDateTime;
exports.getDateElements = getDateElements;
exports.isToday = isToday;
exports.timeAgo = timeAgo;
exports.timeSince = timeSince;
//# sourceMappingURL=Date.cjs.map
