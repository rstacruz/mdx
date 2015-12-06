/* global describe, it */
'use strict'

var nixt = require('nixt')

describe('cli', function () {
  function cmd () {
    return nixt()
      .cwd(require('path').join(__dirname, '..'))
      .base('./bin/mdx ')
  }

  it('--help', function (done) {
    cmd()
      .run('--help')
      .stdout(/Usage:/)
      .stdout(/--version/)
      .stdout(/--format/)
      .stdout(/-f/)
      .end(done)
  })

  it('parse an empty file', function (done) {
    cmd()
      .run('lib/config.js')
      .stdout(/"blocks": \[\]/)
      .end(done)
  })

  it('parse a working file', function (done) {
    cmd()
      .run('lib/extractor.js')
      .stdout(/"title": "Extractor"/)
      .stdout(/"type": "class"/)
      .end(done)
  })

  it('parse a working file to markdown', function (done) {
    cmd()
      .run('lib/extractor.js -f markdown')
      .stdout(/## Extractor/)
      .stdout(/A documentation extractor./)
      .end(done)
  })
})
