'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var startsWith = "Менен башталат";
var contains = "Камтыйт";
var notContains = "Камтыбайт";
var endsWith = "Бүтөт";
var equals = "Барабар";
var notEquals = "Барабар эмес";
var noFilter = "Чыпкалоо жок";
var filter = "Чыпкалоо";
var lt = "Мындан аз";
var lte = "Мындан аз же барабар";
var gt = "Мындан көп";
var gte = "Мындан көп же барабар";
var dateIs = "Барабар дата";
var dateIsNot = "Барабар эмес дата";
var dateBefore = "Датага чейин";
var dateAfter = "Датадан кийин";
var custom = "Жеке";
var clear = "Тазалоо";
var apply = "Кабыл алуу";
var matchAll = "Баарын салыштыруу";
var matchAny = "Каалаганын салыштыруу";
var addRule = "Эреже кошуу";
var removeRule = "Эрежени жок кылуу";
var accept = "Ооба";
var reject = "Жок";
var choose = "Тандоо";
var upload = "Жүктөө";
var cancel = "Жокко чыгаруу";
var completed = "Бүттү";
var pending = "Күтүү";
var fileSizeTypes = [
	"Б",
	"КБ",
	"МБ",
	"ГБ",
	"ТБ",
	"ПБ",
	"ЭБ",
	"ЗБ",
	"ЙБ"
];
var dayNames = [
	"Жекшемби",
	"Дүйшөмбү",
	"Шейшемби",
	"Шаршемби",
	"Бейшемби",
	"Жума",
	"Ишемби"
];
var dayNamesShort = [
	"Жек",
	"Дүй",
	"Шей",
	"Шар",
	"Бей",
	"Жум",
	"Ише"
];
var dayNamesMin = [
	"Же",
	"Дү",
	"Ше",
	"Ша",
	"Бе",
	"Жу",
	"Иш"
];
var monthNames = [
	"Үчтүн айы",
	"Бирдин айы",
	"Жалган Куран айы",
	"Чын Куран айы",
	"Бугу айы",
	"Кулжа айы",
	"Теке айы",
	"Баш Оона айы",
	"Аяк Оона айы",
	"Тогуздун айы",
	"Жетинин айы",
	"Бештин айы"
];
var monthNamesShort = [
	"Үчт",
	"Бир",
	"Жал",
	"Чын",
	"Буг",
	"Кул",
	"Тек",
	"Баш",
	"Аяк",
	"Тог",
	"Жет",
	"Беш"
];
var chooseYear = "Жылды тандоо";
var chooseMonth = "Айды тандоо";
var chooseDate = "Датаны тандоо";
var prevDecade = "Мурунку он жылдык";
var nextDecade = "Кийинки он жылдык";
var prevYear = "Мурунку жыл";
var nextYear = "Кийинки жыл";
var prevMonth = "Мурунку ай";
var nextMonth = "Кийинки ай";
var prevHour = "Мурунку саат";
var nextHour = "Кийинки саат";
var prevMinute = "Мурунку мүнөт";
var nextMinute = "Кийинки мүнөт";
var prevSecond = "Мурунку секунд";
var nextSecond = "Кийинки секунд";
var am = "түшкө чейин";
var pm = "түштөн кийин";
var today = "Бүгүн";
var now = "Азыр";
var weekHeader = "Апта";
var firstDayOfWeek = 1;
var showMonthAfterYear = false;
var dateFormat = "dd.mm.yy";
var weak = "Алсыз";
var medium = "Орто";
var strong = "Күчтүү";
var passwordPrompt = "Купуя сөз териңиз";
var emptyFilterMessage = "Жыйынтык табылган жок";
var searchMessage = "{0} жыйынтык бар";
var selectionMessage = "{0} элемент тандалды";
var emptySelectionMessage = "Тандалган элемент жок";
var emptySearchMessage = "Жыйынтык табылган жок";
var emptyMessage = "Жеткиликтүү түрлөрү жок";
var aria = {
	trueLabel: "Туура",
	falseLabel: "Туура эмес",
	nullLabel: "Тандалган жок",
	star: "1 жылдыз",
	stars: "{star} жылдыз",
	selectAll: "Баардык элементтер тандалды",
	unselectAll: "Баардык элементтер тандоодон чыгарылды",
	close: "Жабуу",
	previous: "Мурунку",
	next: "Кийинки",
	navigation: "Навигация",
	scrollTop: "Үстүнө жылдыруу",
	moveTop: "Үстүнө жылдыруу",
	moveUp: "Өйдө жылдыруу",
	moveDown: "Төмөн жылдыруу",
	moveBottom: "Аягына жылдыруу",
	moveToTarget: "Алуучуга жылдыруу",
	moveToSource: "Башатына жылдыруу",
	moveAllToTarget: "Баарын алуучуга жылдыруу",
	moveAllToSource: "Баарын башатына жылдыруу",
	pageLabel: "{page} барак",
	firstPageLabel: "Биринчи барак",
	lastPageLabel: "Акыркы барак",
	nextPageLabel: "Кийинки барак",
	previousPageLabel: "Мурунку барак",
	rowsPerPageLabel: "Барактагы катарлар",
	jumpToPageDropdownLabel: "Барактын ачылуучу тизмесине өтүү",
	jumpToPageInputLabel: "Киргизүү барагына өтүү",
	selectRow: "Катар тандалды",
	unselectRow: "Катар тандоодон чыгарылды",
	expandRow: "Катар кеңейтилди",
	collapseRow: "Катар түрүлдү",
	showFilterMenu: "Чыпка тизмесин көрсөтүү",
	hideFilterMenu: "Чыпка тизмесин жашыруу",
	filterOperator: "Чыпка оператору",
	filterConstraint: "Чыпка чектөөлөрү",
	editRow: "Катарды түзөтүү",
	saveEdit: "Түзөтүүлөрдү сактоо",
	cancelEdit: "Түзөтүүлөрдү жокко чыгаруу",
	listView: "Тизме көрүнүшүндө",
	gridView: "Тор көрүнүшүндө",
	slide: "Слайд",
	slideNumber: "{slideNumber}",
	zoomImage: "Сүрөттү чоңойтуу",
	zoomIn: "Чоңойтуу",
	zoomOut: "Кичирейтүү",
	rotateRight: "Оңго буруу",
	rotateLeft: "Солго буруу"
};
var kg = {
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
exports.default = kg;
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
//# sourceMappingURL=kg.json.cjs.map
