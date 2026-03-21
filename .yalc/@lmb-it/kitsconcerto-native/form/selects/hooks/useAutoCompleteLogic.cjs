'use strict';

var React = require('react');
var SelectContext = require('../SelectContext.cjs');

const useAutoCompleteLogic = (props) => {
  const { isMultiple, forceSelection, completeMethod, ref } = props;
  const {
    list,
    childrenKey,
    labelKey,
    valueKey,
    outputValueKey,
    onChange,
    selectedValue
  } = SelectContext.useSelect();
  const isAll = outputValueKey === "*";
  const [inputValue, setInputValue] = React.useState(null);
  const [filteredList, setFilteredList] = React.useState(null);
  React.useImperativeHandle(ref, () => ({}));
  const filterValue = React.useCallback(
    (incomingValue) => {
      if (isAll) return incomingValue;
      if (Array.isArray(incomingValue) && !isMultiple) {
        if (incomingValue.length === 0) return null;
      }
      if (incomingValue != null && typeof incomingValue === "object") {
        if (outputValueKey in incomingValue) {
          return incomingValue[outputValueKey];
        }
        if (valueKey in incomingValue) {
          return incomingValue[valueKey];
        }
      }
      return incomingValue;
    },
    [isAll, isMultiple, outputValueKey, valueKey]
  );
  const handleOnChange = React.useCallback(
    (event) => {
      let value = void 0;
      if (isMultiple) {
        if (Array.isArray(event.value)) {
          value = isAll ? event.value : event.value.map((item) => filterValue(item));
        }
      } else {
        const item = event.value;
        if (item == null) {
          value = null;
        } else if (typeof item !== "string") {
          value = filterValue(item);
        } else {
          value = item;
        }
      }
      if (value !== void 0) {
        onChange(
          {
            target: { value },
            originalEvent: event.originalEvent
          },
          event.value
        );
      }
    },
    [isMultiple, isAll, onChange, filterValue]
  );
  React.useEffect(() => {
    if (isMultiple) {
      if (Array.isArray(selectedValue) && selectedValue.length > 0) {
        if (selectedValue.every((v) => typeof v === "object")) {
          setInputValue(selectedValue);
        } else {
          const mapped = selectedValue.map((v) => {
            if (typeof v === "string") {
              const found = list?.find((item) => item[valueKey] === v);
              return found ?? { [labelKey]: v, [valueKey]: v };
            }
            return v;
          });
          setInputValue(mapped);
        }
      } else {
        setInputValue(null);
      }
    } else {
      if (selectedValue != null && typeof selectedValue === "object") {
        setInputValue(selectedValue);
      } else if (typeof selectedValue === "string") {
        setInputValue(selectedValue);
      } else if (selectedValue == null) {
        setInputValue(null);
      }
    }
  }, [selectedValue, labelKey, valueKey, isMultiple, list]);
  const makeFallback = React.useCallback(
    (query) => {
      if (childrenKey) {
        return [
          {
            [labelKey]: "_",
            [childrenKey]: [
              { [labelKey]: query, [valueKey]: query }
            ]
          }
        ];
      }
      return [{ [labelKey]: query, [valueKey]: query }];
    },
    [labelKey, valueKey, childrenKey]
  );
  const search = React.useCallback(
    (event) => {
      if (completeMethod && typeof completeMethod === "function") {
        const res = completeMethod(event.query);
        const fallback = !forceSelection ? makeFallback(event.query) : [];
        if (res instanceof Promise) {
          res.then((response) => {
            if (Array.isArray(response)) {
              setFilteredList(
                response.length > 0 ? response : fallback
              );
            } else if (response?.data && Array.isArray(response.data)) {
              setFilteredList(
                response.data.length > 0 ? response.data : fallback
              );
            } else {
              setFilteredList(fallback);
            }
          });
        } else {
          setFilteredList(res ?? null);
        }
      } else {
        if (!Array.isArray(list)) return;
        const input = event.query;
        if (!input.trim().length) {
          setFilteredList([...list]);
        } else {
          let filtered;
          if (childrenKey) {
            filtered = [];
            for (const group of list) {
              const children = group[childrenKey];
              const matchedChildren = Array.isArray(children) && children.filter((item) => {
                const val = item[labelKey] ?? item[valueKey];
                return String(val).toLowerCase().startsWith(input.toLowerCase());
              });
              if (matchedChildren && matchedChildren.length) {
                filtered.push({
                  ...group,
                  [childrenKey]: matchedChildren
                });
              }
            }
          } else {
            filtered = list.filter((item) => {
              const val = item[labelKey] ?? item[valueKey];
              return String(val).toLowerCase().startsWith(input.toLowerCase());
            });
          }
          if (filtered.length === 0 && !forceSelection) {
            setFilteredList(makeFallback(input));
          } else {
            setFilteredList(filtered);
          }
        }
      }
    },
    [completeMethod, list, childrenKey, labelKey, valueKey, forceSelection, makeFallback]
  );
  return {
    // State
    inputValue,
    setInputValue,
    filteredList,
    setFilteredList,
    // Computed
    isAll,
    // Callbacks
    filterValue,
    handleOnChange,
    search,
    makeFallback,
    // Context values
    list,
    childrenKey,
    labelKey,
    valueKey,
    outputValueKey,
    onChange,
    selectedValue
  };
};

exports.useAutoCompleteLogic = useAutoCompleteLogic;
//# sourceMappingURL=useAutoCompleteLogic.cjs.map
