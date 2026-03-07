import { useMemo } from 'react';
import { useSelect } from '../SelectContext.js';

const useSelectBase = () => {
  const ctx = useSelect();
  const { childrenKey, labelKey, valueKey } = ctx;
  const isGrouped = !!childrenKey && childrenKey.length > 0;
  const keys = useMemo(
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

export { useSelectBase };
//# sourceMappingURL=useSelectBase.js.map
