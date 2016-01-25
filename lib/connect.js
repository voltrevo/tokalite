'use strict';

var EventEmitter = require('event-emitter');

var opentokPromise = require('./opentokPromise.js');
var publish = require('./publish.js');
var tokenDecoder = require('./decoding/token.js');

var Session = undefined;

var connectSession = function(token) {
  return opentokPromise.then(function(OT) {
    var decodedToken = tokenDecoder(token);

    var otSession = OT.initSession(decodedToken.apiKey, decodedToken.sessionId);

    return new Promise(function(resolve, reject) {
      otSession.connect(token, function(err) {
        if (err) {
          reject(err);
        }

        return resolve(Session(otSession));
      });
    });
  });
};

Session = function(otSession) {
  var session = EventEmitter();

  // TODO: otSession.on('stream')

  session.publish = function(targetElement, properties) {
    return publish(otSession, targetElement, properties);
  };

  return session;
};

module.exports = connectSession;
