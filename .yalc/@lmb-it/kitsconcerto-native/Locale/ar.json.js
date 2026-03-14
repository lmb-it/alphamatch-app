var startsWith = "يبدأ ب";
var contains = "يحتوى على";
var notContains = "لا يحتوى على";
var endsWith = "ينتهي ب";
var equals = "يساوي";
var notEquals = "لا يساوي";
var noFilter = "بدون تصفية";
var filter = "تصفية";
var lt = "أقل من";
var lte = "اقل من او يساوي";
var gt = "أكبر من";
var gte = "أكبر من او يساوي";
var dateIs = "التاريخ هو";
var dateIsNot = "التاريخ ليس";
var dateBefore = "التاريخ قبل";
var dateAfter = "التاريخ بعد";
var custom = "مخصص";
var clear = "إزاله";
var apply = "تطبيق";
var matchAll = "يطابق الكل";
var matchAny = "يطابق أى";
var addRule = "أضافة قاعدة";
var removeRule = "حذف قاعدة";
var accept = "نعم";
var reject = "لا";
var choose = "إختر";
var upload = "تحمّيل";
var cancel = "الغاء";
var completed = "مكتمل";
var pending = "قيد الإنتظار";
var fileSizeTypes = [
	"بايت",
	"كيلو بايت",
	"ميجا بايت",
	"جيجا بايت",
	"تيرا بايت",
	"بيتا بايت",
	"إكسا بايت",
	"زيتا بايت",
	"يوتا بايت"
];
var dayNames = [
	"الأحد",
	"الإثنين",
	"الثلاثاء",
	"الاربعاء",
	"الخميس",
	"الجمعة",
	"السبت"
];
var dayNamesShort = [
	"الأحد",
	"الإثنين",
	"الثلاثاء",
	"الاربعاء",
	"الخميس",
	"الجمعة",
	"السبت"
];
var dayNamesMin = [
	"الأحد",
	"الإثنين",
	"الثلاثاء",
	"الاربعاء",
	"الخميس",
	"الجمعة",
	"السبت"
];
var monthNames = [
	"يناير",
	"فبراير",
	"مارس",
	"ابريل",
	"مايو",
	"يونيو",
	"يوليو",
	"اغسطس",
	"سبتمبر",
	"اكتوبر",
	"نوفمبر",
	"ديسمبر"
];
var monthNamesShort = [
	"يناير",
	"فبراير",
	"مارس",
	"ابريل",
	"مايو",
	"يونيو",
	"يوليو",
	"اغسطس",
	"سبتمبر",
	"اكتوبر",
	"نوفمبر",
	"ديسمبر"
];
var chooseYear = "إختر السنة";
var chooseMonth = "إختر الشهر";
var chooseDate = "إختر اليوم";
var prevDecade = "العقد السابق";
var nextDecade = "العقد القادم";
var prevYear = "السنة السابقة";
var nextYear = "السنة التالية";
var prevMonth = "الشهر السابق";
var nextMonth = "الشهر التالي";
var prevHour = "الساعة السابقة";
var nextHour = "الساعة التالية";
var prevMinute = "الدقيقة السابقة";
var nextMinute = "الدقيقة التالية";
var prevSecond = "الثانية السابقة";
var nextSecond = "الثانية التالية";
var am = "قبل الظهر";
var pm = "بعد الظهر";
var today = "اليوم";
var now = "الأن";
var weekHeader = "الأسبوع";
var firstDayOfWeek = 0;
var showMonthAfterYear = false;
var dateFormat = "شهر/يوم/سنة";
var weak = "ضعيف";
var medium = "متوسط";
var strong = "قوي";
var passwordPrompt = "أدخل كلمة السر";
var emptyFilterMessage = "لا يوجد خيارات";
var searchMessage = "{0} النتائج المتاحة";
var selectionMessage = "{0} عناصر تم اختيارها";
var emptySelectionMessage = "لم يتم اختيار اي عنصر";
var emptySearchMessage = "لا تتوفر بيانات";
var emptyMessage = "لا توجد نتيجة";
var emptyFileUploadMessage = "مسيك وزت ملفات للتحميل";
var password = "كلمة المرور";
var openMenu = "فتح القائمة";
var toggleColorMode = "تبديل وضع الألوان";
var signOut = "تسجيل الخروج";
var profile = "الملف الشخصي";
var filesSelected = "{0} ملفات مختارة";
var dragFilesHere = "اسحب الملفات هنا أو انقر للتصفح";
var filesBeingDropped = "جاري إسقاط الملفات";
var typeNotSupported = "هذا النوع غير مدعوم";
var maximumAllowedFiles = "الحد الأقصى للملفات المسموح بها {0} ملفات";
var remove = "إزالة";
var edit = "تعديل";
var save = "حفظ";
var generatePhoto = "إنشاء صورة";
var settings = "الإعدادات";
var addCategory = "إضافة فئة";
var addItem = "إضافة عنصر";
var any = "أي";
var chooseFile = "اختر ملف";
var chooseImage = "اختر صورة";
var changeImage = "تغيير الصورة";
var tapToUpload = "انقر للتحميل";
var clickOrDragToUpload = "انقر أو اسحب للتحميل";
var addImages = "إضافة صور";
var greaterThan = "أكبر من";
var greaterThanOrEqualTo = "أكبر من أو يساوي";
var lessThan = "أقل من";
var lessThanOrEqualTo = "أقل من أو يساوي";
var between = "بين";
var include = "يتضمن";
var equal = "يساوي";
var after = "بعد";
var before = "قبل";
var not = "ليس";
var aria = {
	trueLabel: "صحيح",
	falseLabel: "خطأ",
	nullLabel: "لا يوجد اختيار",
	star: "نجمه واحدة",
	stars: "{star} نجوم",
	selectAll: "جميع العناصر مختارة",
	unselectAll: "جميع العناصر غير مختارة",
	close: "اغلاق",
	previous: "السابق",
	next: "التالي",
	navigation: "التنقل بين الصفحات",
	scrollTop: "انتقل إلى الأعلى",
	moveTop: "الأنتقال للأول",
	moveUp: "الأنتقال للأعلى",
	moveDown: "الإنتقال للأسفل",
	moveBottom: "الانتقال للأخير",
	moveToTarget: "نقل الى الهدف",
	moveToSource: "نقل الى المصدر",
	moveAllToTarget: "نقل الجميع الى الهدف",
	moveAllToSource: "نقل الجميع الى المصدر",
	pageLabel: "صفحة {page}",
	firstPageLabel: "الصفحة الاولى",
	lastPageLabel: "الصفحة الاخيرة",
	nextPageLabel: "الصفحة التالية",
	previousPageLabel: "الصفحة السابقة",
	rowsPerPageLabel: "عدد الصفوف في الصفحة الواحدة",
	jumpToPageDropdownLabel: "الذهاب إلى عنوان القائمة المنسدلة للصفحة",
	jumpToPageInputLabel: "الذهاب إلى عنوان حقل الإدخال للصفحة",
	selectRow: "اختيار الصف",
	unselectRow: "عدم اختيار الصف",
	expandRow: "اظهار الصف",
	collapseRow: "اخفاء الصف",
	showFilterMenu: "أظهار تصفية القائمة",
	hideFilterMenu: "اخفاء تصفية القائمة",
	filterOperator: "تصفية العاملين",
	filterConstraint: "تصفية القيود",
	editRow: "تعديل الصف",
	saveEdit: "حفظ التعديلات",
	cancelEdit: "الغاء التعديل",
	listView: "واجهة قائمة",
	gridView: "واجهة جدول",
	slide: "زلاقة",
	slideNumber: "{slideNumber}",
	zoomImage: "تكبير الصورة",
	zoomIn: "تكبير",
	zoomOut: "تصغير",
	rotateRight: "تدوير بإتجاه اليمين",
	rotateLeft: "تدوير بأتجاه اليسار"
};
var ar = {
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
	emptyFileUploadMessage: emptyFileUploadMessage,
	password: password,
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
	"delete": "حذف",
	any: any,
	chooseFile: chooseFile,
	chooseImage: chooseImage,
	changeImage: changeImage,
	tapToUpload: tapToUpload,
	clickOrDragToUpload: clickOrDragToUpload,
	addImages: addImages,
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

export { accept, addCategory, addImages, addItem, addRule, after, am, any, apply, aria, before, between, cancel, changeImage, choose, chooseDate, chooseFile, chooseImage, chooseMonth, chooseYear, clear, clickOrDragToUpload, completed, contains, custom, dateAfter, dateBefore, dateFormat, dateIs, dateIsNot, dayNames, dayNamesMin, dayNamesShort, ar as default, dragFilesHere, edit, emptyFileUploadMessage, emptyFilterMessage, emptyMessage, emptySearchMessage, emptySelectionMessage, endsWith, equal, equals, fileSizeTypes, filesBeingDropped, filesSelected, filter, firstDayOfWeek, generatePhoto, greaterThan, greaterThanOrEqualTo, gt, gte, include, lessThan, lessThanOrEqualTo, lt, lte, matchAll, matchAny, maximumAllowedFiles, medium, monthNames, monthNamesShort, nextDecade, nextHour, nextMinute, nextMonth, nextSecond, nextYear, noFilter, not, notContains, notEquals, now, openMenu, password, passwordPrompt, pending, pm, prevDecade, prevHour, prevMinute, prevMonth, prevSecond, prevYear, profile, reject, remove, removeRule, save, searchMessage, selectionMessage, settings, showMonthAfterYear, signOut, startsWith, strong, tapToUpload, today, toggleColorMode, typeNotSupported, upload, weak, weekHeader };
//# sourceMappingURL=ar.json.js.map
