global.expect = require('chai').expect;

/* Describe a parsing test case */
global.parsingTest = function (name, src, fn) {
  const push = require('./helpers/push');
  describe(name, function () {
    push(name, src);
    fn();
  });
};
