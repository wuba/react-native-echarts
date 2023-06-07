"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extractComponentDescriptors = extractComponentDescriptors;
// TODO: avoid the regex and improve reliability by reading this data from codegen schema.json.
// Need to find a way to run "generateNewArchitectureFiles" gradle task after each library's "generateCodegenSchemaFromJavaScript" task.
const CODEGEN_NATIVE_COMPONENT_REGEX = /codegenNativeComponent(<.*>)?\s*\(\s*["'`](\w+)["'`](,?[\s\S]+interfaceOnly:\s*(\w+))?/m;
function extractComponentDescriptors(contents) {
  const match = contents.match(CODEGEN_NATIVE_COMPONENT_REGEX);
  if (!((match === null || match === void 0 ? void 0 : match[4]) === 'true') && (match === null || match === void 0 ? void 0 : match[2])) {
    return `${match[2]}ComponentDescriptor`;
  }
  return null;
}

//# sourceMappingURL=extractComponentDescriptors.js.map