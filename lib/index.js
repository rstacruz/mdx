/* jshint node: true */
"use strict";

var Matcher = require('./matcher');

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
 * (Private) A document parsing context.
 */

class Context {
  constructor (fname, src) {
    const Javascript = require('./languages/javascript');
    this.src = src;
    this.block = undefined;
    this.blocks = [];
    this.language = new Javascript();
    this.rules = this.language.rules();
  }

  /*
   * Considers the last `block` as "done" and pushes it to the blocks list,
   * then it starts a new block.
   */

  flush () {
    this.finalizeBlock();
    this.block = this.newBlock();
  }

  /*
   * Considers the last `block` as "done" and pushes it to the blocks list.
   */

  finalizeBlock () {
    if (this.block && this.block.location.doc.start !== null) {
      this.block.raw = this.block._rawlines.join("\n") + "\n";
      delete this.block._rawlines;
      this.blocks.push(this.block);
    }
  }

  /*
   * Creates the initial state for a block object.
   */

  newBlock () {
    return {
      location: {
        doc: { start: null, end: null },
        code: { start: null }
      },
      _rawlines: [],
    };
  }

  process () {
    this.flush();
    eachLine(this.src, (line, i) => {
      this.rules.switch(line, {

        // opening block, explicit
        docstartex: (m) => {
          this.flush();
          this.block.location.doc.start = i + 1;
          if (m.doc) this.block._rawlines.push(m.doc);
          this.block.explicit = true;
        },

        // opening block
        docstart: (m) => {
          this.flush();
          this.block.location.doc.start = i + 1;
          if (m.doc) this.block._rawlines.push(m.doc);
        },

        // closing block
        // skip other */'s if it's not needed
        docend: (m) => {
          if (this.block.location.doc.end !== null) return;
          this.block.location.doc.end = i + 1;
        },

        // inside a block
        doc: (m) => {
          this.block._rawlines.push(m.doc);
        },

        // code
        // skip if prelude was already saved
        else: (m) => {
          if (this.block.prelude) return;

          line = line.trim();
          if (line === '') return;
          this.block.prelude = line;
          this.block.location.code.start = i + 1;
        }
      });
    });
    this.finalizeBlock();
  }
}

/*
 * Helpers
 */

function eachLine (src, fn) {
  src.split('\n').forEach(fn);
}

/*
 * Export
 */

module.exports = { Extractor, Context };
