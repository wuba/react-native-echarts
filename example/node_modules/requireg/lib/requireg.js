var fs   = require('fs')
var path = require('path')
var resolvers = require('./resolvers')
var NestedError = require('nested-error-stacks')

'use strict';

module.exports = requireg

function requireg(module, onlyGlobal) {
  try {
    return require(resolve(module, undefined, onlyGlobal))
  } catch (e) {
    throw new NestedError("Could not require module '"+ module +"'", e)
  }
}

requireg.resolve = resolve

requireg.globalize = function () {
  global.requireg = requireg
}

function resolve(module, dirname, onlyGlobal) {
  var i, l, resolver, modulePath

  for (i = (onlyGlobal ? 1 : 0), l = resolvers.length; i < l; i += 1) {
    resolver = resolvers[i]
    if (modulePath = resolver(module, dirname)) {
      break
    }
  }

  return modulePath
}
