# mdx

Generic documentation extractor.

* Should extensible to work with any language that supports comments
* Outputs documentation in YAML/JSON format, ready for say, Jekyll
* Prefers Markdown

## Examples

```js
/**
 * Defines a get property `prop` in the given `prototype` object.
 *
 * Parameters:
 *
 * ~ proto: the prototype
 * ~ prop: the property
 * ~ fn: the function
 *
 * Returns nothing.
 */

function getter (proto, prop, fn) {
  Object.defineProperty(proto, prop, { get: fn });
}

/*
 * (Class) an extractor.
 */

function Extractor () {
}
```

```rb
# Private: computes for a value.
def sum(&blk)
```

```css
/*
 * Profile picture:
 * A user's primary photograph.
 *
 *   @example
 *   .profile-picture
 *     img(src='https://placehold.it/300x300')
 */

.profile-picture {
}
```

## Format

```
# [TITLE [(TYPE):]
# [TAG, TAGn:] [(TYPE)] [DESCRIPTION]
# [BODY]
```

* Title is inferred if not available
* A block is only recognized if it has a type, tag, or title
* ...or if it has an extra `*` or `#` in the beginning of the comment block

Markdown extensions:

* Only 2 lines to indent code
* `XXX:` is a subheading (h3)
* `~` will define a definition list
* Code blocks can be tagged (`@example`)

## Parsing

* --yaml --json
* --stdout
* --per-file ?

```yml
$ mdx file.js --yaml

blocks:
  - id: helpers.js:getter

    # These are filled in first
    prelude: |
      function getter (proto, prop, fn)
    raw: |
      Defines a prop `prop` in the given `prototype` object.

      Parameters:

      ~ data (String): file data
      ~ error (Error): the error

      Returns nothing.

    # These are eventually inferred
    title: getter
    type: function
    description: |
      Defines a prop <code>prop</code> in the given <code>prototype</code> object.
    body: |
      <h3>Parameters:</h3>
      <dl>...</dl>
      <p>Returns nothing.</p>
    tag: Private
    signature: |
      getter(proto, prop, fn)

    location:
      file: helpers.js
      doc:  { start: 45, end: 50 }
      code: { start: 51, end: 60 }
```

## Preludes

```
tags: internal deprecated

js:
  types: function method class constant property

  preludes:
  FNNAME(args) {
  function FNNAME(args) {
  ___.FNNAME = function () {
  ___.prototype.FNNAME = function () {

rb:
  types: function method class module constant attribute

  def FNNAME (args)
  class CLASSNAME

css:
  types: component block element modifier
```
