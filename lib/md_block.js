'use strict'

/**
 * md_block (module):
 * Breaks apart into logical blocks.
 * This is silly. It should use marked.Lexer.prototype.rules
 *
 * What for?
 *
 *  - so 2space and 4space code can be fenced
 */

module.exports = function (str) {
  let blocks = str.split('\n\n')
  let out = []
  let last = {}
  let state = {}

  for (var i = 0; i < blocks.length; i++) {
    let block = blocks[i]
    let now = {
      isCode: block.match(/^ {4}/),
      isFenceOpen: block.match(/^(```|~~~)/),
      isFenceClose: block.match(/(```|~~~)$/)
    }

    if (now.isFenceOpen) {
      state.open = true
      out.push(block)
    } else if (state.open) {
      if (now.isFenceClose) {
        state.open = false
      }
      out[out.length - 1] += '\n\n' + block
    } else if (last.isCode && now.isCode) {
      out[out.length - 1] += '\n\n' + block
    } else {
      out.push(block)
    }

    last = now
  }

  return out
}
