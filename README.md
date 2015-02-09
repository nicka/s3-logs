
# S3 Logs
It's a simple module used on [Yttr](https://yttr.co/) to parse S3 raw log data to a parsed array of objects.

## Usage
### parse(rawLogData);
```javascript
var s3Logs = require('s3-logs');

s3Logs.parse(rawLog, function(parsed) {
  // parsed = [{}, {}]
});
```

or the callback may be omitted and the return value used:

```javascript
var parsed = s3Logs.parse(rawLog);
```


Each newline on the raw data, a new object it's added to the array. Here's an example of what it's returned:

```javascript
{
  bucketOwner: 'ay721k5y78l7shsdxg1c8byohbec1m2o9l9dta7n7p7wqlkwdatji3jd6nuf2zo0',
  bucket: 'yttr',
  time: Sun Dec 28 2014 00:00:00 GMT-0000 (GMT),
  requestId: 'D66B84CC6799B246',
  operation: 'REST.GET.OBJECT',
  key: 'CrWQv9wDlKosEpilg',
  requestUri: 'GET /CrWQv9wDlKosEpilg HTTP/1.1',
  referrer: 'https://yttr.co/',
  userAgent: 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:25.0) Gecko/20100101 Firefox/25.0',
  remoteIp: '192.0.0.1',
  requester: '7emv0k4n3qg4p95jwx27moizpjl9u1m0xgl8421xmp40wzahysntnlglgqsnbd12',
  statusCode: 200,
  objectSize: 14409104,
  bytesSent: 14409104,
  totalTime: 6532,
  turnAroundTime: 33
}
```

### logDate(name);
Returns a ``new Date();`` by parsing log name.

```javascript
var creation = s3Logs.logDate(name);
```

### logId(name);
Returns a ``String`` of the log ID.

```javascript
var id = s3Logs.logId(name);
```
