exports.parse = function (log, callback) {
  var logs = log.split('\n');
  var parsed = [];
  var regex = /[^\s\"\[\]]+|\".*?\"|\[.*?\]/g;

  for (var i = 0; i < logs.length; i++) {
    var logString = logs[i];

    if (logString.length !== 0) {
      var logStringSplit = logString.match(regex);

      var bucketOwner    = logStringSplit[0];
      var bucket         = logStringSplit[1];

      var time = logStringSplit[2];
      time = time.replace(/[\[\]]/g, '').replace(/\//g, ' ').replace(':', ' ');
      time = new Date(time);

      var remoteIp       = logStringSplit[3];
      var requester      = logStringSplit[4];
      var requestId      = logStringSplit[5];
      var operation      = logStringSplit[6];
      var key            = logStringSplit[7];
      var requestUri     = logStringSplit[8].substring(1, logStringSplit[8].length - 1);
      var statusCode     = logStringSplit[9];
      var errorCode      = logStringSplit[10];
      var bytesSent      = logStringSplit[11];
      var objectSize     = logStringSplit[12];
      var totalTime      = logStringSplit[13];
      var turnAroundTime = logStringSplit[14];
      var referrer       = logStringSplit[15].substring(1, logStringSplit[15].length - 1);
      var userAgent      = logStringSplit[16].substring(1, logStringSplit[16].length - 1);
      var versionId      = logStringSplit[17];

      var formatted = {
        bucketOwner:    bucketOwner,
        bucket:         bucket,
        time:           time,
        requestId:      requestId,
        operation:      operation
      };

      if (remoteIp !== '-')       formatted['remoteIp'] = remoteIp;
      if (requester !== '-')      formatted['requester'] = requester;
      if (key !== '-')            formatted['key'] = key;
      if (requestUri !== '-')     formatted['requestUri'] = requestUri;
      if (statusCode !== '-')     formatted['statusCode'] = +statusCode;
      if (errorCode !== '-')      formatted['errorCode'] = errorCode;
      if (bytesSent !== '-')      formatted['bytesSent'] = +bytesSent;
      if (objectSize !== '-')     formatted['objectSize'] = +objectSize;
      if (totalTime !== '-')      formatted['totalTime'] = +totalTime;
      if (turnAroundTime !== '-') formatted['turnAroundTime'] = +turnAroundTime;
      if (referrer !== '-')       formatted['referrer'] = referrer;
      if (userAgent !== '-')      formatted['userAgent'] = userAgent;
      if (versionId !== '-')      formatted['versionId'] = errorCode;

      parsed.push(formatted);
    }

    if (i + 1 === logs.length) {
      if (callback) callback(parsed);
      return parsed;
    }
  }
};

exports.logDate = function(name) {
  name = name.split('-');
  return new Date(name[0], name[1]-1, name[2], name[3], name[4], name[5], 0);
};

exports.logId = function(name) {
  name = name.split('-');
  return name.pop();
};
