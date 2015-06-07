"use strict";

var es6prefix = `(?:(?:export|default)\\s+)*`;
var keyword = `(?:[A-Za-z_][A-Za-z0-9_]*)`;

module.exports = {
  languages: {
    javascript: {
      extensions: ['.js', '.es6'],
      syntax: {
        commentstart: '/\\*',
        commentstartex: '/\\*\\*',
        commentend: '\\*/',
        commentdoc: '\\*',
        commentlinestart: '//',
      },
      preludes: [
        {
          // "class X extends Y {"
          regex: `^\\s*${es6prefix}class (${keyword})( extends (${keyword}))? {\\s*$`,
          type: 'class',
          title: "\\1",
          signature: null
        },
        {
          // "function x () {"
          regex: `^\\s*${es6prefix}function\\s+(${keyword})\s*\\((.*?)\\)\\s*{\\s*$`,
          type: 'function',
          title: "\\1",
          signature: "\\1(\\2)"
        },
        {
          // "x () {"
          regex: `^\\s*(${keyword})\\s*\\((.*?)\\)\\s*{\\s*$`,
          type: 'function',
          title: "\\1",
          signature: "\\1(\\2)"
        },
        {
          // "x.y = function () {"
          regex: `^\\s*(?:${keyword}\\.)*(${keyword})\\s*=\\s*function\\s+(${keyword})?\\s*\\((.*?)\\)\\s*{\\s*$`,
          type: 'function',
          title: "\\1",
          signature: "\\1(\\3)"
        },
        {
          // "let radius = xxx"
          regex: `^\\s*${es6prefix}(var|let|const)\\s+([^\\s]+)`,
          type: 'variable',
          title: "\\2",
          signature: null
        },
        {
          // "Mdx.Extractor = xxxx"
          regex: `^\\s*(?:${keyword}\\.)*(${keyword})\\s*=`,
          type: 'attribute',
          title: "\\1",
          signature: null
        },
      ]
    }
  }
};
