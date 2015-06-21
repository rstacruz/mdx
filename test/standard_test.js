/* global describe, it */
'use strict'

const path = require('path')

describe('standard', function () {
  it('conforms to standard', function () {
    let standard = './node_modules/.bin/standard'
    let cwd = process.cwd()
    let pkg = require(path.join(cwd, 'package.json'))
    let params = pkg.standard && pkg.standard.params || []

    let proc = require('child_process').spawnSync(standard, ['-v'].concat(params))

    if (proc.status !== 0) {
      let err = new Error('Failed standard test\n')
      err.message += replaceAll(proc.stdout.toString(), cwd, '')
      err.message = err.message.replace(/\n/g, '\n    ')
      err.stack = ''
      throw err
    }
  })
})

function replaceAll (str, from, to) {
  let re = new RegExp(escapeRegExp(from), 'g')
  return str.replace(re, to)
}

function escapeRegExp (string) {
  return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1')
}
