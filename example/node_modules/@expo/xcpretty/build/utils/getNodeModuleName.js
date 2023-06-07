"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNodeModuleName = void 0;
function moduleNameFromPath(modulePath) {
    if (modulePath.startsWith('@')) {
        const [org, packageName] = modulePath.split('/');
        if (org && packageName) {
            return [org, packageName].join('/');
        }
        return modulePath;
    }
    const [packageName] = modulePath.split('/');
    return packageName ? packageName : modulePath;
}
function getNodeModuleName(filePath) {
    // '/Users/evanbacon/Documents/GitHub/lab/yolo5/node_modules/react-native-reanimated/ios/Nodes/REACallFuncNode.m'
    const [, modulePath] = filePath.split('/node_modules/');
    if (modulePath) {
        return moduleNameFromPath(modulePath);
    }
    return null;
}
exports.getNodeModuleName = getNodeModuleName;
//# sourceMappingURL=getNodeModuleName.js.map