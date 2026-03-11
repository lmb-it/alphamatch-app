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

export { accept, addCategory, addItem, addRule, after, am, any, apply, aria, before, between, cancel, choose, chooseDate, chooseFile, chooseMonth, chooseYear, clear, completed, contains, custom, dateAfter, dateBefore, dateFormat, dateIs, dateIsNot, dayNames, dayNamesMin, dayNamesShort, uk as default, dragFilesHere, edit, emptyFilterMessage, emptyMessage, emptySearchMessage, emptySelectionMessage, endsWith, equal, equals, filesBeingDropped, filesSelected, filter, firstDayOfWeek, generatePhoto, greaterThan, greaterThanOrEqualTo, gt, gte, include, lessThan, lessThanOrEqualTo, lt, lte, matchAll, matchAny, maximumAllowedFiles, medium, monthNames, monthNamesShort, nextDecade, nextHour, nextMinute, nextMonth, nextSecond, nextYear, noFilter, not, notContains, notEquals, now, openMenu, passwordPrompt, pending, pm, prevDecade, prevHour, prevMinute, prevMonth, prevSecond, prevYear, profile, reject, remove, removeRule, save, searchMessage, selectionMessage, settings, showMonthAfterYear, signOut, startsWith, strong, today, toggleColorMode, typeNotSupported, upload, weak, weekHeader };
//# sourceMappingURL=uk.json.js.map
