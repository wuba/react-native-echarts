"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.optEnum = exports.ckEnum = exports.NotImplementedOnRNWeb = exports.HostObject = exports.Host = exports.BaseHostObject = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class NotImplementedOnRNWeb extends Error {
  constructor(msg) {
    super(msg ?? "Not implemented on React Native Web");
  }

}

exports.NotImplementedOnRNWeb = NotImplementedOnRNWeb;

class Host {
  constructor(CanvasKit) {
    _defineProperty(this, "CanvasKit", void 0);

    this.CanvasKit = CanvasKit;
  }

}

exports.Host = Host;

class BaseHostObject extends Host {
  constructor(CanvasKit, ref, typename) {
    super(CanvasKit);

    _defineProperty(this, "__typename__", void 0);

    _defineProperty(this, "ref", void 0);

    this.ref = ref;
    this.__typename__ = typename;
  }

}

exports.BaseHostObject = BaseHostObject;

class HostObject extends BaseHostObject {
  static fromValue(value) {
    return value.ref;
  }

}

exports.HostObject = HostObject;

const ckEnum = value => ({
  value
});

exports.ckEnum = ckEnum;

const optEnum = value => value === undefined ? undefined : {
  value
};

exports.optEnum = optEnum;
//# sourceMappingURL=Host.js.map