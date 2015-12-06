/* global describe, it, expect */
'use strict'

const r = require('./support/r')

let splitBlocks = require('../lib/md_block').splitBlocks
let normalizeCode = require('../lib/md_block').normalizeCode
let normalize = require('../lib/md_block').normalize
let out

const ticks = '```'

describe('md block: splitBlocks', function () {
  it('works', function () {
    out = splitBlocks([
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
    out = splitBlocks([
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
    out = splitBlocks([
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

describe('md block: normalizeCode', function () {
  it('works with 2 indents', function () {
    out = normalizeCode([
      'hello there',
      '  world'
    ], { lang: 'js' })
    expect(out[0]).eql('hello there')
    expect(out[1]).eql('```js\nworld\n```')
  })

  it('works with 4 indents', function () {
    out = normalizeCode([
      'hello there',
      '    world'
    ], { lang: 'js' })
    expect(out[0]).eql('hello there')
    expect(out[1]).eql('```js\nworld\n```')
  })

  it('works with 4 indents with line breaks', function () {
    out = normalizeCode([
      'hello there',
      '    world\n    yes'
    ], { lang: 'js' })
    expect(out[0]).eql('hello there')
    expect(out[1]).eql('```js\nworld\nyes\n```')
  })

  it('works with 4 indents with empty lines', function () {
    out = normalizeCode([
      'hello there',
      '    world\n\n    yes'
    ], { lang: 'js' })
    expect(out[0]).eql('hello there')
    expect(out[1]).eql('```js\nworld\n\nyes\n```')
  })

  it('works with 6 indents', function () {
    out = normalizeCode([
      'hello there',
      '      world'
    ], { lang: 'js' })
    expect(out[0]).eql('hello there')
    expect(out[1]).eql('```js\n  world\n```')
  })

  it('works with 3 indents', function () {
    out = normalizeCode([
      'hello there',
      '   world'
    ], { lang: 'js' })
    expect(out[0]).eql('hello there')
    expect(out[1]).eql('```js\nworld\n```')
  })

  it('doesnt with 1 indent', function () {
    out = normalizeCode([
      'hello there',
      ' world'
    ], { lang: 'js' })

    expect(out[0]).eql('hello there')
    expect(out[1]).eql(' world')
  })
})

describe('md block: normalize', function () {
  it('works', function () {
    out = normalize(r(`
      this is code:

          a
          b

          c
          d
    `), { lang: 'js' })

    expect(out).eql(r(`
      this is code:

      ${ticks}js
      a
      b

      c
      d
      ${ticks}
    `))
  })

  it('works without language', function () {
    out = normalize(r(`
      this is code:

          a
          b

          c
          d
    `))

    expect(out).eql(r(`
      this is code:

      ${ticks}
      a
      b

      c
      d
      ${ticks}
    `))
  })
})
