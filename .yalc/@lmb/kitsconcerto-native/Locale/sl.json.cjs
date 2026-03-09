'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var startsWith = "Se začne z";
var contains = "Vsebuje";
var notContains = "Ne vsebuje";
var endsWith = "Se konča z";
var equals = "Je enak";
var notEquals = "Ni enak";
var noFilter = "Brez filtra";
var filter = "Filter";
var lt = "Manjši";
var lte = "Manjši ali enak";
var gt = "Večji";
var gte = "Večji ali enak";
var dateIs = "Datum je";
var dateIsNot = "Datum ni enak";
var dateBefore = "Datum je pred";
var dateAfter = "Datum je za";
var custom = "Po meri";
var clear = "Briši";
var apply = "Uporabi";
var matchAll = "Se ujema z vsem";
var matchAny = "Se ujema s katerim koli ";
var addRule = "Dodaj pravilo";
var removeRule = "Odvzemi pravilo";
var accept = "Sprejmi";
var reject = "Zavrni";
var choose = "Izberi";
var upload = "Naloži";
var cancel = "Prekliči";
var completed = "Končan";
var pending = "V teku";
var dayNames = [
	"nedelja",
	"ponedeljek",
	"torek",
	"sreda",
	"četrtek",
	"petek",
	"sobota"
];
var dayNamesShort = [
	"ned.",
	"pon.",
	"tor.",
	"sre.",
	"čet.",
	"pet.",
	"sob."
];
var dayNamesMin = [
	"ne",
	"po",
	"to",
	"sr",
	"če",
	"pe",
	"so"
];
var monthNames = [
	"januar",
	"februar",
	"marec",
	"april",
	"maj",
	"junij",
	"julij",
	"avgust",
	"september",
	"oktober",
	"november",
	"december"
];
var monthNamesShort = [
	"jan.",
	"feb.",
	"mar.",
	"apr.",
	"maj.",
	"jun.",
	"jul.",
	"avg.",
	"sep.",
	"okt.",
	"nov.",
	"dec."
];
var chooseYear = "Izberi leto";
var chooseMonth = "Izberi mesec";
var chooseDate = "Izberi datum";
var prevDecade = "Prejšnje desetletje";
var nextDecade = "Naslednje desetletje";
var prevYear = "Prejšnje leto";
var nextYear = "Naslednje leto";
var prevMonth = "Prejšnji mesec";
var nextMonth = "Naslednji mesec";
var prevHour = "Prejšnja ura";
var nextHour = "Naslednja ura";
var prevMinute = "Prejšnja minuta";
var nextMinute = "Naslednja minuta";
var prevSecond = "Prevjšnja sekunda";
var nextSecond = "Naslednja sekunda";
var am = "dop.";
var pm = "pop.";
var today = "Danes";
var weekHeader = "Wk";
var firstDayOfWeek = 0;
var showMonthAfterYear = false;
var dateFormat = "dd.mm.yy";
var weak = "Teden";
var medium = "Medium";
var strong = "Povdarjen";
var passwordPrompt = "Vnesi geslo";
var emptyFilterMessage = "Ni rezultata";
var searchMessage = "{0} resultatov";
var selectionMessage = "{0} izbranih";
var emptySelectionMessage = "Ni izbora";
var emptySearchMessage = "Ni rezultata";
var emptyMessage = "Ni opcije";
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
	nullLabel: "Ni izbran",
	star: "1 zvezdica",
	stars: "{star} zvezdic",
	selectAll: "Izberi vse",
	unselectAll: "Prekliči izbor",
	close: "Zapri",
	previous: "Prejšnji",
	next: "Naslednji",
	navigation: "Navigacija",
	scrollTop: "Premik na vrh",
	moveTop: "Premik na vrh",
	moveUp: "Premik gor",
	moveDown: "Premik dol",
	moveBottom: "Premik na dno",
	moveToTarget: "Premik na cilj",
	moveToSource: "Premik na vir",
	moveAllToTarget: "Premakni vse na cilj",
	moveAllToSource: "Premakni vse na vir",
	pageLabel: "Stran {page}",
	firstPageLabel: "Prva stran",
	lastPageLabel: "Zadnja stran",
	nextPageLabel: "Naslednja stran",
	previousPageLabel: "Prejšnja stran",
	rowsPerPageLabel: "Vrstic na stran",
	jumpToPageDropdownLabel: "Jump to Page Dropdown",
	jumpToPageInputLabel: "Jump to Page Input",
	selectRow: "Vrstica je izbrana",
	unselectRow: "Vrstica ni izbrana",
	expandRow: "Vrstica razširjena",
	collapseRow: "Vrstica strnjena",
	showFilterMenu: "Pokaži meni filtra",
	hideFilterMenu: "Skrij meni filtra",
	filterOperator: "Filter Operator",
	filterConstraint: "Filter Constraint",
	editRow: "Uredi vrstico",
	saveEdit: "Shrani vrstico",
	cancelEdit: "Cancel Edit",
	listView: "List View",
	gridView: "Grid View",
	slide: "Slide",
	slideNumber: "{slideNumber}",
	zoomImage: "Povečava slike",
	zoomIn: "Povečaj",
	zoomOut: "Zmanjšaj",
	rotateRight: "Zavrti desno",
	rotateLeft: "Zavrti levo"
};
var sl = {
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
exports.default = sl;
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
//# sourceMappingURL=sl.json.cjs.map
