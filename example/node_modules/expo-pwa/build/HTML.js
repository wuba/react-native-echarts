"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.htmlTagObjectToString = void 0;
/**
 * Turn a tag definition into a html string
 * @param {HtmlTagObject} tagDefinition
 *  A tag element according to the htmlWebpackPlugin object notation
 *
 * @param xhtml {boolean}
 *   Wether the generated html should add closing slashes to be xhtml compliant
 */
function htmlTagObjectToString(tagDefinition, xhtml = false) {
    const attributes = Object.keys(tagDefinition.attributes || {})
        .filter(function (attributeName) {
        return tagDefinition.attributes[attributeName] !== false;
    })
        .map(function (attributeName) {
        if (tagDefinition.attributes[attributeName] === true) {
            return xhtml ? attributeName + '="' + attributeName + '"' : attributeName;
        }
        return attributeName + '="' + tagDefinition.attributes[attributeName] + '"';
    });
    return ('<' +
        [tagDefinition.tagName].concat(attributes).join(' ') +
        (tagDefinition.voidTag && xhtml ? '/' : '') +
        '>' +
        (tagDefinition.innerHTML || '') +
        (tagDefinition.voidTag ? '' : '</' + tagDefinition.tagName + '>'));
}
exports.htmlTagObjectToString = htmlTagObjectToString;
//# sourceMappingURL=HTML.js.map