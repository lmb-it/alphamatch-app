'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var startsWith = "Začína na";
var contains = "Obsahuje";
var notContains = "Neobsahuje";
var endsWith = "Končí na";
var equals = "Rovná sa";
var notEquals = "Nerovná sa";
var noFilter = "Bez filtra";
var filter = "Filter";
var lt = "Menšie než";
var lte = "Menšie než alebo rovné";
var gt = "Väčšie než";
var gte = "Väčšie než alebo rovné";
var dateIs = "Dátum je";
var dateIsNot = "Dátum nie je";
var dateBefore = "Dátum je pred";
var dateAfter = "Dátum je po";
var custom = "Vlastné";
var clear = "Vyčistiť";
var apply = "Použiť";
var matchAll = "Zodpovedá všetkým";
var matchAny = "Zodpovedá akémukoľvek";
var addRule = "Pridať pravidlo";
var removeRule = "Odstrániť pravidlo";
var accept = "Áno";
var reject = "Nie";
var choose = "Vybrať";
var upload = "Nahrať súbor";
var cancel = "Zrušiť";
var completed = "Dokončené";
var pending = "Čakajúce";
var fileSizeTypes = [
	"B",
	"KB",
	"MB",
	"GB",
	"TB",
	"PB",
	"EB",
	"ZB",
	"YB"
];
var dayNames = [
	"Nedeľa",
	"Pondelok",
	"Utorok",
	"Streda",
	"Štvrtok",
	"Piatok",
	"Sobota"
];
var dayNamesShort = [
	"Ned",
	"Pon",
	"Uto",
	"Str",
	"Štv",
	"Pia",
	"Sob"
];
var dayNamesMin = [
	"Ne",
	"Po",
	"Ut",
	"St",
	"Št",
	"Pi",
	"So"
];
var monthNames = [
	"Január",
	"Február",
	"Marec",
	"Apríl",
	"Máj",
	"Jún",
	"Júl",
	"August",
	"September",
	"Október",
	"November",
	"December"
];
var monthNamesShort = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"Máj",
	"Jún",
	"Júl",
	"Aug",
	"Sep",
	"Okt",
	"Nov",
	"Dec"
];
var chooseYear = "Vyberte rok";
var chooseMonth = "Vyberte mesiac";
var chooseDate = "Vyberte dátum";
var prevDecade = "Predchádzajúce desaťročie";
var nextDecade = "Nasledujúce desaťročie";
var prevYear = "Predchádzajúci rok";
var nextYear = "Nasledujúci rok";
var prevMonth = "Predchádzajúci mesiac";
var nextMonth = "Nasledujúci mesiac";
var prevHour = "Predchádzajúca hodina";
var nextHour = "Nasledujúca hodina";
var prevMinute = "Predchádzajúca minúta";
var nextMinute = "Nasledujúca minúta";
var prevSecond = "Predchádzajúca sekunda";
var nextSecond = "Nasledujúca sekunda";
var am = "ráno";
var pm = "popoludní";
var today = "Dnes";
var now = "Teraz";
var weekHeader = "Týž.";
var firstDayOfWeek = 1;
var showMonthAfterYear = false;
var dateFormat = "dd.mm.rrrr";
var weak = "Slabé";
var medium = "Stredné";
var strong = "Silné";
var passwordPrompt = "Zadejte heslo";
var emptyFilterMessage = "Neboli nájdené žiadne výsledky";
var searchMessage = "Je k dispozícií {0} výsledkov";
var selectionMessage = "Vybraných {0} položiek";
var emptySelectionMessage = "Žiadna vybraná položka";
var emptySearchMessage = "Neboli nájdené žiadne výsledky";
var emptyMessage = "Žiadne dostupné možnosti";
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
	trueLabel: "Pravda",
	falseLabel: "Nepravda",
	nullLabel: "Nevybrané",
	star: "1 hviezda",
	stars: "{star} hviezd",
	selectAll: "Všetky položky vybrané",
	unselectAll: "Všetky položky zrušené",
	close: "Zavrieť",
	previous: "Predchádzajúci",
	next: "Ďalší",
	navigation: "Navigácia",
	scrollTop: "Posunúť hore",
	moveTop: "Presunúť hore",
	moveUp: "Presunúť hore",
	moveDown: "Presunúť dole",
	moveBottom: "Presunúť dole",
	moveToTarget: "Presunúť na cieľ",
	moveToSource: "Presunúť ku zdroju",
	moveAllToTarget: "Presunúť všetko na cieľ",
	moveAllToSource: "Presunúť všetko ku zdroju",
	pageLabel: "{page}",
	firstPageLabel: "Prvá strana",
	lastPageLabel: "Posledná strana",
	nextPageLabel: "Dalšia strana",
	previousPageLabel: "Predchádzajúca strana",
	rowsPerPageLabel: "Riadkov na stranu",
	jumpToPageDropdownLabel: "Prejsť na stránku Dropdown",
	jumpToPageInputLabel: "Prejsť na stránku Input",
	selectRow: "Vybrať riadok",
	unselectRow: "Zrušiť výber riadku",
	expandRow: "Rozbaliť riadok",
	collapseRow: "Zbaliť riadok",
	showFilterMenu: "Zobraziť filter menu",
	hideFilterMenu: "Skryť filter menu",
	filterOperator: "Operátor filtra",
	filterConstraint: "Obmedzenie filtra",
	editRow: "Upraviť riadok",
	saveEdit: "Uložiť úpravu",
	cancelEdit: "Zrušiť úpravu",
	listView: "Zobrazenie zoznamu",
	gridView: "Zobrazenie mriežky",
	slide: "Snímka",
	slideNumber: "{slideNumber}",
	zoomImage: "Priblížiť obrázok",
	zoomIn: "Priblížiť",
	zoomOut: "Oddialiť",
	rotateRight: "Otočiť doprava",
	rotateLeft: "Otočiť doľava"
};
var sk = {
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
exports.default = sk;
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
//# sourceMappingURL=sk.json.cjs.map
