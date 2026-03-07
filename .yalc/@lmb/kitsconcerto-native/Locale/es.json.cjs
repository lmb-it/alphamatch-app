'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var startsWith = "Comience con";
var contains = "Contenga";
var notContains = "No contenga";
var endsWith = "Termine con";
var equals = "Igual a";
var notEquals = "Diferente a";
var noFilter = "Sin filtro";
var lt = "Menor que";
var lte = "Menor o igual a";
var gt = "Mayor que";
var gte = "Mayor o igual a";
var dateIs = "Fecha igual a";
var dateIsNot = "Fecha diferente a";
var dateBefore = "Fecha antes de";
var dateAfter = "Fecha después de";
var custom = "Personalizar";
var clear = "Limpiar";
var apply = "Aplicar";
var matchAll = "Coincidir todo";
var matchAny = "Coincidir con cualquiera";
var addRule = "Agregar regla";
var removeRule = "Eliminar regla";
var accept = "Sí";
var reject = "No";
var choose = "Escoger";
var upload = "Subir";
var cancel = "Cancelar";
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
	"Domingo",
	"Lunes",
	"Martes",
	"Miércoles",
	"Jueves",
	"Viernes",
	"Sábado"
];
var dayNamesShort = [
	"Dom",
	"Lun",
	"Mar",
	"Mié",
	"Jue",
	"Vie",
	"Sáb"
];
var dayNamesMin = [
	"D",
	"L",
	"M",
	"M",
	"J",
	"V",
	"S"
];
var monthNames = [
	"Enero",
	"Febrero",
	"Marzo",
	"Abril",
	"Mayo",
	"Junio",
	"Julio",
	"Agosto",
	"Septiembre",
	"Octubre",
	"Noviembre",
	"Diciembre"
];
var monthNamesShort = [
	"Ene",
	"Feb",
	"Mar",
	"Abr",
	"May",
	"Jun",
	"Jul",
	"Ago",
	"Sep",
	"Oct",
	"Nov",
	"Dic"
];
var today = "Hoy";
var now = "Ahora";
var weekHeader = "Sem";
var firstDayOfWeek = 1;
var showMonthAfterYear = false;
var dateFormat = "dd/mm/yy";
var weak = "Débil";
var medium = "Medio";
var strong = "Fuerte";
var passwordPrompt = "Escriba una contraseña";
var emptyFilterMessage = "Sin opciones disponibles";
var emptyMessage = "No se han encontrado resultados";
var aria = {
	trueLabel: "Verdadero",
	falseLabel: "Falso",
	nullLabel: "No seleccionado",
	star: "1 estrella",
	stars: "{star} estrellas",
	selectAll: "Seleccionar todos",
	unselectAll: "Deseleccionar todos",
	close: "Cerrar",
	previous: "Anterior",
	next: "Siguiente",
	navigation: "Navegación",
	scrollTop: "Desplazarse hacia arriba",
	moveTop: "Mover arriba",
	moveUp: "Subir",
	moveDown: "Bajar",
	moveBottom: "Desplazarse hacia abajo",
	moveToTarget: "Mover al objetivo",
	moveToSource: "Mover al origen",
	moveAllToTarget: "Mover todo al objetivo",
	moveAllToSource: "Mover todo al origen",
	pageLabel: "Página {page}",
	firstPageLabel: "Primera Página",
	lastPageLabel: "Última Página",
	nextPageLabel: "Siguiente Página",
	previousPageLabel: "Página Anterior",
	rowsPerPageLabel: "Filas por página",
	jumpToPageDropdownLabel: "Ir al menú desplegable de página",
	jumpToPageInputLabel: "Ir a la entrada de página",
	selectRow: "Seleccionar fila",
	unselectRow: "Desmarcar fila",
	expandRow: "Expandir Fila",
	collapseRow: "Reducir Fila",
	showFilterMenu: "Mostrar menú del filtro",
	hideFilterMenu: "Ocultar menú del filtro",
	filterOperator: "Operador de filtro",
	filterConstraint: "Restricción de filtro",
	editRow: "Editar fila",
	saveEdit: "Guardar editado",
	cancelEdit: "Cancelar editado",
	listView: "Vista de lista",
	gridView: "Vista de cuadrícula",
	slide: "Deslizar",
	slideNumber: "{slideNumber}",
	zoomImage: "Ampliar imagen",
	zoomIn: "Ampliar",
	zoomOut: "Reducir",
	rotateRight: "Girar a la derecha",
	rotateLeft: "Girar a la izquierda"
};
var es = {
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
exports.default = es;
exports.emptyFilterMessage = emptyFilterMessage;
exports.emptyMessage = emptyMessage;
exports.endsWith = endsWith;
exports.equals = equals;
exports.fileSizeTypes = fileSizeTypes;
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
exports.now = now;
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
//# sourceMappingURL=es.json.cjs.map
