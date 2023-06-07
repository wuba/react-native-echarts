"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.assertSystemRequirementsAsync = assertSystemRequirementsAsync;
var _simulatorAppPrerequisite = require("../../doctor/apple/SimulatorAppPrerequisite");
var _xcodePrerequisite = require("../../doctor/apple/XcodePrerequisite");
var _xcrunPrerequisite = require("../../doctor/apple/XcrunPrerequisite");
async function assertSystemRequirementsAsync() {
    // Order is important
    await _xcodePrerequisite.XcodePrerequisite.instance.assertAsync();
    await _xcrunPrerequisite.XcrunPrerequisite.instance.assertAsync();
    await _simulatorAppPrerequisite.SimulatorAppPrerequisite.instance.assertAsync();
}

//# sourceMappingURL=assertSystemRequirements.js.map