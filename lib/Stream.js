'use strict';

var Subscriber = require('./Subscriber.js');

module.exports = function(otSession, otStream) {
  var stream = {};

  stream.subscribe = function(targetElement, properties) {
    return new Promise(function(resolve, reject) {
      var otSubscriber = otSession.subscribe(otStream, targetElement, properties, function(err) {
        if (err) {
          reject(err);
          return;
        }

        resolve(Subscriber(otSession, otSubscriber, otStream));
      });
    });
  };

  return stream;
};
