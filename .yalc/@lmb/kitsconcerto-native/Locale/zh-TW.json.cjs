'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var startsWith = "以...開始";
var contains = "包含";
var notContains = "不包含";
var endsWith = "以...結束";
var equals = "等於";
var notEquals = "不等於";
var noFilter = "不篩選";
var filter = "篩選";
var lt = "小於";
var lte = "小於或等於";
var gt = "大於";
var gte = "大於或等於";
var dateIs = "日期為";
var dateIsNot = "日期不為";
var dateBefore = "日期早於";
var dateAfter = "日期晚於";
var custom = "自訂義";
var clear = "清除";
var apply = "應用";
var matchAll = "全部匹配";
var matchAny = "任意匹配";
var addRule = "增加規則";
var removeRule = "移除規則";
var accept = "是";
var reject = "否";
var choose = "選擇";
var upload = "上傳";
var cancel = "取消";
var completed = "已完成";
var pending = "待定";
var fileSizeTypes = [
	"B",
	"KB",
	"MB",
	"GB",
	"TB",
	"PB",
	"EB",
	"ZB",
	"YB"
];
var dayNames = [
	"星期日",
	"星期一",
	"星期二",
	"星期三",
	"星期四",
	"星期五",
	"星期六"
];
var dayNamesShort = [
	"周日",
	"周一",
	"周二",
	"周三",
	"周四",
	"周五",
	"周六"
];
var dayNamesMin = [
	"日",
	"一",
	"二",
	"三",
	"四",
	"五",
	"六"
];
var monthNames = [
	"一月",
	"二月",
	"三月",
	"四月",
	"五月",
	"六月",
	"七月",
	"八月",
	"九月",
	"十月",
	"十一月",
	"十二月"
];
var monthNamesShort = [
	"1 月",
	"2 月",
	"3 月",
	"4 月",
	"5 月",
	"6 月",
	"7 月",
	"8 月",
	"9 月",
	"10 月",
	"11 月",
	"12 月"
];
var chooseYear = "選擇年份";
var chooseMonth = "選擇月份";
var chooseDate = "選擇日期";
var prevDecade = "上一個十年";
var nextDecade = "下一個十年";
var prevYear = "上一年";
var nextYear = "下一年";
var prevMonth = "上一個月";
var nextMonth = "下一個月";
var prevHour = "上一個小時";
var nextHour = "下一個小時";
var prevMinute = "上一分鐘";
var nextMinute = "下一分鐘";
var prevSecond = "上一秒";
var nextSecond = "下一秒";
var am = "上午";
var pm = "下午";
var today = "今日";
var now = "現在";
var weekHeader = "周";
var firstDayOfWeek = 0;
var showMonthAfterYear = true;
var dateFormat = "yy/mm/dd";
var weak = "弱";
var medium = "中";
var strong = "強";
var passwordPrompt = "輸入一組密碼";
var emptyFilterMessage = "無相關篩選結果";
var searchMessage = "{0} 個相關結果";
var selectionMessage = "{0} 個項目被選取";
var emptySelectionMessage = "無選取項目";
var emptySearchMessage = "無相關搜尋結果";
var emptyMessage = "無可用選項";
var openMenu = "Open menu";
var toggleColorMode = "Toggle color mode";
var signOut = "Sign out";
var profile = "Profile";
var filesSelected = "{0} Files Selected";
var dragFilesHere = "Drag Files Here or click for browse";
var filesBeingDropped = "Files Being Dropped";
var typeNotSupported = "This type is not supported";
var maximumAllowedFiles = "Maximum allowed files {0} files";
var remove = "Remove";
var edit = "Edit";
var save = "Save";
var generatePhoto = "Generate Photo";
var settings = "Settings";
var addCategory = "Add Category";
var addItem = "Add Item";
var any = "Any";
var chooseFile = "Choose file";
var greaterThan = "Greater than";
var greaterThanOrEqualTo = "Greater than or equal to";
var lessThan = "Less than";
var lessThanOrEqualTo = "Less than or equal to";
var between = "Between";
var include = "Include";
var equal = "Equal";
var after = "After";
var before = "Before";
var not = "Not";
var aria = {
	trueLabel: "是",
	falseLabel: "否",
	nullLabel: "未選擇",
	star: "1 顆星",
	stars: "{star} 顆星",
	selectAll: "已選取所有項目",
	unselectAll: "已取消選取所有項目",
	close: "關閉",
	previous: "上一個",
	next: "下一個",
	navigation: "轉導",
	scrollTop: "滾動至頂端",
	moveTop: "移動至頂端",
	moveUp: "往上移動",
	moveDown: "往下移動",
	moveBottom: "移動至底端",
	moveToTarget: "移動至目標",
	moveToSource: "移動至來源",
	moveAllToTarget: "全部移動至目標",
	moveAllToSource: "全部移動至來源",
	pageLabel: "{page}",
	firstPageLabel: "第一頁",
	lastPageLabel: "最後一頁",
	nextPageLabel: "下一頁",
	previousPageLabel: "上一頁",
	rowsPerPageLabel: "每頁行數",
	jumpToPageDropdownLabel: "跳至頁面下拉選單",
	jumpToPageInputLabel: "跳至頁面輸入欄位",
	selectRow: "選取行",
	unselectRow: "取消選取行",
	expandRow: "展開行",
	collapseRow: "收闔行",
	showFilterMenu: "展示篩選選單",
	hideFilterMenu: "隱藏篩選選單",
	filterOperator: "篩選運算子",
	filterConstraint: "篩選條件",
	editRow: "編輯行",
	saveEdit: "儲存編輯",
	cancelEdit: "取消編輯",
	listView: "列表視圖",
	gridView: "網格視圖",
	slide: "滑動",
	slideNumber: "{slideNumber}",
	zoomImage: "放大圖片",
	zoomIn: "放大",
	zoomOut: "縮小",
	rotateRight: "向右旋轉",
	rotateLeft: "向左旋轉"
};
var zhTW = {
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
	fileSizeTypes: fileSizeTypes,
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
	now: now,
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
	openMenu: openMenu,
	toggleColorMode: toggleColorMode,
	signOut: signOut,
	profile: profile,
	filesSelected: filesSelected,
	dragFilesHere: dragFilesHere,
	filesBeingDropped: filesBeingDropped,
	typeNotSupported: typeNotSupported,
	maximumAllowedFiles: maximumAllowedFiles,
	remove: remove,
	edit: edit,
	save: save,
	generatePhoto: generatePhoto,
	settings: settings,
	addCategory: addCategory,
	addItem: addItem,
	"delete": "Delete",
	any: any,
	chooseFile: chooseFile,
	greaterThan: greaterThan,
	greaterThanOrEqualTo: greaterThanOrEqualTo,
	lessThan: lessThan,
	lessThanOrEqualTo: lessThanOrEqualTo,
	between: between,
	include: include,
	equal: equal,
	after: after,
	before: before,
	not: not,
	aria: aria
};

exports.accept = accept;
exports.addCategory = addCategory;
exports.addItem = addItem;
exports.addRule = addRule;
exports.after = after;
exports.am = am;
exports.any = any;
exports.apply = apply;
exports.aria = aria;
exports.before = before;
exports.between = between;
exports.cancel = cancel;
exports.choose = choose;
exports.chooseDate = chooseDate;
exports.chooseFile = chooseFile;
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
exports.default = zhTW;
exports.dragFilesHere = dragFilesHere;
exports.edit = edit;
exports.emptyFilterMessage = emptyFilterMessage;
exports.emptyMessage = emptyMessage;
exports.emptySearchMessage = emptySearchMessage;
exports.emptySelectionMessage = emptySelectionMessage;
exports.endsWith = endsWith;
exports.equal = equal;
exports.equals = equals;
exports.fileSizeTypes = fileSizeTypes;
exports.filesBeingDropped = filesBeingDropped;
exports.filesSelected = filesSelected;
exports.filter = filter;
exports.firstDayOfWeek = firstDayOfWeek;
exports.generatePhoto = generatePhoto;
exports.greaterThan = greaterThan;
exports.greaterThanOrEqualTo = greaterThanOrEqualTo;
exports.gt = gt;
exports.gte = gte;
exports.include = include;
exports.lessThan = lessThan;
exports.lessThanOrEqualTo = lessThanOrEqualTo;
exports.lt = lt;
exports.lte = lte;
exports.matchAll = matchAll;
exports.matchAny = matchAny;
exports.maximumAllowedFiles = maximumAllowedFiles;
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
exports.not = not;
exports.notContains = notContains;
exports.notEquals = notEquals;
exports.now = now;
exports.openMenu = openMenu;
exports.passwordPrompt = passwordPrompt;
exports.pending = pending;
exports.pm = pm;
exports.prevDecade = prevDecade;
exports.prevHour = prevHour;
exports.prevMinute = prevMinute;
exports.prevMonth = prevMonth;
exports.prevSecond = prevSecond;
exports.prevYear = prevYear;
exports.profile = profile;
exports.reject = reject;
exports.remove = remove;
exports.removeRule = removeRule;
exports.save = save;
exports.searchMessage = searchMessage;
exports.selectionMessage = selectionMessage;
exports.settings = settings;
exports.showMonthAfterYear = showMonthAfterYear;
exports.signOut = signOut;
exports.startsWith = startsWith;
exports.strong = strong;
exports.today = today;
exports.toggleColorMode = toggleColorMode;
exports.typeNotSupported = typeNotSupported;
exports.upload = upload;
exports.weak = weak;
exports.weekHeader = weekHeader;
//# sourceMappingURL=zh-TW.json.cjs.map
