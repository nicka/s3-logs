"use strict";

exports.parse = function (log, callback) {
  var logs = log.split('\n');
  var parsed = [];
  var bracketRegEx = /\[(.*?)\]/;
  var quoteRegex = /\"(.*?)\"/;

  for (var i = 0; i < logs.length; i++) {
    var logString = logs[i];
    if (logString.length === 0) continue;

    var time = bracketRegEx.exec(logString)[1];
    time = time.replace(/\//g, ' ');
    time = time.replace(/:/, ' ');
    time = new Date(time);
    logString = logString.replace(bracketRegEx, '');

    var requestUri = quoteRegex.exec(logString);
    if (requestUri) {
      requestUri = requestUri[1];
      logString = logString.replace(quoteRegex, '');
    }

    var referrer = quoteRegex.exec(logString);
    if (referrer) {
      referrer = referrer[1];
      logString = logString.replace(quoteRegex, '');
    }

    var userAgent = quoteRegex.exec(logString);
    if (userAgent) {
      userAgent = userAgent[1];
      logString = logString.replace(quoteRegex, '');
    }

    var logStringSplit = logString.split(' ');
    var bucketOwner    = logStringSplit[0];
    var bucket         = logStringSplit[1];
    var remoteIp       = logStringSplit[3];
    var requester      = logStringSplit[4];
    var requestId      = logStringSplit[5];
    var operation      = logStringSplit[6];
    var key            = logStringSplit[7];
    var statusCode     = logStringSplit[9];
    var errorCode      = logStringSplit[10];
    var bytesSent      = logStringSplit[11];
    var objectSize     = logStringSplit[12];
    var totalTime      = logStringSplit[13];
    var turnAroundTime = logStringSplit[14];

    var formatted = {
      bucketOwner:    bucketOwner,
      bucket:         bucket,
      time:           time,
      requestId:      requestId,
      operation:      operation,
      key:            key
    };

    if (requestUri !== '-') formatted['requestUri'] = requestUri;
    if (referrer !== '-') formatted['referrer'] = referrer;
    if (userAgent !== '-') formatted['userAgent'] = userAgent;
    if (remoteIp !== '-') formatted['remoteIp'] = remoteIp;
    if (requester !== '-') formatted['requester'] = requester;
    if (errorCode !== '-') formatted['errorCode'] = errorCode;

    if (statusCode !== '-') formatted['statusCode'] = +statusCode;
    if (objectSize !== '-') formatted['objectSize'] = +objectSize;
    if (bytesSent !== '-') formatted['bytesSent'] = +bytesSent;
    if (totalTime !== '-') formatted['totalTime'] = +totalTime;
    if (turnAroundTime !== '-') formatted['turnAroundTime'] = +turnAroundTime;

    parsed.push(formatted);
    if (i + 1 === logs.length) callback(parsed);
  }
};

exports.logDate = function(name) {
  name = name.split('-');
  return new Date(name[0], name[1]-1, name[2], name[3], name[4], name[5]);
};

exports.logId = function(name) {
  name = name.split('-');
  return name.pop();
};
