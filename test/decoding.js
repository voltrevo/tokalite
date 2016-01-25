'use strict';

var assert = require('assert');

var decodeSessionId = require('../lib/decoding/sessionId.js');

var sessionId = '2_MX4xMDB-fjE0NTM2ODIwMjAyMDd-YS8yRUFwOWRIVWtKMVMrMGNQKzNsQVg3fn4';

describe('decoding', function() {
  describe('session', function() {
    it('extracts the api key from the session', function() {
      assert(decodeSessionId(sessionId).apiKey === '100');
    });
  });
});
