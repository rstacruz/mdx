/* jshint node: true */
"use strict";

let Mdx = {};
module.exports = Mdx;

Mdx.detectLanguage = function (fn) {
  return this.languages.javascript;
};

Mdx.languages = {
  javascript: require('./languages/javascript')
};

Mdx.Extractor = require('./extractor');
