var Matcher = require('./lib/matcher');

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

function Extractor() {
  this.output = [];
  this.blocks = [];
}

Extractor.prototype.push = function (fname, src) {
  var c = new Context(src);
  c.process();

  this.blocks = this.blocks.concat(c.blocks);
};

Extractor.prototype.toJson = function () {
  return this.blocks;
};

/*
 * (Private) A document parsing context.
 */

function Context (src) {
  this.src = src;
  this.block = undefined;
  this.blocks = [];
}

Context.prototype.flush = function () {
  this.finalizeBlock();
  this.block = this.newBlock();
};

Context.prototype.finalizeBlock = function () {
  if (this.block && this.block.location.doc.start !== null) {
    this.block.raw = this.block.rawlines.join("\n") + "\n";
    delete this.block.rawlines;
    this.blocks.push(this.block);
  }
};

Context.prototype.newBlock = function () {
  return {
    location: {
      doc: { start: null, end: null },
      code: { start: null }
    },
    rawlines: [],
  };
};

Context.prototype.process = function () {
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
        if (!ctx.block.location.code.start) {
          if (line.trim() === '') return;
          ctx.block.location.code.start = i + 1;
        }
      }
    });
  });

  ctx.flush();
};

/*
 * Helpers
 */

function eachLine (src, fn) {
  src.split('\n').forEach(fn);
}

/*
 * Export
 */

module.exports = {
  Extractor: Extractor,
  Context: Context
};
