'use strict';

module.exports = function(otSession, otSubscriber, stream) {
  var subscriber = {};

  subscriber.stream = stream;

  subscriber.remove = function() {
    otSession.unsubscribe(otSubscriber);
  };

  return subscriber;
};
