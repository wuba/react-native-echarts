import { share as r, makeSubject as e, mergeMap as t, filter as n, takeUntil as a, delay as o, fromValue as i, merge as u } from "wonka";

import { makeOperation as c } from "@urql/core";

function _extends() {
  return (_extends = Object.assign || function(r) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var n in t) {
        if (Object.prototype.hasOwnProperty.call(t, n)) {
          r[n] = t[n];
        }
      }
    }
    return r;
  }).apply(this, arguments);
}

function retryExchange(s) {
  var y = s.retryIf;
  var p = s.retryWith;
  var v = s.initialDelayMs || 1e3;
  var f = s.maxDelayMs || 15e3;
  var d = s.maxNumberAttempts || 2;
  var h = s.randomDelay || !0;
  return function(s) {
    var m = s.forward;
    var x = s.dispatchDebug;
    return function(s) {
      var l = r(s);
      var g = e();
      var E = g.source;
      var b = g.next;
      var D = t((function(r) {
        var e = r.key;
        var t = r.context;
        var u = (t.retryCount || 0) + 1;
        var s = t.retryDelay || v;
        var y = Math.random() + 1.5;
        if (h && s * y < f) {
          s *= y;
        }
        var p = n((function(r) {
          return ("query" === r.kind || "teardown" === r.kind) && r.key === e;
        }))(l);
        "production" !== process.env.NODE_ENV && x({
          type: "retryAttempt",
          message: "The operation has failed and a retry has been triggered (" + u + " / " + d + ")",
          operation: r,
          data: {
            retryCount: u
          },
          source: "retryExchange"
        });
        return a(p)(o(s)(i(c(r.kind, r, _extends({}, r.context, {
          retryDelay: s,
          retryCount: u
        })))));
      }))(E);
      return n((function(r) {
        if (!(r.error && (y ? y(r.error, r.operation) : p || r.error.networkError))) {
          return !0;
        }
        if (!((r.operation.context.retryCount || 0) >= d - 1)) {
          var e = p ? p(r.error, r.operation) : r.operation;
          if (!e) {
            return !0;
          }
          b(e);
          return !1;
        }
        "production" !== process.env.NODE_ENV && x({
          type: "retryExhausted",
          message: "Maximum number of retries has been reached. No further retries will be performed.",
          operation: r.operation,
          source: "retryExchange"
        });
        return !0;
      }))(r(m(u([ l, D ]))));
    };
  };
}

export { retryExchange };
//# sourceMappingURL=urql-exchange-retry.mjs.map
