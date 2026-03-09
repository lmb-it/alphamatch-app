'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var startsWith = "Beginnt mit";
var contains = "Enthält";
var notContains = "Enthält nicht";
var endsWith = "Endet mit";
var equals = "Ist gleich";
var notEquals = "Ist ungleich";
var noFilter = "Kein Filter";
var filter = "Filtern";
var lt = "Kleiner als";
var lte = "Kleiner oder gleich";
var gt = "Größer als";
var gte = "Größer oder gleich";
var dateIs = "Datum ist";
var dateIsNot = "Datum ist nicht";
var dateBefore = "Datum ist vor";
var dateAfter = "Datum ist nach";
var custom = "Benutzerdefiniert";
var clear = "Löschen";
var apply = "Übernehmen";
var matchAll = "Passt auf alle";
var matchAny = "Passt auf einige";
var addRule = "Regel hinzufügen";
var removeRule = "Regel entfernen";
var accept = "Ja";
var reject = "Nein";
var choose = "Auswählen";
var upload = "Hochladen";
var cancel = "Abbrechen";
var completed = "Abgeschlossen";
var pending = "Ausstehend";
var dayNames = [
	"Sonntag",
	"Montag",
	"Dienstag",
	"Mittwoch",
	"Donnerstag",
	"Freitag",
	"Samstag"
];
var dayNamesShort = [
	"Son",
	"Mon",
	"Die",
	"Mit",
	"Don",
	"Fre",
	"Sam"
];
var dayNamesMin = [
	"So",
	"Mo",
	"Di",
	"Mi",
	"Do",
	"Fr",
	"Sa"
];
var monthNames = [
	"Januar",
	"Februar",
	"März",
	"April",
	"Mai",
	"Juni",
	"Juli",
	"August",
	"September",
	"Oktober",
	"November",
	"Dezember"
];
var monthNamesShort = [
	"Jan",
	"Feb",
	"Mär",
	"Apr",
	"Mai",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Okt",
	"Nov",
	"Dez"
];
var chooseYear = "Jahr wählen";
var chooseMonth = "Monat wählen";
var chooseDate = "Datum wählen";
var prevDecade = "Vorheriges Jahrzehnt";
var nextDecade = "Nächstes Jahrzehnt";
var prevYear = "Vorheriges Jahr";
var nextYear = "Nächstes Jahr";
var prevMonth = "Vorheriger Monat";
var nextMonth = "Nächster Monat";
var prevHour = "Vorherige Stunde";
var nextHour = "Nächste Stunde";
var prevMinute = "Vorherige Minute";
var nextMinute = "Nächste Minute";
var prevSecond = "Vorherige Sekunde";
var nextSecond = "Nächste Sekunde";
var am = "am";
var pm = "pm";
var today = "Heute";
var now = "Jetzt";
var weekHeader = "KW";
var firstDayOfWeek = 1;
var showMonthAfterYear = false;
var dateFormat = "dd.mm.yy";
var weak = "Schwach";
var medium = "Mittel";
var strong = "Stark";
var passwordPrompt = "Passwort eingeben";
var emptyFilterMessage = "Keine Ergebnisse gefunden";
var searchMessage = "{0} Ergebnisse verfügbar";
var selectionMessage = "{0} Elemente ausgewählt";
var emptySelectionMessage = "Kein ausgewähltes Element";
var emptySearchMessage = "Keine Ergebnisse gefunden";
var emptyMessage = "Keine Einträge gefunden";
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
	trueLabel: "Wahr",
	falseLabel: "Falsch",
	nullLabel: "Nicht ausgewählt",
	star: "1 Stern",
	stars: "{star} Sterne",
	selectAll: "Alle Elemente ausgewählt",
	unselectAll: "Alle Elemente abgewählt",
	close: "Schließen",
	previous: "Vorherige",
	next: "Nächste",
	navigation: "Navigation",
	scrollTop: "Nach oben scrollen",
	moveTop: "Zum Anfang bewegen",
	moveUp: "Nach oben bewegen",
	moveDown: "Nach unten bewegen",
	moveBottom: "Zum Ende bewegen",
	moveToTarget: "Zum Ziel bewegen",
	moveToSource: "Zur Quelle bewegen",
	moveAllToTarget: "Alle zum Ziel bewegen",
	moveAllToSource: "Alle zur Quelle bewegen",
	pageLabel: "Seite {page}",
	firstPageLabel: "Erste Seite",
	lastPageLabel: "Letzte Seite",
	nextPageLabel: "Nächste Seite",
	previousPageLabel: "Vorherige Seite",
	rowsPerPageLabel: "Zeilen pro Seite",
	jumpToPageDropdownLabel: "Zum Dropdown-Menü springen",
	jumpToPageInputLabel: "Zum Eingabefeld springen",
	selectRow: "Zeile ausgewählt",
	unselectRow: "Zeile abgewählt",
	expandRow: "Zeile erweitert",
	collapseRow: "Zeile reduziert",
	showFilterMenu: "Filtermenü anzeigen",
	hideFilterMenu: "Filtermenü ausblenden",
	filterOperator: "Filteroperator",
	filterConstraint: "Filterbeschränkung",
	editRow: "Zeile bearbeiten",
	saveEdit: "Änderungen speichern",
	cancelEdit: "Änderungen abbrechen",
	listView: "Listenansicht",
	gridView: "Rasteransicht",
	slide: "Folie",
	slideNumber: "{slideNumber}",
	zoomImage: "Bild vergrößern",
	zoomIn: "Vergrößern",
	zoomOut: "Verkleinern",
	rotateRight: "Nach rechts drehen",
	rotateLeft: "Nach links drehen"
};
var de = {
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
exports.default = de;
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
//# sourceMappingURL=de.json.cjs.map
