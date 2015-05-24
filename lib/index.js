/* jshint node: true */
"use strict";

const Language = require('./language');

/**
 * Module: Mdx singleton.
 *
 *   const Mdx = require('mdx');
 */

let Mdx = {};
module.exports = Mdx;

/**
 * Detects a language for a given filename. Returns a {Language} instance.
 *
 *   Mdx.detectLanguage('file.js')
 *   #=> <Language 'javascript'>
 */

Mdx.detectLanguage = function (fname) {
  for (let name in this.languages) {
    let lang = Mdx.getLanguage(name);
    if (lang.matches(fname)) return lang;
  }
};

/**
 * Returns a {Language} instance.
 *
 *   js = Mdx.getLanguage('javascript');
 */

Mdx.getLanguage = function (name) {
  let lang = this.languages[name];
  return lang && new Language(name, lang);
};

/**
 * (Private) List of languages.
 */

Mdx.languages = {
  javascript: require('./languages/javascript')
};

Mdx.Extractor = require('./extractor');
