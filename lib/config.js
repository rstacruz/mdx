"use strict";

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
          regex: `^\\s*class ([A-Za-z_][A-Za-z0-9_]*)( extends ([A-Za-z0-9_]+))? {\\s*$`,
          type: 'class',
          title: "\\1",
          signature: "\\1" //?
        },
        {
          // "function x () {"
          regex: `^\\s*function\\s+([A-Za-z_][A-Za-z0-9_]*)\s*\\(.*?\\)\\s*{\\s*$`,
          type: 'function',
          title: "\\1",
          signature: "\\1" //?
        },
        {
          // "x.y = function () {"
          regex: `^\\s*([^\s\.*]+\.)*([^\s]+?)\\s*=\\s*function\\s+([A-Za-z_][A-Za-z0-9_]*)?\s*\\(.*?\\)\\s*{\\s*$`,
          type: 'function',
          title: "\\1",
          signature: "\\1" //?
        },
        {
          // "let radius = xxx"
          regex: `^\\s*(var|let|const)\\s+([^\\s]+)`,
          type: 'variable',
          title: "\\2",
          signature: "\\1" //?
        },
        {
          // "Mdx.Extractor = xxxx"
          regex: `^\\s*([^\s\.]+\.)*([^\s]+?)\\s*=`,
          type: 'attribute',
          title: "\\1",
          signature: "\\1" //?
        },
        // "fnName () {"
      ]
    }
  }
};
