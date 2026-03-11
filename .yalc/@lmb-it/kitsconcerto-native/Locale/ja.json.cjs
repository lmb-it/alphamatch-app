'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var startsWith = "始まる";
var contains = "含む";
var notContains = "含まない";
var endsWith = "終わる";
var equals = "等しい";
var notEquals = "等しくない";
var noFilter = "フィルターなし";
var filter = "フィルター";
var lt = "未満";
var lte = "以下";
var gt = "超える";
var gte = "以上";
var dateIs = "等しい";
var dateIsNot = "等しくない";
var dateBefore = "指定日より過去";
var dateAfter = "指定日より未来";
var custom = "カスタム";
var clear = "クリア";
var apply = "適用";
var matchAll = "全て一致";
var matchAny = "いずれかが一致";
var addRule = "条件追加";
var removeRule = "条件削除";
var accept = "はい";
var reject = "いいえ";
var choose = "選択";
var upload = "アップロード";
var cancel = "キャンセル";
var completed = "完了済";
var pending = "保留";
var dayNames = [
	"日曜日",
	"月曜日",
	"火曜日",
	"水曜日",
	"木曜日",
	"金曜日",
	"土曜日"
];
var dayNamesShort = [
	"日",
	"月",
	"火",
	"水",
	"木",
	"金",
	"土"
];
var dayNamesMin = [
	"日",
	"月",
	"火",
	"水",
	"木",
	"金",
	"土"
];
var monthNames = [
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
var chooseYear = "年を選択";
var chooseMonth = "月を選択";
var chooseDate = "日を選択";
var prevDecade = "前の10年";
var nextDecade = "後の10年";
var prevYear = "前年";
var nextYear = "翌年";
var prevMonth = "先月";
var nextMonth = "翌月";
var prevHour = "前の時間";
var nextHour = "次の時間";
var prevMinute = "前の分";
var nextMinute = "次の分";
var prevSecond = "前の秒";
var nextSecond = "次の秒";
var am = "午前";
var pm = "午後";
var today = "今日";
var weekHeader = "週";
var firstDayOfWeek = 0;
var showMonthAfterYear = true;
var dateFormat = "yy/mm/dd";
var weak = "弱い";
var medium = "普通";
var strong = "強い";
var passwordPrompt = "パスワードを入力";
var emptyFilterMessage = "オプションなし";
var searchMessage = "{0} 件の結果";
var selectionMessage = "{0} 件選択済み";
var emptySelectionMessage = "選択なし";
var emptySearchMessage = "該当なし";
var emptyMessage = "結果なし";
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
	trueLabel: "True",
	falseLabel: "False",
	nullLabel: "未選択",
	star: "1件のスター",
	stars: "{star}件のスター",
	selectAll: "全て選択",
	unselectAll: "すべての選択を解除",
	close: "閉じる",
	previous: "前",
	next: "次",
	navigation: "ナビゲーション",
	scrollTop: "トップへスクロール",
	moveTop: "トップへ移動",
	moveUp: "上へ",
	moveDown: "下へ",
	moveBottom: "一番下へ",
	moveToTarget: "ターゲットへ移動",
	moveToSource: "ソースへ移動",
	moveAllToTarget: "ターゲットへ全て移動",
	moveAllToSource: "ソースへ全て移動",
	pageLabel: "{page}ページ",
	firstPageLabel: "最初のページ",
	lastPageLabel: "最後のページ",
	nextPageLabel: "次のページ",
	previousPageLabel: "前のページ",
	rowsPerPageLabel: "行/ページ",
	jumpToPageDropdownLabel: "ページドロップダウンへ",
	jumpToPageInputLabel: "ページ入力へ",
	selectRow: "選択済み行",
	unselectRow: "未選択行",
	expandRow: "展開済行",
	collapseRow: "折りたたみ行",
	showFilterMenu: "フィルターメニューを表示",
	hideFilterMenu: "フィルターメニューを非表示",
	filterOperator: "フィルター操作",
	filterConstraint: "フィルター成約",
	editRow: "行編集",
	saveEdit: "保存",
	cancelEdit: "キャンセル",
	listView: "リストビュー",
	gridView: "グリッドビュー",
	slide: "スライド",
	slideNumber: "{slideNumber}",
	zoomImage: "画像を拡大",
	zoomIn: "拡大",
	zoomOut: "縮小",
	rotateRight: "右に回転",
	rotateLeft: "左に回転"
};
var ja = {
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
exports.default = ja;
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
//# sourceMappingURL=ja.json.cjs.map
