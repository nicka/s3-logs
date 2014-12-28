var s3LogParser = require('../index');
var assert = require('assert');
var sampleLog = require('./sample');

s3LogParser.parse(sampleLog, function (parsed) {
  assert.equal(parsed.length, 7);
});
