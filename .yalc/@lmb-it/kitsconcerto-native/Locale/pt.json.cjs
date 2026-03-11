'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var startsWith = "Começa com";
var contains = "Contém";
var notContains = "Não contém";
var endsWith = "Termina com";
var equals = "Igual";
var notEquals = "Diferente";
var noFilter = "Sem filtro";
var filter = "Filtro";
var lt = "Menor que";
var lte = "Menor que ou igual a";
var gt = "Maior que";
var gte = "Maior que ou igual a";
var dateIs = "Data é";
var dateIsNot = "Data não é";
var dateBefore = "Date é anterior";
var dateAfter = "Data é posterior";
var custom = "Customizado";
var clear = "Limpar";
var close = "Fechar";
var apply = "Aplicar";
var matchAll = "Match All";
var matchAny = "Match Any";
var addRule = "Adicionar Regra";
var removeRule = "Remover Regra";
var accept = "Sim";
var reject = "Não";
var choose = "Escolha";
var upload = "Upload";
var cancel = "Cancelar";
var completed = "Concluído";
var pending = "Pendente";
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
	"Segunda",
	"Terça",
	"Quarta",
	"Quinta",
	"Sexta",
	"Sábado"
];
var dayNamesShort = [
	"Dom",
	"Seg",
	"Ter",
	"Qua",
	"Qui",
	"Sex",
	"Sáb"
];
var dayNamesMin = [
	"Do",
	"Se",
	"Te",
	"Qa",
	"Qi",
	"Sx",
	"Sa"
];
var monthNames = [
	"Janeiro",
	"Fevereiro",
	"Março",
	"Abril",
	"Maio",
	"Junho",
	"Julho",
	"Agosto",
	"Setembro",
	"Outubro",
	"Novembro",
	"Dezembro"
];
var monthNamesShort = [
	"Jan",
	"Fev",
	"Mar",
	"Abr",
	"Mai",
	"Jun",
	"Jul",
	"Ago",
	"Set",
	"Out",
	"Nov",
	"Dez"
];
var chooseYear = "Escolha Ano";
var chooseMonth = "Escolha Mês";
var chooseDate = "Escolha Data";
var prevDecade = "Década Anterior";
var nextDecade = "Década Seguinte";
var prevYear = "Ano Anterior";
var nextYear = "Ano Seguinte";
var prevMonth = "Mês Anterior";
var nextMonth = "Mês Seguinte";
var prevHour = "Hora Anterior";
var nextHour = "Hora Seguinte";
var prevMinute = "Minuto Anterior";
var nextMinute = "Minuto Seguinte";
var prevSecond = "Segundo Anterior";
var nextSecond = "Segundo Seguinte";
var am = "am";
var pm = "pm";
var today = "Hoje";
var now = "Agora";
var weekHeader = "Sem";
var firstDayOfWeek = 0;
var showMonthAfterYear = false;
var dateFormat = "dd/mm/yy";
var weak = "Fraco";
var medium = "Médio";
var strong = "Forte";
var passwordPrompt = "Digite uma senha";
var emptyFilterMessage = "Nenhum resultado encontrado";
var searchMessage = "{0} resultados disponíveis";
var selectionMessage = "{0} itens selecionados";
var emptySelectionMessage = "Nenhum item selecionado";
var emptySearchMessage = "Nenhum resultado encontrado";
var emptyMessage = "Nenhuma opção disponível";
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
	trueLabel: "Verdadeiro",
	falseLabel: "Falso",
	nullLabel: "Não selecionado",
	star: "1 estrela",
	stars: "{star} estrelas",
	selectAll: "Todos itens selecionados",
	unselectAll: "Nenhum item selecionado",
	close: "Fechar",
	previous: "Anterior",
	next: "Seguinte",
	navigation: "Navegação",
	scrollTop: "Rolar para Topo",
	moveTop: "Mover para Topo",
	moveUp: "Mover para Cima",
	moveDown: "Mover para Baixo",
	moveBottom: "Mover para Final",
	moveToTarget: "Mover para Alvo",
	moveToSource: "Mover para Fonte",
	moveAllToTarget: "Mover Todos para Alvo",
	moveAllToSource: "Mover Todos para Fonte",
	pageLabel: "Página {page}",
	firstPageLabel: "Primeira Página",
	lastPageLabel: "Última Página",
	nextPageLabel: "Página Seguinte",
	previousPageLabel: "Página Anterior",
	rowsPerPageLabel: "Linhas por página",
	jumpToPageDropdownLabel: "Pular para Menu da Página",
	jumpToPageInputLabel: "Pular para Campo da Página",
	selectRow: "Linha Selecionada",
	unselectRow: "Linha Não Selecionada",
	expandRow: "Linha Expandida",
	collapseRow: "Linha Recolhida",
	showFilterMenu: "Mostrar Menu de Filtro",
	hideFilterMenu: "Esconder Menu de Filtro",
	filterOperator: "Operador de Filtro",
	filterConstraint: "Restrição de Filtro",
	editRow: "Editar Linha",
	saveEdit: "Salvar Editar",
	cancelEdit: "Cancelar Editar",
	listView: "Exibição em Lista",
	gridView: "Exibição em Grade",
	slide: "Deslizar",
	slideNumber: "{slideNumber}",
	zoomImage: "Ampliar Imagem",
	zoomIn: "Mais Zoom",
	zoomOut: "Menos Zoom",
	rotateRight: "Girar à Direita",
	rotateLeft: "Girar à Esquerda"
};
var pt = {
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
	close: close,
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
exports.close = close;
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
exports.default = pt;
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
//# sourceMappingURL=pt.json.cjs.map
