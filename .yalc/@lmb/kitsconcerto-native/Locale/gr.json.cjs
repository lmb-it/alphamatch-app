'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var startsWith = "Αρχίζει με";
var contains = "Περιέχει";
var notContains = "Δεν Περιέχει";
var endsWith = "Τελειώνει με";
var equals = "Ισο με";
var notEquals = "Διαφορετικό από";
var noFilter = "Χωρίς φίλτρο";
var lt = "Μικρότερο από";
var lte = "Μικρότερο από ή ίσο με";
var gt = "Μεγαλύτερο από";
var gte = "Μεγαλύτερο από ή ίσο με";
var dateIs = "Ημερομηνία είναι";
var dateIsNot = "Ημερομηνία δεν είναι";
var dateBefore = "Ημερομηνία πριν";
var dateAfter = "Ημερομηνία μετά";
var custom = "Ειδική κατασκευή";
var clear = "Καθαρισμός";
var apply = "Εφαρμογή";
var matchAll = "Ισοδύναμο με όλα";
var matchAny = "Ισοδύναμο με τουλάχιστον ένα";
var addRule = "Προσθήκη κανόνα";
var removeRule = "Αφαίρεση κανόνα";
var accept = "ΝΑΙ";
var reject = "ΟΧΙ";
var choose = "Επιλογή";
var upload = "Ανεβάζω";
var cancel = "Ακύρωση";
var dayNames = [
	"Κυριακή",
	"Δευτέρα",
	"Τρίτη",
	"Τετάρτη",
	"Πέμπτη",
	"Παρασκευή",
	"Σάββατο"
];
var dayNamesShort = [
	"Κυρ",
	"Δευ",
	"Τρι",
	"Τετ",
	"Πεμ",
	"Παρ",
	"Σαβ"
];
var dayNamesMin = [
	"Κυ",
	"Δε",
	"Τρ",
	"Τε",
	"Πε",
	"Πα",
	"Σα"
];
var monthNames = [
	"Ιανουάριος",
	"Φεβρουάριος",
	"Μάρτιος",
	"Απρίλιος",
	"Μάιος",
	"Ιούνιος",
	"Ιούλιος",
	"Αύγουστος",
	"Σεπτέμβριος",
	"Οκτώβριος",
	"Νοέμβριος",
	"Δεκέμβριος"
];
var monthNamesShort = [
	"Ιαν",
	"Φεβ",
	"Μαρ",
	"Απρ",
	"Μαϊ",
	"Ιουν",
	"Ιουλ",
	"Αυγ",
	"Σεπ",
	"Οκτ",
	"Νοε",
	"Δεκ"
];
var today = "Σήμερα";
var weekHeader = "Wk";
var firstDayOfWeek = 0;
var showMonthAfterYear = false;
var dateFormat = "dd/mm/yy";
var weak = "Αδύναμος";
var medium = "Μεσαίος";
var strong = "Δυνατός";
var passwordPrompt = "Εισαγωγή κωδικού";
var emptyFilterMessage = "Δεν υπάρχουν διαθέσιμες επιλογές";
var emptyMessage = "Δεν βρέθηκαν αποτελέσματα";
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
	close: "Κλείσιμο",
	previous: "Προηγούμενο",
	next: "Επόμενο",
	trueLabel: "Αληθής",
	falseLabel: "Ψευδής",
	nullLabel: "Κενή ετικέτα",
	pageLabel: "Σελίδα {page}",
	firstPageLabel: "Πρώτη Σελίδα",
	lastPageLabel: "Τελευταία Σελίδα",
	nextPageLabel: "Επόμενη Σελίδα",
	previousPageLabel: "Προηγούμενη Σελίδα"
};
var gr = {
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
exports.default = gr;
exports.dragFilesHere = dragFilesHere;
exports.edit = edit;
exports.emptyFilterMessage = emptyFilterMessage;
exports.emptyMessage = emptyMessage;
exports.endsWith = endsWith;
exports.equal = equal;
exports.equals = equals;
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
//# sourceMappingURL=gr.json.cjs.map
