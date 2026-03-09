'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var startsWith = "Commence par";
var contains = "Contient";
var notContains = "Ne contient pas";
var endsWith = "Se termine par";
var equals = "Égal à";
var notEquals = "Différent de";
var noFilter = "Aucun filtre";
var filter = "Filtre";
var lt = "Inférieur à";
var lte = "Inférieur ou égal à";
var gt = "Supérieur à";
var gte = "Supérieur ou égal à";
var dateIs = "La date est";
var dateIsNot = "La date n'est pas";
var dateBefore = "Avant le";
var dateAfter = "Après le";
var custom = "Personnalisé";
var clear = "Effacer";
var apply = "Appliquer";
var matchAll = "Correspond à tous";
var matchAny = "Au moins un Correspond";
var addRule = "Ajouter une règle";
var removeRule = "Retirer une règle";
var accept = "Oui";
var reject = "Non";
var choose = "Choisir";
var upload = "Envoyer";
var cancel = "Annuler";
var completed = "Terminé";
var pending = "En attente";
var fileSizeTypes = [
	"o",
	"Ko",
	"Mo",
	"Go",
	"To",
	"Po",
	"Eo",
	"Zo",
	"Yo"
];
var dayNames = [
	"Dimanche",
	"Lundi",
	"Mardi",
	"Mercredi",
	"Jeudi",
	"Vendredi",
	"Samedi"
];
var dayNamesShort = [
	"Dim",
	"Lun",
	"Mar",
	"Mer",
	"Jeu",
	"Ven",
	"Sam"
];
var dayNamesMin = [
	"Di",
	"Lu",
	"Mar",
	"Mer",
	"Je",
	"Ve",
	"Sa"
];
var monthNames = [
	"Janvier",
	"Février",
	"Mars",
	"Avril",
	"Mai",
	"Juin",
	"Juillet",
	"Août",
	"Septembre",
	"Octobre",
	"Novembre",
	"Décembre"
];
var monthNamesShort = [
	"Jan",
	"Fev",
	"Mar",
	"Avr",
	"Mai",
	"Jun",
	"Jui",
	"Août",
	"Sept",
	"Oct",
	"Nov",
	"Dec"
];
var chooseYear = "Choisir une année";
var chooseMonth = "Choisir un mois";
var chooseDate = "Choisir une date";
var prevDecade = "Décennie précédente";
var nextDecade = "Décennie suivante";
var prevYear = "Année précédente";
var nextYear = "Année suivante";
var prevMonth = "Mois précédent";
var nextMonth = "Mois suivant";
var prevHour = "Heure précédente";
var nextHour = "Heure suivante";
var prevMinute = "Minute précédente";
var nextMinute = "Minute suivante";
var prevSecond = "Seconde précédente";
var nextSecond = "Seconde suivante";
var am = "am";
var pm = "pm";
var today = "Aujourd'hui";
var now = "Maintenant";
var weekHeader = "Sem";
var firstDayOfWeek = 1;
var showMonthAfterYear = false;
var dateFormat = "dd/mm/yy";
var weak = "Faible";
var medium = "Moyen";
var strong = "Fort";
var passwordPrompt = "Saisissez un mot de passe";
var emptyFilterMessage = "Aucun résultat trouvé";
var searchMessage = "{0} résultats disponibles";
var selectionMessage = "{0} éléments sélectionnés";
var emptySelectionMessage = "Aucun élément sélectionné";
var emptySearchMessage = "Aucun résultat trouvé";
var emptyMessage = "Aucune option disponible";
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
	trueLabel: "Vrai",
	falseLabel: "Faux",
	nullLabel: "Aucune sélection",
	star: "1 étoile",
	stars: "{star} étoiles",
	selectAll: "Tous éléments sélectionnés",
	unselectAll: "Tous éléments désélectionnés",
	close: "Fermer",
	previous: "Précédent",
	next: "Suivant",
	navigation: "Navigation",
	scrollTop: "Défiler tout en haut",
	moveTop: "Déplacer tout en haut",
	moveUp: "Déplacer vers le haut",
	moveDown: "Déplacer vers le bas",
	moveBottom: "Déplacer tout en bas",
	moveToTarget: "Déplacer vers la cible",
	moveToSource: "Déplacer vers la source",
	moveAllToTarget: "Tout déplacer vers la cible",
	moveAllToSource: "Tout déplacer vers la source",
	pageLabel: "Page {page}",
	firstPageLabel: "Première Page",
	lastPageLabel: "Dernière Page",
	nextPageLabel: "Page Suivante",
	rowsPerPageLabel: "Lignes par page",
	previousPageLabel: "Page précédente",
	jumpToPageDropdownLabel: "Aller à la page",
	jumpToPageInputLabel: "Aller à la page",
	selectRow: "Ligne sélectionnée",
	unselectRow: "Ligne désélectionnée",
	expandRow: "Ligne dépliée",
	collapseRow: "Ligne repliée",
	showFilterMenu: "Montre le menu des filtres",
	hideFilterMenu: "Masque le menu des filtres",
	filterOperator: "Opérateur de filtrage",
	filterConstraint: "Contrainte de filtrage",
	editRow: "Édite une ligne",
	saveEdit: "Sauvegarde l'édition",
	cancelEdit: "Annule l'édition",
	listView: "Vue en liste",
	gridView: "Vue en grille",
	slide: "Diapositive",
	slideNumber: "{slideNumber}",
	zoomImage: "Zoomer l'image",
	zoomIn: "Zoomer",
	zoomOut: "Dézoomer",
	rotateRight: "Tourner vers la droite",
	rotateLeft: "Tourner vers la gauche"
};
var fr = {
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
exports.default = fr;
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
//# sourceMappingURL=fr.json.cjs.map
