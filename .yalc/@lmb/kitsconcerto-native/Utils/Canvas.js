import { Platform } from 'react-native';

const downloadCanvas = (content, filename, type) => {
  if (Platform.OS == "web") {
    const link = document.createElement("a");
    link.href = content.toDataURL(type, 1);
    link.download = filename;
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

export { downloadCanvas };
//# sourceMappingURL=Canvas.js.map
