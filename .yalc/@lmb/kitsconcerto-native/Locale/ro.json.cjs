'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var startsWith = "Începe cu";
var contains = "Conține";
var notContains = "Nu conține";
var endsWith = "Se termină cu";
var equals = "Este egal";
var notEquals = "Nu este egal";
var noFilter = "Fără filtru";
var filter = "Filtru";
var lt = "Mai mic decât";
var lte = "Mai mic sau egal cu";
var gt = "Mai mare decât";
var gte = "Mai mare sau egal cu";
var dateIs = "Data este";
var dateIsNot = "Data nu este";
var dateBefore = "Data este înainte";
var dateAfter = "Data este după";
var custom = "Personalizat";
var clear = "Curăță";
var apply = "Aplică";
var matchAll = "Potrivește cu toate";
var matchAny = "Potrivește cu orice";
var addRule = "Adăugă o regulă";
var removeRule = "Elimină regula";
var accept = "Da";
var reject = "Nu";
var choose = "Alege";
var upload = "Încarcă";
var cancel = "Anulează";
var completed = "Terminat";
var pending = "În așteptare";
var dayNames = [
	"Duminică",
	"Luni",
	"Marți",
	"Miercuri",
	"Joi",
	"Vineri",
	"Sâmbătă"
];
var dayNamesShort = [
	"Dum",
	"Lun",
	"Mar",
	"Mie",
	"Joi",
	"Vin",
	"Sâm"
];
var dayNamesMin = [
	"Du",
	"Lu",
	"Ma",
	"Mi",
	"Jo",
	"Vi",
	"Sâ"
];
var monthNames = [
	"Ianuarie",
	"Februarie",
	"Martie",
	"Aprilie",
	"Mai",
	"Iunie",
	"Iulie",
	"August",
	"Septembrie",
	"Octombrie",
	"Noiembrie",
	"Decembrie"
];
var monthNamesShort = [
	"Ian",
	"Feb",
	"Mar",
	"Apr",
	"Mai",
	"Iun",
	"Iul",
	"Aug",
	"Sep",
	"Oct",
	"Noi",
	"Dec"
];
var chooseYear = "Alege anul";
var chooseMonth = "Alege luna";
var chooseDate = "Alege data";
var prevDecade = "Deceniul precedent";
var nextDecade = "Deceniul următor";
var prevYear = "Anul precedent";
var nextYear = "Anul următor";
var prevMonth = "Luna precedentă";
var nextMonth = "Luna următoare";
var prevHour = "Ora precedentă";
var nextHour = "Ora următoare";
var prevMinute = "Minutul precedent";
var nextMinute = "Minutul următor";
var prevSecond = "Secunda precedentă";
var nextSecond = "Secunda anterioară";
var am = "înainte de amiază";
var pm = "după amiază";
var today = "Astăzi";
var now = "Acum";
var weekHeader = "Săpt";
var firstDayOfWeek = 1;
var showMonthAfterYear = false;
var dateFormat = "dd.mm.yy";
var weak = "Slabă";
var medium = "Medie";
var strong = "Puternică";
var passwordPrompt = "Introduceți parola";
var emptyFilterMessage = "Nu s-au găsite rezultate";
var searchMessage = "{0} rezultate sunt disponibile";
var selectionMessage = "{0} elemente selectate";
var emptySelectionMessage = "Niciun element selectat";
var emptySearchMessage = "Nu s-au găsite rezultate";
var emptyMessage = "Nu există opțiuni disponibile";
var aria = {
	trueLabel: "Adevărat",
	falseLabel: "Fals",
	nullLabel: "Neselectat",
	star: "1 stea",
	stars: "{star} stele",
	selectAll: "Toate elementele selectate",
	unselectAll: "Toate elementele neselectate",
	close: "Închide",
	previous: "Precedent",
	next: "Următor",
	navigation: "Navigare",
	scrollTop: "Derulați la început",
	moveTop: "Mutați la început",
	moveUp: "Mutați în sus",
	moveDown: "Mutați în jos",
	moveBottom: "Mutați la sfârșit",
	moveToTarget: "Mutați la țintă",
	moveToSource: "Mutați la sursă",
	moveAllToTarget: "Mutați totul la țintă",
	moveAllToSource: "Mutați totul la sursă",
	pageLabel: "Pagina {page}",
	firstPageLabel: "Prima pagină",
	lastPageLabel: "Ultima pagină",
	nextPageLabel: "Pagina următoare",
	previousPageLabel: "Pagina precedentă",
	rowsPerPageLabel: "Rânduri pe pagină",
	jumpToPageDropdownLabel: "Treceți la meniul derulant al paginii",
	jumpToPageInputLabel: "Treceți la pagina de intrare",
	selectRow: "Rând selectat",
	unselectRow: "Rând neselectat",
	expandRow: "Rând extins",
	collapseRow: "Rând restrâns",
	showFilterMenu: "Afișați meniul filtrului",
	hideFilterMenu: "Ascundeți meniul filtrului",
	filterOperator: "Operator de filtrare",
	filterConstraint: "Constrângere de filtrare",
	editRow: "Editați rândul",
	saveEdit: "Salvați editarea",
	cancelEdit: "Anulați editarea",
	listView: "Vizualizare listă",
	gridView: "Vizualizare grilă",
	slide: "Slide",
	slideNumber: "{slideNumber}",
	zoomImage: "Măriți imaginea",
	zoomIn: "Măriți",
	zoomOut: "Micșorați",
	rotateRight: "Rotiți la dreapta",
	rotateLeft: "Rotiți la stânga"
};
var ro = {
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
exports.default = ro;
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
//# sourceMappingURL=ro.json.cjs.map
