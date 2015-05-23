"use strict";

module.exports = function (block, ctx) {
  // eat this
  // block.raw
  // block.prelude
  //
  // make this
  // block.title
  // block.id
  // block.type

  const preludes = [
    {
      regex: `^\\s*class ([A-Za-z_][A-Za-z0-9_]*)( extends ([A-Za-z0-9_]+))? {\\s*$`,
      type: 'class',
      title: 1
    },
    {
      regex: `^\\s*function\\s+([A-Za-z_][A-Za-z0-9_]*)\s*\\(.*?\\)\\s*{\\s*$`,
      type: 'function',
      title: 1,
      signature: "\\1(\\2)"
    }
  ];


  preludes.forEach(function (pre) {
    let m = block.prelude.match(pre.regex);

    if (m) {
      block.type = pre.type;
      block.title = m[pre.title];
    }
  });

  return block;
}
