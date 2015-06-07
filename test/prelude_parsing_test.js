describe('Prelude parsing:', function () {
  preludeTest(
    "functions.js",
    "function hello() {",
    function () {
      expect(this.blocks[0].type).eql('function');
      expect(this.blocks[0].title).eql('hello()');
      expect(this.blocks[0].signature).eql('hello()');
    });

  preludeTest(
    "functions_with_args.js",
    "function greet(name) {",
    function () {
      expect(this.blocks[0].type).eql('function');
      expect(this.blocks[0].title).eql('greet()');
      expect(this.blocks[0].signature).eql('greet(name)');
    });

  preludeTest(
    "classes.js",
    "class Extract {",
    function () {
      expect(this.blocks[0].type).eql('class');
      expect(this.blocks[0].title).eql('Extract');
    });

  preludeTest(
    "subclasses.js",
    "class Extract extends Base {",
    function () {
      expect(this.blocks[0].type).eql('class');
      expect(this.blocks[0].title).eql('Extract');
    });

  preludeTest(
    "method.js",
    "Mdx.renderDocument = function () {",
    function () {
      expect(this.blocks[0].type).eql('function');
      expect(this.blocks[0].title).eql('renderDocument()');
    });

  preludeTest(
    "prototype method.js",
    "Mdx.prototype.renderTemplate = function () {",
    function () {
      expect(this.blocks[0].type).eql('function');
      expect(this.blocks[0].title).eql('renderTemplate()');
    });

  preludeTest(
    "attribute.js",
    "Mdx.radius = 32.5;",
    function () {
      expect(this.blocks[0].type).eql('attribute');
      expect(this.blocks[0].title).eql('radius');
    });

  preludeTest(
    "attribute 2.js",
    "let radius = 32.5;",
    function () {
      expect(this.blocks[0].type).eql('variable');
      expect(this.blocks[0].title).eql('radius');
    });

  function preludeTest(file, code, fn) {
    var input = `/**\n * Description here\n */\n${code}`;

    it(file, function () {
      var Extractor = require('../index').Extractor;
      this.ex = new Extractor();
      this.ex.push(file, input);
      this.out = this.ex.toJson();
      this.blocks = this.out.blocks;
      fn.apply(this);
    });
  }
});
