"use strict";
const assign = require('object-assign');
const Matcher = require('../matcher');

class Base {
  extensions () {
    return [];
  }

  matches (fname) {
    var exts = this.extensions();
    for (var i in exts) {
      var ext = exts[i];

      if (fname.substr(fname.length - ext.length) === ext)
        return true;
    }
  }

  rules () {
    return new Matcher(assign({}, {
      string: '.*?',
      docshort: '\\s*%{commentstart}\\s*%{doc:string}%{commentend}%{extra:string}',
      docstart: '\\s*%{commentstart}\\s*%{doc:string}',
      docstartex: '\\s*%{commentstartex}\\s*%{doc:string}',
      docend: '\\s*%{commentend}\\s*%{code:string}',
      doc: '\\s*%{commentdoc}\\s?%{doc:string}',
    }, this.commentSyntax()));
  }
}

class Javascript extends Base {
  extensions() {
    return ['.js', '.es6'];
  }

  commentSyntax () {
    return ({
      commentstart: '/\\*',
      commentstartex: '/\\*\\*',
      commentend: '\\*/',
      commentdoc: '\\*',
      commentlinestart: '//',
    });
  }
}

module.exports = Javascript;
