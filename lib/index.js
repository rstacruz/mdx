/* jshint node: true */
"use strict";

let Mdx = {};
module.exports = Mdx;

Mdx.detectLanguage = function (fname) {
  for (let key in this.languages) {
    let Lang = this.languages[key];
    if ((new Lang()).matches(fname))
      return Lang;
  }
};

Mdx.languages = {
  javascript: require('./languages/javascript')
};

Mdx.Extractor = require('./extractor');
