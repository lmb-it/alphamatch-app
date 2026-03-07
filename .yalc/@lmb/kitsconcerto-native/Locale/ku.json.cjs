'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var startsWith = "دەستی پێش";
var contains = "تێپەڕوودەر";
var notContains = "تێپەڕوودەر نییە";
var endsWith = "دەستان";
var equals = "بەرابرەوە";
var notEquals = "بەرابرنییە";
var noFilter = "بێ ڕێگرتن";
var filter = "ڕێگرتن";
var lt = "کەمتر لە";
var lte = "کەمتر یان بەرابر لە";
var gt = "زیاتر لە";
var gte = "زیاتر یان بەرابر لە";
var dateIs = "ڕێکەوتەکە";
var dateIsNot = "ڕێکەوتەکە نییە";
var dateBefore = "ڕێکەوتی پێشوو";
var dateAfter = "ڕێکەوتی دواتر";
var custom = "ڕێکخستن";
var clear = "پاککردنەوە";
var apply = "دروستکردن";
var matchAll = "هەمووی هاوکێشە";
var matchAny = "هەر کام";
var addRule = "زیادکردنی هەڵبژاردن";
var removeRule = "لابردنی هەڵبژاردن";
var accept = "بەڵێ";
var reject = "نەخێر";
var choose = "هەڵبژاردن";
var upload = "بارکردن";
var cancel = "پاشگەزبوونەوە";
var completed = "کۆتاوە";
var pending = "چاوەڕوانکردن";
var dayNames = [
	"یەکشەممە",
	"دووشەممە",
	"سێشەممە",
	"چوارشەممە",
	"پێنجشەممە",
	"هەینی",
	"شەممە"
];
var dayNamesShort = [
	"یەکشەم",
	"دووشەم",
	"سێشەم",
	"چوارشەم",
	"پێنجشەم",
	"هەینی",
	"شەممە"
];
var dayNamesMin = [
	"ی",
	"د",
	"س",
	"چ",
	"پ",
	"ه",
	"ش"
];
var monthNames = [
	"کانوونی دووەم",
	"شوبات",
	"ئازار",
	"نیسان",
	"ئایار",
	"حوزەیران",
	"تەممووز",
	"ئاب",
	"ئەیلوول",
	"تشرینی یەکەم",
	"تشرینی دووەم",
	"کانوونی یەکەم"
];
var monthNamesShort = [
	"کانوونی 2",
	"شوبات",
	"ئازار",
	"نیسان",
	"ئایار",
	"حوزەیران",
	"تەممووز",
	"ئاب",
	"ئەیلوول",
	"تشرینی یەکەم",
	"تشرینی 2",
	"کانوونی یەکەم"
];
var chooseYear = "ساڵێک هەڵبژێرە";
var chooseMonth = "مانگێک هەڵبژێرە";
var chooseDate = "ڕێکەوتێک هەڵبژێرە";
var prevDecade = "دەرەوەی دەکەی";
var nextDecade = "دواتری دەکەی";
var prevYear = "ساڵی پێشوو";
var nextYear = "ساڵی دواتر";
var prevMonth = "مانگی پێشوو";
var nextMonth = "مانگی دواتر";
var prevHour = "کاتژمێری پێشوو";
var nextHour = "کاتژمێری دواتر";
var prevMinute = "خولەکی پێشوو";
var nextMinute = "خولەکی دواتر";
var prevSecond = "چرکەی پێشوو";
var nextSecond = "چرکەی دواتر";
var am = "پ.ن";
var pm = "د.ن";
var today = "ئەمڕۆ";
var weekHeader = "هەفتە";
var firstDayOfWeek = 0;
var showMonthAfterYear = false;
var dateFormat = "mm/dd/yy";
var weak = "ڕێوکار";
var medium = "مامناوەند";
var strong = "توێژینه‌وه";
var passwordPrompt = "وشه‌ی تێپه‌ڕه‌وشه‌یێک بنووسه";
var emptyFilterMessage = "هیچ نتایجێک نەدۆزرایەوە";
var searchMessage = "{0} نتایج بەردەستە";
var selectionMessage = "{0} بڕی دیاریکراو";
var emptySelectionMessage = "هیچ بڕی دیاریکراوێک نییە";
var emptySearchMessage = "هیچ نتیجەیەک نەدۆزرایەوە";
var emptyMessage = "هیچ هەڵبژاردێک بەردەست نییە";
var aria = {
	trueLabel: "بەڵێ",
	falseLabel: "نەخێر",
	nullLabel: "هیچ دیارینەکراوێک نییە",
	star: "1 ستەر",
	stars: "{ستەر} ستەر",
	selectAll: "هەموو ئامانجەکان دیاریکران",
	unselectAll: "هەموو ئامانجەکان نهێنان",
	close: "داخستن",
	previous: "پێشوو",
	next: "دواتر",
	navigation: "ڕێنووسکردن",
	scrollTop: "بۆ سەرەوەی پەڕە",
	moveTop: "بۆ سەرەوە",
	moveUp: "بۆ سەرەوە",
	moveDown: "بۆ خوارەوە",
	moveBottom: "بۆ خوارەوە",
	moveToTarget: "بۆ ئامانجە دیاریکراو",
	moveToSource: "بۆ ئامانجەی سەرچاوەکراو",
	moveAllToTarget: "بۆ هەموو ئامانجەکانی دیاریکراو",
	moveAllToSource: "بۆ هەموو ئامانجەکانی سەرچاوەکراو",
	pageLabel: "پەڕە {page}",
	firstPageLabel: "یەکەم پەڕە",
	lastPageLabel: "دوایین پەڕە",
	nextPageLabel: "پەڕەی دواتر",
	previousPageLabel: "پەڕەی پێشوو",
	rowsPerPageLabel: "ڕیز/پەڕە",
	jumpToPageDropdownLabel: "پرسکەی داواکراوی پەڕە",
	jumpToPageInputLabel: "پرسکەی داواکراوی پەڕە",
	selectRow: "بڕی دیاریکراو",
	unselectRow: "بڕی نهێنان",
	expandRow: "بڕی بەڵگەڕان",
	collapseRow: "بڕی دابەشکردن",
	showFilterMenu: "مێنیوی ڕێگرتن پیشانبدە",
	hideFilterMenu: "مێنیوی ڕێگرتن بشارەوە",
	filterOperator: "گواستنەوەی ڕێگرتن",
	filterConstraint: "هەڵبژاردنی ڕێگرتن",
	editRow: "ڕیزی دیاریکراو",
	saveEdit: "ڕیزەکە بپاشکەوت بکە",
	cancelEdit: "ڕیزەکە هەڵوەژێرەوە",
	listView: "پیشاندانی لیست",
	gridView: "پیشاندانی شبکە",
	slide: "سلاید",
	slideNumber: "{ژمارەی سلاید}",
	zoomImage: "بەرزکردنی وێنە",
	zoomIn: "بزرێنە",
	zoomOut: "بچووکەوە",
	rotateRight: "بەرانچوونی لە ڕاست",
	rotateLeft: "بەرانچوونی لە چەپ"
};
var ku = {
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
	clear: clear,
	apply: apply,
	matchAll: matchAll,
	matchAny: matchAny,
	addRule: addRule,
	removeRule: removeRule,
	accept: accept,
	reject: reject,
	choose: choose,
	upload: upload,
	cancel: cancel,
	completed: completed,
	pending: pending,
	dayNames: dayNames,
	dayNamesShort: dayNamesShort,
	dayNamesMin: dayNamesMin,
	monthNames: monthNames,
	monthNamesShort: monthNamesShort,
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
	today: today,
	weekHeader: weekHeader,
	firstDayOfWeek: firstDayOfWeek,
	showMonthAfterYear: showMonthAfterYear,
	dateFormat: dateFormat,
	weak: weak,
	medium: medium,
	strong: strong,
	passwordPrompt: passwordPrompt,
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
exports.default = ku;
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
//# sourceMappingURL=ku.json.cjs.map
