import 'react/jsx-runtime';
import { BottomSheetBackdrop, BottomSheetHandle, BottomSheetView, BottomSheetTextInput, BottomSheetScrollView, BottomSheetFlatList, BottomSheetSectionList } from '@gorhom/bottom-sheet';
import 'react-native';
import '@gluestack-ui/utils/aria';
import { createContext } from 'react';
import { cssInterop } from 'nativewind';
import { tva } from '@gluestack-ui/utils/nativewind-utils';

tva({
  base: "absolute inset-0 flex-1 touch-none select-none bg-black opacity-0"
});
tva({
  base: "mt-2"
});
tva({
  base: ""
});
tva({
  base: "py-1 w-full items-center rounded-t-lg "
});
tva({
  base: "p-3 flex-row items-center rounded-sm w-full disabled:opacity-0.4 web:pointer-events-auto disabled:cursor-not-allowed hover:bg-background-50 active:bg-background-100 focus:bg-background-100 web:focus-visible:bg-background-100"
});
createContext({
  visible: false,
  bottomSheetRef: { current: null },
  handleClose: () => {
  },
  handleOpen: () => {
  }
});
cssInterop(BottomSheetBackdrop, { className: "style" });
cssInterop(BottomSheetHandle, { className: "style" });
cssInterop(BottomSheetView, { className: "style" });
cssInterop(BottomSheetTextInput, { className: "style" });
cssInterop(BottomSheetScrollView, { className: "style" });
cssInterop(BottomSheetFlatList, { className: "style" });
cssInterop(BottomSheetSectionList, { className: "style" });
//# sourceMappingURL=index.js.map
