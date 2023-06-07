function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { RNSkReadonlyValue } from "./RNSkReadonlyValue";
export class RNSkValue extends RNSkReadonlyValue {
  constructor(value) {
    super(value);

    _defineProperty(this, "_unsubscribe", void 0);

    _defineProperty(this, "_animation", void 0);

    this._unsubscribe = undefined;
  }

  set current(value) {
    this.update(value);
  }

  get current() {
    return super.current;
  }

  unsubscribe() {
    if (this._unsubscribe) {
      this._unsubscribe();

      this._unsubscribe = undefined;
    }

    if (this._animation) {
      this._animation.cancel();

      this._animation = undefined;
    }
  }

  subscribe(animation) {
    this.unsubscribe();

    if (animation) {
      this._animation = animation;
      this._unsubscribe = animation.addListener( // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.animationDidUpdate.bind(this));

      this._animation.start();
    }
  }

  animationDidUpdate(value) {
    this.update(value);
  }

  get animation() {
    return this._animation;
  }

  set animation(v) {
    this.subscribe(v);
  }

}
//# sourceMappingURL=RNSkValue.js.map