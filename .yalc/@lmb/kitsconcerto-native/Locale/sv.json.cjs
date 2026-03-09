'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var startsWith = "Börjar med";
var contains = "Innehåller";
var notContains = "Innehåller inte";
var endsWith = "Slutar med";
var equals = "Lika med";
var notEquals = "Inte lika med";
var noFilter = "Inget filter";
var filter = "Filter";
var lt = "Mindre än";
var lte = "Mindre än eller lika med";
var gt = "Större än";
var gte = "Större än eller lika med";
var dateIs = "Datumet är";
var dateIsNot = "Datumet är inte";
var dateBefore = "Datumet är tidigare än";
var dateAfter = "Datumet är senare än";
var custom = "Anpassad";
var clear = "Rensa";
var apply = "Använd";
var matchAll = "Matcha alla";
var matchAny = "Matcha något";
var addRule = "Lägg till regel";
var removeRule = "Ta bort regel";
var accept = "Ja";
var reject = "Nej";
var choose = "Välj";
var upload = "Ladda upp";
var cancel = "Avbryt";
var close = "Stäng";
var dayNames = [
	"Söndag",
	"Måndag",
	"Tisdag",
	"Onsdag",
	"Torsdag",
	"Fredag",
	"Lördag"
];
var dayNamesShort = [
	"Sön",
	"Mån",
	"Tis",
	"Ons",
	"Tor",
	"Fre",
	"Lör"
];
var dayNamesMin = [
	"S",
	"M",
	"T",
	"O",
	"T",
	"F",
	"L"
];
var monthNames = [
	"Januari",
	"Februari",
	"Mars",
	"April",
	"Maj",
	"Juni",
	"Juli",
	"Augusti",
	"September",
	"Oktober",
	"November",
	"December"
];
var monthNamesShort = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"Maj",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Okt",
	"Nov",
	"Dec"
];
var today = "Idag";
var weekHeader = "v";
var firstDayOfWeek = 1;
var showMonthAfterYear = false;
var dateFormat = "yy-mm-dd";
var weak = "Svagt";
var medium = "Mellan";
var strong = "Starkt";
var passwordPrompt = "Fyll i lösenord";
var emptyFilterMessage = "Inga tillgängliga rader";
var emptyMessage = "Inga resultat hittades";
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
	trueLabel: "Sant",
	falseLabel: "Falskt",
	nullLabel: "Ej vald",
	pageLabel: "Sida {page}",
	firstPageLabel: "Första sidan",
	lastPageLabel: "Sista sidan",
	nextPageLabel: "Nästa sida",
	previousPageLabel: "Föregående sida",
	selectLabel: "Markera",
	unselectLabel: "Avmarkera",
	expandLabel: "Expandera",
	collapseLabel: "Fäll ihop"
};
var sv = {
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
	close: close,
	dayNames: dayNames,
	dayNamesShort: dayNamesShort,
	dayNamesMin: dayNamesMin,
	monthNames: monthNames,
	monthNamesShort: monthNamesShort,
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
exports.any = any;
exports.apply = apply;
exports.aria = aria;
exports.before = before;
exports.between = between;
exports.cancel = cancel;
exports.choose = choose;
exports.chooseFile = chooseFile;
exports.clear = clear;
exports.close = close;
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
exports.default = sv;
exports.dragFilesHere = dragFilesHere;
exports.edit = edit;
exports.emptyFilterMessage = emptyFilterMessage;
exports.emptyMessage = emptyMessage;
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
exports.noFilter = noFilter;
exports.not = not;
exports.notContains = notContains;
exports.notEquals = notEquals;
exports.openMenu = openMenu;
exports.passwordPrompt = passwordPrompt;
exports.profile = profile;
exports.reject = reject;
exports.remove = remove;
exports.removeRule = removeRule;
exports.save = save;
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
//# sourceMappingURL=sv.json.cjs.map
