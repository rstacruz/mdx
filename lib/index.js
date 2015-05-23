/* jshint node: true */
"use strict";

var Context = require('./context');

/*
 * Class: A documentation extractor.
 *
 *   e = new Extractor();
 *   e.push('data.js', "...string contents of file");
 */

class Extractor {
  constructor() {
    this.output = [];
    this.blocks = [];
  }

  push (fname, src) {
    var c = new Context(fname, src);
    c.process();
    this.blocks = this.blocks.concat(c.blocks);
  }

  toJson () {
  return this.blocks;
  }
}

/*
 * Export
 */

module.exports = { Extractor, Context };
