'use strict';

var fa = require('react-icons/fa');
var ai = require('react-icons/ai');
var io = require('react-icons/io');

const fileTypeIcon = {
  pdf: fa.FaFilePdf,
  mp3: fa.FaFileAudio,
  wav: fa.FaFileAudio,
  csv: fa.FaFileCsv,
  png: fa.FaFileImage,
  jpg: fa.FaFileImage,
  jpeg: fa.FaFileImage,
  gif: fa.FaFileImage,
  js: io.IoLogoJavascript,
  unknown: ai.AiFillFileUnknown
};

exports.fileTypeIcon = fileTypeIcon;
//# sourceMappingURL=filesIcons.cjs.map
