'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var startsWith = "Починається з";
var contains = "Містить";
var notContains = "Не містить";
var endsWith = "Закінчується";
var equals = "Дорівнює";
var notEquals = "Не дорівнює";
var noFilter = "Немає фільтра";
var filter = "Фільтр";
var lt = "Менше ніж";
var lte = "Менш ніж або дорівнює";
var gt = "Більш ніж";
var gte = "Більш ніж або дорівнює";
var dateIs = "Дата дорівнює";
var dateIsNot = "Дата не дорівнює";
var dateBefore = "Дата до";
var dateAfter = "Дата після";
var custom = "Користувальницький";
var clear = "Очистити";
var apply = "Прийняти";
var matchAll = "Порівняти все";
var matchAny = "Збіг з будь-яким";
var addRule = "Додати правило";
var removeRule = "Видалити правило";
var accept = "Так";
var reject = "Ні";
var choose = "Виберіть";
var upload = "Завантажити";
var cancel = "Відміна";
var completed = "Завершено";
var pending = "В очікуванні";
var dayNames = [
	"Неділя",
	"Понеділок",
	"Вівторок",
	"Середа",
	"Четвер",
	"П'ятниця",
	"Субота"
];
var dayNamesShort = [
	"Нед",
	"Пон",
	"Втр",
	"Срд",
	"Чтв",
	"Птн",
	"Сбт"
];
var dayNamesMin = [
	"Нд",
	"Пн",
	"Вт",
	"Ср",
	"Чт",
	"Пт",
	"Сб"
];
var monthNames = [
	"Січень",
	"Лютий",
	"Березень",
	"Квітень",
	"Травень",
	"Червень",
	"Липень",
	"Серпень",
	"Вересень",
	"Жовтень",
	"Листопад",
	"Грудень"
];
var monthNamesShort = [
	"Січ",
	"Лют",
	"Бер",
	"Квіт",
	"Трав",
	"Чер",
	"Лип",
	"Сер",
	"Вер",
	"Жов",
	"Лист",
	"Груд"
];
var chooseYear = "Виберіть рік";
var chooseMonth = "Виберіть місяць";
var chooseDate = "Виберіть дату";
var prevDecade = "Попереднє десятиліття";
var nextDecade = "Наступне десятиліття";
var prevYear = "Попередній рік";
var nextYear = "Наступний рік";
var prevMonth = "Попередній місяць";
var nextMonth = "Наступний місяць";
var prevHour = "Попередня година";
var nextHour = "Наступна година";
var prevMinute = "Попередня хвилина";
var nextMinute = "Наступна хвилина";
var prevSecond = "Попередня секунда";
var nextSecond = "Наступна секунда";
var am = "до полудня";
var pm = "після полудня";
var today = "Сьогодні";
var now = "Тепер";
var weekHeader = "Тиж.";
var firstDayOfWeek = 1;
var showMonthAfterYear = false;
var dateFormat = "dd.mm.yy";
var weak = "Простий";
var medium = "Нормальний";
var strong = "Гарний";
var passwordPrompt = "Введіть пароль";
var emptyFilterMessage = "Результатів не знайдено";
var searchMessage = "{0} результатів доступно";
var selectionMessage = "{0} елементів вибрано";
var emptySelectionMessage = "Немає вибраного елемента";
var emptySearchMessage = "Результатів не знайдено";
var emptyMessage = "Немає доступних варіантів";
var aria = {
	trueLabel: "Вірно",
	falseLabel: "Невірно",
	nullLabel: "Не вибраний",
	star: "1 зірка",
	stars: "{star} зірок",
	selectAll: "Вибрано всі елементи",
	unselectAll: "Усі елементи не вибрані",
	close: "Закрити",
	previous: "Попередній",
	next: "Наступний",
	navigation: "Навігація",
	scrollTop: "Прокрутити на початок",
	moveTop: "Перемістити на початок",
	moveUp: "Перемістити вгору",
	moveDown: "Перемістити вниз",
	moveBottom: "Перемістити в кінець",
	moveToTarget: "Перемістити до приймача",
	moveToSource: "Перемістити до джерела",
	moveAllToTarget: "Перемістити все до приймача",
	moveAllToSource: "Перемістити все в джерело",
	pageLabel: "{page}",
	firstPageLabel: "Перша сторінка",
	lastPageLabel: "Остання сторінка",
	nextPageLabel: "Наступна сторінка",
	rowsPerPageLabel: "Рядок на сторінці",
	previousPageLabel: "Попередня сторінка",
	jumpToPageDropdownLabel: "Перейти до списку сторінок, що розкривається",
	jumpToPageInputLabel: "Перейти до введення сторінки",
	selectRow: "Вибрано рядок",
	unselectRow: "Рядок не вибрано",
	expandRow: "Рядок розгорнутий",
	collapseRow: "Рядок згорнутий",
	showFilterMenu: "Показати меню фільтра",
	hideFilterMenu: "Сховати меню фільтра",
	filterOperator: "Оператор фільтра",
	filterConstraint: "Обмеження фільтра",
	editRow: "Редагування рядка",
	saveEdit: "Зберегти редагування",
	cancelEdit: "Скасувати редагування",
	listView: "У вигляді списку",
	gridView: "У вигляді сітки",
	slide: "Слайд",
	slideNumber: "{slideNumber}",
	zoomImage: "Збільшити зображення",
	zoomIn: "Збільшити",
	zoomOut: "Зменшити",
	rotateRight: "Повернути праворуч",
	rotateLeft: "Повернути вліво"
};
var uk = {
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
exports.default = uk;
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
//# sourceMappingURL=uk.json.cjs.map
