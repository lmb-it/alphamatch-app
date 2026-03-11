'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var startsWith = "以...开始";
var contains = "包含";
var notContains = "不包含";
var endsWith = "以...结尾";
var equals = "等于";
var notEquals = "不等于";
var noFilter = "无筛选";
var filter = "筛选";
var lt = "小于";
var lte = "小于等于";
var gt = "大于";
var gte = "大于等于";
var dateIs = "日期为";
var dateIsNot = "日期不为";
var dateBefore = "日期早于";
var dateAfter = "日期晚于";
var custom = "自定义";
var clear = "清除";
var apply = "应用";
var matchAll = "全部匹配";
var matchAny = "任意匹配";
var addRule = "添加规则";
var removeRule = "移除规则";
var accept = "是";
var reject = "否";
var choose = "选择";
var upload = "上传";
var cancel = "取消";
var completed = "已完成";
var pending = "待处理";
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
	"1月",
	"2月",
	"3月",
	"4月",
	"5月",
	"6月",
	"7月",
	"8月",
	"9月",
	"10月",
	"11月",
	"12月"
];
var chooseYear = "选择年份";
var chooseMonth = "选择月份";
var chooseDate = "选择日期";
var prevDecade = "上一个十年";
var nextDecade = "下一个十年";
var prevYear = "上一年";
var nextYear = "下一年";
var prevMonth = "上个月";
var nextMonth = "下个月";
var prevHour = "上一小时";
var nextHour = "下一小时";
var prevMinute = "上一分钟";
var nextMinute = "下一分钟";
var prevSecond = "上一秒";
var nextSecond = "下一秒";
var am = "上午";
var pm = "下午";
var today = "今天";
var weekHeader = "周";
var firstDayOfWeek = 0;
var showMonthAfterYear = true;
var dateFormat = "yy/mm/dd";
var weak = "弱";
var medium = "中";
var strong = "强";
var passwordPrompt = "输入密码";
var emptyFilterMessage = "未找到结果";
var searchMessage = "有 {0} 条结果可用";
var selectionMessage = "已选择 {0} 项";
var emptySelectionMessage = "未选择任何项";
var emptySearchMessage = "未找到结果";
var emptyMessage = "无可用选项";
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
	nullLabel: "未选择",
	star: "1颗星",
	stars: "{star}颗星",
	selectAll: "已选择所有项目",
	unselectAll: "已取消选择所有项目",
	close: "关闭",
	previous: "上一个",
	next: "下一个",
	navigation: "导航",
	scrollTop: "滚动到顶部",
	moveTop: "移至顶部",
	moveUp: "上移",
	moveDown: "下移",
	moveBottom: "移至底部",
	moveToTarget: "移至目标",
	moveToSource: "移至源",
	moveAllToTarget: "全部移至目标",
	moveAllToSource: "全部移至源",
	pageLabel: "{page}",
	firstPageLabel: "首页",
	lastPageLabel: "尾页",
	nextPageLabel: "下一页",
	previousPageLabel: "上一页",
	rowsPerPageLabel: "每页行数",
	jumpToPageDropdownLabel: "跳至页面下拉框",
	jumpToPageInputLabel: "跳至页面输入框",
	selectRow: "选择行",
	unselectRow: "取消选择行",
	expandRow: "展开行",
	collapseRow: "折叠行",
	showFilterMenu: "显示筛选菜单",
	hideFilterMenu: "隐藏筛选菜单",
	filterOperator: "筛选运算符",
	filterConstraint: "筛选条件",
	editRow: "编辑行",
	saveEdit: "保存编辑",
	cancelEdit: "取消编辑",
	listView: "列表视图",
	gridView: "网格视图",
	slide: "滑动",
	slideNumber: "{slideNumber}",
	zoomImage: "放大图片",
	zoomIn: "放大",
	zoomOut: "缩小",
	rotateRight: "向右旋转",
	rotateLeft: "向左旋转"
};
var zhCN = {
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
exports.default = zhCN;
exports.dragFilesHere = dragFilesHere;
exports.edit = edit;
exports.emptyFilterMessage = emptyFilterMessage;
exports.emptyMessage = emptyMessage;
exports.emptySearchMessage = emptySearchMessage;
exports.emptySelectionMessage = emptySelectionMessage;
exports.endsWith = endsWith;
exports.equal = equal;
exports.equals = equals;
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
//# sourceMappingURL=zh-CN.json.cjs.map
