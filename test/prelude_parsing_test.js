describe('Prelude parsing:', function () {
parsingTest(
'js functions.js',
`/**
 * Description here.
 */
function hello() {
}`,
function () {
  it('has type', function () {
    expect(this.blocks[0].type).eql('function');
  });

  it('has title', function () {
    expect(this.blocks[0].title).eql('hello');
  });
});

parsingTest(
'classes.js',
`/**
 * Description here.
 */
class Extract {
}`,
function() {
  it('has type', function () {
    expect(this.blocks[0].type).eql('class');
  });

  it('has title', function () {
    expect(this.blocks[0].title).eql('Extract');
  });
});

parsingTest(
'subclasses.js',
`/**
 * Description here.
 */
class Extract extends Base {
}`,
function () {
  it('has type', function () {
    expect(this.blocks[0].type).eql('class');
  });

  it('has title', function () {
    expect(this.blocks[0].title).eql('Extract');
  });
});
});
