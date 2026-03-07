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
	"Jänner",
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
	"Jän",
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
var deAt = {
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
exports.default = deAt;
exports.emptyFilterMessage = emptyFilterMessage;
exports.emptyMessage = emptyMessage;
exports.emptySearchMessage = emptySearchMessage;
exports.emptySelectionMessage = emptySelectionMessage;
exports.endsWith = endsWith;
exports.equals = equals;
exports.fileSizeTypes = fileSizeTypes;
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
exports.now = now;
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
//# sourceMappingURL=de-at.json.cjs.map
