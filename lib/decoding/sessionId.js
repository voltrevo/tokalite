'use strict';

// core modules
var assert = require('assert');

// community modules
var base64 = require('js-base64').Base64;

module.exports = function(sessionId) {
  var components = {};

  assert(typeof sessionId === 'string');
  assert(sessionId.substring(0, 2) === '1_' || sessionId.substring(0, 2) === '2_');

  var pieces = sessionId.substring(2).split('-');

  var apiKeyPieces = base64.decode(pieces[0]).split('~');
  assert(apiKeyPieces.length >= 2);

  components.apiKey = apiKeyPieces[1];

  return components;
};
