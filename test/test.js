var s3LogParser = require('../index');
var assert = require('assert');
var sampleLog = require('./sample');

s3LogParser.parse(sampleLog, function (parsed) {
  assert.equal(parsed.length, 7);
});

// Alternate usage style.
assert.equal(s3LogParser.parse(sampleLog).length, 7);
