/**
 * Copyright © 2021 650 Industries.
 * Copyright © 2021 Vercel, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * Based on https://github.com/vercel/next.js/blob/1552b8341e5b512a2827485a4a9689cd429c520e/packages/next/build/webpack/plugins/wellknown-errors-plugin/index.ts
 */
import webpack from 'webpack';
export default class ExpectedErrorsPlugin {
    private parseErrorsAsync;
    apply(compiler: webpack.Compiler): void;
}
