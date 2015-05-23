/* jshint node: true */
"use strict";

const Context = require('./context');

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
    let c = new Context(fname, src);
    c.process();
    this.blocks = this.blocks.concat(c.blocks);
  }

  toJson () {
    return this.blocks;
  }
}

module.exports = Extractor;
