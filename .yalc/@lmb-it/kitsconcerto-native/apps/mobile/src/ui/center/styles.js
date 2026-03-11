import { tva, isWeb } from '@gluestack-ui/utils/nativewind-utils';

const baseStyle = isWeb ? "flex flex-col relative z-0" : "";
const centerStyle = tva({
  base: `justify-center items-center ${baseStyle}`
});

export { centerStyle };
//# sourceMappingURL=styles.js.map
