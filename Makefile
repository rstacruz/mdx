bin := ./node_modules/.bin
# opts += --cachefile .git/browserify-cache.json

dist/index.js: lib/index.js $(shell find lib)
	$(bin)/browserify -t babelify --bare $< -o $@
