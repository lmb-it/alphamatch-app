'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var startsWith = "Comença per";
var contains = "Conté";
var notContains = "No conté";
var endsWith = "Acaba amb";
var equals = "Igual a";
var notEquals = "Diferent a";
var noFilter = "Sense filtre";
var lt = "Menor que";
var lte = "Menor o igual a";
var gt = "Major que";
var gte = "Major o igual a";
var dateIs = "Data igual a";
var dateIsNot = "Data diferent a";
var dateBefore = "Data abans de";
var dateAfter = "Data després de";
var custom = "Personalitzar";
var clear = "Netejar";
var apply = "Aplicar";
var matchAll = "Coincidir tot";
var matchAny = "Coincidir amb qualsevol";
var addRule = "Afegir regla";
var removeRule = "Eliminar regla";
var accept = "Sí";
var reject = "No";
var choose = "Escollir";
var upload = "Pujar";
var cancel = "Cancel·lar";
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
	"Diumenge",
	"Dilluns",
	"Dimarts",
	"Dimecres",
	"Dijous",
	"Divendres",
	"Dissabte"
];
var dayNamesShort = [
	"Dg",
	"Dl",
	"Dt",
	"Dc",
	"Dj",
	"Dv",
	"Ds"
];
var dayNamesMin = [
	"Dg",
	"Dl",
	"Dt",
	"Dc",
	"Dj",
	"Dv",
	"Ds"
];
var monthNames = [
	"Gener",
	"Febrer",
	"Març",
	"Abril",
	"Maig",
	"Juny",
	"Juliol",
	"Agost",
	"Setembre",
	"Octubre",
	"Novembre",
	"Desembre"
];
var monthNamesShort = [
	"Gen",
	"Febr",
	"Març",
	"Abr",
	"Maig",
	"Juny",
	"Jul",
	"Ag",
	"Set",
	"Oct",
	"Nov",
	"Des"
];
var today = "Avui";
var now = "Ara";
var weekHeader = "Setm";
var firstDayOfWeek = 1;
var showMonthAfterYear = false;
var dateFormat = "dd/mm/yy";
var weak = "Dèbil";
var medium = "Mig";
var strong = "Fort";
var passwordPrompt = "Escriu una contrasenya";
var emptyFilterMessage = "Sense opcions disponibles";
var emptyMessage = "No s'han trobat resultats";
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
	trueLabel: "Cert",
	falseLabel: "Fals",
	nullLabel: "No seleccionat",
	star: "1 estrella",
	stars: "{star} estrelles",
	selectAll: "Seleccionar tots",
	unselectAll: "Desseleccionar tots",
	close: "Tancar",
	previous: "Anterior",
	next: "Següent",
	navigation: "Navegació",
	scrollTop: "Desplaçar amunt",
	moveTop: "Moure amunt",
	moveUp: "Pujar",
	moveDown: "Baixar",
	moveBottom: "Moure avall",
	moveToTarget: "Moure a l'objectiu",
	moveToSource: "Moure a la font",
	moveAllToTarget: "Moure tot a l'objectiu",
	moveAllToSource: "Moure tot a la font",
	pageLabel: "Pàgina {page}",
	firstPageLabel: "Primera pàgina",
	lastPageLabel: "Última pàgina",
	nextPageLabel: "Pàgina següent",
	previousPageLabel: "Pàgina anterior",
	rowsPerPageLabel: "Files per pàgina",
	jumpToPageDropdownLabel: "Anar al menú desplegable de pàgina",
	jumpToPageInputLabel: "Anar a l'entrada de pàgina",
	selectRow: "Seleccionar fila",
	unselectRow: "Desmarcar fila",
	expandRow: "Expandir fila",
	collapseRow: "Reduir fila",
	showFilterMenu: "Mostrar menú del filtre",
	hideFilterMenu: "Ocultar menú del filtre",
	filterOperator: "Operador del filtre",
	filterConstraint: "Restricció del filtre",
	editRow: "Editar fila",
	saveEdit: "Guardar edició",
	cancelEdit: "Cancel·lar edició",
	listView: "Vista de llista",
	gridView: "Vista de graella",
	slide: "Desplaçar",
	slideNumber: "{slideNumber}",
	zoomImage: "Ampliar imatge",
	zoomIn: "Ampliar",
	zoomOut: "Reduir",
	rotateRight: "Girar a la dreta",
	rotateLeft: "Girar a l'esquerra"
};
var ca = {
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
	fileSizeTypes: fileSizeTypes,
	dayNames: dayNames,
	dayNamesShort: dayNamesShort,
	dayNamesMin: dayNamesMin,
	monthNames: monthNames,
	monthNamesShort: monthNamesShort,
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
exports.default = ca;
exports.dragFilesHere = dragFilesHere;
exports.edit = edit;
exports.emptyFilterMessage = emptyFilterMessage;
exports.emptyMessage = emptyMessage;
exports.endsWith = endsWith;
exports.equal = equal;
exports.equals = equals;
exports.fileSizeTypes = fileSizeTypes;
exports.filesBeingDropped = filesBeingDropped;
exports.filesSelected = filesSelected;
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
exports.now = now;
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
//# sourceMappingURL=ca.json.cjs.map
