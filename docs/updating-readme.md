# Updating readme

To update the README automatically, you can use a script. I prefer using GNU Make.

##### Makefile

```sh
mdx = ./node_modules/.bin/mdx --markdown -x internal

# Use mdx to update readme.md
update: README.md
README.md: lib/index.js lib/tableize.js # change this
	(sed '/<!--api-->/q' $@; echo; ${mdx} $^; sed -n '/<!--api:end-->/,$$p' $@) > $@~
	mv $@~ $@
```

You can then write your readme with `<!--api-->` and `<!--api:end-->` tags that will automatically be updated.

```md
# package
This is my readme.

## API

<!--api-->

...everything here will be programatically updated

<!--api:end-->
```

To run the update, use `make update`. This will be a noop if the input files have not been updated.

```sh
make update
```

You can put this in your package's prepublish script.

##### package.json

```json
{
  "scripts": {
    "prepublish": "make update"
  }
}
```
