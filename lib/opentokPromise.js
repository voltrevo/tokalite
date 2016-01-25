'use strict';

var assert = require('assert');

module.exports = new Promise(function(resolve) {
  window.addEventListener('load', function() {
    var otScript = document.createElement('script');
    otScript.setAttribute('src', '//static.opentok.com/v2/js/opentok.js');
    otScript.setAttribute('async', '');
    document.head.appendChild(otScript);

    otScript.addEventListener('load', function() {
      assert('OT' in window);
      resolve(window.OT);
    });
  });
});
