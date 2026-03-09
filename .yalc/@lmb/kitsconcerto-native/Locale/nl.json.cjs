'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var startsWith = "Begint met";
var contains = "Bevat";
var notContains = "Bevat niet";
var endsWith = "Eindigt met";
var equals = "Is gelijk aan";
var notEquals = "Is niet gelijk aan";
var noFilter = "Geen filter";
var filter = "Filter";
var lt = "Kleiner dan";
var lte = "Kleiner dan of gelijk aan";
var gt = "Groter dan";
var gte = "Groter dan of gelijk aan";
var dateIs = "Datum is";
var dateIsNot = "Datum is niet";
var dateBefore = "Datum is voor";
var dateAfter = "Date is na";
var custom = "Aangepast";
var clear = "Wissen";
var apply = "Toepassen";
var matchAll = "Overeenkomen met alle";
var matchAny = "Overeenkomen met elke";
var addRule = "Voeg regel toe";
var removeRule = "Verwijder regel";
var accept = "Ja";
var reject = "Nee";
var choose = "Kies";
var upload = "Upload";
var cancel = "Annuleer";
var completed = "Voltooid";
var pending = "In behandeling";
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
	"zondag",
	"maandag",
	"dinsdag",
	"woensdag",
	"donderdag",
	"vrijdag",
	"zaterdag"
];
var dayNamesShort = [
	"zon",
	"ma",
	"di",
	"woe",
	"do",
	"vrij",
	"zat"
];
var dayNamesMin = [
	"zo",
	"ma",
	"di",
	"wo",
	"do",
	"vr",
	"za"
];
var monthNames = [
	"januari",
	"februari",
	"maart",
	"april",
	"mei",
	"juni",
	"juli",
	"augustus",
	"september",
	"oktober",
	"november",
	"december"
];
var monthNamesShort = [
	"jan",
	"feb",
	"mar",
	"apr",
	"mei",
	"jun",
	"jul",
	"aug",
	"sep",
	"okt",
	"nov",
	"dec"
];
var chooseYear = "Kies jaar";
var chooseMonth = "Kies maand";
var chooseDate = "Kies datum";
var prevDecade = "Vorig decennium";
var nextDecade = "Volgend decennium";
var prevYear = "Vorig jaar";
var nextYear = "Volgend jaar";
var prevMonth = "Vorige maand";
var nextMonth = "Volgende maand";
var prevHour = "Vorig uur";
var nextHour = "Volgend uur";
var prevMinute = "Vorige minuut";
var nextMinute = "Volgende minuut";
var prevSecond = "Vorige seconde";
var nextSecond = "Volgende seconde";
var am = "voormiddag";
var pm = "namiddag";
var today = "Vandaag";
var now = "Nu";
var weekHeader = "Wk";
var firstDayOfWeek = 1;
var showMonthAfterYear = false;
var dateFormat = "dd-mm-yy";
var weak = "Zwak";
var medium = "Gemiddeld";
var strong = "Sterk";
var passwordPrompt = "Geef een wachtwoord";
var emptyFilterMessage = "Geen resultaten gevonden";
var searchMessage = "{0} resultaten beschikbaar";
var selectionMessage = "{0} opties geselecteerd";
var emptySelectionMessage = "Geen optie geselecteerd";
var emptySearchMessage = "Geen resultaten gevonden";
var emptyMessage = "Geen beschikbare opties";
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
	trueLabel: "Waar",
	falseLabel: "Onwaar",
	nullLabel: "Niet geselecteerd",
	star: "1 ster",
	stars: "{star} sterren",
	selectAll: "Alle opties geselecteerd",
	unselectAll: "Alle opties gedeselecteerd",
	close: "Sluit",
	previous: "Vorige",
	next: "Volgende",
	navigation: "Navigatie",
	scrollTop: "Scroll naar boven",
	moveTop: "Verplaats naar boven",
	moveUp: "Verplaats omhoog",
	moveDown: "Verplaats omlaag",
	moveBottom: "Verplaats naar beneden",
	moveToTarget: "Verplaats naar doel",
	moveToSource: "Verplaats naar bron",
	moveAllToTarget: "Verplaats alle naar doel",
	moveAllToSource: "Verplaats alle naar bron",
	pageLabel: "Pagina {page}",
	firstPageLabel: "Eerste pagina",
	lastPageLabel: "Laatste pagina",
	nextPageLabel: "Volgende pagina",
	previousPageLabel: "Vorige pagina",
	rowsPerPageLabel: "Rijen per pagina",
	jumpToPageDropdownLabel: "Spring naar paginamenu",
	jumpToPageInputLabel: "Spring naar pagina-invoer",
	selectRow: "Rij geselecteerd",
	unselectRow: "Rij gedeselecteerd",
	expandRow: "Rij uitgeklapt",
	collapseRow: "Rij ingeklapt",
	showFilterMenu: "Toon filtermenu",
	hideFilterMenu: "Verberg filtermenu",
	filterOperator: "Filteroperator",
	filterConstraint: "Filterbeperking",
	editRow: "Bewerk rij",
	saveEdit: "Sla bewerking op",
	cancelEdit: "Annuleer bewerking",
	listView: "Lijstweergave",
	gridView: "Roosterweergave",
	slide: "Dia",
	slideNumber: "{slideNumber}",
	zoomImage: "Zoom afbeeling",
	zoomIn: "Zoom in",
	zoomOut: "Zoom uit",
	rotateRight: "Draai rechtsom",
	rotateLeft: "Draai linksom"
};
var nl = {
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
exports.default = nl;
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
//# sourceMappingURL=nl.json.cjs.map
