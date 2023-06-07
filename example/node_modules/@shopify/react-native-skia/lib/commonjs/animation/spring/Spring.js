"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Spring = void 0;

/*
  Spring animation configurations
*/
const Config = {
  Gentle: {
    mass: 1,
    stiffness: 170,
    damping: 19,
    velocity: 0
  },
  Wobbly: {
    mass: 1,
    stiffness: 180,
    damping: 12,
    velocity: 0
  },
  WobblySlow: {
    mass: 4,
    stiffness: 180,
    damping: 25,
    velocity: 0
  },
  Stiff: {
    mass: 1,
    stiffness: 200,
    damping: 20,
    velocity: 0
  },
  Default: {
    mass: 1,
    stiffness: 100,
    damping: 10,
    velocity: 0
  }
};
const Spring = {
  Config,
  Gentle: function () {
    let config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return { ...Config.Gentle,
      ...config
    };
  },
  Wobbly: function () {
    let config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return { ...Config.Wobbly,
      ...config
    };
  },
  WobblySlow: function () {
    let config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return { ...Config.WobblySlow,
      ...config
    };
  },
  Stiff: function () {
    let config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return { ...Config.Stiff,
      ...config
    };
  },
  Default: function () {
    let config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return { ...Config.Default,
      ...config
    };
  }
};
exports.Spring = Spring;
//# sourceMappingURL=Spring.js.map