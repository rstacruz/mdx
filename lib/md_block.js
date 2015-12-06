'use strict'

/**
 * md_block (module):
 * Deals with markdown text.
 */

/**
 * Breaks apart Markdown text into logical blocks. Takes code fences into account.
 *
 *     splitBlocks('hello\n' + there\n' + '\n' + 'world')
 *     => ['hello\nthere', 'world']
 */

exports.splitBlocks = function (str) {
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

/**
 * Normalizes code blocks into code fences
 */

exports.normalizeCode = function (blocks, options) {
  return blocks.map((block) => {
    var redented = unindent(block, { min: 2, max: 4 })
    if (redented === block) return block

    return '```' + (options.lang || '') + '\n' + redented + '\n```'
  })
}

function unindent (block, options) {
  var match = block.match(/^[ \t]*(?=\S)/gm)
  var indent = Math.min.apply(Math, match.map((el) => el.length))

  if (options && options.min && indent < options.min) return block
  if (options && options.max && indent > options.max) indent = options.max

  var re = new RegExp('^[ \\t]{' + indent + '}', 'gm')
  return indent > 0 ? block.replace(re, '') : block
}
