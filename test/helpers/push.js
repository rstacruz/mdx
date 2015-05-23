var Extractor = require('../../index').Extractor;

module.exports = function push (file, input) {
  beforeEach(function () {
    this.ex = new Extractor();
    this.ex.push(file, input);
    this.out = this.ex.toJson();
  });
};
