function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

export class NotImplementedOnRNWeb extends Error {
  constructor(msg) {
    super(msg !== null && msg !== void 0 ? msg : "Not implemented on React Native Web");
  }

}
export class Host {
  constructor(CanvasKit) {
    _defineProperty(this, "CanvasKit", void 0);

    this.CanvasKit = CanvasKit;
  }

}
export class BaseHostObject extends Host {
  constructor(CanvasKit, ref, typename) {
    super(CanvasKit);

    _defineProperty(this, "__typename__", void 0);

    _defineProperty(this, "ref", void 0);

    this.ref = ref;
    this.__typename__ = typename;
  }

}
export class HostObject extends BaseHostObject {
  static fromValue(value) {
    return value.ref;
  }

}
export const ckEnum = value => ({
  value
});
export const optEnum = value => value === undefined ? undefined : {
  value
};
//# sourceMappingURL=Host.js.map