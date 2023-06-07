"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function _chalk() {
  const data = _interopRequireDefault(require("chalk"));
  _chalk = function () {
    return data;
  };
  return data;
}
function _cliTools() {
  const data = require("@react-native-community/cli-tools");
  _cliTools = function () {
    return data;
  };
  return data;
}
var _healthchecks = require("../tools/healthchecks");
var _printFixOptions = _interopRequireWildcard(require("../tools/printFixOptions"));
var _runAutomaticFix = _interopRequireWildcard(require("../tools/runAutomaticFix"));
var _envinfo = _interopRequireDefault(require("../tools/envinfo"));
var _common = require("../tools/healthchecks/common");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const printCategory = ({
  label,
  key
}) => {
  if (key > 0) {
    _cliTools().logger.log();
  }
  _cliTools().logger.log(_chalk().default.dim(label));
};
const printVersions = ({
  version,
  versions,
  versionRange
}) => {
  if (versions) {
    const versionsToShow = Array.isArray(versions) ? versions.join(', ') : 'N/A';
    (0, _common.logMessage)(`- Versions found: ${_chalk().default.red(versionsToShow)}`);
    (0, _common.logMessage)(`- Version supported: ${_chalk().default.green(versionRange)}`);
    return;
  }
  const versionsToShow = version && version !== 'Not Found' ? version : 'N/A';
  (0, _common.logMessage)(`- Version found: ${_chalk().default.red(versionsToShow)}`);
  (0, _common.logMessage)(`- Version supported: ${_chalk().default.green(versionRange)}`);
  return;
};
const printIssue = ({
  label,
  needsToBeFixed,
  version,
  versions,
  versionRange,
  isRequired,
  description
}) => {
  const symbol = needsToBeFixed ? isRequired ? _chalk().default.red('✖') : _chalk().default.yellow('●') : _chalk().default.green('✓');
  const descriptionToShow = description ? ` - ${description}` : '';
  _cliTools().logger.log(` ${symbol} ${label}${descriptionToShow}`);
  if (needsToBeFixed && versionRange) {
    return printVersions({
      version,
      versions,
      versionRange
    });
  }
};
const printOverallStats = ({
  errors,
  warnings
}) => {
  _cliTools().logger.log(`\n${_chalk().default.bold('Errors:')}   ${errors}`);
  _cliTools().logger.log(`${_chalk().default.bold('Warnings:')} ${warnings}`);
};
/**
 * Given a `healthcheck` and a `platform`, returns the specific fix for
 * it or the fallback one if there is not one (`runAutomaticFix`).
 */
const getAutomaticFixForPlatform = (healthcheck, platform) => {
  switch (platform) {
    case 'win32':
      return healthcheck.win32AutomaticFix || healthcheck.runAutomaticFix;
    case 'darwin':
      return healthcheck.darwinAutomaticFix || healthcheck.runAutomaticFix;
    case 'linux':
      return healthcheck.linuxAutomaticFix || healthcheck.runAutomaticFix;
    default:
      return healthcheck.runAutomaticFix;
  }
};
const doctorCommand = async (_, options) => {
  const loader = (0, _cliTools().getLoader)();
  loader.start('Running diagnostics...');
  const environmentInfo = await (0, _envinfo.default)();
  const iterateOverHealthChecks = async ({
    label,
    healthchecks
  }) => ({
    label,
    healthchecks: (await Promise.all(healthchecks.map(async healthcheck => {
      if (healthcheck.visible === false) {
        return;
      }
      const {
        needsToBeFixed,
        version,
        versions,
        versionRange
      } = await healthcheck.getDiagnostics(environmentInfo);

      // Assume that it's required unless specified otherwise
      const isRequired = healthcheck.isRequired !== false;
      const isWarning = needsToBeFixed && !isRequired;
      return {
        label: healthcheck.label,
        needsToBeFixed: Boolean(needsToBeFixed),
        version,
        versions,
        versionRange,
        description: healthcheck.description,
        runAutomaticFix: getAutomaticFixForPlatform(healthcheck, process.platform),
        isRequired,
        type: needsToBeFixed ? isWarning ? _healthchecks.HEALTHCHECK_TYPES.WARNING : _healthchecks.HEALTHCHECK_TYPES.ERROR : undefined
      };
    }))).filter(healthcheck => healthcheck !== undefined)
  });

  // Remove all the categories that don't have any healthcheck with
  // `needsToBeFixed` so they don't show when the user taps to fix encountered
  // issues
  const removeFixedCategories = categories => categories.filter(category => category.healthchecks.some(healthcheck => healthcheck.needsToBeFixed));
  const iterateOverCategories = categories => Promise.all(categories.map(iterateOverHealthChecks));
  const healthchecksPerCategory = await iterateOverCategories(Object.values((0, _healthchecks.getHealthchecks)(options)).filter(category => category !== undefined));
  loader.stop();
  const stats = {
    errors: 0,
    warnings: 0
  };
  healthchecksPerCategory.forEach((issueCategory, key) => {
    printCategory({
      ...issueCategory,
      key
    });
    issueCategory.healthchecks.forEach(healthcheck => {
      printIssue(healthcheck);
      if (healthcheck.type === _healthchecks.HEALTHCHECK_TYPES.WARNING) {
        stats.warnings++;
        return;
      }
      if (healthcheck.type === _healthchecks.HEALTHCHECK_TYPES.ERROR) {
        stats.errors++;
        return;
      }
    });
  });
  printOverallStats(stats);
  if (options.fix) {
    return await (0, _runAutomaticFix.default)({
      healthchecks: removeFixedCategories(healthchecksPerCategory),
      automaticFixLevel: _runAutomaticFix.AUTOMATIC_FIX_LEVELS.ALL_ISSUES,
      stats,
      loader,
      environmentInfo
    });
  }
  const removeKeyPressListener = () => {
    if (typeof process.stdin.setRawMode === 'function') {
      process.stdin.setRawMode(false);
    }
    process.stdin.removeAllListeners('data');
  };
  const onKeyPress = async key => {
    if (key === _printFixOptions.KEYS.EXIT || key === '\u0003') {
      removeKeyPressListener();
      process.exit(0);
    }
    if ([_printFixOptions.KEYS.FIX_ALL_ISSUES, _printFixOptions.KEYS.FIX_ERRORS, _printFixOptions.KEYS.FIX_WARNINGS].includes(key)) {
      removeKeyPressListener();
      try {
        const automaticFixLevel = {
          [_printFixOptions.KEYS.FIX_ALL_ISSUES]: _runAutomaticFix.AUTOMATIC_FIX_LEVELS.ALL_ISSUES,
          [_printFixOptions.KEYS.FIX_ERRORS]: _runAutomaticFix.AUTOMATIC_FIX_LEVELS.ERRORS,
          [_printFixOptions.KEYS.FIX_WARNINGS]: _runAutomaticFix.AUTOMATIC_FIX_LEVELS.WARNINGS
        };
        await (0, _runAutomaticFix.default)({
          healthchecks: removeFixedCategories(healthchecksPerCategory),
          automaticFixLevel: automaticFixLevel[key],
          stats,
          loader,
          environmentInfo
        });
        process.exit(0);
      } catch (err) {
        // TODO: log error
        process.exit(1);
      }
    }
  };
  if (stats.errors || stats.warnings) {
    (0, _printFixOptions.default)({
      onKeyPress
    });
  }
};
var _default = {
  func: doctorCommand,
  detached: true,
  name: 'doctor',
  description: 'Diagnose and fix common Node.js, iOS, Android & React Native issues.',
  options: [{
    name: '--fix',
    description: 'Attempt to fix all diagnosed issues.'
  }, {
    name: '--contributor',
    description: 'Add healthchecks required to installations required for contributing to React Native.'
  }]
};
exports.default = _default;

//# sourceMappingURL=doctor.js.map