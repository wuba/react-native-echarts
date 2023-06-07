"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setProgressBar = setProgressBar;
exports.getProgressBar = getProgressBar;
exports.createProgressBar = createProgressBar;
var _progress = _interopRequireDefault(require("progress"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
let currentProgress = null;
function setProgressBar(bar) {
    currentProgress = bar;
}
function getProgressBar() {
    return currentProgress;
}
function createProgressBar(barFormat, options) {
    if (process.stderr.clearLine == null) {
        return null;
    }
    const bar = new _progress.default(barFormat, options);
    const logReal = console.log;
    const infoReal = console.info;
    const warnReal = console.warn;
    const errorReal = console.error;
    const wrapNativeLogs = ()=>{
        // @ts-expect-error
        console.log = (...args)=>bar.interrupt(...args)
        ;
        // @ts-expect-error
        console.info = (...args)=>bar.interrupt(...args)
        ;
        // @ts-expect-error
        console.warn = (...args)=>bar.interrupt(...args)
        ;
        // @ts-expect-error
        console.error = (...args)=>bar.interrupt(...args)
        ;
    };
    const resetNativeLogs = ()=>{
        console.log = logReal;
        console.info = infoReal;
        console.warn = warnReal;
        console.error = errorReal;
    };
    const originalTerminate = bar.terminate.bind(bar);
    bar.terminate = ()=>{
        resetNativeLogs();
        setProgressBar(null);
        originalTerminate();
    };
    wrapNativeLogs();
    setProgressBar(bar);
    return bar;
}

//# sourceMappingURL=progress.js.map