'use strict'
const assign = require('object-assign')
const Matcher = require('./matcher')

/**
 * A language.
 *
 *   lang = new Language({ extensions: .. })
 */

class Language {
  constructor (name, data) {
    this.name = name
    this.options = data
  }

  matches (fname) {
    var exts = this.options.extensions
    for (var i in exts) {
      var ext = exts[i]

      if (fname.substr(fname.length - ext.length) === ext) {
        return true
      }
    }
  }

  rules () {
    return new Matcher(assign({}, {
      string: '.*?',
      docshort: '\\s*%{commentstart}\\s*%{doc:string}%{commentend}%{extra:string}',
      docstart: '\\s*%{commentstart}\\s*%{doc:string}',
      docstartex: '\\s*%{commentstartex}\\s*%{doc:string}',
      docend: '\\s*%{commentend}\\s*%{code:string}',
      doc: '\\s*%{commentdoc}\\s?%{doc:string}'
    }, this.options.syntax))
  }

  slug () {
    return this.options && this.options.slug || this.name.toLowerCase()
  }
}

module.exports = Language
