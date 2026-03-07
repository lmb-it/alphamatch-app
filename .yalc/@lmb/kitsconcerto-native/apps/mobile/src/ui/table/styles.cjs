'use strict';

var nativewindUtils = require('@gluestack-ui/utils/nativewind-utils');

const captionTableStyle = nativewindUtils.isWeb ? "caption-bottom" : "";
const tableStyle = nativewindUtils.tva({
  base: `table border-collapse border-collapse w-[800px]`
});
const tableHeaderStyle = nativewindUtils.tva({
  base: ""
});
const tableBodyStyle = nativewindUtils.tva({
  base: ""
});
const tableFooterStyle = nativewindUtils.tva({
  base: ""
});
const tableHeadStyle = nativewindUtils.tva({
  base: "flex-1 px-6 py-[14px] text-left font-bold text-[16px] leading-[22px] text-typography-800 font-roboto"
});
const tableRowStyleStyle = nativewindUtils.tva({
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
const tableDataStyle = nativewindUtils.tva({
  base: "flex-1 px-6 py-[14px] text-left text-[16px] font-medium leading-[22px] text-typography-800 font-roboto"
});
const tableCaptionStyle = nativewindUtils.tva({
  base: `${captionTableStyle} px-6 py-[14px] text-[16px] font-normal leading-[22px] text-typography-800 bg-background-50 font-roboto`
});

exports.tableBodyStyle = tableBodyStyle;
exports.tableCaptionStyle = tableCaptionStyle;
exports.tableDataStyle = tableDataStyle;
exports.tableFooterStyle = tableFooterStyle;
exports.tableHeadStyle = tableHeadStyle;
exports.tableHeaderStyle = tableHeaderStyle;
exports.tableRowStyleStyle = tableRowStyleStyle;
exports.tableStyle = tableStyle;
//# sourceMappingURL=styles.cjs.map
