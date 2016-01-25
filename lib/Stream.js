'use strict';

var bluebird = require('bluebird');
var EventEmitter = require('event-emitter');

var Subscriber = require('./Subscriber.js');

module.exports = function(otSession, otStream) {
  var stream = EventEmitter();

  var connected = true;
  var disconnectionDefer = bluebird.defer();

  otSession.on('streamDestroyed', function(evt) {
    if (evt.stream.id === otStream.id) {
      disconnectionDefer.resolve();
    }
  });

  stream.isConnected = function() {
    return connected;
  };

  stream.getDisconnectionPromise = function() {
    return disconnectionDefer.promise;
  };

  stream.subscribe = function(targetElement, properties) {
    return new Promise(function(resolve, reject) {
      var otSubscriber = otSession.subscribe(otStream, targetElement, properties, function(err) {
        if (err) {
          reject(err);
          return;
        }

        resolve(Subscriber(otSession, otSubscriber, stream));
      });
    });
  };

  return stream;
};
