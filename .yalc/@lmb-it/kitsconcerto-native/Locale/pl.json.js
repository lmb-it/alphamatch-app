var startsWith = "Zaczyna się od";
var contains = "Zawiera";
var notContains = "Nie zawiera";
var endsWith = "Kończy się na";
var equals = "Równe";
var notEquals = "Nierówne";
var noFilter = "Wyczyść filtr";
var lt = "Mniejsze od";
var lte = "Mniejsze lub równe";
var gt = "Większe od";
var gte = "Większe lub równe";
var dateIs = "Równa";
var dateIsNot = "Nierówna";
var dateBefore = "Przed";
var dateAfter = "Po";
var clear = "Wyczyść";
var apply = "Zastosuj";
var matchAll = "Dopasuj wszystko";
var matchAny = "Dopasuj dowolne";
var addRule = "Dodaj regułę";
var removeRule = "Usuń regułę";
var accept = "Tak";
var reject = "Nie";
var choose = "Wybierz";
var upload = "Wgraj";
var cancel = "Anuluj";
var completed = "Ukończone";
var pending = "Oczekuje";
var dayNames = [
	"Niedziela",
	"Poniedziałek",
	"Wtorek",
	"Środa",
	"Czwartek",
	"Piątek",
	"Sobota"
];
var dayNamesShort = [
	"Ndz",
	"Pon",
	"Wt",
	"Śr",
	"Czw",
	"Pt",
	"Sob"
];
var dayNamesMin = [
	"Nd",
	"Pn",
	"Wt",
	"Śr",
	"Cz",
	"Pt",
	"So"
];
var monthNames = [
	"Styczeń",
	"Luty",
	"Marzec",
	"Kwiecień",
	"Maj",
	"Czerwiec",
	"Lipiec",
	"Sierpień",
	"Wrzesień",
	"Październik",
	"Listopad",
	"Grudzień"
];
var monthNamesShort = [
	"Sty",
	"Lut",
	"Mar",
	"Kwi",
	"Maj",
	"Cze",
	"Lip",
	"Sie",
	"Wrz",
	"Paź",
	"Lis",
	"Gru"
];
var quarterNames = [
	"I Kwartał",
	"II Kwartał",
	"III Kwartał",
	"IV Kwartał"
];
var quarterNamesShort = [
	"I Kw",
	"II Kw",
	"III Kw",
	"IV Kw"
];
var chooseYear = "Wybierz rok";
var chooseMonth = "Wybierz miesiąc";
var chooseDate = "Wybierz datę";
var prevDecade = "Poprzednia dekada";
var nextDecade = "Następna dekada";
var prevYear = "Poprzedni rok";
var nextYear = "Następny rok";
var prevMonth = "Poprzedni miesiąc";
var nextMonth = "Następny miesiąc";
var prevHour = "Poprzednia godzina";
var nextHour = "Następna godzina";
var prevMinute = "Poprzednia minuta";
var nextMinute = "Następna minuta";
var prevSecond = "Poprzednia sekunda";
var nextSecond = "Następna sekunda";
var today = "Dzisiaj";
var now = "Teraz";
var weekHeader = "Tydzień";
var firstDayOfWeek = 1;
var showMonthAfterYear = false;
var dateFormat = "dd.mm.yy";
var weak = "Słaby";
var medium = "Średni";
var strong = "Silny";
var passwordPrompt = "Wprowadź hasło";
var emptyFilterMessage = "Brak wyników wyszukiwania";
var searchMessage = "Dostępnych jest {0} wyników";
var selectionMessage = "Wybrano {0} elementów";
var emptySelectionMessage = "Brak wybranego elementu";
var emptySearchMessage = "Nie znaleziono wyników";
var emptyMessage = "Brak danych";
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
	trueLabel: "Prawda",
	falseLabel: "Fałsz",
	nullLabel: "Nie zaznaczone",
	star: "1 gwiazdka",
	stars: "{star} gwiazdek",
	selectAll: "Wszystkie elementy zaznaczone",
	unselectAll: "Wszystkie elementy odznaczone",
	close: "Zamknij",
	previous: "Poprzedni",
	next: "Następny",
	navigation: "Nawigacja",
	scrollTop: "Przewiń do góry",
	moveTop: "Przesuń do góry",
	moveUp: "Podnieść",
	moveDown: "Położyć",
	moveBottom: "Przesuń w dół",
	moveToTarget: "Przenieś do celu",
	moveToSource: "Przenieś do źródła",
	moveAllToTarget: "Przenieś wszystko do celu",
	moveAllToSource: "Przenieś wszystko do źródła",
	pageLabel: "Strona {page}",
	firstPageLabel: "Pierwsza strona",
	lastPageLabel: "Ostatnia strona",
	nextPageLabel: "Następna strona",
	previousPageLabel: "Poprzednia strona",
	rowsPerPageLabel: "Wierszy na stronę",
	selectRow: "Wiersz zaznaczony",
	unselectRow: "Wiersz odznaczony",
	expandRow: "Wiersz rozwinięty",
	collapseRow: "Zwinięty wiersz",
	showFilterMenu: "Pokaż menu filtrów",
	hideFilterMenu: "Ukryj menu filtrów",
	filterOperator: "Operator filtra",
	filterConstraint: "Ograniczenie filtra",
	editRow: "Edycja wiersza",
	saveEdit: "Zapisz edycję",
	cancelEdit: "Anuluj edycję",
	listView: "Widok listy",
	gridView: "Widok siatki",
	slide: "Slajd",
	slideNumber: "{slideNumber}",
	zoomImage: "Powiększ obraz",
	zoomIn: "Przybliż",
	zoomOut: "Oddal",
	rotateRight: "Obróć w prawo",
	rotateLeft: "Obróć w lewo"
};
var pl = {
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
	quarterNames: quarterNames,
	quarterNamesShort: quarterNamesShort,
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

export { accept, addCategory, addItem, addRule, after, any, apply, aria, before, between, cancel, choose, chooseDate, chooseFile, chooseMonth, chooseYear, clear, completed, contains, dateAfter, dateBefore, dateFormat, dateIs, dateIsNot, dayNames, dayNamesMin, dayNamesShort, pl as default, dragFilesHere, edit, emptyFilterMessage, emptyMessage, emptySearchMessage, emptySelectionMessage, endsWith, equal, equals, filesBeingDropped, filesSelected, firstDayOfWeek, generatePhoto, greaterThan, greaterThanOrEqualTo, gt, gte, include, lessThan, lessThanOrEqualTo, lt, lte, matchAll, matchAny, maximumAllowedFiles, medium, monthNames, monthNamesShort, nextDecade, nextHour, nextMinute, nextMonth, nextSecond, nextYear, noFilter, not, notContains, notEquals, now, openMenu, passwordPrompt, pending, prevDecade, prevHour, prevMinute, prevMonth, prevSecond, prevYear, profile, quarterNames, quarterNamesShort, reject, remove, removeRule, save, searchMessage, selectionMessage, settings, showMonthAfterYear, signOut, startsWith, strong, today, toggleColorMode, typeNotSupported, upload, weak, weekHeader };
//# sourceMappingURL=pl.json.js.map
