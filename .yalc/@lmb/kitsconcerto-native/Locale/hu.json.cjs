'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var startsWith = "Ezzel kezdődik";
var contains = "Tartalmazza";
var notContains = "Nem tartalmazza";
var endsWith = "Ezzel végződik";
var equals = "Egyenlő";
var notEquals = "Nem egyenlő";
var noFilter = "Nincs szűrő";
var filter = "Szűrő";
var lt = "Kisebb";
var lte = "Kisebb vagy egyenlő";
var gt = "Nagyobb";
var gte = "Nagyobb vagy egyenlő";
var dateIs = "Dátum egyenlő";
var dateIsNot = "Dátum nem egyenlő";
var dateBefore = "Dátum korábbi";
var dateAfter = "Dátum későbbi";
var custom = "Egyedi";
var clear = "Törlés";
var apply = "Alkalmaz";
var matchAll = "Megfelel mindegyiknek";
var matchAny = "Megfelel bármelyiknek";
var addRule = "Szabály hozzáadása";
var removeRule = "Szabály eltávolítása";
var accept = "Igen";
var reject = "Nem";
var choose = "Kiválaszt";
var upload = "Feltölt";
var cancel = "Mégsem";
var completed = "Befejezve";
var pending = "Függőben";
var dayNames = [
	"vasárnap",
	"hétfő",
	"kedd",
	"szerda",
	"csütörtök",
	"péntek",
	"szombat"
];
var dayNamesShort = [
	"V",
	"H",
	"K",
	"Sze",
	"Cs",
	"P",
	"Szo"
];
var dayNamesMin = [
	"V",
	"H",
	"K",
	"Sz",
	"Cs",
	"P",
	"Sz"
];
var monthNames = [
	"január",
	"február",
	"március",
	"április",
	"május",
	"június",
	"július",
	"augusztus",
	"szeptember",
	"október",
	"november",
	"december"
];
var monthNamesShort = [
	"jan.",
	"febr.",
	"márc.",
	"ápr.",
	"máj.",
	"jún.",
	"júl.",
	"aug.",
	"szept.",
	"okt.",
	"nov.",
	"dec."
];
var chooseYear = "Válassz évet";
var chooseMonth = "Válassz hónapot";
var chooseDate = "Válassz dátumot";
var prevDecade = "Előző évtized";
var nextDecade = "Következő évtized";
var prevYear = "Előző év";
var nextYear = "Következő év";
var prevMonth = "Előző hónap";
var nextMonth = "Következő hónap";
var prevHour = "Előző óra";
var nextHour = "Következő óra";
var prevMinute = "Előző perc";
var nextMinute = "Következő perc";
var prevSecond = "Előző másodperc";
var nextSecond = "Következő másodperc";
var am = "de.";
var pm = "du.";
var today = "Ma";
var now = "Most";
var weekHeader = "Hét";
var firstDayOfWeek = 1;
var showMonthAfterYear = true;
var dateFormat = "yy.mm.dd";
var weak = "Gyenge";
var medium = "Közepes";
var strong = "Erős";
var passwordPrompt = "Jelszó megadása";
var emptyFilterMessage = "Nincs találat";
var searchMessage = "{0} találat érhető el";
var selectionMessage = "{0} elem kijelölve";
var emptySelectionMessage = "Nincs kijelölt elem";
var emptySearchMessage = "Nincs találat";
var emptyMessage = "Nincs elérhető opció";
var aria = {
	trueLabel: "Igaz",
	falseLabel: "Hamis",
	nullLabel: "Nincs kijelölve",
	star: "1 csillag",
	stars: "{star} csillag",
	selectAll: "Összes elem kijelölve",
	unselectAll: "Nincs elem kijelölve",
	close: "Bezár",
	previous: "Előző",
	next: "Következő",
	navigation: "Navigáció",
	scrollTop: "Görgetés a tetejére",
	moveTop: "Mozgatás a tetejére",
	moveUp: "Mozgatás feljebb",
	moveDown: "Mozgatás lejjebb",
	moveBottom: "Mozgatás az aljára",
	moveToTarget: "Mozgatás a célhoz",
	moveToSource: "Mozgatás a forráshoz",
	moveAllToTarget: "Minden mozgatása a célhoz",
	moveAllToSource: "Minden mozgatása a forráshoz",
	pageLabel: "{page}. oldal",
	firstPageLabel: "Első oldal",
	lastPageLabel: "Utolsó oldal",
	nextPageLabel: "Következő oldal",
	previousPageLabel: "Előző oldal",
	rowsPerPageLabel: "Sorok száma egy oldalon",
	jumpToPageDropdownLabel: "Ugrás az oldal kiválasztó legördülő menühöz",
	jumpToPageInputLabel: "Ugrás az oldal számát megadó beviteli mezőhöz",
	selectRow: "Sor kijelölve",
	unselectRow: "Sor nincs kijelölve",
	expandRow: "Sor lenyitva",
	collapseRow: "Sor összecsukva",
	showFilterMenu: "Szűrő menü megjelenítése",
	hideFilterMenu: "Szűrő menü elrejtése",
	filterOperator: "Szűrési logikai operátor",
	filterConstraint: "Szűrési feltétel",
	editRow: "Sor szerkesztése",
	saveEdit: "Szerkesztés mentése",
	cancelEdit: "Szerkesztés elvetése",
	listView: "Lista nézet",
	gridView: "Rács nézet",
	slide: "Dia",
	slideNumber: "{slideNumber}",
	zoomImage: "Kép nagyítása",
	zoomIn: "Nagyítás",
	zoomOut: "Kicsinyítés",
	rotateRight: "Forgatás jobbra",
	rotateLeft: "Forgatás balra"
};
var hu = {
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
exports.default = hu;
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
//# sourceMappingURL=hu.json.cjs.map
