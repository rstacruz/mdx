/* global describe, parsingTest, it, expect */
const r = require('./support/r')
const s = JSON.stringify

describe('Parsing:', function () {
  parsingTest(
  'basic parsing.js',
  `/*
   * Description here.
   */

  function hello() {
  }`,
  function () {
    it('has locations', function () {
      expect(this.blocks[0].location.doc).eql({ start: 1, end: 3 })
      expect(this.blocks[0].location.code).eql({ start: 5 })
    })

    it('has prelude', function () {
      expect(this.blocks[0].prelude).eql('function hello() {')
    })

    it('has raw', function () {
      expect(this.blocks[0].raw).eql('Description here.\n')
    })
  })

  parsingTest(
  'multiple blocks.js',
  `/*
   * Description here.
   */

   function hello() {
   }

  /*
   * Other description here.
   */

   function world() {
   }`,
  function () {
    it('has locations [0]', function () {
      expect(this.blocks[0].location.doc).eql({ start: 1, end: 3 })
      expect(this.blocks[0].location.code).eql({ start: 5 })
    })

    it('has locations [1]', function () {
      expect(this.blocks[1].location.doc).eql({ start: 8, end: 10 })
      expect(this.blocks[1].location.code).eql({ start: 12 })
    })

    it('has prelude[0]', function () {
      expect(this.blocks[0].prelude).eql('function hello() {')
    })

    it('has prelude[1]', function () {
      expect(this.blocks[1].prelude).eql('function world() {')
    })

    it('has raw', function () {
      expect(this.blocks[0].raw).eql('Description here.\n')
    })
  })

  parsingTest(
  'stray closing tags.js',
  `/*
   * Description here.
   */

   function hello() {
         */ }`,
  function () {
    it('has locations', function () {
      expect(this.blocks[0].location.doc).eql({ start: 1, end: 3 })
      expect(this.blocks[0].location.code).eql({ start: 5 })
    })
  })

  parsingTest(
  'explicit flag.js',
  `/**
   * Description here.
   */
  function hello() {}`,
  function () {
    it('sets the explicit flag', function () {
      expect(this.blocks[0].explicit).eql(true)
    })
  })

  parsingTest(
  'short blocks.js',
  `/* jshint: true */
  function hello() {}`,
  function () {
    it('is empty', function () {
      expect(this.blocks).eql([])
    })
  })

  parsingTest(
  'titles.js', r(`
  /*
   * Mdx:
   * This is a class.
   */
  Foo.registerClass('Mdx', function() {});`),
  function () {
    it('has title', function () {
      expect(this.blocks[0].title).eql('Mdx')
    })

    it('parses them out of the raw data', function () {
      expect(this.blocks[0].raw).eql('This is a class.\n')
    })
  })

  parsingTest(
  'titles tags and types.js',
  `/*
   * Mdx:
   * Private: (Class) This is a class.
   */
  Foo.registerClass('Mdx', function() {});`,
  function () {
    it('has title', function () {
      expect(this.blocks[0].title).eql('Mdx')
      expect(this.blocks[0].type).eql('class')
      expect(this.blocks[0].tags).eql(['private'])
    })

    it('parses them out of the raw data', function () {
      expect(this.blocks[0].raw).eql('This is a class.\n')
    })
  })

  parsingTest(
  'titles and tags.js',
  `/*
   * Mdx:
   * Private: This is a class.
   */
  Foo.registerClass('Mdx', function() {});`,
  function () {
    it('has title', function () {
      expect(this.blocks[0].title).eql('Mdx')
      expect(this.blocks[0].tags).eql(['private'])
    })

    it('parses them out of the raw data', function () {
      expect(this.blocks[0].raw).eql('This is a class.\n')
    })
  })

  parsingTest(
  'titles and multiple tags.js',
  `/*
   * Mdx:
   * Private, deprecated: This is a class.
   */
  Foo.registerClass('Mdx', function() {});`,
  function () {
    it('has title', function () {
      expect(this.blocks[0].title).eql('Mdx')
      expect(this.blocks[0].tags).eql(['private', 'deprecated'])
    })
  })

  parsingTest(
  'titles and inline type.js',
  `/*
   * Mdx (module):
   * This is a class.
   */
  Foo.registerClass('Mdx', function() {});`,
  function () {
    it('has title', function () {
      expect(this.blocks[0].title).eql('Mdx')
      expect(this.blocks[0].type).eql('module')
    })
  })

  parsingTest(
  'no prelude.js',
  `/**
   * Description here.
   */

  /**
   * Another description.
   */

  function hello() {
  }`,
  function () {
    it('has locations', function () {
      expect(this.blocks[0].location.doc).eql({ start: 1, end: 3 })
      expect(this.blocks[0].location.code).eql({ start: null })
    })
  })

  parsingTest(
  'parsing with signature.js',
  `/**
   * on : on(x)
   * Description here.
   */

  function hello() {
  }`,
  function () {
    it('has raw', function () {
      expect(this.blocks[0].signature).eql('on(x)')
      expect(this.blocks[0].title).eql('on')
      expect(this.blocks[0].raw).eql('Description here.\n')
      expect(this.blocks[0].markdown).eql('Description here.')
    })
  })

  parsingTest(
  'extra spaces.js', r(`
  /**
    *     a
    *
    *     b
    */

   function trigger (el, event) {`),
  function () {
    it('works', function () {
      expect(s(this.blocks[0].markdown)).eql(s('```js\na\n\nb\n```'))
    })
  })
})
