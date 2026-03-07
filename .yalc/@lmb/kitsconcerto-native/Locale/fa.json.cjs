'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var accept = "بله";
var reject = "خیر";
var choose = "انتخاب";
var upload = "بارگذاری";
var cancel = "لغو";
var dayNames = [
	"یکشنبه",
	"دوشنبه",
	"سه‌شنبه",
	"چهارشنبه",
	"پنجشنبه",
	"جمعه",
	"شنبه"
];
var dayNamesShort = [
	"ی",
	"د",
	"س",
	"چ",
	"پ",
	"ج",
	"ش"
];
var dayNamesMin = [
	"ی",
	"د",
	"س",
	"چ",
	"پ",
	"ج",
	"ش"
];
var monthNames = [
	"ژانویه",
	"فوریه",
	"مارس",
	"آوریل",
	"مه",
	"ژوئن",
	"ژوئیه",
	"اوت",
	"سپتامبر",
	"اکتبر",
	"نوامبر",
	"دسامبر"
];
var monthNamesShort = [
	"ژانویه",
	"فوریه",
	"مارس",
	"آوریل",
	"مه",
	"ژوئن",
	"ژوئیه",
	"اوت",
	"سپتامبر",
	"اکتبر",
	"نوامبر",
	"دسامبر"
];
var today = "امروز";
var clear = "پاک کردن";
var weekHeader = "هفته";
var firstDayOfWeek = 6;
var showMonthAfterYear = true;
var dateFormat = "yy/mm/dd";
var weak = "هفته";
var medium = "متوسط";
var strong = "قوی";
var passwordPrompt = "یک گذرواژه وارد کنید";
var startsWith = "شروع با";
var contains = "حاوی";
var notContains = "Not contains";
var endsWith = "پایان با";
var equals = "برابر";
var notEquals = "نا برابر";
var noFilter = "بدون فیلتر";
var filter = "فیلتر";
var lt = "کمتر از";
var lte = "برابر یا کمتر از";
var gt = "بیشتر از";
var gte = "برابر یا بیشتر از";
var dateIs = "Date is";
var dateIsNot = "Date is not";
var dateBefore = "Date is before";
var dateAfter = "Date is after";
var custom = "سفارشی";
var apply = "Apply";
var matchAll = "مطابقت با همه";
var matchAny = "مطابقت با هر";
var addRule = "افزودن قانون";
var removeRule = "حذف قانون";
var completed = "تکمیل شد";
var pending = "در انتظار";
var chooseYear = "انتخاب تاریخ";
var chooseMonth = "انتخاب ماه";
var chooseDate = "انتخاب تاریخ";
var prevDecade = "دهه قبل";
var nextDecade = "دهه بعد";
var prevYear = "سال قبل";
var nextYear = "سال بعد";
var prevMonth = "ماه قبل";
var nextMonth = "ماه بعد";
var prevHour = "ساعت قبل";
var nextHour = "ساعت بعد";
var prevMinute = "دقیقه قبل";
var nextMinute = "دقیقه بعد";
var prevSecond = "ثانیه قبل";
var nextSecond = "ثانیه بعد";
var am = "قبل از ظهر";
var pm = "بعد از ظهر";
var emptyFilterMessage = "نتیجه ای پیدا نشد";
var searchMessage = "{0} نتیجه در دسترس است";
var selectionMessage = "{0} موارد انتخاب شده";
var emptySelectionMessage = "موردی انتخاب نشده";
var emptySearchMessage = "نتیجه ای پیدا نشد";
var emptyMessage = "هیچ گزینه ای در دسترس نیست";
var aria = {
	trueLabel: "صحیح",
	falseLabel: "غلط",
	nullLabel: "انتخاب نشده",
	star: "ستاره",
	stars: "{star} ستاره",
	selectAll: "همه موارد انتخاب شدند",
	unselectAll: "همه موارد لغو انتخاب شدند",
	close: "بستن",
	previous: "قبلی",
	next: "بعدی",
	navigation: "Navigation",
	scrollTop: "Scroll Top",
	moveTop: "حرکت بالا",
	moveUp: "حرکت بالا",
	moveDown: "حرکت پایین",
	moveBottom: "حرکت پایین",
	moveToTarget: "حرکت تا هدف",
	moveToSource: "حرکت تا منبع",
	moveAllToTarget: "حرکت همه تا هدف",
	moveAllToSource: "حرکت همه تا منبع",
	pageLabel: "{page}",
	firstPageLabel: "اولین صفحه",
	lastPageLabel: "آخرین صفحه",
	nextPageLabel: "صفحه بعد",
	previousPageLabel: "صفحه قبل",
	rowsPerPageLabel: "ردیف در هر صفحه",
	jumpToPageDropdownLabel: "پرش به دراپ داون صفحه",
	jumpToPageInputLabel: "Jump to Page Input",
	selectRow: "ردیف انتخاب شده",
	unselectRow: "ردیف لغو انتخاب شد",
	expandRow: "ردیف گسترش پیدا کرده",
	collapseRow: "ردیف جمع شد",
	showFilterMenu: "نمایش فیلتر ها",
	hideFilterMenu: "پنهان کردن فیلتر ها",
	filterOperator: "عملگر فیلتر",
	filterConstraint: "محدودیت فیلتر",
	editRow: "ویرایش ردیف",
	saveEdit: "ذخیره ویرایش",
	cancelEdit: "لغو ویرایش",
	listView: "نمایش به صورت لیست",
	gridView: "نمایش به صورت شبکه",
	slide: "اسلاید",
	slideNumber: "{slideNumber}",
	zoomImage: "بزرگنمایی تصویر",
	zoomIn: "بزرگنمایی",
	zoomOut: "کوچک نمایی",
	rotateRight: "چرخش به سمت راست",
	rotateLeft: "چرخش به سمت چپ"
};
var fa = {
	accept: accept,
	reject: reject,
	choose: choose,
	upload: upload,
	cancel: cancel,
	dayNames: dayNames,
	dayNamesShort: dayNamesShort,
	dayNamesMin: dayNamesMin,
	monthNames: monthNames,
	monthNamesShort: monthNamesShort,
	today: today,
	clear: clear,
	weekHeader: weekHeader,
	firstDayOfWeek: firstDayOfWeek,
	showMonthAfterYear: showMonthAfterYear,
	dateFormat: dateFormat,
	weak: weak,
	medium: medium,
	strong: strong,
	passwordPrompt: passwordPrompt,
	startsWith: startsWith,
	contains: contains,
	notContains: notContains,
	endsWith: endsWith,
	equals: equals,
	notEquals: notEquals,
	noFilter: noFilter,
	filter: filter,
	lt: lt,
	lte: lte,
	gt: gt,
	gte: gte,
	dateIs: dateIs,
	dateIsNot: dateIsNot,
	dateBefore: dateBefore,
	dateAfter: dateAfter,
	custom: custom,
	apply: apply,
	matchAll: matchAll,
	matchAny: matchAny,
	addRule: addRule,
	removeRule: removeRule,
	completed: completed,
	pending: pending,
	chooseYear: chooseYear,
	chooseMonth: chooseMonth,
	chooseDate: chooseDate,
	prevDecade: prevDecade,
	nextDecade: nextDecade,
	prevYear: prevYear,
	nextYear: nextYear,
	prevMonth: prevMonth,
	nextMonth: nextMonth,
	prevHour: prevHour,
	nextHour: nextHour,
	prevMinute: prevMinute,
	nextMinute: nextMinute,
	prevSecond: prevSecond,
	nextSecond: nextSecond,
	am: am,
	pm: pm,
	emptyFilterMessage: emptyFilterMessage,
	searchMessage: searchMessage,
	selectionMessage: selectionMessage,
	emptySelectionMessage: emptySelectionMessage,
	emptySearchMessage: emptySearchMessage,
	emptyMessage: emptyMessage,
	aria: aria
};

exports.accept = accept;
exports.addRule = addRule;
exports.am = am;
exports.apply = apply;
exports.aria = aria;
exports.cancel = cancel;
exports.choose = choose;
exports.chooseDate = chooseDate;
exports.chooseMonth = chooseMonth;
exports.chooseYear = chooseYear;
exports.clear = clear;
exports.completed = completed;
exports.contains = contains;
exports.custom = custom;
exports.dateAfter = dateAfter;
exports.dateBefore = dateBefore;
exports.dateFormat = dateFormat;
exports.dateIs = dateIs;
exports.dateIsNot = dateIsNot;
exports.dayNames = dayNames;
exports.dayNamesMin = dayNamesMin;
exports.dayNamesShort = dayNamesShort;
exports.default = fa;
exports.emptyFilterMessage = emptyFilterMessage;
exports.emptyMessage = emptyMessage;
exports.emptySearchMessage = emptySearchMessage;
exports.emptySelectionMessage = emptySelectionMessage;
exports.endsWith = endsWith;
exports.equals = equals;
exports.filter = filter;
exports.firstDayOfWeek = firstDayOfWeek;
exports.gt = gt;
exports.gte = gte;
exports.lt = lt;
exports.lte = lte;
exports.matchAll = matchAll;
exports.matchAny = matchAny;
exports.medium = medium;
exports.monthNames = monthNames;
exports.monthNamesShort = monthNamesShort;
exports.nextDecade = nextDecade;
exports.nextHour = nextHour;
exports.nextMinute = nextMinute;
exports.nextMonth = nextMonth;
exports.nextSecond = nextSecond;
exports.nextYear = nextYear;
exports.noFilter = noFilter;
exports.notContains = notContains;
exports.notEquals = notEquals;
exports.passwordPrompt = passwordPrompt;
exports.pending = pending;
exports.pm = pm;
exports.prevDecade = prevDecade;
exports.prevHour = prevHour;
exports.prevMinute = prevMinute;
exports.prevMonth = prevMonth;
exports.prevSecond = prevSecond;
exports.prevYear = prevYear;
exports.reject = reject;
exports.removeRule = removeRule;
exports.searchMessage = searchMessage;
exports.selectionMessage = selectionMessage;
exports.showMonthAfterYear = showMonthAfterYear;
exports.startsWith = startsWith;
exports.strong = strong;
exports.today = today;
exports.upload = upload;
exports.weak = weak;
exports.weekHeader = weekHeader;
//# sourceMappingURL=fa.json.cjs.map
