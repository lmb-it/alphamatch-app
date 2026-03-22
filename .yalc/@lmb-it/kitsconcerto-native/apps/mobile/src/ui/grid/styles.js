import { tva, isWeb } from '@gluestack-ui/utils/nativewind-utils';

const gridBaseStyle = isWeb ? "grid grid-cols-12" : "box-border flex-row flex-wrap justify-start";
const gridItemBaseStyle = isWeb ? "w-auto col-span-1" : "w-auto";
const gridStyle = tva({
  base: `w-full ${gridBaseStyle}`
});
const gridItemStyle = tva({
  base: `${gridItemBaseStyle}`
});

export { gridItemStyle, gridStyle };
//# sourceMappingURL=styles.js.map
