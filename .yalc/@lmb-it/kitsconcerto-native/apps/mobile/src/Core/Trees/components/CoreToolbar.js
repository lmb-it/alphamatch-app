import 'react/jsx-runtime';
import { StyleSheet } from 'react-native';
import 'react-icons/fa';
import 'react-icons/ai';
import 'react-icons/io';
import '../../../../../../packages/types/src/Components/Molecules/Form/FilePicker/types/filesTypes.js';
import 'yup';

StyleSheet.create({
  toolbar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8
  },
  startHorizontal: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    flexShrink: 1,
    minWidth: 0,
    gap: 8
  },
  centerHorizontal: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    gap: 4
  },
  endHorizontal: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    flexShrink: 0,
    gap: 4
  },
  toolbarVertical: {
    flexDirection: "column",
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8
  },
  startVertical: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    gap: 8
  },
  actionsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8
  }
});
//# sourceMappingURL=CoreToolbar.js.map
