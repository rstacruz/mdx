"use strict";

const Mdx = require('./index');

/*
 * (Private) A document parsing context.
 */

class Context {
  constructor (fname, src) {
    const Lang = Mdx.detectLanguage(fname);
    if (!Lang) throw new Error(`Unknown language for '${fname}'`);

    this.filename = fname;
    this.src = src;
    this.block = undefined;
    this.blocks = [];
    this.language = new Lang();
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
        file: this.filename,
        doc: { start: null, end: null },
        code: { start: null }
      },
      _rawlines: [],
    };
  }

  process () {
    const ctx = this;
    ctx.flush();

    eachLine(ctx.src, function (line, i) {
      ctx.rules.switch(line, {

        // single line block comment
        docshort (m) {
          return;
        },

        // opening block, explicit
        docstartex (m) {
          ctx.flush();
          ctx.block.location.doc.start = i + 1;
          if (m.doc) ctx.block._rawlines.push(m.doc);
          ctx.block.explicit = true;
        },

        // opening block
        docstart (m) {
          ctx.flush();
          ctx.block.location.doc.start = i + 1;
          if (m.doc) ctx.block._rawlines.push(m.doc);
        },

        // closing block
        // skip other */'s if it's not needed
        docend (m) {
          if (ctx.block.location.doc.end !== null) return;
          ctx.block.location.doc.end = i + 1;
        },

        // inside a block
        doc (m) {
          ctx.block._rawlines.push(m.doc);
        },

        // code
        // skip if prelude was already saved
        else (m) {
          if (ctx.block.prelude) return;

          line = line.trim();
          if (line === '') return;
          ctx.block.prelude = line;
          ctx.block.location.code.start = i + 1;
        }
      });
    });

    ctx.finalizeBlock();
  }
}

/*
 * Helpers
 */

function eachLine (src, fn) {
  src.split('\n').forEach(fn);
}

module.exports = Context;
