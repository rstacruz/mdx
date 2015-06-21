/* global describe, it */
'use strict'

const path = require('path')

describe('standard', function () {
  it('style conforms to standard', function (done) {
    const standard = require('standard')
    const options = getOptions()

    standard.lintFiles(options.files || [], options, function (err, res) {
      if (err) return done(err)
      if (res.errorCount === 0 && res.warningCount === 0) return done()
      done(errorify(res))
    })
  })
})

/*
 * return custom `standard` options in package.json.
 */

function getOptions () {
  const pkg = require(path.join(process.cwd(), 'package.json'))
  const params = pkg.standard && pkg.standard || {}
  return params
}

/*
 * returns an Error object from a standard `results` object.
 */

function errorify (res) {
  const cwd = process.cwd()
  const err = new Error('Failed standard test')

  res.results.forEach(function (result) {
    result.messages.forEach(function (message) {
      err.message += '\n      ' +
        result.filePath.replace(cwd, '') +
        ':' + message.line + ':' + message.column + ': ' +
        message.message + ' (' + message.rule + ')'
    })
  })

  return err
}
