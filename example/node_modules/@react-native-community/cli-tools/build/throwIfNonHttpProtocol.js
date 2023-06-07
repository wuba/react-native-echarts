"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = throwIfNonHttpProtocol;
/**
 * Check if a string is an http/https url
 */
function throwIfNonHttpProtocol(url) {
  const _url = new URL(url);
  const urlProtocol = _url.protocol;
  const expectedProtocol = {
    [urlProtocol]: false,
    'http:': true,
    'https:': true
  };
  const isFromExpectedProtocol = expectedProtocol[urlProtocol];
  if (!isFromExpectedProtocol) {
    throw new Error('invalid url, missing http/https protocol');
  }
}

//# sourceMappingURL=throwIfNonHttpProtocol.js.map