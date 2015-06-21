/* global describe, it, expect */
'use strict'

describe.skip('md block', function () {
  let mdblock = require('../lib/md_block')
  let out

  it('works', function () {
    out = mdblock([
      'hello',
      '',
      'there',
      'world',
      '',
      'hi'
    ].join('\n'))
    expect(out[0]).eql('hello')
    expect(out[1]).eql('there\nworld')
    expect(out[2]).eql('hi')
  })

  it('consolidates code blocks', function () {
    out = mdblock([
      'this is code:',
      '',
      '    a',
      '    b',
      '',
      '    c',
      '    d'
    ].join('\n'))

    expect(out).have.length(2)
    expect(out[0]).eql('this is code:')
    expect(out[1]).eql('    a\n    b\n\n    c\n    d')
  })

  it('consolidates code fences', function () {
    out = mdblock([
      'this is code:',
      '',
      '```rb',
      'a',
      'b',
      '',
      'c',
      '',
      'd',
      'e',
      '```'
    ].join('\n'))

    expect(out).have.length(2)
    expect(out[0]).eql('this is code:')
    expect(out[1]).eql('```rb\na\nb\n\nc\n\nd\ne\n```')
  })
})

describe.skip('mit', function () {
  const Mdit = require('markdown-it')

  it('lol', function () {
    const inp = [
      '* list',
      '* item',
      '  * sublist',
      '',
      'paragraph',
      '',
      'this is *code*:',
      '',
      '    a',
      '    b'
    ].join('\n')

    const tokens = Mdit().parse(inp)

    var out = []
    var indent = ''
    var prefix = ''
    var nest = 0
    tokens.forEach(function (token) {
      if (~['bullet_list_open', 'bullet_list_close', 'blockquote_open', 'blockquote_close'].indexOf(token.type)) {
        nest += token.nesting
      }

      indent = Array(nest).join('  ')
      if (token.type === 'list_item_open') {
        prefix = '- '
      }

      if (token.type === 'paragraph_close') {
        out.push('')
      }

      if (token.type === 'inline') {
        out.push(indent + prefix + token.content)
        prefix = ''
      }

      delete token.attrs
      delete token.map
      delete token.hidden
      delete token.markup
      delete token.info
      delete token.nesting
      delete token.level
      if (token.content === '') delete token.content
      if (token.tag === '') delete token.tag
      console.log(token)
    })
    console.log((out.join('\n')))
  })
})
