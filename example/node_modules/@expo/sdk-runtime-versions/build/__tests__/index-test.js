"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
describe(index_1.getRuntimeVersionForSDKVersion, function () {
    test.each([
        ['39.0.0', 'exposdk:39.0.0'],
        ['fake', 'exposdk:fake'],
    ])('case %p', function (sdkVersion, expectedRuntimeVersion) {
        expect(index_1.getRuntimeVersionForSDKVersion(sdkVersion)).toEqual(expectedRuntimeVersion);
    });
});
describe(index_1.getSDKVersionFromRuntimeVersion, function () {
    test.each([
        ['exposdk:39.0.0', '39.0.0'],
        ['exposdk:123', undefined],
        ['exposdkd:39.0.0', undefined],
        ['exposdk:hello', undefined],
        ['bexposdk:39.0.0', undefined],
        ['exposdk:39.0.0-beta.0', undefined],
        ['exposdk:39.0.0-alpha.256', undefined],
    ])('case %p', function (runtimeVersion, expectedSDKVersion) {
        expect(index_1.getSDKVersionFromRuntimeVersion(runtimeVersion)).toEqual(expectedSDKVersion);
        expect(index_1.isSDKVersionRuntimeVersion(runtimeVersion)).toEqual(!!expectedSDKVersion);
    });
});
//# sourceMappingURL=index-test.js.map