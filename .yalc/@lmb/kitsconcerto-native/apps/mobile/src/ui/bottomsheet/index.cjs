'use strict';

require('react/jsx-runtime');
var GorhomBottomSheet = require('@gorhom/bottom-sheet');
require('react-native');
require('@gluestack-ui/utils/aria');
var React = require('react');
var nativewind = require('nativewind');
var nativewindUtils = require('@gluestack-ui/utils/nativewind-utils');

nativewindUtils.tva({
  base: "absolute inset-0 flex-1 touch-none select-none bg-black opacity-0"
});
nativewindUtils.tva({
  base: "mt-2"
});
nativewindUtils.tva({
  base: ""
});
nativewindUtils.tva({
  base: "py-1 w-full items-center rounded-t-lg "
});
nativewindUtils.tva({
  base: "p-3 flex-row items-center rounded-sm w-full disabled:opacity-0.4 web:pointer-events-auto disabled:cursor-not-allowed hover:bg-background-50 active:bg-background-100 focus:bg-background-100 web:focus-visible:bg-background-100"
});
React.createContext({
  visible: false,
  bottomSheetRef: { current: null },
  handleClose: () => {
  },
  handleOpen: () => {
  }
});
nativewind.cssInterop(GorhomBottomSheet.BottomSheetBackdrop, { className: "style" });
nativewind.cssInterop(GorhomBottomSheet.BottomSheetHandle, { className: "style" });
nativewind.cssInterop(GorhomBottomSheet.BottomSheetView, { className: "style" });
nativewind.cssInterop(GorhomBottomSheet.BottomSheetTextInput, { className: "style" });
nativewind.cssInterop(GorhomBottomSheet.BottomSheetScrollView, { className: "style" });
nativewind.cssInterop(GorhomBottomSheet.BottomSheetFlatList, { className: "style" });
nativewind.cssInterop(GorhomBottomSheet.BottomSheetSectionList, { className: "style" });
//# sourceMappingURL=index.cjs.map
