/* global describe, expect, it */

describe('Extractor:', function () {
  extractTest(
    'private function.js',
    `/**
     * Private: this is a private function
     */

    function privy() {
    }`,
    { excludeTags: ['private'] },
    function () {
      expect(this.blocks.length).eql(0)
    })

  extractTest(
    'foo.js',
    '/**\n' +
    ' * Adds 2 numbers.\n' +
    ' */\n' +
    'function add(a, b) {\n' +
    '  ...\n' +
    '}',
    {},
    function () { })

  function extractTest (file, input, options, fn) {
    it(file, function () {
      var Extractor = require('../index').Extractor
      this.ex = new Extractor(options)
      this.ex.push(file, input)
      this.out = this.ex.toJson()
      this.blocks = this.out.blocks
      fn.apply(this)
    })
  }
})
