describe('to do list', function () {
  function done() {}

  describe('parsing', function () {
    it('single line mode (//)');
    it('automatic title');
  });

  describe('preludes', function () {
    it('custom title formats', done);
    it('h2 support');
  });

  describe('markdown', function () {
    it('2 spaces for code');
    it('@tags for code');
    it('definition lists');
  });

  describe('templating', function () {
    it('mustache', done);
  });
});