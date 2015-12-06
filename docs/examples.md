# Examples

```js
/**
 * Find Records by a specific field name and value. This method
 * will be available for each `field` defined on the record.
 *
 * title - the title of the article
 * options - (Object) a list of available options
 *
 * Example:
 *   let a = new Article("New post")
 *
 * Signature:
 *   new Article(title)
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

