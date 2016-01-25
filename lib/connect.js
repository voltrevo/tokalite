'use strict';

var bluebird = require('bluebird');
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

  var disconnectionDefer = bluebird.defer();
  var connected = true;
  var streams = [];

  session.isConnected = function() {
    return connected;
  };

  session.getDisconnectionPromise = function() {
    return disconnectionDefer.promise;
  };

  session.publish = function(targetElement, properties) {
    return publish(otSession, targetElement, properties);
  };

  session.getStreams = function() {
    return streams.slice();
  };

  otSession.on('streamCreated', function(evt) {
    var stream = Stream(otSession, evt.stream);
    streams.push(stream);

    stream.getDisconnectionPromise().then(function() {
      streams = streams.filter(function(s) {
        return s !== stream;
      });
    });

    session.emit('stream', stream);
  });

  otSession.on('sessionDisconnected', function() {
    disconnectionDefer.resolve();
  });

  return session;
};

module.exports = connect;
