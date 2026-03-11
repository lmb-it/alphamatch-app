'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var startsWith = "Dimulai dengan";
var contains = "Mengandung";
var notContains = "Tidak mengandung";
var endsWith = "Berakhir dengan";
var equals = "Sama";
var notEquals = "Tidak sama";
var noFilter = "Tanpa Filter";
var filter = "Filter";
var lt = "Kurang dari";
var lte = "Kurang dari atau sama dengan";
var gt = "Lebih dari";
var gte = "Lebih dari atau sama dengan";
var dateIs = "Tanggal adalah";
var dateIsNot = "Tanggalnya tidak";
var dateBefore = "Tanggalnya sebelum";
var dateAfter = "Tanggalnya sesudah";
var custom = "Custom";
var clear = "Bersih";
var apply = "Terapkan";
var matchAll = "Cocok dengan semua";
var matchAny = "Cocok dengen salah satu";
var addRule = "Tambah Aturan";
var removeRule = "Hapus Aturan";
var accept = "Terima";
var reject = "Tolak";
var choose = "Pilih";
var upload = "Unggah";
var cancel = "Batal";
var completed = "Selesai";
var pending = "Menunggu";
var dayNames = [
	"Minggu",
	"Senin",
	"Selasa",
	"Rabu",
	"Kamis",
	"Jumat",
	"Sabtu"
];
var dayNamesShort = [
	"Mig",
	"Sen",
	"Sel",
	"Rab",
	"Kam",
	"Jum",
	"Sab"
];
var dayNamesMin = [
	"Mi",
	"Se",
	"Se",
	"Ra",
	"Ka",
	"Ju",
	"Sa"
];
var monthNames = [
	"Januari",
	"Februari",
	"Maret",
	"April",
	"Mei",
	"Juni",
	"Juli",
	"Agustus",
	"September",
	"Oktober",
	"November",
	"Desember"
];
var monthNamesShort = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"Mei",
	"Jun",
	"Jul",
	"Agu",
	"Sep",
	"Okt",
	"Nov",
	"Des"
];
var chooseYear = "Pilih Tahun";
var chooseMonth = "Pilih Bulan";
var chooseDate = "Pilih Tanggal";
var prevDecade = "Dekade Sebelumnya";
var nextDecade = "Dekade Selanjutnya";
var prevYear = "Tahun Sebelumnya";
var nextYear = "Tahun Selanjutnya";
var prevMonth = "Bulan Sebelumnya";
var nextMonth = "Bulan Selanjutnya";
var prevHour = "Jam Sebelumnya";
var nextHour = "Jam Selanjutnya";
var prevMinute = "Menit Sebelumnya";
var nextMinute = "Menit Selanjutnya";
var prevSecond = "Detik Sebelumnya";
var nextSecond = "Detik Selanjutnya";
var am = "am";
var pm = "pm";
var today = "Hari ini";
var weekHeader = "Wk";
var firstDayOfWeek = 1;
var showMonthAfterYear = false;
var dateFormat = "dd/mm/yy";
var weak = "Lemah";
var medium = "Sedang";
var strong = "Kuat";
var passwordPrompt = "Masukkan Kata Sandi";
var emptyFilterMessage = "Hasil pencarian tidak ditemukan";
var searchMessage = "{0} hasil tersedia";
var selectionMessage = "{0} item dipilih";
var emptySelectionMessage = "Tidak ada item dipilih";
var emptySearchMessage = "Tidak menemukan hasil pencarian";
var emptyMessage = "Tidak ada opsi tersedia";
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
	trueLabel: "Betul",
	falseLabel: "Salah",
	nullLabel: "Tidak dipilih",
	star: "bintang 1",
	stars: "{star} bintang",
	selectAll: "Semua item dipilih",
	unselectAll: "Tidak memilih semua item",
	close: "Tutup",
	previous: "Sebelumnya",
	next: "Selanjutnya",
	navigation: "Navigasi",
	scrollTop: "Scroll ke paling atas",
	moveTop: "Pindah ke paling atas",
	moveUp: "Pindah ke atas",
	moveDown: "Pindah ke bawah",
	moveBottom: "Pindah ke paling bawah",
	moveToTarget: "Pindah ke Target",
	moveToSource: "Pindah ke Sumber",
	moveAllToTarget: "Pindah Semua ke Target",
	moveAllToSource: "Pindah Semua ke Sumber",
	pageLabel: "Halaman {page}",
	firstPageLabel: "Halaman Pertama",
	lastPageLabel: "Halaman Terakhir",
	nextPageLabel: "Halaman Selanjutnya",
	previousPageLabel: "Halaman Sebelumnya",
	rowsPerPageLabel: "Baris per halaman",
	jumpToPageDropdownLabel: "Loncat ke halaman Dropdown",
	jumpToPageInputLabel: "Loncat ke halaman Input",
	selectRow: "Baris Dipilih",
	unselectRow: "Baris Tidak Dipilih",
	expandRow: "Bentangkan Baris",
	collapseRow: "Lipat Baris",
	showFilterMenu: "Tampilkan Menu Filter",
	hideFilterMenu: "Sembunyikan Menu Filter",
	filterOperator: "Operator Filter",
	filterConstraint: "Batasan Filter",
	editRow: "Ubah Baris",
	saveEdit: "Simpan Perubahan",
	cancelEdit: "Batalkan Perubahan",
	listView: "Tampilan Daftar",
	gridView: "Tampilan Grid",
	slide: "Slide",
	slideNumber: "{nomorSlide}",
	zoomImage: "Perbesar Gambar",
	zoomIn: "Perbesar",
	zoomOut: "Perkecil",
	rotateRight: "Putar ke Kanan",
	rotateLeft: "Putar ke Kiri"
};
var id = {
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
exports.default = id;
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
//# sourceMappingURL=id.json.cjs.map
