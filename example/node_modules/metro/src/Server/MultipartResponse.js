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

const accepts = require("accepts");
const CRLF = "\r\n";
const BOUNDARY = "3beqjf3apnqeu3h5jqorms4i";
class MultipartResponse {
  static wrapIfSupported(req, res) {
    if (accepts(req).types().includes("multipart/mixed")) {
      return new MultipartResponse(res);
    }
    return res;
  }
  static serializeHeaders(headers) {
    return Object.keys(headers)
      .map((key) => `${key}: ${headers[key]}`)
      .join(CRLF);
  }
  constructor(res) {
    this.res = res;
    this.headers = {};
    res.writeHead(200, {
      "Content-Type": `multipart/mixed; boundary="${BOUNDARY}"`,
    });
    res.write(
      "If you are seeing this, your client does not support multipart response"
    );
  }
  writeChunk(headers, data, isLast = false) {
    if (this.res.finished) {
      return;
    }
    this.res.write(`${CRLF}--${BOUNDARY}${CRLF}`);
    if (headers) {
      this.res.write(MultipartResponse.serializeHeaders(headers) + CRLF + CRLF);
    }
    if (data != null) {
      this.res.write(data);
    }
    if (isLast) {
      this.res.write(`${CRLF}--${BOUNDARY}--${CRLF}`);
    }
  }
  writeHead(status, headers) {
    // We can't actually change the response HTTP status code
    // because the headers have already been sent
    this.setHeader("X-Http-Status", status);
    if (!headers) {
      return;
    }
    for (const key in headers) {
      this.setHeader(key, headers[key]);
    }
  }
  setHeader(name, value) {
    this.headers[name] = value;
  }
  end(data) {
    this.writeChunk(this.headers, data, true);
    this.res.end();
  }
}
module.exports = MultipartResponse;
