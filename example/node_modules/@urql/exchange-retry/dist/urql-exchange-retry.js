var r = require("wonka");

var e = require("@urql/core");

function _extends() {
  return (_extends = Object.assign || function(r) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var a in t) {
        if (Object.prototype.hasOwnProperty.call(t, a)) {
          r[a] = t[a];
        }
      }
    }
    return r;
  }).apply(this, arguments);
}

exports.retryExchange = function retryExchange(t) {
  var a = t.retryIf;
  var n = t.retryWith;
  var o = t.initialDelayMs || 1e3;
  var i = t.maxDelayMs || 15e3;
  var u = t.maxNumberAttempts || 2;
  var s = t.randomDelay || !0;
  return function(t) {
    var c = t.forward;
    var y = t.dispatchDebug;
    return function(t) {
      var v = r.share(t);
      var p = r.makeSubject();
      var f = p.source;
      var d = p.next;
      var h = r.mergeMap((function(t) {
        var a = t.key;
        var n = t.context;
        var c = (n.retryCount || 0) + 1;
        var p = n.retryDelay || o;
        var f = Math.random() + 1.5;
        if (s && p * f < i) {
          p *= f;
        }
        var d = r.filter((function(r) {
          return ("query" === r.kind || "teardown" === r.kind) && r.key === a;
        }))(v);
        "production" !== process.env.NODE_ENV && y({
          type: "retryAttempt",
          message: "The operation has failed and a retry has been triggered (" + c + " / " + u + ")",
          operation: t,
          data: {
            retryCount: c
          },
          source: "retryExchange"
        });
        return r.takeUntil(d)(r.delay(p)(r.fromValue(e.makeOperation(t.kind, t, _extends({}, t.context, {
          retryDelay: p,
          retryCount: c
        })))));
      }))(f);
      return r.filter((function(r) {
        if (!(r.error && (a ? a(r.error, r.operation) : n || r.error.networkError))) {
          return !0;
        }
        if (!((r.operation.context.retryCount || 0) >= u - 1)) {
          var e = n ? n(r.error, r.operation) : r.operation;
          if (!e) {
            return !0;
          }
          d(e);
          return !1;
        }
        "production" !== process.env.NODE_ENV && y({
          type: "retryExhausted",
          message: "Maximum number of retries has been reached. No further retries will be performed.",
          operation: r.operation,
          source: "retryExchange"
        });
        return !0;
      }))(r.share(c(r.merge([ v, h ]))));
    };
  };
};
//# sourceMappingURL=urql-exchange-retry.js.map
