"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createShortcut = void 0;
function _fs() {
  const data = require("fs");
  _fs = function () {
    return data;
  };
  return data;
}
function _path() {
  const data = require("path");
  _path = function () {
    return data;
  };
  return data;
}
function _os() {
  const data = require("os");
  _os = function () {
    return data;
  };
  return data;
}
var _executeWinCommand = require("./executeWinCommand");
/**
 * Creates a script in the user's Startup menu
 */
const createShortcut = async ({
  path,
  name,
  ico
}) => {
  // prettier-ignore
  const script = `option explicit
sub createLnk()
    dim objShell, strStartMenuPath, objLink
    set objShell = CreateObject("WScript.Shell")
    strStartMenuPath = objShell.SpecialFolders("StartMenu")
    set objLink = objShell.CreateShortcut(strStartMenuPath + "\\" + "${name}.lnk")
    objLink.TargetPath = "${path}"
    objLink.IconLocation = "${ico}"
    objLink.Save
end sub

call createLnk()`;
  const scriptPath = (0, _path().join)((0, _os().tmpdir)(), `shortcut-${Math.random()}.vbs`);
  (0, _fs().writeFileSync)(scriptPath, script, 'utf-8');
  await (0, _executeWinCommand.executeCommand)(scriptPath);
};
exports.createShortcut = createShortcut;

//# sourceMappingURL=create-shortcut.js.map