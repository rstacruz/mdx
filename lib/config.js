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
          regex: `^\\s*class ([A-Za-z_][A-Za-z0-9_]*)( extends ([A-Za-z0-9_]+))? {\\s*$`,
          type: 'class',
          title: 1
        },
        {
          regex: `^\\s*function\\s+([A-Za-z_][A-Za-z0-9_]*)\s*\\(.*?\\)\\s*{\\s*$`,
          type: 'function',
          title: 1,
          signature: "\\1(\\2)"
        }
      ]
    }
  }
};
