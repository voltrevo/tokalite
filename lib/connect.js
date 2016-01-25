'use strict';

var opentokPromise = require('./opentokPromise.js');
var Session = require('./session.js');
var tokenDecoder = require('./decoding/token.js');

var connect = function(token) {
  return opentokPromise.then(function(OT) {
    var decodedToken = tokenDecoder(token);

    var otSession = OT.initSession(decodedToken.apiKey, decodedToken.sessionId);

    return new Promise(function(resolve, reject) {
      otSession.connect(token, function(err) {
        if (err) {
          reject(err);
          return;
        }

        resolve(Session(otSession));
      });
    });
  });
};


module.exports = connect;
