'use strict';

var React = require('react');
var SelectContext = require('../SelectContext.cjs');

const useSelectBase = () => {
  const ctx = SelectContext.useSelect();
  const { childrenKey, labelKey, valueKey } = ctx;
  const isGrouped = !!childrenKey && childrenKey.length > 0;
  const keys = React.useMemo(
    () => ({
      optionLabel: labelKey,
      optionValue: valueKey,
      optionGroupLabel: isGrouped ? labelKey : void 0,
      optionGroupChildren: isGrouped ? childrenKey : void 0
    }),
    [labelKey, valueKey, isGrouped, childrenKey]
  );
  return { ...ctx, isGrouped, keys };
};

exports.useSelectBase = useSelectBase;
//# sourceMappingURL=useSelectBase.cjs.map
