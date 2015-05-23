var push = require('./helpers/push');

var e, out;


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
    
  it('has raw', function () {
    expect(this.out[0].raw).eql("Description here.\n");
  });
});
