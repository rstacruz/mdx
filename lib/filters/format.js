/* jshint boss: true */
"use strict";

module.exports = function (block, ctx) {
  let m;

  if (!block) return;

  // parse out title
  if (m = block.raw.match(/^(.*?):\n/)) {
    block.title = m[1];
    block.raw = block.raw.substr(m[0].length);
  }

  // parse out tags
  if (m = block.raw.match(/^(.*?): /)) {
    block.tags = m[1].toLowerCase().split(', ');
    block.raw = block.raw.substr(m[0].length);
  }

  // parse out type
  if (m = block.raw.match(/^\((.*?)\) /)) {
    block.type = m[1].toLowerCase();
    block.raw = block.raw.substr(m[0].length);
  }

  return block;
};
