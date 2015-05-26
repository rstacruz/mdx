"use strict";

describe.only('md block', function () {
  let mdblock = require('../lib/md_block');
  let out;

  it('works', function () {
    out = mdblock([
      "hello",
      "",
      "there",
      "world",
      "",
      "hi"
    ].join('\n'));
    expect(out[0]).eql('hello');
    expect(out[1]).eql('there\nworld');
    expect(out[2]).eql('hi');
  });

  it('consolidates code blocks', function () {
    out = mdblock([
      "this is code:",
      "",
      "    a",
      "    b",
      "",
      "    c",
      "    d"
    ].join('\n'));

    expect(out).have.length(2);
    expect(out[0]).eql('this is code:');
    expect(out[1]).eql('    a\n    b\n\n    c\n    d');
  });

  it('consolidates code fences', function () {
    out = mdblock([
      "this is code:",
      "",
      "```rb",
      "a",
      "b",
      "",
      "c",
      "",
      "d",
      "e",
      "```"
    ].join('\n'));

    expect(out).have.length(2);
    expect(out[0]).eql('this is code:');
    expect(out[1]).eql('```rb\na\nb\n\nc\n\nd\ne\n```');
  });

it('lol', function () {
  let inp = [
    "this is *code*:",
    "",
    "  a",
    "    b",
    "",
    "  c",
    "",
    "  d",
    "  e",
  ].join('\n');

  var Lexer = require('marked').Lexer;
  var assign = require('object-assign');
  var lexer = new Lexer({ gfm: true, tables: true, smartLists: true });
  lexer.rules = assign({}, lexer.rules);
  lexer.rules.code = /^( {2}[^\n]+\n*)+/;
  let tokens = lexer.lex(inp);
  console.log(lexer.rules);
  console.log(tokens);
});
});
