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
      doc: '\\s*%{docprefix}\\s?%{doc:string}',
    }, this.blockCommentRules()));
  }
}

class Javascript extends Base {
  blockCommentRules () {
    return ({
      commentstart: '/\\*',
      commentstartex: '/\\*\\*',
      commentend: '\\*/',
      docprefix: '\\*',
    });
  }
}

module.exports = Javascript;
