import { tva, isWeb } from '@gluestack-ui/utils/nativewind-utils';

const captionTableStyle = isWeb ? "caption-bottom" : "";
const tableStyle = tva({
  base: `table border-collapse border-collapse w-[800px]`
});
const tableHeaderStyle = tva({
  base: ""
});
const tableBodyStyle = tva({
  base: ""
});
const tableFooterStyle = tva({
  base: ""
});
const tableHeadStyle = tva({
  base: "flex-1 px-6 py-[14px] text-left font-bold text-[16px] leading-[22px] text-typography-800 font-roboto"
});
const tableRowStyleStyle = tva({
  base: "border-0 border-b border-solid border-outline-200 bg-background-0",
  variants: {
    isHeaderRow: {
      true: ""
    },
    isFooterRow: {
      true: "border-b-0 "
    }
  }
});
const tableDataStyle = tva({
  base: "flex-1 px-6 py-[14px] text-left text-[16px] font-medium leading-[22px] text-typography-800 font-roboto"
});
const tableCaptionStyle = tva({
  base: `${captionTableStyle} px-6 py-[14px] text-[16px] font-normal leading-[22px] text-typography-800 bg-background-50 font-roboto`
});

export { tableBodyStyle, tableCaptionStyle, tableDataStyle, tableFooterStyle, tableHeadStyle, tableHeaderStyle, tableRowStyleStyle, tableStyle };
//# sourceMappingURL=styles.js.map
