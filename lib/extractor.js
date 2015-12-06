/* jshint node: true */
'use strict'

const Context = require('./context')

/**
 * Class: A documentation extractor.
 *
 *   e = new Extractor()
 *   e.push('data.js', "...string contents of file")
 */

class Extractor {
  constructor (options) {
    this.output = []
    this.blocks = []
    this.options = options || {}
  }

  push (fname, src) {
    const self = this
    const c = new Context(fname, src)
    c.process()
    c.blocks.forEach(function (block) {
      if (self.isBlockAllowed(block)) {
        self.blocks.push(block)
      }
    })
  }

  isBlockAllowed (block) {
    if (this.options.excludeTags &&
      hasIntersection(this.options.excludeTags, block.tags)) {
      return false
    }

    return true
  }

  toJson () {
    return { blocks: this.blocks }
  }
}

/**
 * Internal: checks two arrays to see if they have common elements.
 * Used to check if a certain tag (or tags) is in a list.
 *
 *    hasIntersection(['private', 'internal'], ['private'])
 *    // => true
 */

function hasIntersection (list, other) {
  if (!Array.isArray(list) || !Array.isArray(other)) return
  for (let i = 0, len = list.length; i < len; i++) {
    let item = list[i]
    if (~other.indexOf(item)) return true
  }
  return false
}

module.exports = Extractor
