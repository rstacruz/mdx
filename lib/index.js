/* jshint node: true */
'use strict'

const Language = require('./language')

/**
 * Module: Mdx singleton.
 *
 *   const Mdx = require('mdx')
 */

let Mdx = {}
module.exports = Mdx

/**
 * Detects a language for a given filename. Returns a {Language} instance.
 *
 *   Mdx.detectLanguage('file.js')
 *   #=> <Language 'javascript'>
 */

Mdx.detectLanguage = function (fname) {
  for (let name in this.languages) {
    let lang = Mdx.getLanguage(name)
    if (lang.matches(fname)) return lang
  }
}

/**
 * Returns a {Language} instance.
 *
 *   js = Mdx.getLanguage('javascript')
 */

Mdx.getLanguage = function (name) {
  let lang = this.languages[name]
  return lang && new Language(name, lang)
}

/**
 * (Private) List of languages.
 */

Mdx.languages = require('./config').languages

/**
 * Extractor. See {Extractor} class for details
 */

Mdx.Extractor = require('./extractor')

/**
 * Render an extractor output to Markdown.
 *
 *   ex = new Mdx.Extractor()
 *   ex.push(...)
 *
 *   output = Mdx.renderTemplate(ex.toJson())
 */

Mdx.renderTemplate = function (output) {
  const mustache = require('mustache')
  const tplFile = require.resolve('../templates/markdown.mustache')
  const fs = require('fs')
  const tpl = fs.readFileSync(tplFile, 'utf-8')

  // lol, deep clone
  output = JSON.parse(JSON.stringify(output))

  output.blocks.forEach(function (block) {
    if (~['class', 'module', 'section'].indexOf(block.type)) {
      block._headerprefix = '##'
    } else {
      block._headerprefix = '###'
    }
  })

  return mustache.render(tpl, output).trim() + '\n'
}
