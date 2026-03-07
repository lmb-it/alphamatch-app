'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var startsWith = "Teksti alkaa";
var contains = "Sisältää";
var notContains = "Ei sisällä";
var endsWith = "Teksti loppuu";
var equals = "Yhtä kuin";
var notEquals = "Eri kuin";
var noFilter = "Ei suodatinta";
var lt = "Pienempi kuin";
var lte = "Pienempi tai yhtä kuin";
var gt = "Suurempi kuin";
var gte = "Suurempi tai yhtä kuin";
var dateIs = "Päiväys on";
var dateIsNot = "Päiväys ei ole";
var dateBefore = "Päiväys ennen";
var dateAfter = "Päiväys jälkeen";
var custom = "Mukautettu";
var clear = "Tyhjennä";
var apply = "Aseta";
var matchAll = "Täsmää kaikki";
var matchAny = "Täsmää jokin";
var addRule = "Lisää sääntö";
var removeRule = "Poista sääntö";
var accept = "Kyllä";
var reject = "Ei";
var choose = "Valitse";
var upload = "Lataa";
var cancel = "Peruuta";
var dayNames = [
	"Sunnuntai",
	"Maanantai",
	"Tiistai",
	"Keskiviikko",
	"Torstai",
	"Perjantai",
	"Lauantai"
];
var dayNamesShort = [
	"Su",
	"Ma",
	"Ti",
	"Ke",
	"To",
	"Pe",
	"La"
];
var dayNamesMin = [
	"Su",
	"Ma",
	"Ti",
	"Ke",
	"To",
	"Pe",
	"La"
];
var monthNames = [
	"Tammikuu",
	"Helmikuu",
	"Maaliskuu",
	"Huhtikuu",
	"Toukokuu",
	"Kesäkuu",
	"Heinäkuu",
	"Elokuu",
	"Syyskuu",
	"Lokakuu",
	"Marraskuu",
	"Joulukuu"
];
var monthNamesShort = [
	"Tam",
	"Hel",
	"Maa",
	"Huh",
	"Tou",
	"Kes",
	"Hei",
	"Elo",
	"Syy",
	"Lok",
	"Mar",
	"Jou"
];
var chooseYear = "Valitse vuosi";
var chooseMonth = "Valitse kuukausi";
var chooseDate = "Valitse päivä";
var prevDecade = "Ed. vuosikymmen";
var nextDecade = "Seur. vuosikymmen";
var prevYear = "Ed. vuosi";
var nextYear = "Seur. vuosi";
var prevMonth = "Ed. kuukausi";
var nextMonth = "Seur. kuukausi";
var prevHour = "Ed. tunti";
var nextHour = "Seur. tunti";
var prevMinute = "Ed. minuutti";
var nextMinute = "Seur. minuutti";
var prevSecond = "Ed. sekunti";
var nextSecond = "Seur. sekunti";
var am = "am";
var pm = "pm";
var today = "Tänään";
var now = "Nyt";
var weekHeader = "Vko";
var firstDayOfWeek = 1;
var showMonthAfterYear = false;
var dateFormat = "dd.mm.yy";
var weak = "Heikko";
var medium = "Keskiverto";
var strong = "Vahva";
var passwordPrompt = "Syötä salasana";
var emptyFilterMessage = "Ei tuloksia";
var searchMessage = "{0} tulosta";
var selectionMessage = "{0} valittua";
var emptySelectionMessage = "Ei tuloksia";
var emptySearchMessage = "Ei tuloksia";
var emptyMessage = "Ei tuloksia";
var aria = {
	trueLabel: "Tosi",
	falseLabel: "Epätosi",
	nullLabel: "Ei valittu",
	star: "1 tähti",
	stars: "{star} tähteä",
	selectAll: "Kaikki valittu",
	unselectAll: "Kaikki valinnat poistettu",
	close: "Sulje",
	previous: "Edellinen",
	next: "Seuraava",
	navigation: "Navigaatio",
	scrollTop: "Skrollaa ylälaitaan",
	moveTop: "Siirry ylälaitaan",
	moveUp: "Siirry ylöspäin",
	moveDown: "Siirry alaspäin",
	moveBottom: "Siirry alalaitaan",
	moveToTarget: "Siirry kohteeseen",
	moveToSource: "Siirry lähteeseen",
	pageLabel: "Sivu {page}",
	firstPageLabel: "Ensimmäinen sivu",
	lastPageLabel: "Viimeinen sivu",
	nextPageLabel: "Seuraava sivu",
	prevPageLabel: "Edellinen sivu",
	rowsPerPageLabel: "Rivejä sivulla",
	jumpToPageDropdownLabel: "Hyppää sivunvalintavalikkon",
	jumpToPageInputLabel: "Hyppää sivun syöttöön",
	selectRow: "Rivi valittu",
	unselectRow: "Rivin valinta poistettu",
	expandRow: "Laajenna rivi",
	collapseRow: "Supista rivi",
	showFilterMenu: "Näytä suodatinvalikko",
	hideFilterMenu: "Piilota suodatinvalikko",
	filterOperator: "Suodatinoperaattori",
	filterConstraint: "Suodattimen rajoitus",
	editRow: "Muokkaa riviä",
	saveEdit: "Tallenna muutokset",
	cancelEdit: "Peruuta muutokset",
	listView: "Luettelonäkymä",
	gridView: "Ruudukkonäkymä",
	slide: "Kalvo",
	slideNumber: "{slideNumber}",
	zoomImage: "Zoomaa kuvaa",
	zoomIn: "Zoomaa lähemmäs",
	zoomOut: "Zoomaa kauemmas",
	rotateRight: "Pyöritä oikealle",
	rotateLeft: "Pyöritä vasemmalle"
};
var fi = {
	startsWith: startsWith,
	contains: contains,
	notContains: notContains,
	endsWith: endsWith,
	equals: equals,
	notEquals: notEquals,
	noFilter: noFilter,
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
exports.default = fi;
exports.emptyFilterMessage = emptyFilterMessage;
exports.emptyMessage = emptyMessage;
exports.emptySearchMessage = emptySearchMessage;
exports.emptySelectionMessage = emptySelectionMessage;
exports.endsWith = endsWith;
exports.equals = equals;
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
//# sourceMappingURL=fi.json.cjs.map
