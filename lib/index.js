/* jshint node: true */
"use strict";

var Matcher = require('./matcher');

var rules = new Matcher({
  string: '.*?',
  commentstart: '/\\*',
  commentstartex: '/\\*\\*',
  commentend: '\\*/',
  docprefix: '\\*',

  docstart: '\\s*%{commentstart}\\s*%{doc:string}',
  docend: '\\s*%{commentend}\\s*%{code:string}',
  doc: '\\s*%{docprefix}\\s?%{doc:string}',
});

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
    this.src = src;
    this.block = undefined;
    this.blocks = [];
  }

  flush () {
    this.finalizeBlock();
    this.block = this.newBlock();
  }

  finalizeBlock () {
    if (this.block && this.block.location.doc.start !== null) {
      this.block.raw = this.block.rawlines.join("\n") + "\n";
      delete this.block.rawlines;
      this.blocks.push(this.block);
    }
  }

  newBlock () {
    return {
      location: {
        doc: { start: null, end: null },
        code: { start: null }
      },
      rawlines: [],
    };
  }

  process () {
    var ctx = this;
    ctx.flush();
    var lines;

    eachLine(ctx.src, function (line, i) {
      lines = i;
      rules.switch(line, {
        docstart: function (m) {
          ctx.flush();
          ctx.block.location.doc.start = i + 1;

          if (m.doc)
            ctx.block.rawlines.push(m.doc);
        },
        docend: function (m) {
          ctx.block.location.doc.end = i + 1;
        },
        doc: function (m) {
          ctx.block.rawlines.push(m.doc);
        },
        else: function (m) {
          if (!ctx.block.prelude) {
            line = line.trim();
            if (line === '') return;
            ctx.block.prelude = line;
            ctx.block.location.code.start = i + 1;
          }
        }
      });
    });

    ctx.flush();
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
