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

'use strict';

const combine = require('./combine-js-to-schema');
const fs = require('fs');
const glob = require('glob');
const _require = require('./combine-utils'),
  parseArgs = _require.parseArgs,
  filterJSFile = _require.filterJSFile;
const _parseArgs = parseArgs(process.argv),
  platform = _parseArgs.platform,
  outfile = _parseArgs.outfile,
  fileList = _parseArgs.fileList;
const allFiles = [];
fileList.forEach(file => {
  if (fs.lstatSync(file).isDirectory()) {
    const dirFiles = glob
      .sync(`${file}/**/*.{js,ts,tsx}`, {
        nodir: true,
      })
      .filter(element => filterJSFile(element, platform));
    allFiles.push(...dirFiles);
  } else if (filterJSFile(file)) {
    allFiles.push(file);
  }
});
const combined = combine(allFiles);

// Warn users if there is no modules to process
if (Object.keys(combined.modules).length === 0) {
  console.error(
    'No modules to process in combine-js-to-schema-cli. If this is unexpected, please check if you set up your NativeComponent correctly. See combine-js-to-schema.js for how codegen finds modules.',
  );
}
const formattedSchema = JSON.stringify(combined, null, 2);
if (outfile != null) {
  fs.writeFileSync(outfile, formattedSchema);
} else {
  console.log(formattedSchema);
}
