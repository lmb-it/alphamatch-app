'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var startsWith = "Sākas ar";
var contains = "Satur";
var notContains = "Nesatur";
var endsWith = "Beidzas ar";
var equals = "Vienāds ar";
var notEquals = "Nav vienāds ar";
var noFilter = "Nefiltrēt";
var filter = "Filtrēt";
var lt = "Mazāks par";
var lte = "Mazāks par vai vienāds ar";
var gt = "Lielāks par";
var gte = "Lielāks par vai vienāds ar";
var dateIs = "Datums ir";
var dateIsNot = "Datums nav";
var dateBefore = "Datums ir pirms";
var dateAfter = "Datums ir pēc";
var custom = "Pielāgot";
var clear = "Notīrīt";
var apply = "Piemērot";
var matchAll = "Atbilst visi";
var matchAny = "Atbilst jebkurš";
var addRule = "Pievienot kārtulu";
var removeRule = "Noņemt kārtulu";
var accept = "Jā";
var reject = "Nē";
var choose = "Izvēle";
var upload = "Ielādēt";
var cancel = "Atcelt";
var completed = "Pabeigts";
var pending = "Gaida";
var dayNames = [
	"Svētdiena",
	"Pirmdiena",
	"Otrdiena",
	"Trešdiena",
	"Ceturtdiena",
	"Piektdiena",
	"Sestdiena"
];
var dayNamesShort = [
	"Sve",
	"Pir",
	"Otr",
	"Tre",
	"Cet",
	"Pie",
	"Ses"
];
var dayNamesMin = [
	"Sv",
	"Pi",
	"Ot",
	"Tr",
	"Ce",
	"Pk",
	"Se"
];
var monthNames = [
	"Janvāris",
	"Februāris",
	"Marts",
	"Aprīlis",
	"Maijs",
	"Jūnijs",
	"Jūlijs",
	"Augusts",
	"Septembris",
	"Oktobris",
	"Novembris",
	"Decembris"
];
var monthNamesShort = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"Mai",
	"Jūn",
	"Jūl",
	"Aug",
	"Sep",
	"Okt",
	"Nov",
	"Dec"
];
var chooseYear = "Izvēlies gadu";
var chooseMonth = "Izvēlies mēnesi";
var chooseDate = "izvēlies dienu";
var prevDecade = "Iepriekšējā dekāde";
var nextDecade = "Nākamā dekāde";
var prevYear = "Iepriekšējais gads";
var nextYear = "Nākamais gads";
var prevMonth = "Iepriekšējais mēnesis";
var nextMonth = "Nākamais mēnesis";
var prevHour = "Iepriekšējā stunda";
var nextHour = "Nākamā stunda";
var prevMinute = "Iepriekšējā minūte";
var nextMinute = "Nākamā minūte";
var prevSecond = "Iepriekšējā sekunde";
var nextSecond = "Nākamā sekunde";
var am = "am";
var pm = "pm";
var today = "Šodiena";
var now = "Tagad";
var weekHeader = "Ned";
var firstDayOfWeek = 1;
var showMonthAfterYear = false;
var dateFormat = "dd.mm.yy";
var weak = "Vāja";
var medium = "Vidēja";
var strong = "Stipra";
var passwordPrompt = "Ievadiet paroli";
var emptyFilterMessage = "Rezultāti nav atrasti";
var searchMessage = "{0} rezultāti ir pieejami";
var selectionMessage = "{0} atlasīti vienumi";
var emptySelectionMessage = "Nav neviena izvēlēta vienuma";
var emptySearchMessage = "Rezultāti nav atrasti";
var emptyMessage = "Nav pieejamu opciju";
var aria = {
	trueLabel: "Patiess",
	falseLabel: "Nepatiess",
	nullLabel: "Nav atlasīts",
	star: "1 zvaigzne",
	stars: "{star} zvaigznes",
	selectAll: "Atlasīt visus vienumus",
	unselectAll: "Atcelt visu vienumu atlasi",
	close: "Aizvērt",
	previous: "Iepriekšējais",
	next: "Nākamais",
	navigation: "Navigācija",
	scrollTop: "Ritināt uz augšu",
	moveTop: "Pārvietot uz augšu",
	moveUp: "Pārvietot augstāk",
	moveDown: "Pārvietot zemāk",
	moveBottom: "Pārvietot uz apakšu",
	moveToTarget: "Pārvietot uz mērķi",
	moveToSource: "Pārvietot uz avotu",
	moveAllToTarget: "Pārvietot visu uz mērķi",
	moveAllToSource: "Pārvietot visu uz avotu",
	pageLabel: "Lapa {page}",
	firstPageLabel: "Pirmā lapa",
	lastPageLabel: "Pēdējā lapa",
	nextPageLabel: "Nākamā lapa",
	previousPageLabel: "Iepriekšējā lapa",
	rowsPerPageLabel: "Rindas lapā",
	jumpToPageDropdownLabel: "Pārlēkt uz lapu izvēlni",
	jumpToPageInputLabel: "Pārlēkt uz lapas ievadi",
	selectRow: "Alasīt rindu",
	unselectRow: "Noņemt rindas atlasi",
	expandRow: "Izvērst rindu",
	collapseRow: "Sakļaut rindu",
	showFilterMenu: "Rādīt filtra izvēlni",
	hideFilterMenu: "Paslēpt filtra izvēlni",
	filterOperator: "Filtra operators",
	filterConstraint: "Filtra ierobežojums",
	editRow: "Rindas rediģēšana",
	saveEdit: "Saglabāt rediģējumu",
	cancelEdit: "Atcelt rediģējumu",
	listView: "Saraksta skats",
	gridView: "Tabulas skats",
	slide: "Slaids",
	slideNumber: "{slideNumber}",
	zoomImage: "Attēla tālummaiņa",
	zoomIn: "Pietuvināt",
	zoomOut: "Attālināt",
	rotateRight: "Pagriezt pa labi",
	rotateLeft: "Pagriezt pa kreisi"
};
var lv = {
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
exports.default = lv;
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
//# sourceMappingURL=lv.json.cjs.map
