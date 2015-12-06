const redent = require('redent')

/**
 * Reindents a string. Useful for multiline strings.
 */

module.exports = function r (str) {
  return redent(str).trim()
}

