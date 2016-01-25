'use strict';

var EventEmitter = require('event-emitter');

var opentokPromise = require('./opentokPromise.js');
var publish = require('./publish.js');
var Stream = require('./Stream.js');
var tokenDecoder = require('./decoding/token.js');

var Session = undefined;

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

Session = function(otSession) {
  var session = EventEmitter();

  session.publish = function(targetElement, properties) {
    return publish(otSession, targetElement, properties);
  };

  otSession.on('streamCreated', function(evt) {
    session.emit('stream', Stream(otSession, evt.stream));
  });

  return session;
};

module.exports = connect;
