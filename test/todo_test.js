describe('to do list', function () {

  describe('parsing', function () {
    it('single line mode (//)');
    it('automatic title', done);
  });

  describe('preludes', function () {
    it('custom title formats', done);
    it('custom signatures', done);
    it('h2 support', done);
    it('alternate title format', done); // md_block (module):
  });

  describe('markdown', function () {
    // see md_block.js
    it('2 spaces for code *');
    it('@tags for code');
    it('definition lists');
    it('custom signatures');
  });

  describe('templating', function () {
    it('mustache', done);
  });
});

function done() {}
