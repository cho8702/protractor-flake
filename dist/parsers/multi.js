'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

exports['default'] = {
  name: 'multi',

  parse: function parse(output) {
    var match = null;
    var failedSpecs = new Set();
    var testsOutput = output.split('------------------------------------');
    var RESULT_REG = /\sSUCCESS\s/g;
    var SPECFILE_REG = /.+Specs:\s(.*\.(js|coffee))/g;
    testsOutput.forEach(function (test) {
      var specfile = undefined;
      var result = 'failed';
      // retrieve specfile from run
      console.log('Test: ' + test);
      while (match = SPECFILE_REG.exec(test)) {
        // eslint-disable-line no-cond-assign
        specfile = match[1];
        console.log('Spec file: ' + specfile);
      }
      // check for string ' SUCCESS ' and then marks the test as passed
      while (match = RESULT_REG.exec(test)) {
        // eslint-disable-line no-cond-assign
        result = 'passed';
        console.log('Match: ' + match);
      }
      if (specfile && result === 'failed') {
        if (!/node_modules/.test(specfile)) {
          failedSpecs.add(specfile);
        }
      }
    });

    return [].concat(_toConsumableArray(failedSpecs));
  }
};
module.exports = exports['default'];