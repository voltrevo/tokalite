'use strict';

// core modules
var assert = require('assert');

// community modules
var base64 = require('js-base64').Base64;

module.exports = function(token) {
  var components = {};

  assert(typeof token === 'string');
  assert(token.substring(0, 4) === 'T1==');

  var pieces = base64.decode(token.substring(4)).split('&');

  pieces.forEach(function(piece) {
    var pieceParts = piece.split('=');
    var key = pieceParts[0];

    if (key === 'partner_id') {
      components.apiKey = pieceParts[1];
    } else if (key === 'sig') {
      components.sessionId = pieceParts[2];
    }
  });

  assert('apiKey' in components);
  assert('sessionId' in components);

  return components;
};
