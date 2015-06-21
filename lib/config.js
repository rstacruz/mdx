/* eslint-disable space-in-parens */
'use strict'

const es6prefix = /(?:(?:export|default)\s+)*/.source
const keyword = /[A-Za-z_][A-Za-z0-9_]*/.source

function wrap (str) {
  return str.replace(/ {2}/g, /\s+/.source).replace(/ /g, /\s*/.source)
}

module.exports = {
  languages: {
    javascript: {
      extensions: ['.js', '.es6'],
      syntax: {
        commentstart: '/\\*',
        commentstartex: '/\\*\\*',
        commentend: '\\*/',
        commentdoc: '\\*',
        commentlinestart: '//'
      },
      preludes: [
        {
          // "class X extends Y {"
          regex: wrap(`^ ${es6prefix}class  (${keyword})(  extends  (${keyword}))? { $`),
          type: 'class',
          title: '\\1',
          signature: null
        },
        {
          // "function x () {"
          regex: wrap(`^ ${es6prefix}function  (${keyword}) \\((.*?)\\) { $`),
          type: 'function',
          title: '\\1()',
          signature: '\\1(\\2)'
        },
        {
          // "x () {"
          regex: wrap(`^ (${keyword}) \\((.*?)\\) { $`),
          type: 'function',
          title: '\\1()',
          signature: '\\1(\\2)'
        },
        {
          // "x.y = function () {"
          regex: wrap(`^ (?:${keyword}\\.)*(${keyword}) = function  (${keyword})? \\((.*?)\\) { $`),
          type: 'function',
          title: '\\1()',
          signature: '\\1(\\3)'
        },
        {
          // "let radius = xxx"
          regex: wrap(`^ ${es6prefix}(?:var|let|const)  (${keyword})`),
          type: 'variable',
          title: '\\1',
          signature: null
        },
        {
          // "Mdx.Extractor = xxxx"
          regex: wrap(`^ (?:${keyword}\\.)*(${keyword}) =`),
          type: 'attribute',
          title: '\\1',
          signature: null
        }
      ]
    }
  }
}
