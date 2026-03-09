'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var startsWith = "Başlangıç";
var contains = "Barındırır";
var notContains = "İçinde Barındırmaz";
var endsWith = "Bitiş";
var equals = "Eşittir";
var notEquals = "Eşit Değildir";
var noFilter = "Filtresiz";
var filter = "Filtre";
var lt = "Daha az";
var lte = "Daha az veya Eşit";
var gt = "Daha Fazla";
var gte = "Daha fazla veya Eşit";
var dateIs = "Tarih";
var dateIsNot = "Tarih değildir";
var dateBefore = "Tarihten önce";
var dateAfter = "Tarihten sonra";
var custom = "Özel";
var clear = "Temiz";
var apply = "Uygula";
var matchAll = "Tümüyle eşleşir";
var matchAny = "Herhangi birine eşleşir";
var addRule = "Kural Ekle";
var removeRule = "Kuralı Sil";
var accept = "Tamam";
var reject = "İptal";
var choose = "Seç";
var upload = "Yükle";
var cancel = "Vazgeç";
var pending = "Askıda";
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
	"Pazar",
	"Pazartesi",
	"Salı",
	"Çarşamba",
	"Perşembe",
	"Cuma",
	"Cumartesi"
];
var dayNamesShort = [
	"Paz",
	"Pzt",
	"Sal",
	"Çar",
	"Per",
	"Cum",
	"Cmt"
];
var dayNamesMin = [
	"Pz",
	"Pt",
	"Sa",
	"Ça",
	"Pe",
	"Cu",
	"Ct"
];
var monthNames = [
	"Ocak",
	"Şubat",
	"Mart",
	"Nisan",
	"Mayıs",
	"Haziran",
	"Temmuz",
	"Ağustos",
	"Eylül",
	"Ekim",
	"Kasım",
	"Aralık"
];
var monthNamesShort = [
	"Oca",
	"Şub",
	"Mar",
	"Nis",
	"May",
	"Haz",
	"Tem",
	"Ağu",
	"Eyl",
	"Eki",
	"Kas",
	"Ara"
];
var chooseYear = "Yıl Seçiniz";
var chooseMonth = "Ay Seçiniz";
var chooseDate = "tarih Seçiniz";
var prevDecade = "Önceki On Yıl";
var nextDecade = "Gelecek On Yıl";
var prevYear = "Geçen Yıl";
var nextYear = "Gelecek Yıl";
var prevMonth = "Geçen Ay";
var nextMonth = "Gelecek Ay";
var prevHour = "Geçen Saat";
var nextHour = "Gelecek Saat";
var prevMinute = "Geçen Dakika";
var nextMinute = "Gelecek Dakika";
var prevSecond = "Geçen Saniye";
var nextSecond = "Gelecek Saniye";
var am = "ÖÖ";
var pm = "ÖS";
var today = "Bugün";
var now = "Şimdi";
var weekHeader = "Hf";
var firstDayOfWeek = 0;
var showMonthAfterYear = false;
var dateFormat = "dd/mm/yy";
var weak = "Zayıf";
var medium = "Orta";
var strong = "Güçlü";
var passwordPrompt = "Şifre Giriniz";
var emptyFilterMessage = "Kullanılabilir seçenek yok";
var searchMessage = "{0} sonuç bulundu";
var selectionMessage = "{0} öğe seçildi";
var emptySelectionMessage = "Öğe seçilmedi";
var emptySearchMessage = "Sonuç bulunmadı";
var emptyMessage = "Sonuç bulunamadı";
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
	trueLabel: "Doğru",
	falseLabel: "Yanlış",
	nullLabel: "Seçilmedi",
	star: "1 yıldız",
	stars: "{star} yıldız",
	selectAll: "Tüm öğeler seçildi",
	unselectAll: "Tüm öğelerden seçim kaldırıldı",
	close: "kapat",
	previous: "Önceki",
	next: "Sonraki",
	navigation: "Navigasyon",
	scrollTop: "Yukarı çık",
	moveTop: "En üste taşı",
	moveUp: "Üste taşı",
	moveDown: "Aşağıya taşı",
	moveBottom: "En aşağıya taşı",
	moveToTarget: "Hedefe taşı",
	moveToSource: "Kaynağa taşı",
	moveAllToTarget: "Tümünü hedefe taşı",
	moveAllToSource: "Tümünü kaynağa taşı",
	pageLabel: "Sayfa {page}",
	firstPageLabel: "İlk Sayfa",
	lastPageLabel: "Son Sayfa",
	nextPageLabel: "Sonraki Sayfa",
	previousPageLabel: "Önceki Sayfa",
	rowsPerPageLabel: "Sayfa başına satır",
	jumpToPageDropdownLabel: "Açılan Sayfaya Git",
	jumpToPageInputLabel: "Giriş Yapılan Sayfaya git",
	selectRow: "Satır Seçildi",
	unselectRow: "Satır Seçilmedi",
	expandRow: "Satır Genişletildi",
	collapseRow: "Satır Daraltıldı",
	showFilterMenu: "Filtre Menüsünü Göster",
	hideFilterMenu: "Filtre Menüsünü Gizle",
	filterOperator: "Filtre Araçları",
	filterConstraint: "Filter Constraint",
	editRow: "Satırı Düzenle",
	saveEdit: "Düzenlemeyi Kaydet",
	cancelEdit: "Düzenlemeyi İptal Et",
	listView: "Liste Görünüm",
	gridView: "Izgara Görünüm",
	slide: "Slayt",
	slideNumber: "{slideNumber}",
	zoomImage: "Görüntüyü Yakınlaştır",
	zoomIn: "Yakınlaştır",
	zoomOut: "Uzaklaştır",
	rotateRight: "Sağa Döndür",
	rotateLeft: "Sola Döndür"
};
var tr = {
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
exports.default = tr;
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
//# sourceMappingURL=tr.json.cjs.map
