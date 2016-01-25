'use strict';

module.exports = function(otSession, otSubscriber, otStream) {
  var subscriber = {};

  subscriber.disconnect = function() {
    otSession.unsubscribe(otSubscriber);
  };

  return subscriber;
};
