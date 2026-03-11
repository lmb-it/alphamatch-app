import { FaFileImage, FaFileCsv, FaFileAudio, FaFilePdf } from 'react-icons/fa';
import { AiFillFileUnknown } from 'react-icons/ai';
import { IoLogoJavascript } from 'react-icons/io';

const fileTypeIcon = {
  pdf: FaFilePdf,
  mp3: FaFileAudio,
  wav: FaFileAudio,
  csv: FaFileCsv,
  png: FaFileImage,
  jpg: FaFileImage,
  jpeg: FaFileImage,
  gif: FaFileImage,
  js: IoLogoJavascript,
  unknown: AiFillFileUnknown
};

export { fileTypeIcon };
//# sourceMappingURL=filesIcons.js.map
