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
{ blocks: [
  { title: "clear",
    type: "function",
    signature: "clear(delay)",
    body: "Clears the screen after a specified `delay`.",
    ... } ] }
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

### Title and signature

To define a signature, use the format `<title> : <signature>` for the first line.

```js
/**
 * on : on(event, handler)
 * Binds an event.
 */

on () { ... }
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

Tags begin with `word:`. This convention is taken from [tomdoc].

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

```js
/* ...
 * title - the title of the article
 * options - (Object) a list of available options
 */
```

### Code blocks

Indent them by 2 spaces. (TODO)

```js
/**
 * Find Records by a specific field name and value.
 *
 *   let r = Record.find(name)
 *   //=> { ... }
 */
```

### Subheadings

(TODO)

```js
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

```js
/**
 * addClass : addClass(classname, ...)
 * Adds more classes.
 */
```

Alternatively, you can define it like tomdoc: (TODO)

```js
/**
 * Adds more classes.
 *
 * Signature:
 *   addClass(classname, ...)
 */
```

[tomdoc]: http://tomdoc.org/
