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

"use strict";

const Transformer = require("./DeltaBundler/Transformer");
const DependencyGraph = require("./node-haste/DependencyGraph");
class Bundler {
  constructor(config, options) {
    this._depGraph = new DependencyGraph(config, options);
    this._readyPromise = this._depGraph
      .ready()
      .then(() => {
        config.reporter.update({
          type: "transformer_load_started",
        });
        this._transformer = new Transformer(config, (...args) =>
          this._depGraph.getSha1(...args)
        );
        config.reporter.update({
          type: "transformer_load_done",
        });
      })
      .catch((error) => {
        console.error("Failed to construct transformer: ", error);
        config.reporter.update({
          type: "transformer_load_failed",
          error,
        });
      });
  }
  getWatcher() {
    return this._depGraph.getWatcher();
  }
  async end() {
    await this._depGraph.ready();
    this._transformer.end();
    this._depGraph.end();
  }
  async getDependencyGraph() {
    await this._depGraph.ready();
    return this._depGraph;
  }
  async transformFile(
    filePath,
    transformOptions /** Optionally provide the file contents, this can be used to provide virtual contents for a file. */,
    fileBuffer
  ) {
    // We need to be sure that the DependencyGraph has been initialized.
    // TODO: Remove this ugly hack!
    await this._depGraph.ready();
    return this._transformer.transformFile(
      filePath,
      transformOptions,
      fileBuffer
    );
  }

  // Waits for the bundler to become ready.
  async ready() {
    await this._readyPromise;
  }
}
module.exports = Bundler;
