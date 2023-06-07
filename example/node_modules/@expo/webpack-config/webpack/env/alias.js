"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAliases = void 0;
const resolve_from_1 = __importDefault(require("resolve-from"));
function getAliases(projectRoot) {
    // Even if the module isn't installed, react-native should be aliased to react-native-web for better errors.
    const aliases = {
        // Alias direct react-native imports to react-native-web
        'react-native$': 'react-native-web',
        // Alias internal react-native modules to react-native-web
        'react-native/Libraries/Components/View/ViewStylePropTypes$': 'react-native-web/dist/exports/View/ViewStylePropTypes',
        'react-native/Libraries/EventEmitter/RCTDeviceEventEmitter$': 'react-native-web/dist/vendor/react-native/NativeEventEmitter/RCTDeviceEventEmitter',
        'react-native/Libraries/vendor/emitter/EventEmitter$': 'react-native-web/dist/vendor/react-native/emitter/EventEmitter',
        'react-native/Libraries/vendor/emitter/EventSubscriptionVendor$': 'react-native-web/dist/vendor/react-native/emitter/EventSubscriptionVendor',
        'react-native/Libraries/EventEmitter/NativeEventEmitter$': 'react-native-web/dist/vendor/react-native/NativeEventEmitter',
    };
    // TODO: Drop this...
    // Check if the installed version of react-native-web still supports NetInfo.
    if (resolve_from_1.default.silent(projectRoot, 'react-native-web/dist/exports/NetInfo')) {
        aliases['@react-native-community/netinfo'] = 'react-native-web/dist/exports/NetInfo';
    }
    return aliases;
}
exports.getAliases = getAliases;
//# sourceMappingURL=alias.js.map