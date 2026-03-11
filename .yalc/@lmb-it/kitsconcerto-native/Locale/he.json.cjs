'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var startsWith = "מתחיל ב";
var contains = "מכיל";
var notContains = "אינו מכיל";
var endsWith = "מסתיים ב";
var equals = "שווה";
var notEquals = "אינו שווה";
var noFilter = "ללא מסנן";
var filter = "סנן";
var lt = "פחות מ";
var lte = "פחות או שווה ל";
var gt = "יותר מ";
var gte = "יותר או שווה ל";
var dateIs = "התאריך הוא";
var dateIsNot = "התאריך אינו";
var dateBefore = "התאריך לפני";
var dateAfter = "התאריך אחרי";
var custom = "מותאם";
var clear = "נקה";
var apply = "החל";
var matchAll = "התאמה לכל החוקים";
var matchAny = "התאמה לכל חוק";
var addRule = "הוסף חוק";
var removeRule = "הסר חוק";
var accept = "כן";
var reject = "לא";
var choose = "בחר";
var upload = "העלה";
var cancel = "בטל";
var completed = "הושלם";
var pending = "ממתין";
var fileSizeTypes = [
	"בתים",
	"ק\"ב",
	"מ\"ב",
	"ג\"ב",
	"ט\"ב",
	"פ\"ב",
	"א\"ב",
	"ז\"ב",
	"י\"ב"
];
var dayNames = [
	"ראשון",
	"שני",
	"שלישי",
	"רביעי",
	"חמישי",
	"שישי",
	"שבת"
];
var dayNamesShort = [
	"א",
	"ב",
	"ג",
	"ד",
	"ה",
	"ו",
	"ש"
];
var dayNamesMin = [
	"א",
	"ב",
	"ג",
	"ד",
	"ה",
	"ו",
	"ש"
];
var monthNames = [
	"ינואר",
	"פברואר",
	"מרץ",
	"אפריל",
	"מאי",
	"יוני",
	"יולי",
	"אוגוסט",
	"ספטמבר",
	"אוקטובר",
	"נובמבר",
	"דצמבר"
];
var monthNamesShort = [
	"ינו",
	"פבר",
	"מרץ",
	"אפר",
	"מאי",
	"יונ",
	"יול",
	"אוג",
	"ספט",
	"אוק",
	"נוב",
	"דצמ"
];
var chooseYear = "בחר שנה";
var chooseMonth = "בחר חודש";
var chooseDate = "בחר תאריך";
var prevDecade = "עשור קודם";
var nextDecade = "עשור הבא";
var prevYear = "שנה קודמת";
var nextYear = "שנה הבאה";
var prevMonth = "חודש קודם";
var nextMonth = "חודש הבא";
var prevHour = "שעה קודמת";
var nextHour = "שעה הבאה";
var prevMinute = "דקה קודמת";
var nextMinute = "דקה הבאה";
var prevSecond = "שנייה קודמת";
var nextSecond = "שנייה הבאה";
var am = "בבוקר";
var pm = "בערב";
var today = "היום";
var now = "עכשיו";
var weekHeader = "שבוע";
var firstDayOfWeek = 0;
var showMonthAfterYear = false;
var dateFormat = "dd/mm/yy";
var weak = "חלש";
var medium = "בינוני";
var strong = "חזק";
var passwordPrompt = "הזן סיסמה";
var emptyFilterMessage = "לא נמצאו תוצאות";
var searchMessage = "ישנם {0} תוצאות זמינות";
var selectionMessage = "{0} פריטים נבחרו";
var emptySelectionMessage = "לא נבחרו פריטים";
var emptySearchMessage = "לא נמצאו תוצאות";
var emptyMessage = "אין אפשרויות זמינות";
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
	trueLabel: "נכון",
	falseLabel: "לא נבחר",
	nullLabel: "לא נבחר",
	star: "כוכב 1",
	stars: "{star} כוכבים",
	selectAll: "נבחרו כל הפריטים",
	unselectAll: "הוסרו כל הפריטים",
	close: "סגור",
	previous: "קודם",
	next: "הבא",
	navigation: "ניווט",
	scrollTop: "גלול למעלה",
	moveTop: "העבר לראש",
	moveUp: "העבר למעלה",
	moveDown: "העבר למטה",
	moveBottom: "העבר לתחתית",
	moveToTarget: "העבר ליעד",
	moveToSource: "העבר למקור",
	moveAllToTarget: "העבר הכל ליעד",
	moveAllToSource: "העבר הכל למקור",
	pageLabel: "עמוד {page}",
	firstPageLabel: "עמוד ראשון",
	lastPageLabel: "עמוד אחרון",
	nextPageLabel: "עמוד הבא",
	previousPageLabel: "עמוד קודם",
	rowsPerPageLabel: "שורות לעמוד",
	jumpToPageDropdownLabel: "קפיצה לעמוד",
	jumpToPageInputLabel: "קפיצה לעמוד",
	selectRow: "שורה נבחרה",
	unselectRow: "שורה לא נבחרה",
	expandRow: "הרחב שורה",
	collapseRow: "כווץ שורה",
	showFilterMenu: "הצג תפריט מסנן",
	hideFilterMenu: "הסתר תפריט מסנן",
	filterOperator: "סנן מפעיל",
	filterConstraint: "סנן הגבלה",
	editRow: "ערוך שורה",
	saveEdit: "שמור עריכה",
	cancelEdit: "בטל עריכה",
	listView: "תצוגת רשימה",
	gridView: "תצוגת רשת",
	slide: "החלק",
	slideNumber: "החלק {slideNumber}",
	zoomImage: "הגדל תמונה",
	zoomIn: "הגדל",
	zoomOut: "הקטן",
	rotateRight: "סובב ימינה",
	rotateLeft: "סובב שמאלה"
};
var he = {
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
exports.default = he;
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
//# sourceMappingURL=he.json.cjs.map
