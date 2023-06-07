/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 * @format
 * @oncall react_native
 */

"use strict";

const { add, add0, add1, neg } = require("ob1");
function shiftPositionByOffset(pos, offset) {
  return {
    ...pos,
    line: pos.line != null ? add(pos.line, offset.lines) : null,
    column: pos.column != null ? add(pos.column, offset.columns) : null,
  };
}
function subtractOffsetFromPosition(pos, offset) {
  if (pos.line === add1(offset.lines)) {
    return shiftPositionByOffset(pos, {
      lines: neg(offset.lines),
      columns: neg(offset.columns),
    });
  }
  return shiftPositionByOffset(pos, {
    lines: neg(offset.lines),
    columns: add0(0),
  });
}
module.exports = {
  shiftPositionByOffset,
  subtractOffsetFromPosition,
};
