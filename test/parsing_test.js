describe("Parsing:", function () {
parsingTest(
'basic parsing.js',
`/*
 * Description here.
 */

function hello() {
}`,
function() {
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

parsingTest(
'multiple blocks.js',
`/*
 * Description here.
 */

 function hello() {
 }

/*
 * Other description here.
 */

 function world() {
 }`,
function () {
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

parsingTest(
'stray closing tags.js',
`/*
 * Description here.
 */

 function hello() {
       */ }`,
function () {
  it('has locations', function () {
    expect(this.out[0].location.doc).eql({ start: 1, end: 3 });
    expect(this.out[0].location.code).eql({ start: 5 });
  });
});


parsingTest(
'explicit flag.js',
`/**
 * Description here.
 */
function hello() {}`,
function () {
  it('sets the explicit flag', function () {
    expect(this.out[0].explicit).eql(true);
  });
});

parsingTest(
'short blocks.js',
`/* jshint: true */
function hello() {}`,
function () {
  it('is empty', function () {
    expect(this.out).eql([]);
  });
});
});
