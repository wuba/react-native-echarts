"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.downloadAndUnzip = void 0;
function _cliTools() {
  const data = require("@react-native-community/cli-tools");
  _cliTools = function () {
    return data;
  };
  return data;
}
var _unzip = require("./unzip");
var _deleteFile = require("./deleteFile");
/**
 * Downloads `downloadUrl` and unzips the contents to `installPath` while
 * updating the message of `loader` at each step.
 */
const downloadAndUnzip = async ({
  loader,
  downloadUrl,
  component,
  installPath
}) => {
  loader.start(`Downloading ${component} from "${downloadUrl}" (this may take a few minutes)`);
  const installer = await (0, _cliTools().fetchToTemp)(downloadUrl);
  loader.text = `Installing ${component} in "${installPath}"`;
  try {
    await (0, _unzip.unzip)(installer, installPath);
  } finally {
    await (0, _deleteFile.deleteFile)(installer);
  }
};
exports.downloadAndUnzip = downloadAndUnzip;

//# sourceMappingURL=downloadAndUnzip.js.map