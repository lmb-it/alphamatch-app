import { jsxs, jsx } from 'react/jsx-runtime';
import { useRef } from 'react';
import '../../../apps/mobile/src/ui/accordion/index.js';
import '../../../apps/mobile/src/ui/actionsheet/index.js';
import '../../../apps/mobile/src/ui/alert/index.js';
import '../../../apps/mobile/src/ui/alert-dialog/index.js';
import '../../../apps/mobile/src/ui/avatar/index.js';
import '../../../apps/mobile/src/ui/badge/index.js';
import '../../../apps/mobile/src/ui/bottomsheet/index.js';
import '../../../apps/mobile/src/ui/box/index.js';
import '../../../apps/mobile/src/ui/button/index.js';
import '../../../apps/mobile/src/ui/card/index.js';
import '../../../apps/mobile/src/ui/center/index.js';
import '../../../apps/mobile/src/ui/checkbox/index.js';
import '../../../apps/mobile/src/ui/divider/index.js';
import '../../../apps/mobile/src/ui/drawer/index.js';
import '../../../apps/mobile/src/ui/fab/index.js';
import { Pressable } from 'react-native';
import '../../../apps/mobile/src/ui/form-control/index.js';
import '../../../apps/mobile/src/ui/gluestack-ui-provider/config.js';
import '@gluestack-ui/core/overlay/creator';
import '@gluestack-ui/core/toast/creator';
import 'nativewind';
import '../../../apps/mobile/src/ui/grid/index.js';
import '../../../apps/mobile/src/ui/heading/index.js';
import '../../../apps/mobile/src/ui/hstack/index.js';
import '../../../apps/mobile/src/ui/icon/index.js';
import '../../../apps/mobile/src/ui/image/index.js';
import '../../../apps/mobile/src/ui/image-background/index.js';
import '../../../apps/mobile/src/ui/input/index.js';
import '../../../apps/mobile/src/ui/link/index.js';
import '../../../apps/mobile/src/ui/menu/index.js';
import '../../../apps/mobile/src/ui/modal/index.js';
import '../../../apps/mobile/src/ui/popover/index.js';
import '../../../apps/mobile/src/ui/portal/index.js';
import '../../../apps/mobile/src/ui/pressable/index.js';
import '../../../apps/mobile/src/ui/progress/index.js';
import '../../../apps/mobile/src/ui/radio/index.js';
import 'react-native-safe-area-context';
import '../../../apps/mobile/src/ui/select/index.js';
import '../../../apps/mobile/src/ui/skeleton/index.js';
import '../../../apps/mobile/src/ui/slider/index.js';
import '../../../apps/mobile/src/ui/spinner/index.js';
import '../../../apps/mobile/src/ui/switch/index.js';
import '../../../apps/mobile/src/ui/table/index.js';
import '../../../apps/mobile/src/ui/text/index.js';
import '../../../apps/mobile/src/ui/textarea/index.js';
import '../../../apps/mobile/src/ui/toast/index.js';
import '../../../apps/mobile/src/ui/tooltip/index.js';
import '../../../apps/mobile/src/ui/vstack/index.js';
import 'react-native-reanimated';
import 'react-icons/fa';
import 'react-icons/ai';
import 'react-icons/io';
import '../../../packages/types/src/Components/Molecules/Form/FilePicker/types/filesTypes.js';
import 'yup';
import '../../../packages/types/src/Css/map/index.js';
import 'i18next';
import 'react-i18next';
import '../../../apps/mobile/src/Core/AutoComplete/index.js';
import '../../../apps/mobile/src/Core/Dropdown/index.js';
import '../../../apps/mobile/src/Core/MultiSelect/index.js';
import CoreTree from '../../../apps/mobile/src/Core/Trees/components/CoreTree.js';
import '../../../apps/mobile/src/Core/Trees/components/CoreTreeSelect.js';
import '../../../apps/mobile/src/Core/Trees/components/CoreToolbar.js';
import '../../../apps/mobile/src/Core/Paginator/index.js';
import 'lucide-react-native';
import '../../../apps/mobile/src/Core/SelectButton/index.js';
import '../../../apps/mobile/src/Core/DataTable/DataTable.js';
import '../../../apps/mobile/src/Core/Tag/index.js';
import '../../../apps/mobile/src/Core/Badge/index.js';
import '../../../apps/mobile/src/Core/ProgressBar/index.js';
import '../../../apps/mobile/src/Core/Checkbox/index.js';
import '../../../apps/mobile/src/Core/RadioButton/index.js';
import { useTreeViewController } from './useTreeViewController.js';
import TreeViewToolbar from './Toolbar/index.js';
import Flex from '../../Molecules/UI/Flex/index.js';
import Text from '../../Molecules/UI/Text/index.js';

const TreeView = (props) => {
  const {
    selectedNode,
    filterValue,
    build,
    setFilterValue,
    expandAll,
    collapseAll,
    operations,
    treeProps
  } = useTreeViewController(props);
  const {
    nodeTemplate,
    containerProps,
    hideSearchBox,
    hideDisabledButton,
    expendableControls,
    hideToolbar: propsHideToolbar
  } = props;
  const treeRef = useRef(null);
  const shouldHideToolbar = propsHideToolbar || !!hideSearchBox && !!hideDisabledButton && !expendableControls;
  return /* @__PURE__ */ jsxs(
    Flex,
    {
      id: "tree-view",
      w: "full",
      h: "full",
      flexDirection: "column",
      ...containerProps,
      children: [
        !shouldHideToolbar && /* @__PURE__ */ jsx(
          TreeViewToolbar,
          {
            props,
            filterValue,
            setFilterValue,
            treeRef: treeRef.current,
            selectedNode,
            expandAll,
            collapseAll,
            onAddNode: operations.onAddNode,
            onAddNodeItem: operations.onAddNodeItem,
            onDeleteNode: operations.onDeleteNode,
            onEditNode: operations.onEditNode,
            build
          }
        ),
        /* @__PURE__ */ jsx(
          CoreTree,
          {
            ref: treeRef,
            ...treeProps,
            filterValue,
            filterMode: "lenient",
            nodeTemplate: (node, options) => {
              const isSelected = node.key == selectedNode?.key;
              return /* @__PURE__ */ jsx(
                Pressable,
                {
                  onPress: () => {
                    if (treeProps.onNodeClick) {
                      treeProps.onNodeClick({
                        node,
                        originalEvent: {}
                      });
                    }
                  },
                  style: {
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center",
                    minHeight: 40,
                    paddingHorizontal: 4,
                    backgroundColor: isSelected ? "#e3f2fd" : "transparent",
                    borderRadius: 4
                  },
                  children: !!nodeTemplate ? nodeTemplate(node, options) : /* @__PURE__ */ jsx(
                    Text,
                    {
                      fontWeight: isSelected ? "bold" : "normal",
                      children: node.label
                    }
                  )
                }
              );
            }
          }
        )
      ]
    }
  );
};

export { TreeView as default };
//# sourceMappingURL=index.js.map
