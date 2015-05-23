"use strict";
var assign = require('object-assign');
var Matcher = require('../matcher');

class Base {
  rules () {
    return new Matcher(assign({}, {
      string: '.*?',
      docstart: '\\s*%{commentstart}\\s*%{doc:string}',
      docstartex: '\\s*%{commentstartex}\\s*%{doc:string}',
      docend: '\\s*%{commentend}\\s*%{code:string}',
      doc: '\\s*%{commentdoc}\\s?%{doc:string}',
    }, this.commentSyntax()));
  }
}

class Javascript extends Base {
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
