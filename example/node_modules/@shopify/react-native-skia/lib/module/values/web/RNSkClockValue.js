function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { RNSkReadonlyValue } from "./RNSkReadonlyValue";
var RNSkClockState;

(function (RNSkClockState) {
  RNSkClockState[RNSkClockState["NotStarted"] = 0] = "NotStarted";
  RNSkClockState[RNSkClockState["Running"] = 1] = "Running";
  RNSkClockState[RNSkClockState["Stopped"] = 2] = "Stopped";
})(RNSkClockState || (RNSkClockState = {}));

export class RNSkClockValue extends RNSkReadonlyValue {
  constructor(raf) {
    super(0);

    _defineProperty(this, "_raf", void 0);

    _defineProperty(this, "_start", void 0);

    _defineProperty(this, "_stop", void 0);

    _defineProperty(this, "_state", RNSkClockState.NotStarted);

    _defineProperty(this, "notifyUpdate", _ => {
      if (this._state === RNSkClockState.Running) {
        const now = Date.now();
        const deltaFromStart = now - this._start;
        this.tick(deltaFromStart);

        this._raf(this.notifyUpdate);
      }
    });

    this._raf = raf;
    this.update(0);
  }

  tick(value) {
    this.update(value);
  }

  start() {
    if (this._state === RNSkClockState.NotStarted) {
      this._start = Date.now();
      this._stop = this._start;
    } // Subtract pause time from start


    const timeSinceStop = Date.now() - this._stop;

    this._start += timeSinceStop;
    this._state = RNSkClockState.Running;

    this._raf(this.notifyUpdate);
  }

  stop() {
    if (this._state === RNSkClockState.Running) {
      this._state = RNSkClockState.Stopped;
      this._stop = Date.now();
    }
  }

}
//# sourceMappingURL=RNSkClockValue.js.map