# Format

### Documentation comments

Start comments with `/**` to begin a comment block. Things will be inferred based on the next line.

```js
/**
 * Clears the screen after a specified `delay`.
 */

function clear(delay) {
}
```

This will be the output. Notice how the `title`, `type` and `signature` are all derived automatically.

```js
title: "clear"
type: "function"
signature: "clear(delay)"
body: "Clears the screen after a specified `delay`."
```

In markdown output mode (`-f markdown`), it will appear like so:

> ### clear
> > `clear(delay)`
>
> Clears the screen after a specified `delay`.

### Titles

Titles are automatically-inferred, but they can be explicitly stated by a first line that ends in `:`.

```js
/**
 * Mdx:
 * Generic documentation extractor.
 */

module.exports = {
```

### Types

Types are also automatically-inferred, but they can be explicitly stated by adding `(...)` before the title ends.

```js
/**
 * Mdx (module):
 * Generic documentation extractor.
 */

module.exports = {
```

If you don't have a title, you can begin the first line with `(...)`:

```js
/**
 * (attribute) The ratio between the circumference and diameter.
 */

const PI = 3.14159;
```

### Tags

Tags begin with `word:`. This convention is taken from tomdoc.

```js
/**
 * Internal: returns the full name.
 */

function fullName(first, last) {
}
```

They can be used in conjunction with titles, just place the tag in the second line.

```js
/**
 * fullName:
 * Internal: returns the full name.
 */

function fullName(first, last) {
}
```

### Parameters

(TODO)

```
/**
 * Find Records by a specific field name and value. This method
 * will be available for each `field` defined on the record.
 *
 * title - the title of the article
 * options - (Object) a list of available options
 */
```

### Code blocks

Indent them by 2 spaces. (TODO)

```
/**
 * Find Records by a specific field name and value.
 *
 *   let r = Record.find(name)
 *   //=> { ... }
 */
```

### Subheadings

(TODO)

```
/**
 * Find Records by a specific field name and value.
 *
 * Caveats:
 * This is not available in Win32 environments.
 *
 * See also:
 * - [where]
 */
```

### Custom signatures

You may format the title line like so: (TODO)

```
/**
 * addClass : addClass(classname, ...)
 * Adds more classes.
 */
```

Alternatively, you can define it like tomdoc: (TODO)

```
/**
 * Adds more classes.
 *
 * Signature:
 *   addClass(classname, ...)
 */
```

