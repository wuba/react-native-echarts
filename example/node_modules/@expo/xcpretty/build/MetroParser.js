"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetroParser = void 0;
const Parser_1 = require("./Parser");
const switchRegex_1 = require("./switchRegex");
class MetroParser extends Parser_1.Parser {
    constructor(formatter) {
        super(formatter);
        this.formatter = formatter;
        this.isCollectingMetroError = false;
        this.metroError = [];
    }
    parse(text) {
        const results = this.checkMetroError(text);
        if (results) {
            return results;
        }
        return super.parse(text);
    }
    // Error for the build script wrapper in expo-updates that catches metro bundler errors.
    // This can be repro'd by importing a file that doesn't exist, then building.
    // Metro will fail to generate the JS bundle, and throw an error that should be caught here.
    checkMetroError(text) {
        // In expo-updates, we wrap the bundler script and add regex around the error message so we can present it nicely to the user.
        return switchRegex_1.switchRegex(text, [
            [
                /@build-script-error-begin/m,
                () => {
                    this.isCollectingMetroError = true;
                },
            ],
            [
                /@build-script-error-end/m,
                () => {
                    const results = this.metroError.join('\n');
                    // Reset the metro collection error array (should never need this).
                    this.isCollectingMetroError = false;
                    this.metroError = [];
                    if ('formatMetroAssetCollectionError' in this.formatter) {
                        return this.formatter.formatMetroAssetCollectionError(results);
                    }
                    throw new Error('Current `@expo/xcpretty` formatter cannot handle Metro errors');
                },
            ],
            [
                null,
                () => {
                    // Collect all the lines in the metro build error
                    if (this.isCollectingMetroError) {
                        let results = text;
                        if (!this.metroError.length) {
                            const match = text.match(/Error loading assets JSON from Metro.*steps correctly.((.|\n)*)/m);
                            if (match && match[1]) {
                                results = match[1].trim();
                            }
                        }
                        this.metroError.push(results);
                    }
                },
            ],
        ]);
    }
}
exports.MetroParser = MetroParser;
//# sourceMappingURL=MetroParser.js.map