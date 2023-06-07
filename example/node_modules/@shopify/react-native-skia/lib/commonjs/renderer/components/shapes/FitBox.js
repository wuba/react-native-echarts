"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fitbox = exports.FitBox = void 0;

var _react = _interopRequireWildcard(require("react"));

var _nodes = require("../../../dom/nodes");

var _Group = require("../Group");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const fitbox = (fit, src, dst) => {
  const rects = (0, _nodes.fitRects)(fit, src, dst);
  return (0, _nodes.rect2rect)(rects.src, rects.dst);
};

exports.fitbox = fitbox;

const FitBox = _ref => {
  let {
    fit = "contain",
    src,
    dst,
    children
  } = _ref;
  const transform = (0, _react.useMemo)(() => fitbox(fit, src, dst), [dst, fit, src]);
  return /*#__PURE__*/_react.default.createElement(_Group.Group, {
    transform: transform
  }, children);
};

exports.FitBox = FitBox;
//# sourceMappingURL=FitBox.js.map