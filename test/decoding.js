'use strict';

var assert = require('assert');

var decodeSessionId = require('../lib/decoding/sessionId.js');
var decodeToken = require('../lib/decoding/token.js');

var apiKey = '100';
var sessionId = '1_MX4xMDB-fjE0NTM2ODI2NjA5MDl-YnVXYjF5aFBUQUhGQnZSZFI3K2xsU2xDfn4';

var token = (
  'T1==cGFydG5lcl9pZD0xMDAmc2lnPWU4ZWVkYWZlMDc0MDYwZDQ0ZWEyN2RkZjNlMjE3MDc4NzlhMmIwYmI6c2Vzc2lvbl' +
  '9pZD0xX01YNHhNREItZmpFME5UTTJPREkyTmpBNU1EbC1ZblZYWWpGNWFGQlVRVWhHUW5aU1pGSTNLMnhzVTJ4RGZuNCZj' +
  'cmVhdGVfdGltZT0xNDUzNjgyNjYxJm5vbmNlPTAuODM1Nzc5OTgxNjg3NjY1JnJvbGU9bW9kZXJhdG9yJmV4cGlyZV90aW' +
  '1lPTE0NTYyNzQ2NjE='
);

describe('decoding', function() {
  describe('session', function() {
    it('extracts the apiKey from the session', function() {
      assert(decodeSessionId(sessionId).apiKey === apiKey);
    });
  });

  describe('token', function() {
    it('extracts the sessionId and apiKey from the token', function() {
      var decodedToken = decodeToken(token);

      assert(decodedToken.apiKey === apiKey);
      assert(decodedToken.sessionId === sessionId);
    });
  });
});
