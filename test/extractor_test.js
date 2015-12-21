/* global describe, expect, it */
const r = require('./support/r')

describe('Extractor:', function () {
  extractTest(
    'private function.js', r(`
    /**
     * Private: this is a private function
     */

    function privy() {
    }`),
    { excludeTags: ['private'] },
    function () {
      expect(this.blocks.length).eql(0)
    })

  extractTest(
    'foo.js', r(`
    /**
     * Adds 2 numbers.
     */
    function add(a, b) {
      ...
    }`),
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
