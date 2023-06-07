"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
describe(utils_1.toPositiveHex, () => {
    test.each([
        ['646a60245faa852fe108ecbbd018dfc8', '646a60245faa852fe108ecbbd018dfc8'],
        ['eb668fcee52ce9ebd5461a2e71be1269', '6b668fcee52ce9ebd5461a2e71be1269'],
        ['6', '6'],
        ['e', '6'],
        ['9', '1'], // "negative" hex string
    ])('case %p', (input, output) => {
        expect((0, utils_1.toPositiveHex)(input)).toEqual(output);
    });
});
//# sourceMappingURL=utils-test.js.map