# Preludes

For some languages, code info can be inferred from the first line after the
code block. This is called a prelude.

```
/**
 * Adds 2 numbers.
 */

function add(a, b) {
  ...
}
```

```
tags: internal deprecated

js:
  types: function method class constant property

  preludes:
  FNNAME(args) {
  function FNNAME(args) {
  ___.FNNAME = function () {
  ___.prototype.FNNAME = function () {
```

*(This document is a stub.)*
