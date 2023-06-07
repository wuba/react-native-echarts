"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getPlatformBundlers = getPlatformBundlers;
function getPlatformBundlers(exp) {
    var ref, ref1, ref2;
    var ref3, ref4, ref5;
    return {
        // @ts-expect-error: not on type yet
        ios: (ref3 = (ref = exp.ios) == null ? void 0 : ref.bundler) != null ? ref3 : "metro",
        // @ts-expect-error: not on type yet
        android: (ref4 = (ref1 = exp.android) == null ? void 0 : ref1.bundler) != null ? ref4 : "metro",
        web: (ref5 = (ref2 = exp.web) == null ? void 0 : ref2.bundler) != null ? ref5 : "webpack"
    };
}

//# sourceMappingURL=platformBundlers.js.map