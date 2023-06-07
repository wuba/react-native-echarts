/**
 * Turn a tag definition into a html string
 * @param {HtmlTagObject} tagDefinition
 *  A tag element according to the htmlWebpackPlugin object notation
 *
 * @param xhtml {boolean}
 *   Wether the generated html should add closing slashes to be xhtml compliant
 */
export declare function htmlTagObjectToString(tagDefinition: {
    tagName: string;
    voidTag?: boolean;
    innerHTML?: string;
    attributes: Record<string, string | undefined | boolean>;
}, xhtml?: boolean): string;
