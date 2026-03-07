'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var startsWith = "Starter med";
var contains = "Indeholder";
var notContains = "Indeholder ikke";
var endsWith = "Slutter med";
var equals = "Lig med";
var notEquals = "Ikke lig med";
var noFilter = "Ingen filtrering";
var filter = "Filtrer";
var lt = "Mindre end";
var lte = "Mindre end eller lig med";
var gt = "Større end";
var gte = "Større end eller lig med";
var dateIs = "Dato er";
var dateIsNot = "Dato er ikke";
var dateBefore = "Dato er før";
var dateAfter = "Dato er efter";
var custom = "Brugerdefineret";
var clear = "Ryd";
var apply = "Anvend";
var matchAll = "Match alle";
var matchAny = "Match nogen";
var addRule = "Tilføj regel";
var removeRule = "Fjern regel";
var accept = "Ja";
var reject = "Nej";
var choose = "Vælg";
var upload = "Upload";
var cancel = "Annuller";
var completed = "Afsluttet";
var pending = "Afventer";
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
	"Marts",
	"April",
	"Maj",
	"Juni",
	"Juli",
	"August",
	"September",
	"Oktober",
	"November",
	"December"
];
var monthNamesShort = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"Maj",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Okt",
	"Nov",
	"Dec"
];
var chooseYear = "Vælg år";
var chooseMonth = "Vælg måned";
var chooseDate = "Vælg dato";
var prevDecade = "Forrige årti";
var nextDecade = "Næste årti";
var prevYear = "Forrige år";
var nextYear = "Næste år";
var prevMonth = "Forrige måned";
var nextMonth = "Næste måned";
var prevHour = "Forrige time";
var nextHour = "Næste time";
var prevMinute = "Forrige minut";
var nextMinute = "Næste minut";
var prevSecond = "Forrige sekund";
var nextSecond = "Næste sekund";
var am = "am";
var pm = "pm";
var today = "I dag";
var weekHeader = "Uge";
var firstDayOfWeek = 0;
var showMonthAfterYear = false;
var dateFormat = "dd/mm-yy";
var weak = "Svag";
var medium = "Medium";
var strong = "Stærk";
var passwordPrompt = "Indtast adgangskode";
var emptyFilterMessage = "Ingen resultater fundet";
var searchMessage = "{0} resultater er tilgængelige";
var selectionMessage = "{0} elementer valgt";
var emptySelectionMessage = "Ingen valgte elementer";
var emptySearchMessage = "Ingen resultater fundet";
var emptyMessage = "Ingen tilgængelige muligheder";
var aria = {
	trueLabel: "Sandt",
	falseLabel: "Falsk",
	nullLabel: "Ikke valgt",
	star: "1 stjerne",
	stars: "{star} stjerner",
	selectAll: "Alle elementer valgt",
	unselectAll: "Alle elementer fjernet",
	close: "Luk",
	previous: "Forrige",
	next: "Næste",
	navigation: "Navigation",
	scrollTop: "Rul til toppen",
	moveTop: "Flyt til top",
	moveUp: "Flyt op",
	moveDown: "Flyt ned",
	moveBottom: "Flyt til bunden",
	moveToTarget: "Flyt til mål",
	moveToSource: "Flyt til kilde",
	moveAllToTarget: "Flyt alle til mål",
	moveAllToSource: "Flyt alle til kilde",
	pageLabel: "Side {page}",
	firstPageLabel: "Første side",
	lastPageLabel: "Sidste side",
	nextPageLabel: "Næste side",
	previousPageLabel: "Forrige side",
	rowsPerPageLabel: "Rækker pr. side",
	jumpToPageDropdownLabel: "Skift til sidenummer",
	jumpToPageInputLabel: "Skift til sidenummer",
	selectRow: "Række valgt",
	unselectRow: "Række fjernet",
	expandRow: "Række udvidet",
	collapseRow: "Række foldet sammen",
	showFilterMenu: "Vis filtermenu",
	hideFilterMenu: "Skjul filtermenu",
	filterOperator: "Filteroperator",
	filterConstraint: "Filterbegrænsning",
	editRow: "Redigér række",
	saveEdit: "Gem ændringer",
	cancelEdit: "Annullér ændringer",
	listView: "Listevisning",
	gridView: "Gittervisning",
	slide: "Slide",
	slideNumber: "{slideNumber}",
	zoomImage: "Zoom ind på billede",
	zoomIn: "Zoom ind",
	zoomOut: "Zoom ud",
	rotateRight: "Roter mod højre",
	rotateLeft: "Roter mod venstre"
};
var da = {
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
exports.default = da;
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
//# sourceMappingURL=da.json.cjs.map
