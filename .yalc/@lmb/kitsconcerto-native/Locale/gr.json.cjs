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
	aria: aria
};

exports.accept = accept;
exports.addRule = addRule;
exports.apply = apply;
exports.aria = aria;
exports.cancel = cancel;
exports.choose = choose;
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
exports.emptyFilterMessage = emptyFilterMessage;
exports.emptyMessage = emptyMessage;
exports.endsWith = endsWith;
exports.equals = equals;
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
exports.noFilter = noFilter;
exports.notContains = notContains;
exports.notEquals = notEquals;
exports.passwordPrompt = passwordPrompt;
exports.reject = reject;
exports.removeRule = removeRule;
exports.showMonthAfterYear = showMonthAfterYear;
exports.startsWith = startsWith;
exports.strong = strong;
exports.today = today;
exports.upload = upload;
exports.weak = weak;
exports.weekHeader = weekHeader;
//# sourceMappingURL=gr.json.cjs.map
