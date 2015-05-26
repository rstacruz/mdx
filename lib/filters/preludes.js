"use strict";

module.exports = function (block, ctx) {
  const preludes = ctx.language.options.preludes;

  preludes.forEach(function (pre) {
    if (block.type && block.title) return;
    let m = block.prelude.match(pre.regex);

    if (m) {
      block.type = pre.type;
      block.title = format(pre.title, m);
    }
  });

  return block;
};

function format(str, m) {
  return str.replace(/\\(\d)/g, function (_, i) {
    return m[+i];
  });
}
