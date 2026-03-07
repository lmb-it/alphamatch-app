import 'react-icons/fa';
import 'react-icons/ai';
import 'react-icons/io';
import '../../../../packages/types/src/Components/Molecules/Form/FilePicker/types/filesTypes.js';
import 'yup';
import allProperties from '../../../../packages/types/src/Css/map/index.js';

const split = (props) => {
  const cssProps = {};
  const nativeProps = {};
  for (const key in props) {
    if (key in allProperties) {
      cssProps[key] = props[key];
    } else {
      nativeProps[key] = props[key];
    }
  }
  return { cssProps, nativeProps };
};
const useSeparator = (props) => {
  return split(props);
};

export { useSeparator as default, split, useSeparator };
//# sourceMappingURL=useSeparator.js.map
