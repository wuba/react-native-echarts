/**
 * Copyright (c) Nicolas Gallagher
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.styleq = void 0;
var cache = new WeakMap();
var compiledKey = '$$css';

function createStyleq(options) {
  var disableCache;
  var disableMix;
  var transform;

  if (options != null) {
    disableCache = options.disableCache === true;
    disableMix = options.disableMix === true;
    transform = options.transform;
  }

  return function styleq() {
    // Keep track of property commits to the className
    var definedProperties = []; // The className and inline style to build up

    var className = '';
    var inlineStyle = null; // The current position in the cache graph

    var nextCache = disableCache ? null : cache; // This way of creating an array from arguments is fastest

    var styles = new Array(arguments.length);

    for (var i = 0; i < arguments.length; i++) {
      styles[i] = arguments[i];
    } // Iterate over styles from last to first


    while (styles.length > 0) {
      var possibleStyle = styles.pop(); // Skip empty items

      if (possibleStyle == null || possibleStyle === false) {
        continue;
      } // Push nested styles back onto the stack to be processed


      if (Array.isArray(possibleStyle)) {
        for (var _i = 0; _i < possibleStyle.length; _i++) {
          styles.push(possibleStyle[_i]);
        }

        continue;
      } // Process an individual style object


      var style = transform != null ? transform(possibleStyle) : possibleStyle;

      if (style.$$css) {
        // Build up the class names defined by this object
        var classNameChunk = ''; // Check the cache to see if we've already done this work

        if (nextCache != null && nextCache.has(style)) {
          // Cache: read
          var cacheEntry = nextCache.get(style);

          if (cacheEntry != null) {
            classNameChunk = cacheEntry[0]; // $FlowIgnore

            definedProperties.push.apply(definedProperties, cacheEntry[1]);
            nextCache = cacheEntry[2];
          }
        } // Update the chunks with data from this object
        else {
          // The properties defined by this object
          var definedPropertiesChunk = [];

          for (var prop in style) {
            var value = style[prop];
            if (prop === compiledKey) continue; // Each property value is used as an HTML class name
            // { 'debug.string': 'debug.string', opacity: 's-jskmnoqp' }

            if (typeof value === 'string' || value === null) {
              // Only add to chunks if this property hasn't already been seen
              if (!definedProperties.includes(prop)) {
                definedProperties.push(prop);

                if (nextCache != null) {
                  definedPropertiesChunk.push(prop);
                }

                if (typeof value === 'string') {
                  classNameChunk += classNameChunk ? ' ' + value : value;
                }
              }
            } // If we encounter a value that isn't a string or `null`
            else {
              console.error("styleq: ".concat(prop, " typeof ").concat(String(value), " is not \"string\" or \"null\"."));
            }
          } // Cache: write


          if (nextCache != null) {
            // Create the next WeakMap for this sequence of styles
            var weakMap = new WeakMap();
            nextCache.set(style, [classNameChunk, definedPropertiesChunk, weakMap]);
            nextCache = weakMap;
          }
        } // Order of classes in chunks matches property-iteration order of style
        // object. Order of chunks matches passed order of styles from first to
        // last (which we iterate over in reverse).


        if (classNameChunk) {
          className = className ? classNameChunk + ' ' + className : classNameChunk;
        }
      } // ----- DYNAMIC: Process inline style object -----
      else {
        if (disableMix) {
          if (inlineStyle == null) {
            inlineStyle = {};
          }

          inlineStyle = Object.assign({}, style, inlineStyle);
        } else {
          var subStyle = null;

          for (var _prop in style) {
            var _value = style[_prop];

            if (_value !== undefined) {
              if (!definedProperties.includes(_prop)) {
                if (_value != null) {
                  if (inlineStyle == null) {
                    inlineStyle = {};
                  }

                  if (subStyle == null) {
                    subStyle = {};
                  }

                  subStyle[_prop] = _value;
                }

                definedProperties.push(_prop); // Cache is unnecessary overhead if results can't be reused.

                nextCache = null;
              }
            }
          }

          if (subStyle != null) {
            inlineStyle = Object.assign(subStyle, inlineStyle);
          }
        }
      }
    }

    var styleProps = [className, inlineStyle];
    return styleProps;
  };
}

var styleq = createStyleq();
exports.styleq = styleq;
styleq.factory = createStyleq;