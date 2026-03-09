'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var startsWith = "Начинается с";
var contains = "Содержит";
var notContains = "Не содержит";
var endsWith = "Заканчивается";
var equals = "Равно";
var notEquals = "Не равно";
var noFilter = "Нет фильтра";
var filter = "Фильтр";
var lt = "Меньше чем";
var lte = "Меньше чем или равно";
var gt = "Более чем";
var gte = "Более чем или равно";
var dateIs = "Дата равна";
var dateIsNot = "Дата не равна";
var dateBefore = "Дата до";
var dateAfter = "Дата после";
var custom = "Пользовательский";
var clear = "Очистить";
var apply = "Принять";
var matchAll = "Сопоставить все";
var matchAny = "Совпадение с любым";
var addRule = "Добавить правило";
var removeRule = "Удалить правило";
var accept = "Да";
var reject = "Нет";
var choose = "Выбрать";
var upload = "Загрузить";
var cancel = "Отмена";
var completed = "Завершено";
var pending = "В ожидании";
var fileSizeTypes = [
	"Б",
	"Кб",
	"Мб",
	"Гб",
	"Тб",
	"Пб",
	"Эб",
	"Зб",
	"Йб"
];
var dayNames = [
	"Воскресенье",
	"Понедельник",
	"Вторник",
	"Среда",
	"Четверг",
	"Пятница",
	"Суббота"
];
var dayNamesShort = [
	"Вск",
	"Пнд",
	"Втр",
	"Срд",
	"Чтв",
	"Птн",
	"Сбт"
];
var dayNamesMin = [
	"Вс",
	"Пн",
	"Вт",
	"Ср",
	"Чт",
	"Пт",
	"Сб"
];
var monthNames = [
	"Январь",
	"Февраль",
	"Март",
	"Апрель",
	"Май",
	"Июнь",
	"Июль",
	"Август",
	"Сентябрь",
	"Октябрь",
	"Ноябрь",
	"Декабрь"
];
var monthNamesShort = [
	"Янв",
	"Фев",
	"Мар",
	"Апр",
	"Май",
	"Июн",
	"Июл",
	"Авг",
	"Сен",
	"Окт",
	"Ноя",
	"Дек"
];
var chooseYear = "Выбрать год";
var chooseMonth = "Выбрать месяц";
var chooseDate = "Выбрать дату";
var prevDecade = "Предыдущее десятилетие";
var nextDecade = "Следующее десятилетие";
var prevYear = "Предыдущий год";
var nextYear = "Следующий год";
var prevMonth = "Предыдущий месяц";
var nextMonth = "Следующий месяц";
var prevHour = "Предыдущий час";
var nextHour = "Следующий час";
var prevMinute = "Предыдущая минута";
var nextMinute = "Следующая минута";
var prevSecond = "Предыдущая секунда";
var nextSecond = "Следующая секунда";
var am = "до полудня";
var pm = "после полудня";
var today = "Сегодня";
var now = "Сейчас";
var weekHeader = "Нед.";
var firstDayOfWeek = 1;
var showMonthAfterYear = false;
var dateFormat = "dd.mm.yy";
var weak = "Простой";
var medium = "Нормальный";
var strong = "Хороший";
var passwordPrompt = "Введите пароль";
var emptyFilterMessage = "Результатов не найдено";
var searchMessage = "{0} результатов доступно";
var selectionMessage = "{0} элементов выбрано";
var emptySelectionMessage = "Нет выбранного элемента";
var emptySearchMessage = "Результатов не найдено";
var emptyMessage = "Нет доступных вариантов";
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
	trueLabel: "Верно",
	falseLabel: "Неверно",
	nullLabel: "Не выбран",
	star: "1 звезда",
	stars: "{star} звёзд",
	selectAll: "Выбраны все элементы",
	unselectAll: "Все элементы не выбраны",
	close: "Закрыть",
	previous: "Предыдущий",
	next: "Следующий",
	navigation: "Навигация",
	scrollTop: "Прокрутить в начало",
	moveTop: "Переместить в начало",
	moveUp: "Переместить вверх",
	moveDown: "Переместить вниз",
	moveBottom: "Переместить в конец",
	moveToTarget: "Переместить в приёмник",
	moveToSource: "Переместить в источник",
	moveAllToTarget: "Переместить всё в приёмник",
	moveAllToSource: "Переместить всё в источник",
	pageLabel: "{page}",
	firstPageLabel: "Первая страница",
	lastPageLabel: "Последняя страница",
	nextPageLabel: "Следующая страница",
	previousPageLabel: "Предыдущая страница",
	rowsPerPageLabel: "Строк на странице",
	jumpToPageDropdownLabel: "Перейти к раскрывающемуся списку страниц",
	jumpToPageInputLabel: "Перейти к вводу страницы",
	selectRow: "Выбрана строка",
	unselectRow: "Строка не выбрана",
	expandRow: "Строка развёрнута",
	collapseRow: "Строка свёрнута",
	showFilterMenu: "Показать меню фильтра",
	hideFilterMenu: "Скрыть меню фильтра",
	filterOperator: "Оператор фильтра",
	filterConstraint: "Ограничение фильтра",
	editRow: "Редактирование строки",
	saveEdit: "Сохранить правку",
	cancelEdit: "Отменить правку",
	listView: "В виде списка",
	gridView: "В виде сетки",
	slide: "Слайд",
	slideNumber: "{slideNumber}",
	zoomImage: "Увеличить изображение",
	zoomIn: "Увеличить",
	zoomOut: "Уменьшить",
	rotateRight: "Повернуть вправо",
	rotateLeft: "Повернуть влево"
};
var ru = {
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
exports.default = ru;
exports.dragFilesHere = dragFilesHere;
exports.edit = edit;
exports.emptyFilterMessage = emptyFilterMessage;
exports.emptyMessage = emptyMessage;
exports.emptySearchMessage = emptySearchMessage;
exports.emptySelectionMessage = emptySelectionMessage;
exports.endsWith = endsWith;
exports.equal = equal;
exports.equals = equals;
exports.fileSizeTypes = fileSizeTypes;
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
//# sourceMappingURL=ru.json.cjs.map
