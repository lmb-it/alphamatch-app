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
	aria: aria
};

export { accept, addRule, am, apply, aria, cancel, choose, chooseDate, chooseMonth, chooseYear, clear, completed, contains, custom, dateAfter, dateBefore, dateFormat, dateIs, dateIsNot, dayNames, dayNamesMin, dayNamesShort, ar as default, emptyFileUploadMessage, emptyFilterMessage, emptyMessage, emptySearchMessage, emptySelectionMessage, endsWith, equals, fileSizeTypes, filter, firstDayOfWeek, gt, gte, lt, lte, matchAll, matchAny, medium, monthNames, monthNamesShort, nextDecade, nextHour, nextMinute, nextMonth, nextSecond, nextYear, noFilter, notContains, notEquals, now, password, passwordPrompt, pending, pm, prevDecade, prevHour, prevMinute, prevMonth, prevSecond, prevYear, reject, removeRule, searchMessage, selectionMessage, showMonthAfterYear, startsWith, strong, today, upload, weak, weekHeader };
//# sourceMappingURL=ar.json.js.map
