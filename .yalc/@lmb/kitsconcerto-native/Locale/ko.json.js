var startsWith = "으로 시작하는";
var contains = "포함하는";
var notContains = "포함하지 않는";
var endsWith = "으로 끝나는";
var equals = "같은";
var notEquals = "같지 않는";
var noFilter = "필터하지 않은";
var filter = "필터";
var lt = "보다 작은";
var lte = "보다 같거나 작은";
var gt = "보다 큰";
var gte = "보다 같거나 큰";
var dateIs = "날짜가 같은";
var dateIsNot = "날짜가 같지 않은";
var dateBefore = "날짜 전";
var dateAfter = "날짜 후";
var custom = "커스텀";
var clear = "초기화";
var apply = "적용";
var matchAll = "모두 맞는";
var matchAny = "하나라도 맞는";
var addRule = "규칙 추가";
var removeRule = "규칙 제거";
var accept = "예";
var reject = "아니오";
var choose = "선택";
var upload = "업로드";
var cancel = "취소";
var completed = "완료";
var pending = "대기";
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
	"일요일",
	"월요일",
	"화요일",
	"수요일",
	"목요일",
	"금요일",
	"토요일"
];
var dayNamesShort = [
	"일",
	"월",
	"화",
	"수",
	"목",
	"금",
	"토"
];
var dayNamesMin = [
	"일",
	"월",
	"화",
	"수",
	"목",
	"금",
	"토"
];
var monthNames = [
	"1월",
	"2월",
	"3월",
	"4월",
	"5월",
	"6월",
	"7월",
	"8월",
	"9월",
	"10월",
	"11월",
	"12월"
];
var monthNamesShort = [
	"1월",
	"2월",
	"3월",
	"4월",
	"5월",
	"6월",
	"7월",
	"8월",
	"9월",
	"10월",
	"11월",
	"12월"
];
var chooseYear = "년을 선택하세요";
var chooseMonth = "월을 선택하세요";
var chooseDate = "일을 선택하세요";
var prevDecade = "10년 전";
var nextDecade = "10년 후";
var prevYear = "작년";
var nextYear = "내년";
var prevMonth = "전달";
var nextMonth = "다음달";
var prevHour = "이전 시간";
var nextHour = "다음 시간";
var prevMinute = "이전 분";
var nextMinute = "다음 분";
var prevSecond = "이전 초";
var nextSecond = "다음 초";
var am = "AM";
var pm = "PM";
var today = "오늘";
var now = "현재";
var weekHeader = "Wk";
var firstDayOfWeek = 0;
var showMonthAfterYear = false;
var dateFormat = "mm/dd/yy";
var weak = "약함";
var medium = "보통";
var strong = "강함";
var passwordPrompt = "패스워드를 입력하세요";
var emptyFilterMessage = "결과가 없습니다.";
var searchMessage = "{0} 개 사용 가능";
var selectionMessage = "{0} 개 선택";
var emptySelectionMessage = "선택되지 않았습니다";
var emptySearchMessage = "결과가 없습니다";
var emptyMessage = "가능한 선택이 없습니다.";
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
	trueLabel: "참",
	falseLabel: "거짓",
	nullLabel: "선택되지 않음",
	star: "별 1개",
	stars: "별 {star}개",
	selectAll: "모두 선택",
	unselectAll: "모두 선택되지 않음",
	close: "닫기",
	previous: "이전",
	next: "다음",
	navigation: "네비게이션",
	scrollTop: "스크롤 위로",
	moveTop: "맨위로 이동",
	moveUp: "위로 이동",
	moveDown: "아래로 이동",
	moveBottom: "맨아래로 이동",
	moveToTarget: "타겟으로 이동",
	moveToSource: "소스로 이동",
	moveAllToTarget: "타겟으로 모두 이동",
	moveAllToSource: "소스로 모두 이동",
	pageLabel: "페이지 {page}",
	firstPageLabel: "첫 페이지",
	lastPageLabel: "마지막 페이지",
	nextPageLabel: "다음 페이지",
	previousPageLabel: "이전 페이지",
	rowsPerPageLabel: "페이지별 행 수",
	jumpToPageDropdownLabel: "페이지 드롭다운라벨로 점프",
	jumpToPageInputLabel: "페이지 입력라벨로 점프",
	selectRow: "행 선택됨",
	unselectRow: "행 선택되지 않음",
	expandRow: "행 확장됨",
	collapseRow: "행 접힘",
	showFilterMenu: "필터 메뉴 보이기",
	hideFilterMenu: "필터 메뉴 숨기기",
	filterOperator: "필터 Operator",
	filterConstraint: "필터 Constraint",
	editRow: "행 편집",
	saveEdit: "편집 저장",
	cancelEdit: "편집 취소",
	listView: "리스트 보기",
	gridView: "그리드 보기",
	slide: "슬라이드",
	slideNumber: "{slideNumber}",
	zoomImage: "확대/축소 이미지",
	zoomIn: "확대",
	zoomOut: "축소",
	rotateRight: "오른쪽으로 회전",
	rotateLeft: "왼쪽으로 회전"
};
var ko = {
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

export { accept, addCategory, addItem, addRule, after, am, any, apply, aria, before, between, cancel, choose, chooseDate, chooseFile, chooseMonth, chooseYear, clear, completed, contains, custom, dateAfter, dateBefore, dateFormat, dateIs, dateIsNot, dayNames, dayNamesMin, dayNamesShort, ko as default, dragFilesHere, edit, emptyFilterMessage, emptyMessage, emptySearchMessage, emptySelectionMessage, endsWith, equal, equals, fileSizeTypes, filesBeingDropped, filesSelected, filter, firstDayOfWeek, generatePhoto, greaterThan, greaterThanOrEqualTo, gt, gte, include, lessThan, lessThanOrEqualTo, lt, lte, matchAll, matchAny, maximumAllowedFiles, medium, monthNames, monthNamesShort, nextDecade, nextHour, nextMinute, nextMonth, nextSecond, nextYear, noFilter, not, notContains, notEquals, now, openMenu, passwordPrompt, pending, pm, prevDecade, prevHour, prevMinute, prevMonth, prevSecond, prevYear, profile, reject, remove, removeRule, save, searchMessage, selectionMessage, settings, showMonthAfterYear, signOut, startsWith, strong, today, toggleColorMode, typeNotSupported, upload, weak, weekHeader };
//# sourceMappingURL=ko.json.js.map
