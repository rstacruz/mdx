"use strict";

module.exports = function (block, ctx) {
  const preludes = ctx.language.options.preludes;

  preludes.forEach(function (pre) {
    let m = block.prelude.match(pre.regex);

    if (m) {
      block.type = pre.type;
      block.title = m[pre.title];
    }
  });

  return block;
};
