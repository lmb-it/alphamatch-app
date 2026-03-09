'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var startsWith = "Začíná na";
var contains = "Obsahuje";
var notContains = "Neobsahuje";
var endsWith = "Končí na";
var equals = "Rovná se";
var notEquals = "Nerovná se";
var noFilter = "Bez filtru";
var filter = "Filtr";
var lt = "Menší než";
var lte = "Menší než nebo rovno";
var gt = "Větší než";
var gte = "Větší než nebo rovno";
var dateIs = "Datum je";
var dateIsNot = "Datum není";
var dateBefore = "Datum je před";
var dateAfter = "Datum je po";
var custom = "Vlastní";
var clear = "Vyčistit";
var apply = "Použít";
var matchAll = "Odpovídá všem";
var matchAny = "Odpovídá jakémukoli";
var addRule = "Přidat pravidlo";
var removeRule = "Odstranit pravidlo";
var accept = "Ano";
var reject = "Ne";
var choose = "Vybrat";
var upload = "Nahrát";
var cancel = "Zrušit";
var completed = "Dokončeno";
var pending = "Čekající";
var dayNames = [
	"Neděle",
	"Pondělí",
	"Úterý",
	"Středa",
	"Čtvrtek",
	"Pátek",
	"Sobota"
];
var dayNamesShort = [
	"Ned",
	"Pon",
	"Úte",
	"Stř",
	"Čtv",
	"Pát",
	"Sob"
];
var dayNamesMin = [
	"Ne",
	"Po",
	"Út",
	"St",
	"Čt",
	"Pá",
	"So"
];
var monthNames = [
	"Leden",
	"Únor",
	"Březen",
	"Duben",
	"Květen",
	"Červen",
	"Červenec",
	"Srpen",
	"Září",
	"Říjen",
	"Listopad",
	"Prosinec"
];
var monthNamesShort = [
	"Led",
	"Úno",
	"Bře",
	"Dub",
	"Kvě",
	"Čer",
	"Čvc",
	"Srp",
	"Zář",
	"Říj",
	"Lis",
	"Pro"
];
var chooseYear = "Vyberte rok";
var chooseMonth = "Vyberte měsíc";
var chooseDate = "Vyberte datum";
var prevDecade = "Předchozí desetiletí";
var nextDecade = "Následující desetiletí";
var prevYear = "Předchozí rok";
var nextYear = "Následující rok";
var prevMonth = "Předchozí měsíc";
var nextMonth = "Následující měsíc";
var prevHour = "Předchozí hodina";
var nextHour = "Následující hodina";
var prevMinute = "Předchozí minuta";
var nextMinute = "Následující minuta";
var prevSecond = "Předchozí sekunda";
var nextSecond = "Následující sekunda";
var am = "dopoledne";
var pm = "odpoledne";
var today = "Dnes";
var weekHeader = "Týd.";
var firstDayOfWeek = 1;
var showMonthAfterYear = false;
var dateFormat = "dd.mm.rrrr";
var weak = "Slabé";
var medium = "Střední";
var strong = "Silné";
var passwordPrompt = "Zadejte heslo";
var emptyFilterMessage = "Nebyly nalezeny žádné výsledky";
var searchMessage = "Je k dispozici {0} výsledků";
var selectionMessage = "Vybráno {0} položek";
var emptySelectionMessage = "Žádná vybraná položka";
var emptySearchMessage = "Nebyly nalezeny žádné výsledky";
var emptyMessage = "Žádné dostupné možnosti";
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
	nullLabel: "Nevybráno",
	star: "1 hvězda",
	stars: "{star} hvězd",
	selectAll: "Všechny položky vybrány",
	unselectAll: "Všechny položky zrušeny",
	close: "Zavřít",
	previous: "Předchozí",
	next: "Další",
	navigation: "Navigace",
	scrollTop: "Posunout nahoru",
	moveTop: "Přesunout nahoru",
	moveUp: "Přesunout nahoru",
	moveDown: "Přesunout dolů",
	moveBottom: "Přesunout dolů",
	moveToTarget: "Přesunout na cíl",
	moveToSource: "Přesunout ke zdroji",
	moveAllToTarget: "Přesunout vše na cíl",
	moveAllToSource: "Přesunout vše ke zdroji",
	pageLabel: "Strana {page}",
	firstPageLabel: "První strana",
	lastPageLabel: "Poslední strana",
	nextPageLabel: "Další strana",
	previousPageLabel: "Předchozí strana",
	rowsPerPageLabel: "Řádků na stranu",
	jumpToPageDropdownLabel: "Přejít na stránku Dropdown",
	jumpToPageInputLabel: "Přejít na stránku Input",
	selectRow: "Vybrat řádek",
	unselectRow: "Zrušit výběr řádku",
	expandRow: "Rozbalit řádek",
	collapseRow: "Sbalit řádek",
	showFilterMenu: "Zobrazit filtr menu",
	hideFilterMenu: "Skrýt filtr menu",
	filterOperator: "Operátor filtru",
	filterConstraint: "Omezení filtru",
	editRow: "Upravit řádek",
	saveEdit: "Uložit úpravu",
	cancelEdit: "Zrušit úpravu",
	listView: "Zobrazení seznamu",
	gridView: "Zobrazení mřížky",
	slide: "Snímek",
	slideNumber: "{slideNumber}",
	zoomImage: "Přiblížit obrázek",
	zoomIn: "Přiblížit",
	zoomOut: "Oddálit",
	rotateRight: "Otočit doprava",
	rotateLeft: "Otočit doleva"
};
var cs = {
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
exports.default = cs;
exports.dragFilesHere = dragFilesHere;
exports.edit = edit;
exports.emptyFilterMessage = emptyFilterMessage;
exports.emptyMessage = emptyMessage;
exports.emptySearchMessage = emptySearchMessage;
exports.emptySelectionMessage = emptySelectionMessage;
exports.endsWith = endsWith;
exports.equal = equal;
exports.equals = equals;
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
//# sourceMappingURL=cs.json.cjs.map
