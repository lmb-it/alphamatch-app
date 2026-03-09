'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var startsWith = "शुरू होता है";
var contains = "Contains";
var notContains = "Not contains";
var endsWith = "समाप्त होता है";
var equals = "बराबर है";
var notEquals = "बराबर नहीं है";
var noFilter = "कोई फिल्टर नहीं";
var filter = "फ़िल्टर";
var lt = "से कम";
var lte = "से कम या बराबर";
var gt = "से अधिक";
var gte = "से अधिक या बराबर";
var dateIs = "दिनांक है";
var dateIsNot = "दिनांक नहीं है";
var dateBefore = "दिनांक से पूर्व है";
var dateAfter = "दिनांक पश्चात है";
var custom = "कस्टम";
var clear = "साफ करें";
var apply = "लागू करें";
var matchAll = "सभी मेल खाएं";
var matchAny = "कोई भी मेल खाएं";
var addRule = "नियम जोड़ें";
var removeRule = "नियम हटाएँ";
var accept = "हाँ";
var reject = "नहीं";
var choose = "चुनें";
var upload = "अपलोड करें";
var cancel = "रद्द करें";
var completed = "पूर्ण";
var pending = "लंबित";
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
	"रविवार",
	"सोमवार",
	"मंगलवार",
	"बुधवार",
	"गुरुवार",
	"शुक्रवार",
	"शनिवार"
];
var dayNamesShort = [
	"रवि",
	"सोम",
	"मंगल",
	"बुध",
	"गुरु",
	"शुक्र",
	"शनि"
];
var dayNamesMin = [
	"र",
	"सो",
	"मं",
	"बु",
	"गु",
	"शु",
	"श"
];
var monthNames = [
	"जनवरी",
	"फ़रवरी",
	"मार्च",
	"अप्रैल",
	"मई",
	"जून",
	"जुलाई",
	"अगस्त",
	"सितंबर",
	"अक्टूबर",
	"नवंबर",
	"दिसंबर"
];
var monthNamesShort = [
	"जन",
	"फ़र",
	"मार्च",
	"अप्रैल",
	"मई",
	"जून",
	"जुल",
	"अग",
	"सितं",
	"अक्टू",
	"नवं",
	"दिसं"
];
var chooseYear = "वर्ष चुनें";
var chooseMonth = "माह चुनें";
var chooseDate = "दिनांक चुनें";
var prevDecade = "पिछला दशक";
var nextDecade = "आगामी दशक";
var prevYear = "पिछला वर्ष";
var nextYear = "आगामी वर्ष";
var prevMonth = "पिछला महीना";
var nextMonth = "आगामी महीना";
var prevHour = "पिछला घंटा";
var nextHour = "आगामी घंटा";
var prevMinute = "पिछला मिनट";
var nextMinute = "आगामी मिनट";
var prevSecond = "पिछला सेकंड";
var nextSecond = "आगामी सेकंड";
var am = "पूर्वाह्न";
var pm = "अपराह्न";
var today = "आज";
var now = "अभि";
var weekHeader = "सप्ताह";
var firstDayOfWeek = 0;
var showMonthAfterYear = false;
var dateFormat = "mm/dd/yy";
var weak = "कमजोर";
var medium = "मध्यम";
var strong = "मजबूत";
var passwordPrompt = "पासवर्ड प्रविष्ट करें";
var emptyFilterMessage = "कोई परिणाम नहीं मिला";
var searchMessage = "{0} परिणाम उपलब्ध हैं";
var selectionMessage = "{0} आइटम चुने गए";
var emptySelectionMessage = "कोई चयनित आइटम नहीं";
var emptySearchMessage = "कोई परिणाम नहीं मिला";
var emptyMessage = "कोई उपलब्ध विकल्प नहीं";
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
	trueLabel: "सत्य",
	falseLabel: "असत्य",
	nullLabel: "चयन नहीं किया गया",
	star: "1 तारा",
	stars: "{star} तारे",
	selectAll: "सभी आइटम चुने गए",
	unselectAll: "सभी आइटम अचयनित",
	close: "बंद करें",
	previous: "पिछला",
	next: "अगला",
	navigation: "नेविगेशन",
	scrollTop: "शीर्ष पर स्क्रॉल करें",
	moveTop: "शीर्ष पर जाएं",
	moveUp: "ऊपर जाएं",
	moveDown: "नीचे जाएं",
	moveBottom: "नीचे जाएं",
	moveToTarget: "लक्ष्य पर जाएं",
	moveToSource: "स्रोत पर जाएं",
	moveAllToTarget: "सभी को लक्ष्य पर ले जाएं",
	moveAllToSource: "सभी को स्रोत पर ले जाएं",
	pageLabel: "पृष्ठ {page}",
	firstPageLabel: "पहला पृष्ठ",
	lastPageLabel: "आखिरी पृष्ठ",
	nextPageLabel: "अगला पृष्ठ",
	previousPageLabel: "पिछला पृष्ठ",
	rowsPerPageLabel: "प्रति पृष्ठ पंक्तियाँ",
	jumpToPageDropdownLabel: "पृष्ठ पर जाएं ड्रॉपडाउन",
	jumpToPageInputLabel: "पृष्ठ पर जाएं इनपुट",
	selectRow: "पंक्ति चुनी गई",
	unselectRow: "पंक्ति चुनी नहीं गई",
	expandRow: "पंक्ति विस्तारित हुई",
	collapseRow: "पंक्ति संकुचित हुई",
	showFilterMenu: "फ़िल्टर मेनू दिखाएं",
	hideFilterMenu: "फ़िल्टर मेनू छिपाएं",
	filterOperator: "फ़िल्टर ऑपरेटर",
	filterConstraint: "फ़िल्टर विवाद",
	editRow: "पंक्ति संपादित करें",
	saveEdit: "संपादन सहेजें",
	cancelEdit: "संपादन रद्द करें",
	listView: "सूची दृश्य",
	gridView: "ग्रिड दृश्य",
	slide: "स्लाइड",
	slideNumber: "{slideNumber}",
	zoomImage: "छवि को ज़ूम करें",
	zoomIn: "ज़ूम इन",
	zoomOut: "ज़ूम आउट",
	rotateRight: "दाईं ओर घुमाएं",
	rotateLeft: "बाईं ओर घुमाएं"
};
var hi = {
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
exports.default = hi;
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
//# sourceMappingURL=hi.json.cjs.map
