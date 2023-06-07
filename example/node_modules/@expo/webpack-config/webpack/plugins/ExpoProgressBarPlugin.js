"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const webpack_1 = __importDefault(require("webpack"));
class WebpackBar extends webpack_1.default.ProgressPlugin {
    constructor(props) {
        super(percentage => {
            const { buildID } = this;
            if (percentage === 1) {
                this.sendEvent('bundle_build_done', { percentage, buildID });
            }
            else if (percentage === 0) {
                this.sendEvent('bundle_build_started', {
                    percentage,
                    buildID,
                    bundleDetails: props.bundleDetails,
                });
            }
            else {
                this.sendEvent('bundle_transform_progressed', { percentage, buildID });
            }
        });
        this.props = props;
        this.sendEvent = (name, props) => {
            this.props.logger.info({ tag: 'metro' }, JSON.stringify({
                tag: 'metro',
                id: Date.now(),
                shouldHide: false,
                type: name,
                ...props,
            }));
        };
        // Add some offset from Metro
        this._nextBundleBuildID = 999;
        this.buildID = '';
    }
    getNewBuildID() {
        return (this._nextBundleBuildID++).toString(36);
    }
    apply(compiler) {
        this.buildID = this.getNewBuildID();
        super.apply(compiler);
        // "invalid" event fires when you have changed a file, and Webpack is
        // recompiling a bundle. WebpackDevServer takes care to pause serving the
        // bundle, so if you refresh, it'll wait instead of serving the old one.
        // "invalid" is short for "bundle invalidated", it doesn't imply any errors.
        compiler.hooks.invalid.tap('invalid', () => {
            this.props.bundleDetails.bundleType = 'hmr';
        });
        compiler.hooks.done.tap('done', async (stats) => {
            var _a;
            const statsData = stats.toJson({
                all: false,
                warnings: true,
                errors: true,
            });
            if (stats.hasErrors()) {
                const metroErrors = statsData.errors.map(error => {
                    return {
                        message: error,
                        name: 'WebpackError',
                    };
                });
                this.sendEvent('bundle_build_failed', {
                    buildID: this.buildID,
                    bundleOptions: this.props.bundleDetails,
                });
                for (const error of metroErrors) {
                    this.sendEvent('bundling_error', {
                        error,
                    });
                }
                return;
            }
            // Show warnings if no errors were found.
            if ((_a = statsData.warnings) === null || _a === void 0 ? void 0 : _a.length) {
                for (const warning of statsData.warnings) {
                    this.sendEvent('bundling_warning', {
                        warning,
                    });
                }
            }
        });
    }
}
exports.default = WebpackBar;
//# sourceMappingURL=ExpoProgressBarPlugin.js.map