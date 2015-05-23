var push = require('./helpers/push');
var Mdx = require('../index');

describe('mdx', function() {
  push('file.js',
`/*
 * Description here.
 */

 function hello() {
 }`);

  it('has locations', function () {
    expect(this.out[0].location.doc).eql({ start: 1, end: 3 });
    expect(this.out[0].location.code).eql({ start: 5 });
  });
    
  it('has prelude', function () {
    expect(this.out[0].prelude).eql("function hello() {");
  });

  it('has raw', function () {
    expect(this.out[0].raw).eql("Description here.\n");
  });
});

describe('multiple blocks', function() {
  push('file.js',
`/*
 * Description here.
 */

 function hello() {
 }

/*
 * Other description here.
 */

 function world() {
 }`);

  it('has locations [0]', function () {
    expect(this.out[0].location.doc).eql({ start: 1, end: 3 });
    expect(this.out[0].location.code).eql({ start: 5 });
  });

  it('has locations [1]', function () {
    expect(this.out[1].location.doc).eql({ start: 8, end: 10 });
    expect(this.out[1].location.code).eql({ start: 12 });
  });
    
  it('has prelude[0]', function () {
    expect(this.out[0].prelude).eql("function hello() {");
  });

  it('has prelude[1]', function () {
    expect(this.out[1].prelude).eql("function world() {");
  });

  it('has raw', function () {
    expect(this.out[0].raw).eql("Description here.\n");
  });
});

describe('stay closing tags', function() {
  push('file.js',
`/*
 * Description here.
 */

 function hello() {
       */ }`);

  it('has locations', function () {
    expect(this.out[0].location.doc).eql({ start: 1, end: 3 });
    expect(this.out[0].location.code).eql({ start: 5 });
  });
});

describe('explicit', function() {
  push('file.js',
`/**
 * Description here.
 */
 function hello() {}`);

  it('sets the explicit flag', function () {
    expect(this.out[0].explicit).eql(true);
  });
});

describe('short blocks', function() {
  push('file.js',
`/* jshint: true */
function hello() {}`);

  it('is empty', function () {
    expect(this.out).eql([]);
  });

});

describe('detectLanguage', function () {
  it('works for .js', function () {
    var lang = Mdx.detectLanguage('file.js');
    expect(lang.name).eq('Javascript');
  });

  it('works for .es6', function () {
    var lang = Mdx.detectLanguage('file.es6');
    expect(lang.name).eq('Javascript');
  });

  it('returns nothing when it doesnt know', function () {
    var lang = Mdx.detectLanguage('file.txt');
    expect(lang).eq(undefined);
  });
});
