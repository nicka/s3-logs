var S3LogParser = require('../index');
var should = require('should');
var fs = require('fs');

var oneLog = fs.readFileSync(__dirname + '/fixtures/2015-01-06-07-24-42-400A19D7191D7AB8', { encoding: 'utf8' });
var multipleLogs = fs.readFileSync(__dirname + '/fixtures/2015-01-06-14-33-53-68D9B335BDEC1AD8', { encoding: 'utf8' });

describe('s3-logs', function () {
  describe('#parse()', function () {
    describe('synchronous', function () {
      describe('one entry', function () {
        it('should have length equal to number of log entries', function () {
          S3LogParser.parse(oneLog).length.should.be.equal(oneLog.split('\n').length - 1);
        });
      });

      describe('multiple entries', function () {
        it('should have length equal to number of log entries', function () {
          S3LogParser.parse(multipleLogs).length.should.be.equal(multipleLogs.split('\n').length - 1);
        });
      });
    });

    describe('asynchronous', function () {
      describe('one entry', function () {
        it('should have length equal to number of log entries', function (done) {
          S3LogParser.parse(oneLog, function (parsed) {
            parsed.should.have.length(oneLog.split('\n').length - 1);
            done();
          });
        });
      });

      describe('multiple entries', function () {
        it('should have length equal to number of log entries', function (done) {
          S3LogParser.parse(multipleLogs, function (parsed) {
            parsed.should.have.length(multipleLogs.split('\n').length - 1);
            done();
          });
        });
      });
    });
  });

  describe('#logDate()', function () {
    it('should return Date', function () {
      S3LogParser.logDate('2015-01-06-07-24-42-400A19D7191D7AB8').should.be.a.Date;
    });
  })

  describe('#logId()', function () {
    it('should return String', function () {
      S3LogParser.logId('2015-01-06-07-24-42-400A19D7191D7AB8').should.be.a.String;
    });

    it('should have length 16', function () {
      S3LogParser.logId('2015-01-06-07-24-42-400A19D7191D7AB8').should.have.length(16);
    });
  })
});
