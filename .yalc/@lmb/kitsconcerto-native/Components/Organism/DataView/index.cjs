'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');
var useSWR = require('swr');
var moment = require('moment');
var _ = require('lodash');
require('axios');
require('../../../Contexts/DialogContext.cjs');
require('../../Molecules/Form/KitsSelect/SelectContext.cjs');
var index = require('../../Molecules/UI/Flex/index.cjs');
var index_native = require('../../Molecules/UI/Text/index.cjs');
var Button_native = require('../../Molecules/Button/Button.cjs');
require('primereact/tooltip');
require('primereact/skeleton');
var reactNative = require('react-native');
var index_native$1 = require('./Pagination/index.cjs');
var KitsThemeProvider_native = require('../../../Contexts/Theme/KitsThemeProvider.cjs');
var Form = require('../Form/Form.cjs');

const defaultText = {
  emptyMessage: "There are no data to display",
  clearFilter: "Clear filters",
  resetColumnsWidths: "Reset Columns Widths",
  globalFilterPlaceholder: "Keyword Search",
  exportAsPdf: "Export as Pdf",
  exportAsCSV: "Export as CSV"
};
const DataViewContext = React.createContext(
  {}
);
const DataView = (props) => {
  const { resolveToken } = KitsThemeProvider_native.useKitsTheme();
  const {
    id,
    dataViewTitle,
    filtersFormElements,
    pagination,
    keyColumn = "id",
    service,
    defaultMode,
    hideModeButtons,
    data: staticData,
    text = defaultText,
    listItem,
    gridItem,
    ref
  } = props;
  let mutate = void 0;
  let data = void 0;
  const requestDefaultParams = {
    filters: {},
    search: "",
    start: 0,
    length: 20,
    sortBy: []
  };
  const [isLoading, setIsLoading] = React.useState(false);
  const [dataList, setDataList] = React.useState([]);
  const [serverSideRequest, setServerSideRequest] = React.useState(requestDefaultParams);
  const [layout, setLayout] = React.useState(defaultMode ?? "grid");
  const listEnded = React.useRef(false);
  const searchedStarted = React.useRef(false);
  const filterFormRef = React.useRef(null);
  const revertFilter = React.useCallback(
    (filters) => {
      const row = {};
      Object.entries(filters).forEach(([key, value]) => {
        if ("value" in value && value.value instanceof Date) {
          const ff = "YYYY-MM-DD\\THH:mm:ss.000\\Z";
          row[key] = { ...value, value: moment(value.value).format(ff) };
        } else {
          row[key] = value;
        }
      });
      return row;
    },
    []
  );
  const fetcher = React.useCallback(async () => {
    if (!service) {
      return await new Promise((resolve) => resolve(null));
    }
    return await service({
      ...serverSideRequest,
      filters: revertFilter(serverSideRequest.filters)
    });
  }, [service, serverSideRequest, staticData]);
  const swr = useSWR(id, fetcher, {
    revalidateOnMount: false,
    revalidateOnFocus: pagination,
    revalidateIfStale: pagination,
    revalidateOnReconnect: pagination
  });
  if (service && swr.mutate) {
    mutate = swr.mutate;
  }
  if (swr.data) {
    data = swr.data;
  }
  const refresh = () => {
    setIsLoading(true);
    searchedStarted.current = true;
    if (mutate) {
      mutate().then(() => {
      }).finally(() => {
        searchedStarted.current = false;
        setIsLoading(false);
      });
    } else {
      if (staticData) setIsLoading(false);
    }
  };
  function isDate(value) {
    const regex = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$|^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$|^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{6}Z$/;
    return regex.test(value);
  }
  const refValues = {
    refresh: () => {
      setServerSideRequest(requestDefaultParams);
    },
    request: serverSideRequest
  };
  const handleEndReached = () => {
    if (!pagination && !isLoading && !listEnded.current && !searchedStarted.current) {
      setIsLoading(true);
      setServerSideRequest((prev) => ({
        ...prev,
        start: prev.start + prev.length
      }));
    }
  };
  React.useImperativeHandle(ref, () => refValues, [refValues]);
  React.useEffect(() => {
    refresh();
  }, [serverSideRequest]);
  const fixData = React.useCallback((data2) => {
    return [...data2 || []].map((d) => {
      const row = {};
      Object.entries(d).forEach(([key, value]) => {
        const m1 = moment(value, "YYYY-MM-DDTHH:mm:ss.SSSSSSZ");
        const m2 = moment(value, "YYYY-MM-DD");
        if (typeof value === "string" && isDate(value)) {
          if (m1.isValid()) row[key] = m1.toDate();
          else if (m2.isValid()) row[key] = m2.toDate();
          else row[key] = value;
        } else {
          row[key] = value;
        }
      });
      return row;
    });
  }, []);
  React.useEffect(() => {
    if (data && data.success && data.data) {
      listEnded.current = data.data.list.length === 0;
      const list = data.data.list;
      if (list.length > 0 && !(keyColumn in list[0])) {
        throw new Error(
          "Missing keyColumn prop on ListItem. Please provide a unique identifier as keyColumn unless the identifier key is under 'id'"
        );
      }
      if (pagination) {
        setDataList(fixData(list));
      } else {
        setDataList((prev) => [...prev, ...fixData(list)]);
      }
    } else {
      if (staticData) setDataList(fixData(staticData));
    }
  }, [data, fixData, staticData]);
  const setState = (setFn, current, updated) => {
    if (!_.isEqual(current, updated)) setFn(updated);
  };
  const onChangePage = React.useCallback(
    (event) => {
      setState(setServerSideRequest, serverSideRequest, {
        ...serverSideRequest,
        start: event.first,
        length: event.rows
      });
    },
    [serverSideRequest]
  );
  const paginationParams = React.useMemo(() => {
    return data?.success && data.data ? {
      pageSize: data.data.requestedPageSize,
      totalRecords: data.data.total,
      onChangePage,
      start: data.data.pageIndex
    } : { pageSize: 0, totalRecords: 0, onChangePage, start: 0 };
  }, [data]);
  const onFilter = (filters) => {
    setServerSideRequest({ filters, search: "", start: 0, length: 20, sortBy: [] });
    setDataList([]);
  };
  const renderItem = ({ item, index }) => /* @__PURE__ */ jsxRuntime.jsx(React.Fragment, { children: layout === "list" ? listItem(item, index) : gridItem(item, index) }, item[keyColumn]);
  const header = () => /* @__PURE__ */ jsxRuntime.jsxs(index.default, { w: "full", flexDirection: "column", gap: 8, children: [
    !hideModeButtons && /* @__PURE__ */ jsxRuntime.jsxs(index.default, { flexDirection: "row", justifyContent: "flex-end", gap: 8, children: [
      /* @__PURE__ */ jsxRuntime.jsx(
        Button_native.Button,
        {
          size: "sm",
          severity: layout === "list" ? "primary" : "secondary",
          icon: "pi pi-list",
          onClick: () => setLayout("list")
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsx(
        Button_native.Button,
        {
          size: "sm",
          severity: layout === "grid" ? "primary" : "secondary",
          icon: "pi pi-th-large",
          onClick: () => setLayout("grid")
        }
      )
    ] }),
    filtersFormElements && /* @__PURE__ */ jsxRuntime.jsxs(index.default, { gap: 8, w: "full", flexDirection: "row", children: [
      /* @__PURE__ */ jsxRuntime.jsx(index.default, { flex: 1, children: /* @__PURE__ */ jsxRuntime.jsx(
        Form.default,
        {
          ref: filterFormRef,
          elements: filtersFormElements,
          onChange: (formData) => {
            const filters = {};
            Object.entries(formData).forEach(([key, value]) => {
              if (value && value !== "all") {
                filters[key] = { value, matchMode: "contains" };
              }
            });
            onFilter(filters);
          },
          submitButtonProps: "none"
        }
      ) }),
      /* @__PURE__ */ jsxRuntime.jsx(
        Button_native.Button,
        {
          icon: "pi pi-filter-slash",
          severity: "danger",
          size: "sm",
          onClick: () => {
            if (filterFormRef.current) {
              const formValues = {};
              filtersFormElements?.forEach((el) => {
                formValues[el.id] = null;
              });
              filterFormRef.current.setValues(formValues);
            }
          }
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(reactNative.View, { style: { height: 1, backgroundColor: resolveToken("border"), width: "100%" } })
  ] });
  const isHeader = !hideModeButtons || !!filtersFormElements;
  return /* @__PURE__ */ jsxRuntime.jsx(
    DataViewContext.Provider,
    {
      value: {
        reloadClickHandler: refresh,
        paginationParams,
        dataList,
        serverSideRequest,
        fileName: dataViewTitle ?? "my-data-view",
        isLoading,
        refValues
      },
      children: /* @__PURE__ */ jsxRuntime.jsxs(index.default, { flexDirection: "column", flex: 1, children: [
        isHeader && header(),
        dataList.length === 0 && !isLoading ? /* @__PURE__ */ jsxRuntime.jsx(index.default, { p: 16, alignItems: "center", justifyContent: "center", children: /* @__PURE__ */ jsxRuntime.jsx(index_native.default, { children: text?.emptyMessage }) }) : /* @__PURE__ */ jsxRuntime.jsx(
          reactNative.FlatList,
          {
            data: dataList,
            renderItem,
            keyExtractor: (item) => String(item[keyColumn]),
            numColumns: layout === "grid" ? 2 : 1,
            onEndReached: !pagination ? handleEndReached : void 0,
            onEndReachedThreshold: 0.1,
            style: { flex: 1 }
          },
          layout
        ),
        pagination && /* @__PURE__ */ jsxRuntime.jsx(index_native$1.default, {}),
        isLoading && /* @__PURE__ */ jsxRuntime.jsx(index.default, { w: "full", justifyContent: "center", alignItems: "center", p: 8, children: /* @__PURE__ */ jsxRuntime.jsx(reactNative.ActivityIndicator, { size: "small" }) })
      ] })
    }
  );
};
const useDataView = () => React.useContext(DataViewContext);

exports.DataViewContext = DataViewContext;
exports.default = DataView;
exports.useDataView = useDataView;
//# sourceMappingURL=index.cjs.map
