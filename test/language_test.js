/* global describe, it, expect */
'use strict'

var Mdx = require('../index')

describe('Language:', function () {
  describe('detectLanguage', function () {
    it('works for .js', function () {
      var lang = Mdx.detectLanguage('file.js')
      expect(lang.name).eq('javascript')
    })

    it('works for .es6', function () {
      var lang = Mdx.detectLanguage('filen.es6')
      expect(lang.name).eq('javascript')
    })

    it('returns nothing when it doesnt know', function () {
      var lang = Mdx.detectLanguage('file.txt')
      expect(lang).eq(undefined)
    })
  })
})
