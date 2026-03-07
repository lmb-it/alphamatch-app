'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var startsWith = "Starter med";
var contains = "Inneholder";
var notContains = "Inneholder ikke";
var endsWith = "Slutter på";
var equals = "Er lik";
var notEquals = "Er ikke lik";
var noFilter = "Ikke filtrert";
var filter = "Filter";
var lt = "Mindre enn";
var lte = "Mindre enn eller lik";
var gt = "Større enn";
var gte = "Større enn eller lik";
var dateIs = "Dato er";
var dateIsNot = "Dato er ikke";
var dateBefore = "Dato er før";
var dateAfter = "Dato er etter";
var custom = "Egendefinert";
var clear = "Tøm";
var apply = "Bruk";
var matchAll = "Matcher alle";
var matchAny = "Matcher noen";
var addRule = "Legg til regel";
var removeRule = "Fjern regel";
var accept = "Ja";
var reject = "Nei";
var choose = "Velg";
var upload = "Last opp";
var cancel = "Avbryt";
var completed = "Ferdig";
var pending = "Venter";
var dayNames = [
	"Søndag",
	"Mandag",
	"Tirsdag",
	"Onsdag",
	"Torsdag",
	"Fredag",
	"Lørdag"
];
var dayNamesShort = [
	"Søn",
	"Man",
	"Tir",
	"Ons",
	"Tor",
	"Fre",
	"Lør"
];
var dayNamesMin = [
	"Sø",
	"Ma",
	"Ti",
	"On",
	"To",
	"Fr",
	"Lø"
];
var monthNames = [
	"Januar",
	"Februar",
	"Mars",
	"April",
	"Mai",
	"Juni",
	"Juli",
	"August",
	"September",
	"Oktober",
	"November",
	"Desember"
];
var monthNamesShort = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"Mai",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Okt",
	"Nov",
	"Des"
];
var chooseYear = "Velg år";
var chooseMonth = "Velg måned";
var chooseDate = "Velg dato";
var prevDecade = "Forrige årtiende";
var nextDecade = "Nest årtiende";
var prevYear = "Forrige år";
var nextYear = "Neste år";
var prevMonth = "Forrige måned";
var nextMonth = "Neste måned";
var prevHour = "Forrige time";
var nextHour = "Neste time";
var prevMinute = "Forrige minutt";
var nextMinute = "Neste minutt";
var prevSecond = "Forrige sekund";
var nextSecond = "Neste sekund";
var am = "am";
var pm = "pm";
var today = "I dag";
var now = "Nå";
var weekHeader = "Uke";
var firstDayOfWeek = 1;
var showMonthAfterYear = false;
var dateFormat = "dd.mm.yy";
var weak = "Svakt";
var medium = "Middels";
var strong = "Sterkt";
var passwordPrompt = "Skriv et passord";
var emptyFilterMessage = "Ingen resultater funnet";
var searchMessage = "{0} resultater er tilgjengelige";
var selectionMessage = "{0} oppføringer valgt";
var emptySelectionMessage = "Ingen valgte oppføringer";
var emptySearchMessage = "Ingen resultater funnet";
var emptyMessage = "Ingen tilgjengelige valg";
var aria = {
	trueLabel: "På",
	falseLabel: "Av",
	nullLabel: "Ikke valgt",
	star: "1 stjerne",
	stars: "{star} stjerner",
	selectAll: "Alle oppføringer valgt",
	unselectAll: "Ingen oppføringer valgt",
	close: "Lukk",
	previous: "Forrige",
	next: "Neste",
	navigation: "Navigasjon",
	scrollTop: "Skroll til toppen",
	moveTop: "Flytt til toppen",
	moveUp: "Flytt opp",
	moveDown: "Flytt ned",
	moveBottom: "Flytt til bunnen",
	moveToTarget: "Flytt til mål",
	moveToSource: "Flytt til kilde",
	moveAllToTarget: "Flytt alle til mål",
	moveAllToSource: "Flytt alle til kilde",
	pageLabel: "Side {page}",
	firstPageLabel: "Første side",
	lastPageLabel: "Siste side",
	nextPageLabel: "Neste side",
	previousPageLabel: "Forrige side",
	rowsPerPageLabel: "Rader per side",
	jumpToPageDropdownLabel: "Hopp til nestrekksmeny for side",
	jumpToPageInputLabel: "Hopp til sideledetekst",
	selectRow: "Rad valgt",
	unselectRow: "Rad ikke valgt",
	expandRow: "Rad utvidet",
	collapseRow: "Rad kollapset",
	showFilterMenu: "Vis filtermeny",
	hideFilterMenu: "Skjul filtermeny",
	filterOperator: "Filteroperator",
	filterConstraint: "Filterbegrensning",
	editRow: "Rediger rad",
	saveEdit: "Lagre redigering",
	cancelEdit: "Avbryt redigering",
	listView: "Listevisning",
	gridView: "Rutenettsvisning",
	slide: "Bilde",
	slideNumber: "{slideNumber}",
	zoomImage: "Forstørr bilde",
	zoomIn: "Forstørr",
	zoomOut: "Forminsk",
	rotateRight: "Roter til høyre",
	rotateLeft: "Roter til venstre"
};
var nbNo = {
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
exports.default = nbNo;
exports.emptyFilterMessage = emptyFilterMessage;
exports.emptyMessage = emptyMessage;
exports.emptySearchMessage = emptySearchMessage;
exports.emptySelectionMessage = emptySelectionMessage;
exports.endsWith = endsWith;
exports.equals = equals;
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
//# sourceMappingURL=nb-no.json.cjs.map
